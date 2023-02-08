# 바둑이 승차 (DFS)

## 문제

철수는 그의 바둑이들을 데리고 시장에 가려고 한다.<br>
그런데 그의 트럭은 C 킬로그램 넘게 태울 수 없다.<br>
철수는 C를 넘지 않으면서 그의 바둑이들을 가장 무겁게 태우고 싶다.<br>
N마리의 바둑이의 각 무게가 주어지면 철수가 트럭에 태울 수 있는 가장 무거운 무게를 구하는 프로그램을 작성하시오.

## 조건

- 자연수 C(1<=N<=100,000,000)이 주어진다.
- N(1<=N<=30)마리 바둑이의 무게가 배열로 주어진다.

## 출력
가장 무거운 무게를 출력한다.


## 입력 예시

- 259
- [81, 58, 42, 33, 61]


## 출력 예시

242

## 풀이

```js
function solution(c, arr) {
  let answer = 0;
  let n = arr.length;
  function rec(level, sum) {
    if (sum > c) {
      // 조건보다 무게합이 무거우면 종료
      return;
    }
    if (level === n) {
      // 최댓값을 답으로
      if (answer < sum) {
        answer = sum;
      }
      return;
    }

    // 바둑이의 부분집합의 무게합을 늘려감
    rec(level + 1, sum + arr[level]);
    // 부분집합 중에 무게를 합하지 않는 방향
    rec(level + 1, sum);
  }

  rec(0, 0);

  return answer;
}

console.log(solution(259, [81, 58, 42, 33, 61]));
```