# 카카오 크레인 인형뽑기 

## 문제
[프로그래머스 문제](https://school.programmers.co.kr/learn/courses/30/lessons/64061)

## 풀이

```js
function solution(board, moves) {
  let answer = 0;
  let stack = [];
  for (const move of moves) {
    for (const arr of board) {
    // board의 가장 윗칸부터 확인하여 빈칸이 아닌 곳 (가장 위의 인형)을 뽑아 stack에 넣는다.
      if (arr[move - 1] !== 0) {
        stack.push(arr[move - 1]);
        // 인형을 뽑았으므로 0으로 바꿈
        arr[move - 1] = 0;
        // 인형을 뽑았으므로 다음 move에 해당하는 인형을 뽑으러 이동
        break;
      }
    }
  }
  let done = false;
  while (!done) {
    let find = false;
    for (let i = 0; i < stack.length; i ++) {
    // 2개의 연속되는 인형을 발견 
      if (stack[i] === stack[i + 1]) {
        find = true;
        // 2인형을 제거
        stack.splice(i, 2);
        // 제거된 인형수 반영
        answer += 2;
        // 2개가 제거됨으로 인해 이전 인덱스도 다시 확인해야 함으로 반복문 종료
        break;
      }
    }
    // 연속되는 인형을 찾지 못했으므로 while문 종료
    if (!find) {
      done = true;
    }
  }
  return answer;
}

console.log(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]));
```