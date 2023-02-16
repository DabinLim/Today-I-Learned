# 올바른 괄호 (프로그래머스)

## 문제

- 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

- "()()" 또는 "(())()" 는 올바른 괄호입니다.
- ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
- '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.


## 조건

- 문자열 s의 길이 : 100,000 이하의 자연수
- 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

## 입출력예

- s	answer
- "()()"	true
- "(())()"	true
- ")()("	false
- "(()("	false

## 풀이

```js
function solution(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    // 이 부분이 없으면 시간초과, (가 없는 상태에서 )가 들어오면 무조건 실패이므로 리턴
    if (stack[0] === ")") {
      return false;
    }

    if (s[i] === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return !stack.length;
}

console.log(solution("()()"));
console.log(solution("(())()"));
console.log(solution("(()("));
console.log(solution("(()("));
```