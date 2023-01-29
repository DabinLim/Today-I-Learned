# 뮤직 비디오

## 문제

N개의 곡이 들어가는 앨범이 있다.<br>
이 앨범에 수록된 각 곡의 라이브 동영상을 DVD로 만들어 판매하려 한다.<br>
M개의 DVD 수량이 주어졌을때 앨범에 수록된 각 곡들의 순서가 바뀌지 않고 비디오를 DVD에 넣었을때, DVD의 크기를 가장 최소화하였을때 길이를 구하여라(녹화된 DVD 길이)
<br><br>
설명: 3개의 DVD용량이 17분짜리라면 (1,2,3,4,5) (6,7) (8,9) 이렇게 담을 수 있다.<br>
17분보다 짧다면 마지막 8,9 영상을 담을 수 없다.


## 조건

N(1<=N<=1,000)분 길이의 곡들이 배열로 주어진다.<br>
앨범 곡들의 전체 길이는 10,000분을 넘지 않는다.<br>
DVD의 숫자 M(1<=M<=N)이 주어진다.<br>

## 출력

DVD의 최소 길이를 출력하시오.

## 입력 예시

3
[1, 2, 3, 4, 5, 6, 7, 8, 9]

## 출력 예시

17

## 풀이

```js
function solution(targetCount, arr) {
  let answer;
  // DVD의 최소 용량
  let left = 9;
  // DVD의 최대 용량
  let right = arr.reduce((acc, cv) => acc + cv, 0);

  // 예시에는 정렬되어있지만 실제로는 정렬이 필요
  arr.sort((a, b) => a - b);

  // 몇장이 들어가는지 카운트
  function count(songs, capacity) {
    let cnt = 1;
    let sum = 0;
    for (let x of songs) {
      if (sum + x > capacity) {
        cnt += 1;
        sum = x;
      } else {
        sum += x;
      }
    }
    return cnt;
  }

  while (left <= right) {
    // 앨범당 길이
    let mid = Math.floor((left + right) / 2);
    // 앨범당 길이가 mid일때 targetCount 안에 들어간다면 답이 될 수 있음
    if (count(arr, mid) <= targetCount) {
      // 짧은 길이일때 업데이트
      if (!answer || answer > mid) {
        answer = mid;
      }
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return answer;
}

console.log(solution(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
```
