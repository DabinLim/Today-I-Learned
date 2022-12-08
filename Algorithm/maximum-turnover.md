# 최대 매출

## 문제
다빈이가 운영하는 매장의 n일 동안의 매출 기록을 가지고 연속된 k일 동안의 최대 매출액을 구한다.<br>
예를 들어 n이 10이고 k가 3이면 최대 매출기록은 아래와 같이 11, 20, 25를 더한 56이 된다.
[12, 15, 11, 20, 25, 10, 20, 19, 13, 15]

## 조건
- N(5<=N<=100,000)길이만큼의 매출기록 배열이 주어진다.
- K(2<=K<=N)이 주어진다.
  
## 출력

최대 매출액을 출력한다.

## 풀이

```js
function solution(k, arr) {
    let sum = 0;
    let answer = 0;
    // 배열 가장 앞에서부터 첫 k만큼의 합을 구함
    for (let i = 0; i < k; i ++) sum += arr[i];
    answer = sum;
    
    // 이후 하나씩 밀어가면서 k만큼의 합을 갱신하고 큰 값으로 answer을 갱신
    for (let i = k; i < arr.length; i ++) {
        sum += arr[i] - arr[i - k];
        answer = Math.max(answer, sum);
    }
    
    return answer
}

console.log(solution(3, [12, 15, 11, 20, 25, 10, 20, 19, 13, 15]));
```