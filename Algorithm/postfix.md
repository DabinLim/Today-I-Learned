# 후위연산식

## 문제
후위연산식이 주어지면 연산 결과를 출력하시오.

## 조건
- 후위연산식이 주어지며 연산식의 길이는 50을 넘지 않는다.
- 연산자는 -, +, *, / 로만 이루어져 있다.
  
## 출력
연산 결과를 출력한다.

## 입력 예시
1. 352+*9-

## 출력 예시
1. 12

## 풀이

```js
function solution(ex) {
  let answer = 0;
  let stack = [];
  // 연산을 진행하는 함수
  function calc(operator) {
    // 스택의 마지막 두개를 뽑아 왼쪽 숫자에 오른쪽 숫자를 연산해주어야 한다.
    let right = stack.pop();
    let left = stack.pop();
    let calcResult;
    switch (operator) {
      case '+':
        calcResult = left + right;
        stack.push(calcResult);
        break;
      case '*':
        calcResult = left * right;
        stack.push(calcResult);
        break;
      case '/':
        calcResult = left / right;
        stack.push(calcResult);
        break;
      case '-':
        calcResult = left - right;
        stack.push(calcResult);
        break;
      default:
        throw new Error('not operator');
    }
    // 연산결과는 스택의 마지막에 다시 들어가고 결과에도 반영된다.
    answer = calcResult;
  }
  ex.split('').forEach((str) => {
    // 문자를 10진수 숫자로 변환
    const parsedStr = parseInt(str, 10);
    // 숫자가 아닌 경우 연산
    if (isNaN(parsedStr)) {
      calc(str);
    } else {
      // 숫자라면 stack에 넣는다.
      stack.push(parsedStr);
    }
  })
  return answer;
}

console.log(solution('352+*9-'));
```