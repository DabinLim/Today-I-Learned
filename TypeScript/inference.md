# Inference (타입추론)

타입스크립트에서 타입을 생략해서 작성할 경우 자동으로 타입이 지정된다.<br>
함수의 경우에는 안에 코드가 많기 때문에 타입 생략은 권장하지 않는다. 다만 void일 경우에는 생략을 해도 된다.

```
let text = 'hello';
```
> text의 type은 string으로 지정된다.

```
function print(message){}
```
> message의 타입은 any로 지정된다.

```
function print(message = 'hello'){}
```
> message의 타입은 string으로 지정된다.

```
function add(num1:number, num2:number){
    return num1 + num2;
}

const result = add(1, 2);
```
> function add 의 리턴값은 타입이 number로 지정되며 result 또한 number로 지정된다.