# 합이 같은 부분집합 DFS, 아마존 인터뷰

## 문제

N개의 원소로 구성된 자연수 집합이 주어지면 이 집합을 두개의 부분집합으로 나누었을때, 두 부분집합의 원소의 합이 서로 다른 경우가 존재하면 YES를 출력하고 그렇지 않으면 NO로 출력하는 프로그램을 작성하시오.<br>
둘로 나뉘는 두 부분집합은 서로소 집합이며 두 부분집합을 합하면 입력으로 주어진 원래의 집합이 된다.<br>
예를 들어 {1, 3, 5, 6, 7, 10}이 입력되면 {1, 3, 5, 7} = {6, 10}의 두 부분집합의 경우가 합이 16으로 같은 집합이 존재하는 경우이다.

## 조건

- 자연수 N(1<=N<=10)이 주어진다.
- 집합의 원소 N개가 주어진다. 각 원소는 중복되지 않는다.

## 출력

공집합을 제외한 부분집합을 아래 출력 예시와 같은 순서로 출력한다.


## 입력 예시

- 6
- 1, 3, 5, 6, 7, 10


## 출력 예시

YES

## 풀이

```js
function solution(arr) {
  let answer = 'NO';
  let total = arr.reduce((acc, cv) => acc + cv, 0);
  let n = arr.length;
  function rec(level, sum) {
    if (answer === 'YES') {
      return;
    }
    if (level === n) {
      // 총 합계에서 부분집합의 합을 뺐을때 나온 숫자가 부분집합의 합과 같다면 
      // 서로소인 두 집합의 합이 같은 경우가 존재한다는 뜻이 된다.
      if ((total - sum) === sum) {
        answer = 'YES';
      }
      return;
    }
    // 배열의 인덱스를 하나씩 증가하면서 집합에 포함시키는 경우와
    rec(level + 1, sum + arr[level]);
    // 아닌경우를 탐색
    rec(level + 1, sum);
  }
  // 0번째 인덱스와 합계가 없는 상태로 시작
  rec(0, 0);
  return answer;
}

console.log(solution([1, 3, 5, 6, 7, 10]));


```