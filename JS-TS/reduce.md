# Array.prototype.reduce()

reduce 메소드는 배열의 각 요소에 대해 주어진 리듀서(콜백) 함수를 실행하고 결과값을 반환한다.

## 구문
```js
arr.reduce(callback [,initialValue]);
```

## 매개변수
- callback
  - accumulator: 리듀서 함수의 첫번째 인자로 콜백의 이전 반환값이거나 콜백의 첫 호출인 경우에는 initialValue값이다. (배열의 요소마다 실행되는 콜백의 반환값을 누적한다.)
  - currentValue: 배열의 현재 요소
  - currentIndex(optional): 배열의 현제 index, initialValue를 제공한 경우 0, 아니면 1
  - array(optional): reduce() 메소드를 호출한 배열
- initialValue: 콜백 최초 호출시 첫번째 인수에 제공되는 값, 초기값을 제공하지 않으면 배열의 첫번째 요소를 사용하며, 초기값 없이 reduce()를 호출하면 오류가 발생한다.

## sum 예제

```js
const itemPrice = [15000, 20000, 10000];
const totalItemPrice = itemPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(totalItemPrice); // 45000;
```

배열 요소의 계산이 필요한 경우 reduce를 활용하면 간편함