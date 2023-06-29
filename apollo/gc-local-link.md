### 다음 중 틀린 설명은?
4번

1. cache.gc 메소드는 Root 객체로부터 자식의 참조값을 재귀적으로 찾아가며 사용되지 않는 캐시를 제거한다.
   1. To determine whether an object is reachable, the cache starts from all known root objects (usually Query and/or Mutation) and uses a tracing strategy to recursively visit all available child references. Any normalized objects that are not visited during this process are removed. The cache.gc() method returns a list of the IDs of the removed objects.
2. retain 메소드를 사용해 사용되지 않는 캐시의 제거를 방지할 수 있다.
   1. You can use the retain method to prevent an object (and its children) from being garbage collected, even if the object isn't reachable:
3. evict 메소드를 사용하여 특정 캐시를 제거할 수 있다.
   1. You can remove any normalized object from the cache using the evict method:
4. evict 메소드를 사용하여 캐시의 단일 필드는 제거할 수 없다. (거짓)
   1. You can also remove a single field from a cached object by providing the name of the field to remove:



### evict 메소드로 인해 캐시가 삭제된 경우 해당 캐시 id를 참조하고 있는 모든 필드는 제거된다.
거짓

1. When an object is evicted from the cache, references to that object might remain in other cached objects. Apollo Client preserves these dangling references by default, because the referenced object might be written back to the cache at a later time. This means the reference might still be useful.

### localState에 대한 설명 중 틀린 것은?
4번
1. 동일 쿼리에 로컬 state와 서버 state를 섞어서 사용할 수 있다.
   1. You can even include both local and remotely fetched fields in the same query:
2. local-only 필드를 정의함으로서 서버 스키마에 없는 로컬 필드를 정의할 수 있다.
   1. By defining field policies for these local-only fields, you can populate them with data that's stored anywhere, such as in localStorage or reactive variables.
3. Reactive 변수 값이 변경될때마다 해당 변수가 따라 달라지는 필드가 있는 모든 쿼리는 자동으로 업데이트된다.
   1. Whenever the value of a reactive variable changes, Apollo Client automatically detects that change. Every active query with a field that depends on the changed variable automatically updates.
4. Reactive 변수는 정규화되어 Apollo 캐시에 저장된다.
   1. Reactive variables aren't stored in the Apollo Client cache, so they don't need to conform to the strict structure of a cached type. You can store anything you want in them.



### local-only 필드를 정의하기 위한 @client 지시문은 중첩된 구조의 필드에는 사용할 수 없다.
거짓

Note: If you apply the @client directive to a field with subfields, the directive is automatically applied to all subfields.


### Reactive 변수에 대한 설명으로 틀린 것은?
2번

1. Reactive 변수는 데이터가 정규화되어 캐시 되지 않는다.
   1. Unlike the Apollo Client cache, reactive variables don't enforce data normalization, which means you can store data in any format you want.
2. Reactive 변수를 읽고 수정하기 위해서는 read 함수를 활용하여야 한다.
   1. 거짓 
   2. You can read and modify reactive variables from anywhere in your application, without needing to use a GraphQL operation to do so.
3. Reactive 변수가 변경되면 Reactive 변수를 포함하는 모든 쿼리는 새로 업데이트된다.
   1. If a field's value depends on the value of a reactive variable, and that variable's value changes, every active query that includes the field automatically refreshes.

4. Reactive 변수는 makeVar 메소드를 통해 생성할 수 있다.
   1. Let's use the makeVar function to initialize a reactive variable that stores our local list of cart items:


### Apollo Client의 persistCache 메소드를 사용하여 브라우저가 새로고침 되어도 Reactive 변수를 유지할 수 있다.
거짓 

There is currently no built-in API for persisting reactive variables, but you can write variable values to localStorage (or another store) whenever they're modified, and initialize those variables with their stored value (if any) on app load.

### 다음 로컬 캐시 수정 방법에 대한 설명중 틀린 것은?
4번

1. Reactive 변수를 수정하기 위해서는 makeVar를 통해 생성된 함수를 호출한다.
   1. If you're using a reactive variable, all you do is set the reactive variable's new value. Apollo Client automatically detects this change and triggers a refresh of every active operation that includes an affected field.
2. 캐시를 직접 사용하는 경우 캐시를 수정하기 위해서는 writeQuery, writeFragment 또는 cache.modify를 사용하여야 한다.
   1. If you're using the cache directly, call one of writeQuery, writeFragment, or cache.modify (all documented here) to modify cached fields. Like reactive variables, all of these methods trigger a refresh of every affected active operation.
3. localStorage를 사용하는 경우 localStorage의 필드를 수정 후 영향 받는 쿼리 리프레시를 위해 cache.evict를 사용한다.
   1. If you're using another storage method, such as localStorage, set the field's new value in whatever method you're using. Then, you can force a refresh of every affected operation by calling cache.evict. In your call, provide both the id of your field's containing object and the name of the local-only field.
4. Reactive 변수를 수정한 이후에는 영향을 받는 쿼리를 리프레시하기 위해 cache.evict 메소드를 사용해야 한다.
   1. 1번 설명에 틀린 이유 포함


### Apollo Link에 대한 설명으로 틀린 것은?
4번

1. Link를 통해 인증 요청에 HTTP 헤더를 추가할 수 있다.
   1. The second link might add an HTTP header to the outgoing operation request for authentication purposes.
2. Link를 통해 서버의 응답 값이 전달되어 캐시되기 전 응답을 수정하거나 다른 작업을 수행할 수 있다.
   1. The server's response is passed back up each link in reverse order, enabling links to modify the response or take other actions before the data is cached.
3. Link를 통해 쿼리의 요청,응답 시간을 측정할 수 있다.
```js
import { ApolloLink } from '@apollo/client';

const roundTripLink = new ApolloLink((operation, forward) => {
  // Called before operation is sent to server
  operation.setContext({ start: new Date() });

  return forward(operation).map((data) => {
    // Called after server responds
    const time = new Date() - operation.getContext().start;
    console.log(`Operation ${operation.operationName} took ${time} to complete`);
    return data;
  });
});
```
4. ApolloLink.from 메소드를 통해 두개 이상의 링크를 병렬 실행 가능하다.
   1. 거짓
   2. If you have a collection of two or more links that should always be executed in serial order, use the ApolloLink.from helper method to combine those links into a single link, like so:


### RetryLink 사용시 split 메소드를 사용하여 작업 유형에 따라 다른 재요청 전략을 설정할 수 있다.

참

In the following example, a RetryLink passes execution along to one of two different HttpLinks depending on the associated context's version:

```js
import { ApolloLink, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

const directionalLink = new RetryLink().split(
  (operation) => operation.getContext().version === 1,
  new HttpLink({ uri: 'http://localhost:4000/v1/graphql' }),
  new HttpLink({ uri: 'http://localhost:4000/v2/graphql' })
);
```

query와 mutation에서 별도의 Retry 전략을 설정하는 예시
```js
const queryRetryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, operation) => operation.operationName.includes('Query')
  }
});

const mutationRetryLink = new RetryLink({
  delay: {
    initial: 500,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 3,
    retryIf: (error, operation) => operation.operationName.includes('Mutation')
  }
});

const link = RetryLink.split(
  operation => operation.operationName.includes('Query'),
  queryRetryLink,
  mutationRetryLink
).concat(new HttpLink({ uri: "http://localhost:4000/graphql" }));

```