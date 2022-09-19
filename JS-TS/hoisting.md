# 호이스팅

## 호이스팅
호이스팅이란 변수를 선언하고 초기화했을떄 선언 부분이 최상단으로 끌어올려지는 현상을 의미한다. <br /> <br />
가장 베스트는 호이스팅을 쓰지 않는 것이 좋은 코드이다. <br /> (es-lint 적용을 통해 방지) <br />
분석을 어렵게 만드는 예외를 만들지 않도록 주의하는 것이 좋다.

## 호이스팅 작동방식

### 변수

variable(var)는 선언부만 올라간다.
```js
console.log(variable);
// 에러가 나지 않고 undefined
var variable = 'variable';
```

아래와 같은 형태

```js
var;
variable = 'variable';
```
중복해서 선언이 가능하다.

const와 let은 호이스팅이 되지 않음
엄연히 말하면 호이스팅이 되지만 선언부 위는 TDZ가 된어 선언 전에 호출하지 못한다.

### 함수 선언식
함수 선언식의 경우 식 자체가 통쨰로 끌어올려져 선언 전에 호출해도 정상적으로 동작한다.

```js
declaration(); // 함수 선언
function declaration() {
  console.log('함수 선언');
}
```

### 함수 표현식 (arrow function)
```js
declaration(); // 에러가 나지 않는다.
expression(); // 대입되기 전에 호출되어서 에러가 발생 (현재 undefined 상태임)
var expression = function() {
  console.log('함수 표현');
}
function declaration() { 
  console.log('함수 선언');
}
```