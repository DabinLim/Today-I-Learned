# Array.prototype.copyWithin()

copyWithin() 메소드는 배열의 일부를 얕게 복사한 뒤, 동일한 배열의 다른 위치에 덮어쓰고 그 배열을 반환한다.<br/>
이 때, 배열의 길이를 수정하지 않고 반환한다.<br/>
[Array.prototype.copyWithin()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

## 구문
```js
arr.copyWithin(target[, start[, end]]);
```

### 매개변수
- target: 복사한 값을 넣을 위치, index로 지정한다.<br/>예를 들어 [1,2,3,4,5] 에서 마지막 4, 5를 복사하여 target변수를 0으로 지정하게되면 0번째 index 로부터 4, 5를 대체하여 [4,5,3,4,5] 결과값을 얻게 된다.
- start (optional): 복사를 시작할 위치를 가리키는 index, default 값은 0으로 배열의 처음부터 복사
- end (optional): 복사를 끝낼 위치를 가리키는
index, default 값은 배열의 길이로 끝까지 복사한다.<br/> end 파라미터로 넘긴 인덱스값의 전까지만 복사한다.

## 예제
```js
[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]
// 0번째 인덱스부터 배열의 마지막 인덱스까지 복사, 뒤에서 2번째 인덱스(3)부터 덮어쓰고 나머지 3,4,5는 버려진다 (길이 유지)

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
// 3번째 인덱스부터 배열의 마지막 인덱스[4, 5]까지 복사, 0번째 인덱스부터 덮어쓰고 나머지 3,4,5는 유지된다. (길이 유지)

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]
// 3번째 인덱스부터 4번째 인덱스 전까지[3]까지 복사, 0번째 인덱스부터 덮어쓰고 나머지 2,3,4,5는 유지된다. (길이 유지)

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]
// -3번째 인덱스부터 -1번째 인덱스 전까지[3, 4]까지 복사, -2번째 인덱스부터 덮어쓰고 앞의 1,2,3은 유지된다.

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}
// 3번째 인덱스(1)부터 마지막 인덱스까지 복사한뒤 0번째 인덱스부터 덮어씌운다.
```

## 주의점
1. 얕은 복사이므로 원본 배열(객체)에 영향을 끼친다.
```js
const array = [1,2,3,4,5];
array.copyWithin(0, 3);
console.log(array)
// [4, 5, 3, 4, 5]
// 원본객체에 영향을 끼침
```

```js
const array = [1,2,3,4,5];
const result = array.copyWithin(0, 2);
console.log(array);
result.copyWithin(0, 2);
console.log(array);
/*
[ 3, 4, 5, 4, 5 ]
[ 5, 4, 5, 4, 5 ]
*/
// 반환된 배열 또한 원본 배열과 같은 메모리를 참조하고 있다.
```

2. 복사된 값이 없다면 delete한다.
```js
[].copyWithin.call({length: 5, 1: 3, 3: 1}, 0, 3)
// { '0': 1, '3': 1, length: 5 }
// 길이는 5이므로 3번째 인덱스 부터 마지막 인덱스까지 복사하면 [1, undefined]를 복사하게 된다.
// 0번째 인덱스부터 덮어씌우게 되면 0번째 인덱스는 1이 되고 1번째 인덱스는 undefined가 된다.
// undefined는 삭제되어 사라진다.

const thisBind = {
    length: 6,
    0: 2,
    1: 1,
    2: 2,
    3: 3,
}
[].copyWithin.call(thisBind, 1, 3)
// { '0': 2, '1': 3, length: 6 }
// 길이는 6이므로 3번째 인덱스 부터 마지막 인덱스까지 복사하면 [3, undefined, undefined]를 복사하게 된다.
// 1번째 인덱스부터 덮어씌우게 되면 1번째 인덱스는 3이 되고 2,3번째 인덱스는 undefined가 된다.
// undefined는 삭제되어 사라진다.
```