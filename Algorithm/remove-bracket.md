# 괄호 문자 제거 (스택)

## 문제
입력된 문자열에서 소괄호 사이에 존재하는 모든 문자를 제거하고 남은 문자만 출력하시오.

## 조건
- 길이가 100이 넘지 않는 문자열이 주어진다.
  
## 출력
남은 문자만 출력한다.

## 입력 예시
(A(BC)D)EF(G(H)(IJ)K)LM(N)
## 출력 예시
EFLM

## 풀이

```js
function solution(str) {
    let answer = '';
    let stack = [];

    for (let i of str) {
        // 닫는 괄호일때 괄호가 열려있는 상태라면 pop
        if (i === ')') {
            if (stack[stack.length - 1] === '(') {
                stack.pop();
            }
        } else if (i === '(') {
            // 여는 괄호는 스택에 push
            stack.push(i)
        } else {
            // 괄호가 열린 상태가 아닐때만 문자열 더하기 (남는 문자열)
            if (stack[stack.length - 1] !== '(') {
                answer += i;
            }
        }
    }

    return answer;
}

console.log(solution('(A(BC)D)EF(G(H)(IJ)K)LM(N)'));
```