# 최대점수 구하기 (DFS)

## 문제

이번 정보올림피아드대회에서 좋은 성적을 내기 위하여 다빈이는 선생님이 주신 N개의 문제를 풀려고 한다.<br>
각 문제는 그것을 풀었을 때 얻는 점수와 푸는데 걸리는 시간이 주어지게 된다.<br>
제한시간 M안에 N개의 문제 중 최대점수를 얻을 수 있도록 해야 한다.<br>
해당시간이 걸렸으면 푼 것으로 간주하며 한 유형당 한개만 풀 수 있다.

## 조건

- 제한시간 M(1<=M<=300)이 주어진다.
- N(1<=N<=20)개 문제의 점수와 걸리는 시간이 2차원 배열로 주어진다.

## 출력

제한시간 내에 얻을 수 있는 최대 점수를 출력한다.


## 입력 예시
- 20
- [[10, 5], [25, 12], [15, 8], [6, 3], [7, 4]]


## 출력 예시

41

## 풀이

```js
function solution(limit, arr) {
  let answer = 0;
  let n = arr.length;
  function rec(level, sum, time) {
    if (time > limit) {
      // 시간 초과인 경우 종료
      return;
    }
    if (level === n) {
      // 최대점수를 답으로
      if (answer < sum) {
        answer = sum;
      }
      return;
    }

    // 점수의 합과 시간을 더해가는 경우
    rec(level + 1, sum + arr[level][0], time + arr[level][1]);
    // 점수의 합을 더하지 않는 경우
    rec(level + 1, sum, time);
  }

  rec(0, 0, 0);

  return answer;
}

console.log(solution(20, [[10, 5], [25, 12], [15, 8], [6, 3], [7, 4]]));

```