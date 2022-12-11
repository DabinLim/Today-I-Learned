# 아나그램

## 문제
아나그램이란 두 문자열의 알파벳 나열 순서가 다르지만 그 구성이 일치하는 경우를 말한다.
예를 들어 AbaAeCe, baeeACA 두문자열은 나열 순서가 다르지만 A(2), a(1), b(1), C(1), e(2)로 구성이 동일하므로 아나그램이다.

## 조건
- 두 문자열이 주어진다.
  
## 출력
아나그램이면 YES 아니면 NO를 출력한다.

## 입력 예시
1. AbaAeCe, baeeACA
2. abaCC, Caaab
## 출력 예시
1. YES
2. NO

## 풀이

```js
function solution(str1, str2) {
    let answer = "YES";
    let hash = new Map();
    for (let x of str1) {
        if (hash.has(x)) hash.set(x, hash.get(x) + 1);
        else hash.set(x, 1);
    }

    for (let y of str2) {
        // 존재하지 않는 key 값이 있거나 이미 모든 value를 다빼줬음에도 남아있다면 아나그램이 아니다.
        if (!hash.has(y) || hash.get(y) === 0) return "NO";
        // 일치하는 key값의 value를 하나씩 빼준다.
        else hash.set(y, hash.get(y) - 1);
    }

    return answer;
}

console.log(solution('AbaAeCe', 'baeeACA')); // YES
console.log(solution('abaCC', 'Caaab')); // NO
```