# react-query-playground

👻 나만의 리액트 쿼리 운동장. 기술을 탐구하며 드는 호기심들을 이 곳에서 해소한다 👻

## 궁금증 1 : 단순 re-render로 인한 useQuery 훅 재호출에는 refetch(network request)가 발생하지 않는가?

다음 문장은 [이곳에서 발췌](https://github.com/TanStack/query/discussions/1685)

> React-Query will smartly refetch stale queries in the background, e.g. if you focus the window or mount a new component that uses the query (=an observer). If you just have a todo list on the screen and re-render that a bunch of times, and you do that for 30 minutes or even the whole day, there won't be a refetch, even with staleTime of zero.

요약하자면, 단순 리렌더 액션에는 `stale time` 이 0 이어도 refetch가 발생하지 않는다는 내용.

이 말이 진실인지 궁금하다. 지금까지 난 useQuery 훅이 재호출 될 때 쿼리 데이터가 구식이라면 요청을 보내는 줄 알았다. refetch 발생 조건이 따로 있는 줄 몰랐음.

### 검증

TodoContainer 컴포넌트에서 테스트를 진행한다. TodoContainer 컴포넌트를 리렌더 시키게 되면 useFetchTodoList(useQuery 기반의 커스텀 훅) 또한 재 호출되는데, 재호출 마다 `refetch`가 트리거 되는지 확인한다.

`refetch`가 되지 않는다면(네트워크 탭에 요청 기록이 남지 않는다면), 인용구는 사실이다.

### 결과

`Counter` 컴포넌트를 통해 `TodoContainer`의 상태를 업데이트 함으로써 리렌더를 시켜보았고, 동시에 쿼리 훅이 호출되는지 확인하면서 네트워크 탭 역시 확인해보았지만 재요청을 보내지않는다.

즉, refetch 액션은 단순 re-render 상황에서는 트리거되지 않는다. 발생 조건이 따로 존재하는 듯 하다.

## 궁금증 2 : stale한 쿼리 refetch 액션의 트리거 조건은 무엇인가 !

궁금증 1을 탐구하면서 알게된 사실은 단순 re-render에는 stale time이 0으로 작성된 쿼리여도 refetch를 진행하지 않는다는 사실이다. 그럼 도대체 언제 refetch를 하는걸까?

아래 인용구는 [이곳에서 발췌](https://tanstack.com/query/v4/docs/guides/important-defaults)

> Stale queries are refetched automatically in the background when:
>
> 1. New instances of the query mount
> 2. The window is refocused
> 3. The network is reconnected
> 4. The query is optionally configured with a refetch interval.

위 상황에서 진짜로 refetch가 발생하는지 stale time이 0으로 설정된 쿼리(useFetchTodoList)를 통해 검증해보자

### 검증

4개의 상황에서 refetch가 발생하는지를 `TodoContainer + useFetchTodoList(stale time이 0인 쿼리를 호출하는 커스텀 훅)` 를 통해 검증한다.

### 결과

**1. New Instance of the query mount**

    TodoContainer의 상위 컴포넌트에서 TodoContainer 컴포넌트(useFetchTodoList를 호출하고 있는)를 마운트/언마운트 시키며 네트워크 요청이 발생하는 지를 보았다. 마운트가 새로이 될 때 마다 네트워크 요청이 새롭게 발생하고 있다. (refetch 수행)
    useQuery를 호출하는 주체(관찰자, 즉 컴포넌트)가 새롭게 마운트 될 때 재호출 된다는 것임.

**2. The window is refocused**

    브라우저의 포커스를 풀고 재 포커싱 해보았다. 네트워크 탭을 보니 네트워크 요청이 발생함.

**3. The network is reconnected**

    와이파이를 끊은 후 다시 연결하니 요청이 새로이 발생하고 있음.

**4. The query is optionally configured with a refetch interval.**

    refetchInterval을 3000으로 두어보니 3초에 한번씩 네트워크 요청이 새롭게 발생!

## 궁금증 3 : stale해진 쿼리의 refetch-rerender flow

문서에 의하면 Caching Flow는 다음과 같다.

쿼리가 마운트 -> 네트워크 요청하여 데이터 렌더링 -> 쿼리 인스턴스 새로이 마운트 -> 구식 쿼리 데이터 렌더링 -> 네트워크 요청 -> 쿼리 데이터 업데이트(캐시 업데이트) -> 새로운 쿼리 데이터 렌더링

즉 두번째 쿼리 마운트에는 refetch 과정에서 stale 한 데이터로 인한 렌더링, new 데이터로 인한 렌더링 두번이 발생한다.

이 말이 사실인지를 검증한다. 위 주장은 [이곳에서 발췌](https://tanstack.com/query/v4/docs/guides/caching?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/caching)

### 검증

`useFetchTodoList` 훅의 stale time을 3000, refetchInterval을 3000으로 설정하여, 3초마다 stale query의 refetch 액션이 트리거되도록 환경을 구성한 후 한 번의 refetch에 stale data rendering, new data rendering이 발생하는 지를 확인한다.

### 결과
