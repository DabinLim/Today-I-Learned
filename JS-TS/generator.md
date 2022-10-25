# 제너레이터
이터러블이며 동시에 이터레이터이다.
async 와 Promise의 관계와 비슷하다.

## 제너레이터 방식으로 이터러블 생성

### 방식 1. function 옆에 *
function 키워드 옆에 * 키워드를 사용하면 이터레이터를 반환해준다.
```js
const range = function* () {
  let i = 1; 
  while(true){ 
    if (i <= 5)
      yield ++i;
    else
      return;
  }
}
```

### 방식 2. `[Symbol.iterator] 메소드를 제너레이터를 사용하여 구현
```js
let range = {
  from: 1,
  to: 5,
 
  *[Symbol.iterator]() { // [Symbol.iterator]: function*()과 같음
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};
```

## 제너레이터 정의

제너레이터 함수 선언식
```js
function* genDecFunc() {
  yield 1;
}
let generatorObj = genDecFunc();
```

제너레이터 함수 표현식
```js
const genExpFunc = function* () {
  yield 1;
};
generatorObj = genExpFunc();
```

제너레이터 메소드
```js
const obj = {
  * generatorObjMethod() {
    yield 1;
  }
};
generatorObj = obj.generatorObjMethod();
```

제너레이터 클래스 메소드 
```js
class MyClass {
  * generatorClsMethod() {
    yield 1;
  }
}
const myClass = new MyClass();
generatorObj = myClass.generatorClsMethod();
```

### yield / next
제너레이터는 일반함수 처럼 코드 블록을 한번에 실행하지 않고 함수 코드 블록의 실행을 일시 중지 했다가 필요한 시점에 재시작할 수 있다.<br><br>
yield는 제너레이터 함수의 실행을 일시적으로 정지시키며, yield 뒤에 오는 표현식은 제너레이터의 caller에게 반환된다.<br>
next 메소드는 {value, done} 프로퍼티를 갖는 이터레이터 객체를 반환한다.<br>
value 프로퍼티는 yield 문이 반환한 값이고 done 프로퍼티는 제너레이터 함수 내의 모든 yield 문이 실행되었는지 여부를 나타낸다.

```js
function* generateSequence(){
   yield 1; 
   yield 2; 
   return 3;
}
 
let iter = generateSequence();
 
console.log(iter[Symbol.iterator]() == iter) // true
 
//value, done 이 있는 객체를 반환하는 next를 호출하면 이터러블 객체를 반환하고 함수는 일시중단 된다.
console.log(iter.next()); // { "value": 1, "done": false } + 함수 실행 중단
console.log(iter.next()); // { "value": 2, "done": false } + 함수 실행 중단
 
console.log(iter.next()) // { value: 3, done: true }
```

제너레이터 실행 결과 역시 이터레이터이기 때문에 for...of 사용이 가능하다.<br>
단 next를 통해 순회가 끝난 경우 for...of 에서 찍히지 않는다<br>
또한 next는 마지막 return 까지 value 값에 찍히여 done이 true가 된것과 달리 for...of에서 return 값은 찍히지 않는다.
```js
function* generateSequence(){
    yield 1; 
    yield 2; 
    return 3;
 }
  
 let iter = generateSequence();
  
 console.log(iter[Symbol.iterator]() == iter) // true
  
 console.log(iter.next()); // { "value": 1, "done": false } + 함수 실행 중단
 for (value of iter) {
    console.log(value) // 2
 }
```

### yield* (제너레이터 컴포지션)
제너레이터 내부에 다른 제너레이터를 합성하여 사용할 수 있다.

```js
function* generateSequence(start, end) { // 시작과 끝을 정해서 순회하는 제너레이터
  for (let i = start; i <= end; i++) 
     yield i;
}
 
function* generateNumbers() {
 
  yield* generateSequence(0, 50);
 
  yield* generateSequence(50, 100);
 
}
 
let str = '';
for(let code of generateNumbers()) {
  str += code
}
 
alert(str);
```

제너레이터 합성에서 yield* 의 반환값이 이터레이터 객체일 경우 풀어서 순회한다.
```js
function* innerGenerator() {
  yield* ['a', 'b', 'c'];
}
 
function* generator() {
  yield [1, 2, 3]; 
 
  yield* [4, 5, 6]; 
 
  yield* innerGenerator();
}
 
[...generator()];
// [[1, 2, 3], 4, 5, 6, 'a', 'b', 'c']
```