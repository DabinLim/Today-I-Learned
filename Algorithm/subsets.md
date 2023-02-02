# 부분집합 구하기 (DFS)

## 문제

자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램을 작성하시오.

## 조건

자연수 N(1<=N<=10)이 주어진다.

## 출력

공집합을 제외한 부분집합을 아래 출력 예시와 같은 순서로 출력한다.


## 입력 예시

3


## 출력 예시

1 2 3<br>
1 2<br>
1 3<br>
1<br>
2 3<br>
2<br>
3<br>

## 풀이

```js
function solution(n) {
  let answer = '';
  let check = Array.from({length: n + 1}, () => 0);
  function rec(v) {
    if (v === n + 1) {
      for (let i = 1; i <= n; i ++) {
        if (check[i] === 1) {
          answer += i;
        }
      }
      if (answer) {
        console.log(answer);
      }
      answer = '';
      return;
    }
    check[v] = 1;
    rec(v + 1);
    check[v] = 0;
    rec(v + 1);
  }
  rec(1);
}

solution(3);
```
