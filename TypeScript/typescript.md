# 타입스크립트란?

자바스크립트의 superset 언어이다.<br>
자바스크립트의 동적인 타입을 정적으로 사용할 수 있어 런타임 환경에서의 에러를 줄일 수 있다.<br>
class, interface, generics, types을 사용할 수 있어 좀 더 강력한 **객체지향 프로그래밍**을 가능하게 한다.

## Why TypeScript?

자바스크립트의 경우 동작할때 타입이 결정되는 언어이지만 타입스크립트로 코딩할때 타입을 지정할 수 있다. (Statically typed) -> 컴파일할때 타입이 결정된다.

## 타입스크립트 시작하기

```
$ npm install -g typescript
```

```
$ npm install -g tsc
```

>tsc 명령어를 이용해 ts파일을 js스크립트로 변환한다.<br>

```
$ npm install -g ts-node
```
> ts-node를 통해 js파일로 변환하지 않고 ts파일을 실행시킬 수 있다 (알아서 js파일로 변환 후 실행함)

```
$ tsc main.ts -w
```
> watch 명령어를 통해 일일히 변환시켜주지 않아도 ts파일이 변경되면 js파일도 따라 업데이트 된다.
