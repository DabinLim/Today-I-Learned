# 이분검색

## 문제

임의의 N개의 숫자가 주어진다.<br>
N개의 수를 오름차순으로 졍렬한 다음 N개의 수 중 한개의 수인 M이 주어지면 이분검색으로 M이 정렬된 상태에서 몇번째에 있는지 구하시오.

## 조건

N(3<=N<=1,000,000)개의 숫자가 배열로 주어진다.
배열에 속한 숫자 중 하나인 M이 주어진다.<br>

## 출력

첫 줄에 정렬 후 M의 값의 위치 번호를 출력한다.

## 입력 예시

- [23, 87, 65, 12, 57, 32, 99, 81]
- 32

## 출력 예시

3

## 풀이

```js
function solution(arr, target) {
  let answer = 0;
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    // 오른쪽 끝과 왼쪽 끝의 중간부터 비교
    let mid = Math.floor((left + right) / 2);
    // 타겟과 같다면 종료
    if (arr[mid] === target) {
      answer = mid + 1;
      break;
      // 중간이 타겟보다 크다면 그와 그보다 더 큰 오른쪽은 검색 범위에서 탈락
    } else if (arr[mid] > target) {
      right = mid - 1;
      // 중간이 타겟보다 작다면 그와 그보다 더 작은 왼쪽은 검색 범위에서 탈락
    } else {
      left = mid + 1;
    }
  }
  return answer;
}

console.log(solution([23, 87, 65, 12, 57, 32, 99, 81], 32));
```
