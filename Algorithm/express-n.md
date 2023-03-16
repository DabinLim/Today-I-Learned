# N으로 표현 (프로그래머스)

## 문제

아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.<br> 

12 = 5 + 5 + (5 / 5) + (5 / 5)<br> 
12 = 55 / 5 + 5 / 5<br> 
12 = (55 + 5) / 5<br> 

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.<br> 
이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.



## 조건

- N은 1 이상 9 이하입니다.
- number는 1 이상 32,000 이하입니다.
- 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
- 최솟값이 8보다 크면 -1을 return 합니다.

## 입출력예

- N	number	return
- 5	12	4
- 2	11	3

## 입출력 예 설명

### 1

문제 예시와 같습니다.

### 2

11 = 22 / 2와 같이 2를 3번만 사용하여 표현할 수 있습니다.

## 풀이

```js
function solution(N, number) {
  // 0을 비워두고 8번째 인덱스까지 set 자료형 생성
  let use = Array.from({ length: 9 }, () => new Set());
  // 1일땐 자기자신밖에 사용 못하므로 1
  if (N === number) return 1;

  use[1].add(N);
  // 2부터 시작
  for (let i = 2; i <= 8; i++) {
    // 현재 계산이 필요한 N의 갯수만큼
    for (let j = 1; j < i; j++) {
      // 자신보다 하나 적은 갯수의 사칙연산들을 같이 사칙연산
      for (let item1 of use[j].values()) {
        for (let item2 of use[i - j].values()) {
          use[i].add(Number(String(N).repeat(i)));
          use[i].add(item1 + item2);
          use[i].add(item1 * item2);
          use[i].add(item1 - item2);
          use[i].add(Math.floor(item1 / item2));
          // 원하는 number가 나왔다면 리턴
          if (use[i].has(number)) return i;
        }
      }
    }
  }

  // 결과가 안나온 경우 -1을 리턴
  return -1;
}

console.log(solution(5, 12));
console.log(solution(2, 11));
````