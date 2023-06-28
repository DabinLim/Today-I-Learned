# keyArgs

keyArgs를 넣어야 하는 이유

keyArgs 없음
- merge만 사용하는 경우
    - page마다 다른 캐시이므로 merge 안됨
- read도 같이 사용하는 경우
    - 이해가 안감 boards가 keyArgs가 false인것처럼 캐싱이 됨 (그냥 boards 딸랑 하나만 캐싱)
    - 따라서 페이지네이션은 잘되지만 boardType 간에 리스트 섞임


keyArgs false

- page가 달라도 같은 캐시이기 때문에 페이지네이션 잘됨
- 그러나 boardType이 달라도 같은 캐시이기 때문에 boardType 간에 리스트 섞임


keyArgs 에 boardType
- page는 달라도 같은 캐시 boardType에 따라 다른 캐시이므로 페이지네이션 정상 동작
- boardType이 다르면 다른 캐시이므로 리스트 섞이지 않음



https://www.apollographql.com/docs/react/pagination/key-args

keyArgs를 별도로 지정하더라도 pagination때는 merge function 필요

Important: After you define keyArgs for a paginated list field like Query.feed, you also need to define a merge function for the field. Otherwise, the list returned by the second query will overwrite the first list instead of merging with it.

Read, merge 같이 사용했을때 https://www.apollographql.com/docs/react/pagination/key-args#using-no-arguments

relayStylePagination

optimistic
실제 캐시 업데이트 하지 않고 ui만 업데이트 했다가
실제 서버 응답을 보고 캐시 업데이트

1. optimistic data 반영
2. ui 업데이트
3. 실제 서버 응답
4. optimistic 데이터 삭제
5. 실제 캐시 업데이트

create 시에는?
id가 없으니까 임시 id값 제공

ssr
- ssrMode: 클라이언트 재요청 방지, getDataFromTree 사용 가능
- getDataFromTree: 전체 트리 탐색, 필요한 필수 쿼리 전부 실행, Promise 반환
- renderToStringWithData: React 트리를 문자열로 직접 렌더링


서버에서 쿼리 요청 후 클라이언트 측 init시에 cache restore
```js
const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  uri: 'https://example.com/graphql'
});
```

ssr fetch delay로 초기화시 쿼리 방지
ssrForceFetchDelay