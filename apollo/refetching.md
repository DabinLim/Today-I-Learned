# Refetching

로컬에서 캐시를 업데이트하는 방법도 있지만 서버에서 refetching 해오는게 간단한 경우도 있다.<br/>

클라이언트 측 업데이트 후 모든 쿼리를 다시 요청할 수도 있지만 선택적으로 가져오기 위해 InMemoryCache가 도움이 될 수 있다.<br/>

로컬 캐시와 refetch를 조합하여 로컬 캐시를 보여준 후 refetch의 결과값과 다른 부분만 반영하여 보여줄 수 있다.<br/>

refetch는 특히 mutation 후에 일반적이므로 mutate함수는 refetchQueries와 onQueryUpdated와 같은 옵션을 지정해서 다시 가져와야 하는 쿼리와 방법을 지정한다.<br/>

## client.refetchQueries
mutation 외부에서 쿼리를 선택적으로 다시 가져오려는 경우

### interface

```js
interface RefetchQueriesOptions<
  TCache extends ApolloCache<any>,
  TResult = Promise<ApolloQueryResult<any>>,
> {
  updateCache?: (cache: TCache) => void;
  include?: Array<string | DocumentNode> | "all" | "active";
  onQueryUpdated?: (
    observableQuery: ObservableQuery<any>,
    diff: Cache.DiffResult<any>,
    lastDiff: Cache.DiffResult<any> | undefined,
  ) => boolean | TResult;
  optimistic?: boolean;
}
```

### options

- updateCache: 쿼리 refetch를 트리거하는 기능
- include: refetch할 쿼리를 지정하는 배열, 쿼리의 이름이나 DocumentNode 객체
- onQueryUpdated: updateCache의 영향을 받아 include에 포함된 각 쿼리들에 대해 한번씩 호출되는 콜백함수, 해당 콜백이 제공되지 않으면 include에 포함된 모든 쿼리는 refetch 된다.
- optimistic: true이면 options.updateCache는 무효화된 캐시를 제거할 수 있다. 기본값은 false로 캐시를 지속적으로 업데이트한다.


### results

- queries: refetch된 observableQuery의 리스트
- results: refetch된 쿼리의 결과 객체들

## Refetch recipes

### Refetching a specific query
하나의 쿼리만 refetch

```js
await client.refetchQueries({
  include: ["SomeQueryName"],
});

await client.refetchQueries({
  include: [SOME_QUERY],
});
```

## Refetching all queries
모든 쿼리를 refetch

```js
await client.refetchQueries({
  include: "active", // 또는 "all"
});
```

## Refetching queries affected by cache updates

```js
await client.refetchQueries({
  updateCache(cache) {
    cache.evict({ fieldName: "someRootField" });
  },
});
```

포함된 모든 쿼리를 미리 알 필요 없이 Query.someRootField에 의존하는 모든 쿼리를 다시 가져온다.<br/>
캐시 작업은 updateCache 함수 내에서 실행된다.
<br/>

// optimistic 추가 공부 필요

```js
await client.refetchQueries({
  updateCache(cache) {
    cache.evict({ fieldName: "someRootField" });
  },

  // Evict Query.someRootField only temporarily, in an optimistic layer.
  optimistic: true,
});
```

```js
await client.refetchQueries({
  updateCache(cache) {
    cache.modify({
      fields: {
        someRootField(value, { INVALIDATE }) {
          return INVALIDATE;
        },
      },
    });
  },
});
```
특정 필드의 캐시를 무효화 시킴으로 재요청을 할 수 있다.<br/>

## Refetching selectively

특정 query의 refetch를 건너뛰기 위해 false를 반환하여 건너뛸 수 있다.
<br/>
또한 observableQuery가 충분한 정보를 제공하지 못하는 경우 onQueryUpdated의 두번째 인자인 Cache.DiffResult를 통해 마지막 쿼리의 정보, complete, missing필드를 받아볼 수 있다.

```js
await client.refetchQueries({
  updateCache(cache) {
    cache.evict({ fieldName: "someRootField" });
  },

  onQueryUpdated(observableQuery, { complete, result, missing }) {
    // 커스텀 로직
    if (shouldIgnoreQuery(observableQuery)) {
      return false;
    }

    return true;
  },
});
```


## Handling refetch errors

client.refetchQueries의 results값과 Promise.all을 사용해 refetch된 results 값중의 에러를 검출해 핸들링 할 수 있다.
```js
const { queries, results } = client.refetchQueries();

const finalResults = await Promise.all(
  results.map((result, i) => {
    return Promise.resolve(result).catch(error => {
      console.error(`Error refetching query ${queries[i].queryName}: ${error}`);
      return null;
    });
  })
});
```