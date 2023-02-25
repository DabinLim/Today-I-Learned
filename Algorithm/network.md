# 네트워크 (프로그래머스)

## 문제

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. <br>
예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다.<br>
따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.<br>

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.<br>



## 조건

- 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
- 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
- i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
- computer[i][i]는 항상 1입니다.

## 입출력예

- n	computers	return
- 3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
- 3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1
  
## 입출력 예 설명

### 1

아래와 같이 2개의 네트워크가 있습니다.<br>

<img src="./images/../../images/network1.png" />


### 2

아래와 같이 1개의 네트워크가 있습니다.<br>

<img src="./images/../../images/network2.png" />

## 풀이

```js

function solution(n, computers = []) {
  var answer = 0;
  const length = computers.length;
  const visited = Array.from({ length: n }, () => false);

  function dfs(level) {
    // 방문한 네트워크
    visited[level] = true;
    // 해당 컴퓨터와 연결된 네트워크를 모두 찾아 방문 표시 (연결된 하나의 네트워크라는 뜻)
    for (let i = 0; i < length; i++) {
      if (computers[level][i] && !visited[i]) {
        dfs(i);
      }
    }
  }

  for (let i = 0; i < length; i++) {
    // 방문한 적이 있으면 i번째 컴퓨터와 연결된 네트워크
    if (!visited[i]) {
      // 없다면 또다른 네트워크
      dfs(i);
      // 네트워크의 개수 증가
      answer += 1;
    }
  }
  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);
console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ])
);
```