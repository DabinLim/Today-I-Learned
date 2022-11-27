# K번째 큰 수

## 문제
1부터 100 사이의 자연수가 적힌 N장의 카드가 있다.<br>
같은 숫자의 카드가 여라장 있을 수 있으며 이 중 3장을 뽑아 카드의 숫자를 합한 값을 기록하려 한다.<br>
모든 3장을 뽑을 수 있는 경우를 기록하여 그 중 K 번째로 큰 수를 출력한다.

## 조건
- N(3<=N<=100)만큼의 카드가 주어진다.
- K번째 수를 출력하기 위한 K(1<=K<=50)가 주어진다.
  
## 출력

첫 줄에 K번째 수를 출력한다, K번째 수가 존재하지 않으면 -1을 출력한다.

## 풀이

```js
function solution() {
    let k = 3;
    let arr = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
    let n = arr.length;
    let resultArr = [];
    let result;
    arr.forEach((i, indexI) => {
        arr.forEach((j, indexJ) => {
            arr.forEach((l, indexL) => {
                if (indexI !== indexJ && indexJ !== indexL && indexI !== indexL) {
                    // 3가지 카드를 뽑는 경우의수 모두 배열에 push
                    resultArr.push(i + j + l);
                }
            })
        })
    })
    // 중복 제거 및 sort
    const sorted = Array.from(new Set(resultArr)).sort((a, b) => b - a);
    // k번째 (k-1번째 인덱스)보다 배열이 작으면 k번째 수가 존재하지 않으므로 -1
    if (sorted.length >= k) {
        result = sorted[k - 1];
    } else {
        result = -1;
    }
    return result;
}

console.log(solution());
```