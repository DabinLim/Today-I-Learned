# any와 unknown의 차이

## any
any는 어떤 것이든, 누구든 이라는 뜻을 가진다.<br>
마찬가지로 타입스크립트에서 any는 어떤 타입이든 허용한다는 의미다.<br>
any타입으로 허용하는 경우 타입을 예상할 수 없어 위험하다.<br>
```ts
let value: number = 10;
console.log(value.length);
// 컴파일 타임에 에러가 발생
// Property 'length' does not exist on type 'number'

let value: any;
console.log(value.length);
// 컴파일 에러가 나지 않음
// Cannot read properties of undefined (reading 'length')
```

위의 코드와 같이 number라는 명확한 타입을 지정하면 length 프로퍼티에 접근하려고 할때 컴파일 단계에서 에러를 통해 잘못된 접근이라는 것을 알려준다.<br>
그러나 any타입의 경우 아무 타입이나 허용하기 때문에 length 프로퍼티가 존재할수도 없을수도 있으므로 컴파일 단계에서 에러를 노출시키지 않는다<br>
따라서 런타임 단계에서 undefined의 프로퍼티에 접근하려고 시도하여 에러가 발생할 수 있다.

## unknown

unknown은 타입스크립트 3.0에서 도입되었다.<br>
any와 마찬가지로 모든 타입을 허용하지만 할당된 값이 어떤 타입인지 모르기 때문에 함부로 프로퍼티 접근이나 연산을 할 수 없다.<br>

```ts
let value: unknown;
console.log(value.length);
// 컴파일 단계에서 에러
// Object is of type 'unknown'
```

위 코드와 같이 any처럼 모든 타입을 허용하지만 length 프로퍼티에 접근하려고 하면 unknown 타입이기 때문에 에러를 통해 경고한다.<br>

```ts
let value: unknown;
if (Array.isArray(value)) {
    console.log(value.length);
}
```
어떠한 타입인지 모르기 때문에 타입체킹을 해준 다음에 원하는 프로퍼티에 접근할 수 있어 안전하게 개발할 수 있다.