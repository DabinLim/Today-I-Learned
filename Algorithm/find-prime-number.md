# 소수찾기 (프로그래머스)

## 문제

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.<br>

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.<br>

## 조건

- numbers는 길이 1 이상 7 이하인 문자열입니다.
- numbers는 0~9까지 숫자만으로 이루어져 있습니다.
- "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

## 입출력예

- numbers return
- "17" 3
- "011" 2

## 입출력 예 설명

### 1

[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

### 2

[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.<br>
11과 011은 같은 숫자로 취급합니다.

## 풀이

```js
function solution(numbers = "") {
  let answer = [];
  // 경우의 수 구하는 함수 (순열)
  const getPermutations = (arr, num) => {
    const results = [];

    // nP1 이며, 1이면 의미 없기때문에 바로 반환한다.
    if (num === 1) return arr.map((v) => [v]);

    arr.forEach((fixed, index, origin) => {
      // 순열에서는 조합과 달리 순서만 바뀌면 중복이 아니기때문에 기준값을 제외한 나머지 배열을 넣어준다.
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];

      // 나머지 배열을 기준으로 다시 순열을 구한다.
      // 기준값(fixed)이 있기 때문에 선택하려는 개수에서 - 1 을 해준다.
      const permutations = getPermutations(rest, num - 1);

      // 기준값(fixed)에 순열(permutations)을 붙인다.
      const attached = permutations.map((v) => [fixed, ...v]);

      // 붙인 값을 결과 값에 넣어준다.
      results.push(...attached);
    });

    return results;
  };

  let permutations = [];
  const numberArray = numbers.split("");
  // 모든 갯수의 순열을 모두 구함
  for (let i = 1; i <= numberArray.length; i++) {
    permutations = permutations.concat(getPermutations(numberArray, i));
  }

  let filter = permutations
    .filter((permutation) => permutation[0] !== "0")
    .map((permutation) => {
      return parseInt(permutation.reduce((acc, cv) => acc + cv, ""));
    });

  // 중복 제거
  filter = Array.from(new Set(filter));

  let maxNum = Math.max(...filter);
  // 에라토스테네스의 체
  const cheArr = Array(maxNum + 1)
    .fill(true)
    .fill(false, 0, 2);
  for (let i = 2; i * i <= maxNum; i++) {
    if (cheArr[i]) {
      for (let j = i * i; j <= maxNum; j += i) {
        cheArr[j] = false;
      }
    }
  }

  filter.forEach((v) => {
    if (cheArr[v]) {
      answer.push(v);
    }
  });

  return answer.length;
}

console.log(solution("011"));

function solution(numbers) {
  const answer = [];
  let nums = numbers.split("");

  // 소수 판별
  const isPrimeNum = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // 순열 만들기
  const getPermutation = (arr, fixed) => {
    if (arr.length >= 1) {
      for (let i = 0; i < arr.length; i++) {
        const newNum = fixed + arr[i];
        const copyArr = [...arr];
        copyArr.splice(i, 1);
        if (!answer.includes(+newNum) && isPrimeNum(+newNum)) {
          answer.push(+newNum);
        }
        getPermutation(copyArr, newNum);
      }
    }
  };

  getPermutation(nums, "");
  return answer.length;
}
```
