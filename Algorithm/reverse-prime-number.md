# 뒤집은 소수

## 문제
N개의 자연수가 입력되면 각 자연수를 뒤집은 후 그 뒤집은 수가 소수이면 그 소수를 출력하는 프로그램을 작성하시오.<br>
예를 들어 32를 뒤집으면 23이고, 23은 소수이므로 23을 출력한다.

## 조건
- N(3<=N<=100)개의 자연수들이 주어진다.

## 출력
뒤집은 소수를 출력한다. 출력 순서는 입력된 순서대로 출력한다.

## 풀이

```js
function solution(arr) {
    let result;
    // 배열의 자연수 뒤집기
    let reverseArr = arr.map(v => parseInt(v.toString().split('').reverse().join('')), 10);
    // 소수 판별을 위해 가장 큰 수 구하기
    const max = Math.max(...reverseArr);
    // 에라토스테네스의 체를 활용한 소수 판별을 위한 boolean 값으로 구성된 2차원 배열 생성
    const cheArr = Array(Math.max(...reverseArr) + 1).fill(true).fill(false, 0, 2);
    for (let i = 2; i * i <= max; i ++) {
        if (cheArr[i]) {
            for (let j = i * i; j <= max; j += i) {
                cheArr[j] = false;
            }
        }
    }

    // 소수 판별
    result = reverseArr.filter(v => cheArr[v]);
    
    return result;
}

console.log(solution([32, 55 ,62, 20, 250, 370, 200, 30, 100]));
```