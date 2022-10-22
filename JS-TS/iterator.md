# 이터러블과 이터레이터

## 이터레이터 프로토콜
이터레이터 프로토콜을 따르는 연산자들과 함께 동작하도록 하는 약속된 규약이다<br>


## 이터러블
이터러블이란 자료를 반복할 수 있는 객체를 말한다.<br>
이터레이터 프로토콜을 따르는 객체를 말한다.<br>
이터레이터를 리턴하는 `[Symbol.iterator]()` 메소드를 가진 객체이다.<br>
배열, 문자열 등

## 이터레이터
{value: 값, done: boolean} 형태의 이터레이터 객체를 리턴하는 next() 메소드를 가진 객체이다.<br>
next 메소드로 순환 할 수 있는 객체이다.<br>
`[Symbol.iterator]()` 안에 정의 되어 있다.

## `[Symbol.iterator]`

일반적인 배열에서 이터레이터 객체를 빼면 순회가 되지 않는다.

```js
let arr = [1,2,3] 
 
arr[Symbol.iterator] = null;
for(const a of arr) console.log (a) // Uncaught TypeError: arr is not iterable
```

### 내부 구조

이터레이터를 구현해보면 아래와 같다.

```js
let range = { 
  from: 1,
  to: 5
};
 
 
range[Symbol.iterator] = function() { 
 
    return { 
      current: this.from,
      last: this.to,
 
      next() { 
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }; 
        } else {
          return { done: true };
        }
      }
    };
};
```

위 코드에서 이터러블은 range이고 이터레이터는 `range[Symbol.iterator]`에서 리턴한 객체가 된다.<br>

## 유사 배열

```js
let arrayLike = { 
  0: "Hello",
  1: "World",
  length: 2
};
```
유사 배열은 위 객체와 같이 인덱스, length를 가지고 있는 객체이다.<br>
유사배열은 이터레이터 메소드가 없기 때문에 순회가 불가능하며 배열의 메소드를 사용할 수 없다.<br>
자바스크립트의 함수가 포함하고 있는 지역변수 arguments도 유사배열에 해당되나 이터러블 작업을 마쳤기 때문에 순회는 가능하다.<br>
Map과 Set 자료형 역시 이터러블 이다.

### Array.from
유사 배열을 진짜 배열로 만들어주는 메소드