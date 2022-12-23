# 쇠막대기

## 문제
- 쇠막대기는 자신보다 긴 쇠막대기 위에만 놓일 수 있다.
- 쇠막대기를 다른 쇠막대기 위에 놓는 경우 완전히 포함되도록 놓되, 끝점은 겹치지 않도록 놓는다.
- 각 쇠막대기를 자르는 레이저는 적어도 하나 존재한다.
- 레이저는 어떤 쇠막대기의 양 끝점과도 겹치지 않는다.

<img src='./images/iron-rod.png' width="350px" height="200px">

## 조건
- 괄호 길이는 최대 100,000이다.
- 여는 괄호와 닫는 괄호는 항상 쌍을 이룬다.
  
## 출력
잘려진 쇠막대기의 갯수를 출력한다.

## 입력 예시
1. ()(((()())(())()))(())

## 출력 예시
1. 17


## 풀이

```js
function solution(str) {
  let answer = 0;
  let stack = [];
  let isRaiser = true;
  str.split('').forEach((v) => {
    // ) 괄호부터 시작하는 경우는 없으므로 고려하지 않음
    if (v === '(') {
      stack.push(v);
      // 괄호가 새로 열렸으므로 바로 닫히면 레이저가 됨
      isRaiser = true;
    } else {
      if (stack[stack.length - 1] === '(') {
        if (isRaiser) {
          stack.pop();
          // 스택에 남아있던 수 (쇠막대기의 수)만큼 잘린 막대가 추가됨
          answer += stack.length;
          // 괄호가 닫혔으면 다음 stack에 남아있는 여는 괄호는 레이저가 아닐 수 있음
          isRaiser = false;
        } else {
          // 레이저가 아니라 쇠막대기가 끝난 경우에 해당하므로 막대 수 1개 추가
          stack.pop();
          answer += 1;
        }
      }
    }
  })
  return answer;
}
```