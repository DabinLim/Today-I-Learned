# Type Alias

새로운 타입을 지정할 수 있다.<br>

```
type Text = string;
const name: Text = 'dabin';
```
> Text라는 새로운 타입을 만들고 string으로 지정한다.


```
type Student = {
    name: string;
    age: number;
};

const student: Student = {
    name: 'dabin',
    age: 28,
};
```
> object를 타입으로 지정하면 해당하는 키와 타입만 지정할 수 있다.

## String Literal Types

문자열 자체를 타입으로 지정하면 해당하는 문자열만을 할당할 수 있다.

```
type Name = 'name';
let dabinName: Name;
dabinName = 'name';
```
