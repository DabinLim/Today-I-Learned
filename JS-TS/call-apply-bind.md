# call, apply, bind

## this binding 이란?

```js
function myFunc() {
    console.log(this) // window 또는 globalThis
}
```
es5 함수 안에서 this는 전역객체를 가리킨다.<br/>
함수 안에서 this를 원하는 데이터를 바라보게 하기 위해 binding 메소드를 사용한다.<br/>
binding 메소드에는 call(), apply(), bind() 메소드가 있다.

### arrow function에서의 binding
arrow function은 lexical this를 따르기 때문에 바인딩 메소드를 사용해도 의미가 없다.

### call()
첫번째 매개변수로 바인딩할 데이터를 넘기고 두번째 매개변수부터는 배열의 요소들을 넘긴다.
```js
/*
{ name: 'dabin' }
[ 'arg1', 'arg2', 'arg3' ]
 */
function bindingTest(...args) {
    console.log(this)
    console.log(args);
};

bindingTest.call(thisObj, 'arg1', 'arg2', 'arg3')
```

### apply()
첫번째 매개변수로 바인딩할 데이터를 2번째 매개변수로 배열 자체를 넘긴다.
```js
/*
{ name: 'dabin' }
[ 'arg1', 'arg2', 'arg3' ]
 */
function bindingTest(...args) {
    console.log(this)
    console.log(args);
};

bindingTest.apply(thisObj, ['arg1', 'arg2', 'arg3'])
```

call 메소드를 apply 메소드처럼 호출하면 다음과 같은 결과를 얻게 된다.
```js
/*
{ name: 'dabin' }
[ [ 'arg1', 'arg2', 'arg3' ] ]
 */
function bindingTest(...args) {
    console.log(this)
    console.log(args);
};

bindingTest.call(thisObj, ['arg1', 'arg2', 'arg3'])
```
### bind()
함수를 실행하지 않고 binding된 함수를 리턴한다. 동작은 call 메소드와 같다.
```js
/*
{ name: 'dabin' }
[ 'arg1', 'arg2', 'arg3' ]
 */
function bindingTest(...args) {
    console.log(this)
    console.log(args);
};

const bounded = bindingTest.bind(thisObj, 'arg1', 'arg2', 'arg3')
bounded();
```

### 원시데이터를 binding 하는 경우
원시데이터의 생성자 객체를 넘긴다. (아래 예시에서는 new Number(1)과 동일한 결과)

```js
// [Number: 1]
function bindingTest() {
    console.log(this)
};

bindingTest.call(1)
```