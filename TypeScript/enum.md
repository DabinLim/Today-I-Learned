# enum

자바스크립트에서는 enum타입이 존재하지 않는다.<br>
상수들을 묶어서 사용하기 위해 사용하지만 타입스크립트에서는 enum을 사용하는 경우 타입이 보장되지 않기 때문에 union을 이용해서 사용하는 것을 권장한다.<br>
다만 모바일 클라이언트에서 사용하는 네이티브 클라이언트 언어에서는 서로 이해할 수 있는 enum 타입을 사용한다.

```
enum Days {
    Monday, // 0
    Tuesday, // 1
    Wednesday, // 2
    Thursday, // 3
    Friday, // 4
    Saturday, // 5
    Sunday // 6
}

const day = Days.Saturday;
console.log(day) // 5 
```

```
let day : Days = Days.Saturday;
day = 10;
console.log(day) // 10;
```
> day에 10을 할당해도 아무런 오류가 발생하지 않는다.

```
type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';

let dayOfweek: DaysOfWeek = 'Monday';
dayOfweek = 'Wednesday';
```