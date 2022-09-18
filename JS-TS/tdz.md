# TDZ (temporal dead zone)

TDZ 시맨틱은 선언 전에 변수에 접근하는 것을 금지한다.

## TDZ의 영향을 받는 구문

### const, let
const와 let은 선언 전 줄까지 TDZ의 영향을 받는다.
```js
console.log(a) // throws `ReferenceError`
console.log(b) // throws `ReferenceError`
let a = 'a';
const b = 'b';
```

### class
클래스 또한 TDZ의 영향을 받아 선언 전에 인스턴스를 생성할 수 없다.
```js

const myCar = new Car('red'); // throws `ReferenceError`

class Car {
  constructor(color) {
    this.color = color;
  }
}
```

### constructor() 내부의 super()
부모 클래스를 상속 받았다면 생성자 안에서 super()를 호출하기 전까지 this 바인딩은 TDZ의 영향을 받는다.

```js
class MuscleCar extends Car {
  constructor(color, power) {
    this.power = power;
    super(color);
  }
}

// Does not work!
const myCar = new MuscleCar(‘blue’, ‘300HP’); // `ReferenceError`
```

```js
class MuscleCar extends Car {
  constructor(color, power) {
    super(color);
    this.power = power;
  }
}

// Works!
const myCar = new MuscleCar('blue', '300HP');
myCar.power; // => '300HP'
```

## 함수의 default 매개변수

함수의 default 매개변수 또한 TDZ의 영향을 받는다.
```js
const a = 2;
function square(a = a) {
  return a * a;
}
// Does not work!
square(); // throws `ReferenceError`
```

위 코드에서 square 함수는 호이스팅에 의해 위로 끌어올려졌기 때문에 a = a의 우항 a는 아직 선언되기 전에 사용된 셈이므로 ReferenceError를 발생시킨다.
<br/>
아래와 같이 사용

```js
const init = 2;
function square(a = init) {
  return a * a;
}
// Works!
square(); // => 4
```

## TDZ의 영향을 받지 않는 구문

### var
variable(var)는 선언부만 올라간다.
```js
console.log(variable);
// 에러가 나지 않고 undefined
var variable = 'variable';
```

아래와 같은 형태라고 볼 수 있다.

```js
var;
variable = 'variable';
```

### 함수 선언식
함수 선언식은 식 자체가 통째로 끌어올려진다.
```js
// Works!
greet('World'); // => 'Hello, World!'
function greet(who) {
  return `Hello, ${who}!`;
}

// Works!
greet('Earth'); // => 'Hello, Earth!'
```

### import 구문
import 모듈 또한 끌어올려진다. (import 구문을 파일 시작부분에 작성하는 이유)
```js
// Works!
myFunction();
import { myFunction } from './myModule';
```

## TDZ에서의 typeof
선언되지 않은 변수의 typeof 는 undefined이다.

```js
typeof notDefined; // => 'undefined'
```

그러나 TDZ에서 TDZ 아래에 선언된 변수에 typeof 연산자를 사용하면 에러가 발생한다.
```js
typeof variable; // throws `ReferenceError`
let variable;
```

## 스코프 내의 TDZ
TDZ는 선언문이 존재하는 스코프 범위 안에서만 변수에 영향을 준다.

```js
function doSomething(someVal) {
  // Function scope
  typeof variable; // => undefined
  if (someVal) {
    // Inner block scope
    typeof variable; // throws `ReferenceError`
    let variable;
  }
}
doSomething(true);
```

위 예시에서 if 블록 바깥에서의 typeof 연산자는 variable이 같은 스코프 내에 없기 때문에 undefined를 반환하지만<br/>
if 블록 내부에서의 typeof 연산자는 해당 변수가 같은 스코프 내에 존재하기 때문에 레퍼런스 에러를 발생시킨다.


## 참조
[TDZ을 모른 채 자바스크립트 변수를 사용하지 말라 - Toast UI](https://ui.toast.com/weekly-pick/ko_20191014)