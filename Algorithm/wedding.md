# 결혼식

## 문제

다빈이는 다음 달에 결혼을 한다.<br>
다빈이는 결혼식 피로연 장소를 빌려 3일 간 쉬지 않고 하려 한다.<br>
친구들은 각자 자신이 몇시에 도착해서 몇시에 떠날 것인지 다빈이에게 알려주었다.<br>
다빈이는 이 정보를 바탕으로 피로연 장소에 존재하는 최대 인원수를 구하여 그 인원을 수용할 장소를 빌리려고 한다.<br><br>

만약 한 친구가 13시에 오고 15시에 간다면 15시 정각에는 존재하지 않는다.<br>
즉 15시에 오는 친구와 동시에 존재하지 않는다.

## 조건
피로연에 참석할 인원수 N(5<=N<=100,000)이 주어진다.<br>
각 인원의 오는 시간과 가는 시간 (0~72)이 배열로 주어진다.

## 출력
피로연장에 동시에 존재하는 최대 인원을 출력하시오.

## 입력 예시
- 5
- [[14, 18], [12, 15], [15, 20], [20, 30], [5, 14]]

## 출력 예시

2

## 풀이

```js
function solution(arr) {
  let answer = 0;
  let sum = 0;
  let timeTable = [];
  arr.forEach((person) => {
    timeTable.push([person[0], "s"]);
    timeTable.push([person[1], "e"]);
  });

  let sorted = timeTable.sort((a, b) => {
    if (a[0] === b[0]) {
      // 같은 시간은 동시에 존재하지 않는 것으로 간주
      // 그러므로 같은 시간에는 e를 먼저 카운트에서 제하기 위해 앞으로 오도록 정렬
      if (a[1] === "s" && b[1] === "e") {
        return 1;
      } else {
        return -1;
      }
    } else {
      return a[0] - b[0];
    }
  });

  // 앞서 온 사람부터 s를 만나면 동시에 존재하는 사람 1명씩 증가 e를 만나면 감소
  // 최댓값이 동시에 최대로 존재하는 손님 수가 됨
  sorted.forEach((time) => {
    if (time[1] === "s") {
      sum += 1;
    } else {
      sum -= 1;
    }
    if (sum > answer) {
      answer = sum;
    }
  });

  return answer;
}

console.log(
  solution([
    [14, 18],
    [12, 15],
    [15, 20],
    [20, 30],
    [5, 14],
  ])
);
```