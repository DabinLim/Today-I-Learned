# Array.prototype.every(), Array.prototype.some()

## Array.prototype.every()
배열의 원소가 모두 조건에 맞는지 확인한다.

### 매개변수
1. callback
   1. index
   2. array
   3. thisArg

### 반환값
callback이 모든 요소에 대해 참인 경우 true, 그 외엔 false<br>
<strong>빈배열에서 호출하면 무조건 true를 반환한다.</strong>

### 예시
```js
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

```

## Array.prototype.some()
배열의 요소가 하나라도 조건에 맞는지 확인한다.

### 매개변수
1. callback
   1. index
   2. array
   3. thisArg

### 반환값
callback이 모든 요소에 대해 <strong>하나라도</strong> 참인 경우 true, 그 외엔 false<br>
<strong>빈배열에서 호출하면 무조건 false 반환한다.</strong>

### 예시
```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

```