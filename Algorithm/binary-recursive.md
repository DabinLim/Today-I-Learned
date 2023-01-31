# 재귀함수를 이용한 이진수 출력

## 문제
10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하시오.<br>
단 재귀함수를 이용해서 출력해야 함

## 조건
10진수 N(1<=N<=1000)이 입력된다.


## 출력
이진수를 출력한다.

## 입력 예시
11

## 출력 예시
1011

## 풀이

```js
function solution(count) {
  let answer = '';
  function rec(n) {
    if (n === 0) {
      return;
    }
    rec(Math.floor(n/2));
    answer += (n%2).toString();
  }
  rec(count);
  return answer;
}

console.log(solution(10));
```
