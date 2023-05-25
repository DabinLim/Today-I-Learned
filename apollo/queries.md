# Queries

## Executing a query (쿼리의 실행)

useQuery는 Apollo application에서 쿼리를 실행시키는 주요한 API이다.
<br/>
아래와 같이 useQuey에 graphql 쿼리를 전달해 쿼리를 실행시키며 컴포넌트가 렌더 될때 useQuery는 loading, error, data 프로퍼티가 포함된 객체를 반환한다.
<br/>
이 쿼리 결과 상태에 따라 UI 렌더가 가능하다.

```js
import { gql, useQuery } from "@apollo/client";

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}
```

## Caching query results

Apollo Client가 서버에서 쿼리의 결과를 받아오면 로컬에 자동적으로 캐싱한다.
<br/>
이후 같은 쿼리를 요청하면 빠르게 실행시킨다.
<br/>

variables 옵션을 통해 Graphql 쿼리에 값을 전달할 수 있다.
<br/>
아래 코드와 같이 dropdown에서 선택된 breed 값을 쿼리에 전달할 수 있다.
<br/>
이때 같은 breed값이 전달된 쿼리의 경우 첫번째 이후의 요청은 캐싱된 결과를 반환하게 된다.

```js
const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
  );
}
```

## Updating cached query results

polling과 refetching을 통해 로컬에 저장된 캐시를 서버 데이터로 업데이트 할 수 있다.

### Polling

Polling은 특정 간격을 기준으로 주기적으로 서버의 데이터를 동기화 시킨다.<br/>
useQuery훅의 구성옵션으로 pollInterval을 ms 단위로 전달하면 polling을 사용할 수 있다.

```js
const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
  variables: { breed },
  pollInterval: 500,
});
```

> useQuery에서 반환된 startPolling과 stopPolling 함수를 통해 polling을 사용할 수 있으며 startPolling의 파라미터로 pollInterval을 전달할 수 있다.

### Refetching

Refetching은 유저 액션과 같은 특정 상황에 캐싱된 쿼리를 서버 데이터로 refresh 할 수 있다.
<br/>
useQuery훅에서 반환된 refetch 함수를 통해 사용 가능하다.

```js
const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
  variables: { breed },
});
```

refetch 할때 새로운 variables 값을 refetch의 파라미터로 전달할 수 있다.
<br/>
기존에 전달되었지만 refetch시 새롭게 전달되지 않은 값들은 기존의 값들을 사용한다.

```js
<button
  onClick={() =>
    refetch({
      breed: "dalmatian", // Always refetches a dalmatian instead of original breed
    })
  }
>
  Refetch!
</button>
```

## Inspecting loading states

기본적으로 첫 렌더가 아닌 refetching이나 polling시에는 loading state가 true로 바뀌지 않는다.<br/>

notifyOnNetworkStatusChange를 통해 네트워크 상태가 바뀜에 따라 loading state가 바뀌도록 설정할 수 있다.<br/>
즉, notifyOnNetworkStatusChange를 true로 설정하면 refetch시에도 loading state가 변한다.<br/>
refetch 뿐만 아니라 networkStatus에는 여러가지 상태가 열거형으로 존재하는데 refetch는 그중 NetworkStatus.refetch에 해당한다.<br/>
[NetworkStatus enum](https://github.com/apollographql/apollo-client/blob/main/src/core/networkStatus.ts)

## Inspecting error states

errorPolicy 구성 옵션을 통해 에러핸들링을 커스터마이징 할 수 있다.<br/>
기본값은 none이며 이는 모든 graphql 에러를 런타임에서 처리하도록 한다.<br/>
또한 에러 발생시 서버에서 반환된 모든 응답 데이터를 버리고 useQuery 결과에서 error가 반환된다.
<br/>
errorPolicy를 all로 설정하면 응답 데이터를 버리지 않으므로 부분적인 결과를 렌더링 할 수 있다.

## Manual execution with useLazyQuery

유저 액션과 같이 특정 이벤트에 따라 쿼리를 실행하기 위해 사용된다.
<br/>
useLazyQuery를 사용하면 쿼리를 즉시 실행하지 않고 query function을 반환하여 query function를 통해 쿼리를 실행할 수 있다.<br/>
query function의 파라미터로 useQuery의 구성옵션과 같은 옵션을 전달할 수 있다.

```js
const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

<button onClick={() => getDog({ variables: { breed: "bulldog" } })}>
  Click me!
</button>;
```

## Setting a fetch policy

## cache-first
fetch policy의 기본값이다.<br/>
useQuery훅은 사용 가능한 데이터가 캐싱되어 있는지 먼저 확인한다.<br/>
사용 가능한 캐시데이터가 있으면 서버에 쿼리를 요청하지 않고 캐싱된 데이터를 반환한다.

## network-only
cache-first와 반대로 캐싱된 데이터를 확인하지 않는다.

## cache-only
캐시만을 사용한다. 캐싱된 데이터가 없으면 에러가 발생한다.

## cache-and-network
우선적으로 캐싱된 데이터를 반환한 뒤 동시에 백그라운드에서 서버 데이터를 요청하여 최신 데이터로 업데이트한다.

## no-cache
network-only와 비슷하다.<br/>
query 결과를 캐싱하지 않는다.

## standby
cache-first와 비슷하나 전달된 변수값이 변해도 자동으로 업데이트되지 않고 refetch나 updateQueries를 통해 수동으로 업데이트 할 수 있다.

## nextFetchPolicy
첫 실행 이후의 fetchPolicy를 결정한다.<br/>
첫 실행은 fetchPolicy로 전달된 옵션이 사용된다.<br/>
Apollo Client를 initialize할때 기본 옵션으로 지정도 가능하다.<br/><br/>
nextFetchPolicy를 함수로 전달하여 currentFetchPolicy 인자를 통해 첫 fetchPolicy에 따라 다른 fetchPolicy를 적용할 수 있다.

```js
new ApolloClient({
  link,
  client,
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(currentFetchPolicy) {
        if (
          currentFetchPolicy === 'network-only' ||
          currentFetchPolicy === 'cache-and-network'
        ) {
          // Demote the network policies (except "no-cache") to "cache-first"
          // after the first request.
          return 'cache-first';
        }
        // Leave all other fetch policies unchanged.
        return currentFetchPolicy;
      },
    },
  },
});

// nextFetchPolicy함수의 두번째 인자로 
{
  // 첫 fetch 이후의 nextFetch를 하는 경우인지 variables가 바뀌어 nextFetch를 하는 경우인지 구분
  reason,
  // useQuery의 구성 옵션
  // options.fetchPolicy로 현재 fetchPolicy 접근 가능
  options,
  // 처음 전달된 fetchPolicy
  initialPolicy,
  // client.watchQuery 호출과 관련된 ObservableQuery
  observable,
}
```


## useQuery Options

<b>Query</b>

### query
gql 템플릿 리터럴을 통해 AST로 구문 분석된 graphql 쿼리 문자열

> AST - Abstract Syntax Tree
> 추상 구문 트리는 쿼리의 구조를 계층적으로 표현하며, 쿼리의 구성 요소 간의 관계와 순서를 나타낸다.
> 쿼리 파싱 단계에서 쿼리 문자열을 추상 구문 트리로 변환하여 쿼리를 분석하고 처리하는 데 사용된다.

### onCompleted
쿼리가 에러 없이 성공적으로 완료되거나 errorPolicy가 무시되고 일부 데이터가 반환된 경우 실행되며 쿼리 결과 데이터가 전달됨

### onError
쿼리 결과에 하나 또는 다수의 에러가 포함된 경우 실행됨 (errorPolicy가 무시된 경우 제외)<br/>
쿼리 에러 결과가 전달됨

### skip
true인 경우에 쿼리가 실행되지 않으며 useLazyQuery에는 사용 불가능 하다.

<b>Network</b>

### context
// 링크가 무엇인가요? ㅋㅋㅋㅋ<br/>
Apollo Link를 사용하는 경우 링크 체인을 따라 전달되는 컨텍스트 개체의 초기 값

### ssr
false를 전달하면 서버사이드 렌더링 동안에 실행을 하지 않는다.

### client
쿼리를 실행시킨 주체 (ApolloClient의 인스턴스)

<b>Cache</b>

### returnPartialData
true로 설정하면 캐싱된 데이터에 모든 결과 데이터가 포함되지 않아도 부분 결과를 반환한다. 기본값을 false이다.

## Result

useQuery에서 반환되는 결과

### data
graphql query의 결과값<br/>
errorPolicy에 따라 다르지만 기본적으로 쿼리 결과에 에러가 포함되면 undefined가 된다.

### previousData
방금 실행된 쿼리로 인해 반환된 data의 이전 data<br/>
만약 이번이 첫 실행의 결과라면 undefined가 반환된다.

### error
쿼리가 하나 이상의 에러를 포함하는 경우 이 graphQlErrors배열 또는 단일 networkError를 포함한다.<br/>
이외의 경우에는 undefined를 반환한다.

### called
useLazyQuery에서 해당 쿼리가 실행되었는지 여부를 나타낸다.

### fetchMore
페이지네이션 된 쿼리에서 다음 데이터를 불러온다.

### subscribeToMore
쿼리에 포함된 특정 필드를 구독하기 위한 함수이며 구독을 해제하기 위한 함수를 반환한다.

### updateQuery
graphql 쿼리를 호출하지 않고 쿼리의 캐시를 업데이트하는 함수