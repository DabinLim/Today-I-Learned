# Symbol
Symbol은 변경 불가능한 원시 타입의 값이다.<br>
주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용한다.

## Symbol의 생성

### Symbol()
Symbol() 함수로 생성한다.<br>
이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값이다.<br>
Symbol() 함수는 String, Number, Boolean과 같이 래퍼 객체를 생성하는 생성자 함수와 달리 new 연산자를 사용하지 않는다.<br>

```js
const value = 'sameValue'
let mySymbol = Symbol(value);
 
let mySymbol2 = Symbol(value);
 
console.log(mySymbol);        
console.log(typeof mySymbol); // symbol
```
심볼은 유일성이 보장되는 자료형이기 때문에 동일한 심볼을 여러개 만들어도 각 심볼값은 다르다<br>
심볼 함수의 인자값으로 넘기는 문자열은 주석과 같은 개념이며 이름표 역할을 한다.

### Symbol.for()
전역에 존재하는 global symbol table 목록을 참조하여 해당 심볼을 반환한다<br>
Symbol()을 <strong>유일한</strong>심볼을 반환하고 Symbol.for()은 전역 테이블에 심볼을 생성한다.
해당 심볼이 없다면 새로운 심볼을 생성한다.
```js
const s1 = Symbol.for('foo');
 
const s2 = Symbol.for('foo');
 
console.log(s1 === s2); 
```

### Symbol.keyFor()
Symbol.keyFor은 전역 Symbol의 해당하는 이름(토큰 값)을 반환한다.
```js
var token = Symbol.for("tokenString");
console.log(Symbol.keyFor(token) === "tokenString"); // true
```

### Symbol.description
일반 심볼의 이름을 반환한다.
```js
const shareSymbol = Symbol.for('myKey');
console.log(Symbol.keyFor(shareSymbol)); // myKey
 
const unsharedSymbol = Symbol('myKey');
console.log(Symbol.keyFor(unsharedSymbol)); // undefined
console.log(unsharedSymbol.description); // myKey
```

> Symbol 함수는 매번 다른 Symbol 값을 생성하는 것이 반해<br>
> Symbol.for() 함수는 하나의 Symbol을 생성하여 키를 통해 공유한다.<br>
> 때문에 Symbol.for() 메소드를 통해 생성된 Symbol 값은 반드시 키를 갖으며 Symbol() 함수를 통해 생성된 Symbol값은 키가 없다.

## 사용


### 객체의 프로퍼티
Symbol 값은 유일한 값이므로 Symbol 값을 키로 갖는 프로퍼티는 다른 어떤 프로퍼티와도 충돌하지 않는다.

```js
const obj = {};
 
const mySymbol = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');
 
obj[mySymbol] = 123;
obj[mySymbol2] = 456;
 
console.log(obj); // { [Symbol(mySymbol)] : 123, Symbol(mySymbol)] : 456}
console.log(obj[mySymbol]); // 123
```

### Symbol.iterator
Symbol.iterator를 프로퍼티 key로 사용한 메소드를 가지고 있으면 자바스크립트 엔진은 이 객체가 이터레이션 프로토콜을 따르는 것으로 간주한다.

> 객체의 key가 Symbol이면 for...in 반복문에서는 배제된다.<br>
> Object.keys를 사용해도 배제된다.<br>
> 숨김 처리를 하는 자료형이기 때문이다.