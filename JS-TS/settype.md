# 타입 지정하기

## 인자와 리턴값

넘버 타입의 num1과 num2를 인자로 받아 넘버 타입을 리턴

```
function add(num1:number, num2:number):number{
    return num1 + num2;
}
```

## Rest parameter

여러개의 넘버타입을 인자로 받아 배열로 사용

```
function addNumbers(...numbers:number[]): number{
    return numbers.reduce((a, b) => a + b);
}
```

## Array

배열의 타입을 지정하는 두가지 방법

```
const number = Array<number> = [1,2,3];
const string = string[] = ['a','b'];
```

readonly를 사용하기 위해서는 두번째 방식을 사용해야 한다.(불변성을 위해 사용)

```
function printArray(fruits: readonly string[]){}
```

## Tuple

index로 접근이 가능하지만 권장하지 않는다.<br>
index로 접근할 경우 가독성이 떨어지기 때문이다.<br>
object distructing을 통해 object처럼 사용 가능하다.

```
let student: [string, number];
student = ['name', 123];
student[0] // name
student[1] // 123

// object distructing
const [name, age] = student;
```