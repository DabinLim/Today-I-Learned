# Mutations

## Executing a mutation
useMutation 훅에 gql쿼리를 전달함으로써 실행시킨다.
<br/>
반환되는 튜플의 첫번째 값으로 mutation 함수를 반환하며 두번째로 result 객체를 반환한다.
<br/>

```js
function AddTodo() {
  let input;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  variables: {
    type: "placeholder",
    someOtherVariable: 1234,
  },
});

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```

튜플의 첫번째 인자인 mutateFunction을 호출해서 mutation을 실행시킨다.
<br/>
mutation의 파라미터로 구성옵션을 전달할 수 있다.

### Option precedence
useMutation에 이미 옵션이 전달된 경우 mutateFunction을 통해 옵션을 다시 전달하게 되면 mutateFunction에 전달된 새로운 옵션이 덮어쓰게 된다.<br/>
종류가 다른 옵션의 경우 shallow merge되어 함께 전달된다.

## Tracking mutation status

useMutation 훅은 현재 mutation의 상태를 나타내는 값들을 result객체에 포함해 반환한다.
<br/>
예를 들어 현재 로드중임을 나타내는 loading 또는 mutation function이 호출되었는지 여부를 나타내는 called 값

## Resetting mutation status
위의 상태를 initial state로 돌리기 위해 reset 함수를 result객체에 포함하여 반환한다.
<br/>
reset 함수는 mutation 실행으로 캐싱된 데이터를 제거하지는 않는다.<br/>
오직 호출여부와 같은 현재 상태만을 초기값으로 되돌린다.<br/>
ex) 에러가 난 경우 되돌리는 용도

## Updating local data

> 권장사항: mutation의 응답값으로 mutation의 결과 데이터를 전달해주면 따로 로컬 캐시를 갱신할 필요가 없으나 복장성이 증가할 수 있으므로 쿼리를 다시 호춣해 캐시를 업데이트 하는 것을 권장 (why?)


## Refetching queries
mutation 이후 특정 쿼리의 refetch 작업이 필요한 경우 refetchQueries 옵션을 전달할 수 있다.
배열의 첫번째 요소로 ATS 파싱된 DocumentNode를, 두번째 요소로 쿼리 이름을 전달한다.<br/>
변수는 가장 최근에 실행된 변수로 쿼리가 실행된다.

```js
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  refetchQueries: [
    GET_POST, // DocumentNode object parsed with gql
    'GetComments' // Query name
  ],
});
```

## Updating the cache directly

### Include modified objects in mutations responses

mutation의 응답 객체는 mutation이 수정한 객체가 포함되어야 한다<br/>
이를 통해 __typename과 id로 구성된 캐싱 데이터를 구분할 수 있다.<br/>
mutation의 결과값의 __typename과 id로 구성된 key값에 해당하는 캐시가 존재하는 경우 이를 업데이트 한다.

### The update function
mutation의 응답값이 캐시된 데이터를 모두 업데이트하기에 충분하지 않은 경우 update function을 통해 캐시를 수동으로 업데이트할 수 있다.

```js

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
    }
  }
`;

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `
            });
            return [...existingTodos, newTodoRef];
          }
        }
      });
    }
  });
```

update의 첫번째 인자인 cache는 ApolloClient의 캐시이다.<br/>
두번째 인자로 전달된 객체의 date 프로퍼티는 mutation의 결과값을 전달한다.<br/>
mutation이 실행된 후 todos를 addTodo mutation의 결과값과 함께 업데이트 하기위해 캐시에 존재하는 existingTodos를 가져와 writeFragment를 통해 새로운 값들과 기존의 값들을 함께 반환한다.<br/>
이 update함수는 mutation 결과값 캐싱이 끝난 후에 실행된다.

### Refetching after update

update 함수를 잘못 실행하는 경우를 대비해 영향을 받는 쿼리를 refetch해 함수의 수정사항을 다시 확인할 수 있다.<br/>
update function이 끝난 후 ApolloClient는 업데이트된 캐시 필드가 있는 각 쿼리에 대해 onQueryUpdated를 실행시킨다.<br/>
observableQuery.refetch()를 통해 refetch를 할 수 있으며 업데이트된 캐시 데이터와 refetch된 응답값이 다른 경우 자동으로 캐시가 업데이트 된다.

```js
addTodo({
  variables: { type: input.value },
  update(cache, result) {
  },
  onQueryUpdated(observableQuery) {
    // Define any custom logic for determining whether to refetch
    if (shouldRefetchQuery(observableQuery)) {
      return observableQuery.refetch();
    }
  },
})
```

refetchQueries와 관련 (좀 더 공부 필요)
<br/>
update function만으로 관련된 모든 쿼리를 업데이트 하기 어려운 경우 refetchQueries에 배열로 관련 쿼리를 전달할 수 있다.

## useMutation Options


### awaitRefetchQueries
true인 경우 mutation이 완료된 상태가 되기 전 refetchQueries에 포함된 모든 쿼리가 완료되었는지 확인한다.<br/>
기본값은 false

### ignoreResults
true인 경우 mutation의 응답값으로 캐시가 업데이트 되지 않는다.

### optimisticResponse
mutation이 완료되기 전까지 임시 캐시값을 지정한다.

