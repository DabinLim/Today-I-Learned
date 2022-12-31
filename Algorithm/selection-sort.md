# 선택정렬

## 문제

주어진 배열을 <strong>선택정렬</strong>을 이용하여 오름차순으로 정렬한다.

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
    for (let j = 0; j < length - i - 1; j++) {
        // 버블정렬을 활용
        // 양수와 음수가 만난 경우에만 순서를 바꿔줌
        // 양수끼리, 음수끼리의 순서는 바뀌지 않는다.
      if (arr[j] > 0 && arr[j + 1] < 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(solution([1, 2, 3, -3, -2, 5, 6, -6]));

```
