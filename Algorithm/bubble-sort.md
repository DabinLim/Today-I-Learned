# 버블정렬

## 문제

주어진 배열을 <strong>버블정렬</strong>을 이용하여 오름차순으로 정렬한다.

## 출력

오름차순으로 정렬된 배열

## 입력 예시

1. [13, 5, 11, 7, 23, 15]

## 출력 예시

1. [ 5, 7, 11, 13, 15, 23 ]

## 풀이

```js
function solution(arr) {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    // 한바퀴 돌때마다 큰 숫자가 뒤로 밀려나므로 length - i - 1
    for (let j = 0; j < length - i - 1; j++) {
      // 근접한 두 숫자를 비교해서 순서롤 바꿔준다. 
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(solution([13, 5, 11, 7, 23, 15]));
```
