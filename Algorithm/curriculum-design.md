# 교육과정 설계

## 문제

1년간의 수업계획을 짜야한다.<br>
수업중에는 필수과목이 있으며 이 필수과목은 반드시 이수해야 하고 그 순서도 정해져 있다.<br>
만약 총 과목이 A, B, C, D, E, F, G가 있고 필수과목이 CBA로 주어진다면 꼭 순서대로 수업계획을 짜야한다.<br>
위 경우 CBADEF 순으로 수업계획을 짰으면 잘된 것이고 CDABEF 순으로 짰다면 잘못 짜여진 것이다.

## 조건

- 필수과목과 수업계획이 주어진다.
- 모든 과목은 영문 대문자이다.
- 수업계획의 길이는 30이하이다.

## 출력

수업 설계가 잘된 것이면 YES 잘못된 것이면 NO를 출력한다.

## 입력 예시

CBA
CBDAGE

## 출력 예시

1. YES

## 풀이

```js
function solution(priority, plan) {
  let answer;
  const planList = plan.split("");
  const answerList = [];

  planList.forEach((v) => {
    if (priority.includes(v)) {
      answerList.push(v);
    }
  }, []);

  // 우선순위에 포함된 수업들을 순서대로 확인
  const result = answerList.reduce((acc, cv) => acc + cv, "");

  // 확인한 순서와 우선순위가 같다면 YES
  if (result === priority) answer = "YES";
  // 다르다면 NO
  else answer = "NO";

  return answer;
}

console.log(solution("CBA", "CBDAGE"));
```

### 큐를 활용한 풀이

```js
function solution(priority, plan) {
  const queue = priority.split("");

  for (let p of plan) {
    if (queue.includes(p)) {
      // 큐에서 가장 우선순위가 높은 것을 뽑아 확인
      if (queue.shift() !== p) return "NO";
    }
  }
  
  // 필수과목에 이수하지 않은 과목이 있다면 NO
  if (queue.length > 0) return "NO";
  // 수업 계획을 다 확인 하면서 우선순위가 잘못되지 않았다면 YES
  return "YES";
}

console.log(solution("CBA", "CABDGE"));
```
