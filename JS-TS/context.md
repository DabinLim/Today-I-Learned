# 자바스크립트의 실행 컨텍스트와 클로저

## 컨텍스트의 원칙
- 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생긴다.
- 컨텍스트 생성 시 컨텍스트 안에 변수 객체(arguments, variable), scope chian, this가 생성된다.
- 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.
- 함수 실행이 마무리되면 해당 컨텍스트는 사라진다.(클로저 제외)
- 페이지가 종료되면 전역 컨텍스트가 사라진다.

## 전역 컨텍스트

전역 컨텍스트가 생성된 후 변수객체, scope chain, this가 들어온다.<br/>
전역 컨텍스트는 arguments가 없고 variable은 전역 스코프의 변수들이다.

```js
var a = 'a';

function firstFunction(arg) {
    console.log(arg); // a가 아니었지롱
    console.log(a); // a
}

function secondFunction() {
    var a = 'a가 아니었지롱';
    console.log(a);
    firstFunction();
}

secondFunction();
```

위 코드에서 페이지가 열리며 전역 컨텍스트가 생성되고 그 안에 아래와 같이 호이스팅에 의해 선언된 내용들이 우선적으로 들어간다.

```js
'global context': {
    '변수객체': {
        arguments: null,
        variable: ['a', 'firstFunction', 'secondFunction'],
    },
    scopeChain: ['전역 변수객체'],
    this: window,
}
```

선언 이후 각각의 var a 변수에 a가 대입된다.

```js
'global context': {
    '변수객체': {
        arguments: null,
        variable: [{a : 'a'}, {firstFunction: Function}, {secondFunction: Function}],
    },
    scopeChain: ['전역 변수객체'],
    this: window,
}
```

## 함수 컨텍스트

이후 secondFunction 함수를 호출할 때 함수 컨텍스트가 생성된다.
```js
'secondFunction': {
    '변수객체': {
        arguments: null,
        variable: [{a : 'a'}],
    },
    scopeChain: ['secondFunction 변수객체', '전역 변수객체'],
    this: window,
}
```

다음 firstFunction 함수를 호출할 때 함수 컨텍스트가 하나 더 생성된다.
```js
'firstFunction': {
    '변수객체': {
        arguments: [{arg: 'a가 아니었지롱'}],
        variable: null,
    },
    scopeChain: ['firstFunction 변수객체', '전역 변수객체'],
    this: window,
}
```

### firstFunction의 console.log(arg)와 console.log(a)의 차이점
firstFunction의 호출시 생성된 컨텍스트를 살펴보면 scopeChain은 firstFunction변수객체 다음 전역 변수객체를 찾아간다.<br/>
즉 secondFunction의 변수 a는 애당초 구경조차 못한다.<br/>
자신의 스코프 내부에 a변수가 없으니 다음 스코프인 전역 변수객체의 a를 찾게 된다.<br/>
반면 console.log(arg)는 호출시 인자로 넘어온 'a가 아니었지롱'을 그대로 사용한다.

## 클로저에 대한 이해
클로저란 비공개 변수를 가질 수 있는 환경에 있는 함수를 말한다.

```js
var makeClosure = function() {
  var name = 'dabin';
  return function () {
    console.log(name);
  }
};
var closure = makeClosure();
closure(); // 'dabin';
```

위 클로저를 만드는 makeClosure 함수의 컨텍스트를 객체로 표현하면 다음과 같다.

```js
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ makeClosure: Function }, 'closure'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
'makeClosure 컨텍스트: {
  변수객체: {
    arguments: null,
    variable: [{ name: 'dabin' }],
  },
  scopeChain: ['makeClosure 변수객체', '전역 변수객체'],
  this: window,
}
'closure 컨텍스트':  {
  변수객체: {
    arguments: null,
    variable: null,
  scopeChain: ['closure 변수객체', 'makeClosure 변수객체', '전역 변수객체'],
  this: window,
}
```

makeClosure() 함수가 호출되며 function () {console.log(name);}이 return 되었고 해당 함수가 대입된 closure() 함수가 호출되면서 closure 컨텍스트가 생성된다.<br/>
해당 컨텍스트의 스코프체인은 렉시컬 스코프(선언당시)를 따라 makeClosure의 변수객체를 포함한다.<br/>
때문에 makeClosure함수는 종료되었지만 함수 컨텍스트는 사라지지 않고 참조가 가능한 상태로 남아있으며 내부변수들은 비공개 함수로 사용 가능하다.<br/>

### 주의점
클로저를 사용하는 경우 컨텍스트가 사라지지 않고 남아있게 되는데 자바스크립트는 여기 포함된 비공개 변수들을 언제 메모리에서 가비지컬렉팅 해주어야 하는지 알지 못한다.<br/>
때문에 메모리 관리에 주의하여야 한다. 또한 scope chain을 거슬러 올라가기 때문에 조금 느리다.