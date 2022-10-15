# GOAL : 레포 생성 이전에 정리해둔 걸 옮긴다!!

## stale time vs cache time

- StaleTime: The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen [under certain conditions](https://react-query.tanstack.com/guides/caching).

  - 받아온 쿼리데이터가 구식이될때까지의 시간. 즉, `stale time` 이 5초이고 useQuery 호출 후 5초가 지나면 쿼리데이터가 구식이된다. 그 사이까지는 훅이 재호출 되더라도 네트워크 요청이 다시 보내지지는 않는다. 또 쿼리데이터가 구식이라고 캐시에서 데이터를 뽑아 쓰지 않는 것은 아니다.
    > stale 한 쿼리 인스턴스
    >
    > - Since the cache already has data for the **`['todos']`** key from the first query, that data is immediately returned from the cache.
    > - The new instance triggers a new network request using its query function.
    >   - Note that regardless of whether both **`fetchTodos`** query functions are identical or not, both queries' **`[status](https://tanstack.com/query/v4/docs/reference/useQuery)`** are updated (including **`isFetching`**, **`isLoading`**, and other related values) because they have the same query key.
    > - When the request completes successfully, the cache's data under the **`['todos']`** key is updated with the new data, and both instances are updated with the new data.
    - 여기서 중요한건 stale Time이 지나 캐시데이터가 구식이 되었을 때의 행동 플로우이다. 구식이 되어있다면? 네트워크 요청을 하여 그 데이터를 가져오는게 아니라 캐시데이터에서 가져온 후 네트워크 요청을 보내 캐시데이터를 갱신하고 난 이후 캐시 데이터를 가져온다.

- CacheTime: The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.
  - 비활성화된 쿼리가 캐시에서 지워지는 시간이다. 기본값은 5분. 등록된 관찰자(컴포넌트같은)가 없어지면 쿼리가 비활성 상태가 되므로 해당 쿼리를 사용하는 모든 컴포넌트가 언마운트 된다!
  - 컴포넌트에서 해당 키의 쿼리 훅을 호출한 뒤 언마운트 되었을 경우 5분이 지나게되면 캐싱 데이터가 지워진다. 캐싱 데이터가 계속 남아 메모리를 차지할 필요가 없으니!

## 간접 refetch 와 강제 refetch

- 구식이 된 쿼리의 refetch 상황
  - 새로운 쿼리 인스턴스가 호출될 때
  - 윈도우가 재 포커싱 될 때
  - 네트워크가 재 연결될 때
  - 선택적으로 refetch interval을 설정한 경우
- 강제 refetch 상황
  - useQuery의 메소드 활용하기
  - queryClient의 메소드 활용하기

그럼 우리가 새로운 데이터를 refetching하기 위해서는 전제조건이 쿼리 인스턴스를 `stale` 하게 만드는 것이다. 혹은 강제로 refetch 하거나

### 쿼리 데이터를 갱신하는 방법

[QueryClient | TanStack Query Docs](https://tanstack.com/query/v4/docs/reference/QueryClient)

- useQuery의 `remove` method
- useQuery의 `refetch` method
- queryClient의 `setQueryData` method
- queryClient의 `invalidateQueries` method
- queryClient의 `refetchQueries` method
- queryClient의 `removeQueries` method
- queryClient의 `resetQueries` method
- queryClient의 `clear` method

조사해본 바로는 위와 같다. 차근차근 보자

### queryClient의 setQueryData(no refetching)

쿼리데이터를 갱신한다. 하지만 네트워크 요청과는 관련없다. 클라이언트 데이터를 업데이트한다고 생각하면 편함. 해당 쿼리데이터가 없다면? 생성한다. 서버 데이터와 별개의 전역 데이터를 만들고 싶다면 사용해도 되겠다 싶음

### queryClient의 invalidateQueries(간접 refetching)

1. 이 훅을 호출하면 인자로 들어가는 문자열와 관련된 쿼리들을 stale하게 만든다.(키와 동일한 + 키를 prefix로 갖는 쿼리들)
2. 그리고 쿼리 데이터가 렌더링되고 있는 경우 백그라운드에서 refetch를 시도한다.

렌더링 되고 있지 않다면 즉 쿼리 훅이 호출되고 있는 경우가 아니라면 즉시 `refetch` 가 되지는 않는거지. 이 때 쿼리 데이터는 resetQueries와 달리 `preloaded 상태`가 아니다. 쿼리가 활성화되어있는 경우에만 refetching이 된다.

### queryClient의 refetchQueries(강제 refetching)

강제 refetching을 수행한다.

### queryClient의 removeQueries(간접 refetching)

쿼리데이터를 삭제시킨다. refetching 과 같은 네트워크 요청을 수행하지는 않는다.

### queryClient의 resetQueries(간접 refetching)

해당 키를 구독하는 모든 관찰자들을 삭제하지 않는다. 또 preloaded 상태로 쿼리 상태를 리셋시킨다. `initialData` 가 있다면 이 값으로 돌린다는 이야기.

쿼리가 활성화되어있다면 ? 이는 refetching 된다.

### query의 활성, 비활성

활성상태는 구독자(컴포넌트)가 하나라도 마운트 되는 경우 setting되는 상태인 것 같음. → **활성 상태, 즉 모든 구독자 컴포넌트의 언마운트가 수행되지 않는 경우 활성상태이므로 이 경우에는 간접 refetching에 의해 refetch가 수행된다.**

마찬가지로 비활성상태는 모든 구독자(컴포넌트)가 언마운트 되는 경우 setting되는 상태인 것 같음. → 비활성 상태, 모든 구독자 컴포넌트가 언마운트되는 경우 비활성상태인 듯 하다.

대강 useEffect 혹은 other React API (Lifecycle method)로 이를 체킹하며 활성 비활성 상태를 체크하고 있지 않을까 싶다.

## Reference

[Caching Examples | TanStack Query Docs](https://tanstack.com/query/v4/docs/guides/caching?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/caching)

[staleTime vs cacheTime · Discussion #1685 · TanStack/query](https://github.com/TanStack/query/discussions/1685)

[Practical React Query](https://tkdodo.eu/blog/practical-react-query)

[Important Defaults | TanStack Query Docs](https://tanstack.com/query/v4/docs/guides/important-defaults)
