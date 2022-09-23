# javascript의 this

### 전역
사실상 아래의 몇가지 케이스를 제외하면 전역을 가리킨다고 볼 수 있다.
```js
function testThis() {
    console.log(this)
}
testThis()
/*
js: window, globalThis
node: global, globalThis
*/
```

```js
function testThis() {
    function innerThis() {
        console.log(this)
    }
    innerThis()
}

testThis()
// innerThis()의 this === testThis()의 this
```

### use strict
```js
function testThis () {
    'use strict'
    console.log(this);
}

testThis()
// undefined
```


### 객체 안에서
객체 안에서 this는 객체를 가리킨다.<br/>
즉 메소드에서 this는 메소드를 포함하는 객체를 나타낸다.
```js
const obj = {
    name: 'dabin',
    sayName() {
        console.log(this.name);
    },
};

oby.sayName() // dabin
```

생성자 함수로 생성된 객체 또한 마찬가지이다.
```js
const obj = {
    name: 'dabin',
    sayName() {
        console.log(this.name);
    },
};

oby.sayName() // dabin
```
메소드의 this가 메소드를 포함하는 객체를 나타내는 예씨
```js
let outerObj = Object.create({
  sayName: function() {
     console.log(this === outerObj); // => true
     return this.name;
  }
});
outerObj.name = 'dabin';
// 메소드 실행. 여기서의 this는 outerObj.
outerObj.sayName(); // => 'Milo'
```

## arrow function

### this는 함수가 호출(컨텍스트가 생성될때) 정해진다

arrow function은 함수가 만들어진 시점에서 그 함수를 둘러싼 scope의 this를 가리킨다.<br/>
arrow function의 this는 렉시컬 컨텍스트를 따른다.<br/>
즉, 한번 binding되면 절대 바뀌지 않는다.<br/>
이를 Lexical this라고 한다.<br/>

objFunction의 this는 call() 메소드에 의해 {foo: 13} 객체가 된다.<br/>
하지만 리턴되는 객체 안의 bar() 메소드는 실행되는 순간 자신을 둘러싼 리턴되는 객체를 참조하기 때문에 25를 출력한다.<br/>
```js
function objFunction() {
  console.log('Inside `objFunction`:', this.foo); // 13
  return {
    foo: 25,
    bar: function() {
      console.log('Inside `bar`:', this.foo); // 25
    },
  };
}

objFunction.call({foo: 13}).bar();
```

반면 arrow function의 경우는 call() 메소드에 의해 간접실행이 된 순간 this는 {foo: 13}를 가리키며 실행 도중 this의 스코프는 바뀌지 않기 때문에 13을 출력한다.

```js
function objFunction() {
  console.log('Inside `objFunction`:', this.foo); // 13
  return {
    foo: 25,
    bar: () => console.log('Inside `bar`:', this.foo) // 13
  };
}

objFunction.call({foo: 13}).bar();
```

위 4가지 조건이 중첩된다면 1번 규칙부터 우선 적용된다.