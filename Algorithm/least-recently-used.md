# LRU (카카오 캐시 변형문제)

## 문제

캐시 메모리는 Least Recently Used 알고리즘을 따라 작동한다.<br>
캐시메모리의 사이즈가 주어지고 작업이 순서대로 주어졌을때 작업이 캐시에 있다면 해당 작업을 가장 앞으로, 캐시에 없다면 가장 앞에 작업을 추가하고 오래된 작업을 삭제하도록 구현한다.

## 조건

- 캐시 메모리 사이즈 S(3<=S<=10)와 5~1000개 사이의 작업이 배열로 주어진다.
- 작업번호는 1 ~ 100이다.

## 출력

마지막 작업 후 캐시메모리의 상태를 가장 최근 사용된 작업부터 차례로 출력한다.

## 입력 예시

- 5
- [1, 2, 3, 2, 6, 2, 3, 5, 7]

## 출력 예시

[ 7, 5, 3, 2, 6 ]

## 설명

5 사이즈의 캐시메모리 [0, 0, 0, 0, 0]이 있고 순서대로 작업을 할때마다 캐시에 저장한다.<br>
첫번째 작업 1이 들어오면 캐시에 저장되어 [1, 0, 0, 0, 0]이 되고<br>
두번째 작업 2가 들어오면 가장 앞에 저장되어 [2, 1, 0, 0, 0]이 된다.<br>
다음 3이 들어오면 [3, 2, 1, 0, 0]이 되고 다음 2가 들어오면 캐시에 2 작업이 이미 있기 때문에 해당 작업을 가장 앞으로 돌려 [2, 3, 1, 0, 0]이 된다.<br>
모든 작업이 끝날때까지 반복한다.

## 삽입정렬을 이용한 풀이

```js
function solution(size, arr) {
  let answer = Array.from({ length: size }, () => 0);
  arr.forEach((x) => {
    const hitIndex = answer.findIndex((v) => v === x);
    if (hitIndex === -1) {
      // 캐시에 없는 경우 하나씩 모두 뒤로 미루고
      for (let i = size - 1; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    } else {
      // 캐시에 있다면 해당 작업 뒤부터 하나씩 미루고
      for (let i = hitIndex; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    }
    // 앞에 삽입
    answer[0] = x;
  });
  return answer;
}

console.log(solution(5, [1, 2, 3, 2, 6, 2, 3, 5, 7]));


```

### 내장함수를 이용한 풀이

```js
function solution(size, arr) {
  let answer = Array.from({ length: size }, () => 0);
  arr.forEach((x) => {
    const hitIndex = answer.findIndex((v) => v === x);
    if (hitIndex === -1) {
      // 캐시에 없는 경우 맨 앞에 하나를 넣고 맨 뒤에 하나는 pop
      answer.unshift(x);
      if (answer.length > size) {
        answer.pop();
      }
    } else {
      // 캐시에 있다면 해당 인덱스를 맨 앞으로
      answer.splice(hitIndex, 1);
      answer.unshift(x);
    }
    // 앞에 삽입
    answer[0] = x;
  });
  return answer;
}
```
