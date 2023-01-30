# 마구간 정하기

## 문제

N개의 마구간이 수직선상에 있다.<br>
각 마구간은 x1, x2, x3, ... xN의 좌표를 가지며 좌표가 중복되는 일은 없다.<br>
C마리의 말이 있는데 이 말들을 최대한 멀리 배치하려고 한다.<br>
한 마구간에는 한마리의 말만 넣을 수 있고 말들의 거리를 최대한 멀게 배치하려고 할때 최대가 되는 그 거리를 출력하시오.


## 조건

말들의 수 C(2<=C<=N)이 주어진다.
N(3<=N<=200,000)개의 마구간 좌표가 배열로 주어진다.

## 출력

가장 가까운 두 말의 최대 거리를 출력하시오.

## 입력 예시

3
[1, 2, 8, 4, 9]

## 출력 예시

3

## 풀이

```js
function solution(horseCount, arr) {
  let answer;
  arr.sort((a, b) => a - b);
  // 최소가 될 수 있는 거리
  let left = 1;
  // 최대가 될 수 있는 거리
  let right = arr[arr.length - 1];

  // 마구간을 돌면서 가장 가까운 두말 사이의 거리보다 가깝지 않게 배치할 수 있는 말의 수 를 구함
  function count(stall, dist) {
    let ep = stall[0];
    let cnt = 1;
    for (let i = 1; i < stall.length; i++) {
      if (stall[i] - ep >= dist) {
        cnt += 1;
        ep = stall[i];
      }
    }
    return cnt;
  }

  while (left <= right) {
    // 가장 가까운 두 말 사이의 거리 - 처음에는 최대 거리가 됨
    let mid = Math.floor((left + right) / 2);
    // 말을 충분히 배치할 수 있다면 답이 될 수 있음
    if (count(arr, mid) >= horseCount) {
      if (!answer || answer < mid) {
        answer = mid;
      }
      // 더 큰 거리를 계산해봄
      left = mid + 1;
    } else {
      // 더 작은 거리를 계산해봄
      right = mid - 1;
    }
  }
  return answer;
}

console.log(solution(3, [1, 2, 8, 4, 9]));
```
