# Caching in Apollo Client

Apollo 4주차

## Field policy

특정 필드 읽고 쓰는 방법 지정<br/>
TypePolicies 내에 정의

Read function

- 캐시된 필드 읽을때 작업 지정
- 클라이언트가 필드 쿼리할때마다 호출
- 함수 반환값으로 필드 대체
- 첫번째 파라미터는 필드
- 두번째 파라미터는 여러 속성 및 도우미 함수에 대한 액세스 제공
  - cache
  - args
  - fieldName
  - field
  - variables
  - isReference
  - toReference
  - readField
  - canRead
  - margeObjects
- default value 지정 가능
- 스키마에 지정되지 않은 필드도 리턴 가능하다
- @client 지시문을 통해 로컬에서만 정의된 필드 쿼리
- 사용 예시
  - 필드의 소수점 값 반올림
  - 로컬 전용 필드 파생 (birthDate 필드를 통한 연령 필드)
  - 여러 개체에 걸쳐 로컬 전용 필드 파생

Merge function

- 캐시된 필드가 기록될때 작업 지정
- 서버에서 받아온 쿼리값 대신 함수 반환값으로 캐시 기록
- mergeObjects helper function을 통해 spread문법과 같이 머지 가능
- array의 경우 정교한 머징이 필요
  - readfield 사용 권장
- 3.3 이상에서는 type level에서 merge:true 사용가능 (fields와 동일 레벨)
  - 같은 이름의 다른 필드에 영향을 끼칠 수 있다
- 사용 예시
  - array merge
    - 기존 캐시가 없는 경우를 위해 default [] 지정 팔요
    - existing data는 읽기 전용이므로 push 가 안됨
  - pagination

```js

{
  "__typename": "Book",
  "id": "abc123",
  "author": {
    "__typename": "Author",
    "name": "George Eliot"
  }
}

{
  "__typename": "Book",
  "id": "abc123",
  "author": {
    "__typename": "Author",
    "dateOfBirth": "1819-11-22"
  }
}

const cache = new InMemoryCache({
  typePolicies: {
    Book: {
      fields: {
        author: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
          // merge: true,
        },
      },
    },
  },
});
```

> merge function을 통해 overwrite하지 않고 두 필드 캐시
> merge:true를 사용하기 위한 조건
> 같은 \_\_typename을 가지고 있어야 함
> 같은 정규화 되어 있어야 함

KeyArgs

- 캐시 중복 데이터 저장 방지
- 인자를 받는 필드에 사용 가능
- By default, all of a field's arguments are key arguments.
- 필드의 키 인수를 지정하면 캐시는 해당 필드의 나머지 인수가 키 인수가 아님을 이해합니다.
- 이는 키가 아닌 인수가 변경될 때 캐시가 완전히 별도의 값을 저장할 필요가 없음을 의미합니다.
- keyArgs function 제공 가능
-

## Advanced Topic

- 캐시 우회

  - no cache

- persisting cache
  - async storage, local storage와 같은 저장소에서 inmemory cache유지 및 사용 가능
  - apollo3-cache-persist 라이브러리 사용
  - 비동기적으로 저장소에 저장
  - 짧은 간격으로 캐시에 쓸때마다 유지

```js
persistCache({
  cache,
  storage: AsyncStorage,
}).then(() => {
  // Continue setting up Apollo Client as usual.
});
```

- cache.resetStore
  - 로그아웃시 캐시 리셋
  - clearStore을 사용해야 refetch를 안한다