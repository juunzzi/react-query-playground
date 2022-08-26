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
