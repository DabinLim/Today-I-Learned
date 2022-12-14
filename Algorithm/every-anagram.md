# 모든 아나그램 찾기 (해쉬 + 슬라이딩 윈도우)

## 문제
S 문자열에서 T 문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하여라.

## 조건
- 두 문자열이 주어진다.
  
## 출력
S 단어에 T 문자열과 아나그램이 되는 부분문자열의 개수를 출력한다.

## 입력 예시
bacaAacba, abc
## 출력 예시
3

## 풀이

```js
function solution(s, t) {
    let count = 0;
    let hash = new Map();

    for (let x of t) {
        if (hash.has(x)) hash.set(x, hash.get(x) + 1);
        else hash.set(x, 1);
    }

    for (let i = 0; i < s.length; i ++) {
        // 부분 문자열과 확인용 해시
        let str = '';
        let checkHash = new Map(hash);

        // 남은 부분문자열이 t의 길이보다 낮게 되므로 break
        if (i + t.length > s.length) break;

        // 부분 문자열 추출
        for (let j = i; j < i + t.length; j ++) {
            str += s[j];
        }
        
        // 부분문자열과 t가 아나그램인지 확인
        for (let l = 0; l < str.length; l ++) {
            if (!checkHash.has(str[l]) || checkHash.get(str[l]) === 0) break;
            else {
                checkHash.set(str[l], checkHash.get(str[l]) - 1);
                // 아나그램이 맞으면 count 증가
                if (l === str.length - 1) {
                    count += 1;
                }
                
            }
        }
    }

    return count;
}

console.log(solution('bacaAacba', 'abc'));
```