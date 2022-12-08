# 학급회장

## 문제
학급 회장 후보 A, B, C, D, E 중 학급 회장을 선출하기 위해 투표를 한다.<br>
학생들이 투표한 결과를 바탕으로 선출된 학급회장을 찾는다.

## 조건
- 학생들이 투표한 결과가 문자열로 주어진다.
  
## 출력
선출된 학급회장을 출력한다.

## 풀이

### 리터럴 객체를 이용한 방법
```js
function solution(votes) {
    let hash = {};
    votes.split('').forEach((vote) => {
        if (hash[vote]) hash[vote] += 1;
        else hash[vote] = 1;
    })

    let answer = Object.keys(hash).find(v => hash[v] === Math.max(...Object.values(hash))); 
    
    return answer
}

console.log(solution('BACBACCACCBDEDE'));
```

### Map() 자료형을 이용한 방법
```js
function solution(votes) {
    let hash = new Map();
    votes.split('').forEach((vote) => {
        if (hash.get(vote)) hash.set(vote, hash.get(vote) + 1);
        else hash.set(vote, 1);
    })
    let answer;
    let max = 0;
    for (let [key, val] of hash) {
        if (val > max) {
            max = val;
            answer = key;
        }
    }
    return answer
}

console.log(solution('BACBACCACCBDEDE'));
```