# 투포인터 알고리즘 (연속 부분 수열)

투포인터 알고리즘은 두개의 포인터 변수를 가지고 배열을 탐색하는 알고리즘이다.<br>
대표적인 예시로 배열의 부분 수열의 합을 특정 숫자인 경우의 수를 구하는 문제가 있는데 이를 완전 탐색으로 해결하게 되면 2중 반복문을 돌면서 O(N^2)의 시간이 걸리게 된다.<br>
하지만 투포인터 알고리즘을 활용하면 배열을 한번만 탐색하기 때문에 O(N)의 시간이 걸린다.<br>
다음 예시코드는 배열의 부분 수열의 합은 n(6)이 되는 경우의 수를 구하는 코드이다.

```js
let arr = [1,2,1,3,1,1,1,2];

let left = 0;
let right = 1;
let n = 6;

let sum = arr[left];
let count = 0;
    
while(right < arr.length) {
    if (sum === n) {
        count += 1;
        sum -= arr[left ++];
        continue
    } else if (sum < n) {
        sum += arr[right ++];
    } else {
        sum -= arr[left ++];
    }
}

console.log(count);
```