# Assertions

return 값의 타입이 확실할때 타입을 강제하여 사용한다.

```
function StrFunc(): any {
    return 'string';
}

const result = StrFunc();
console.log((result as string).length);
console.log((<string>result).length);
```
> result의 타입을 string으로 강제하여 length를 출력한다.

```
function StrFunc(): any {
    return 2;
}

const result = StrFunc();
console.log((result as string).length);
```
> 타입을 string이라고 확신 하였으므로 컴파일 에러가 발생하지는 않지만 undefined가 출력된다.

```
function StrFunc(): any {
    return 2;
}

const result = StrFunc();
console.log((result as Array<number>).push(1));
```
> number로 이루어진 Array라고 확신 하였지만 실제 리턴값은 number타입 이므로 result.push is not a function 이라는 에러가 발생한다.

<br>

위와 같은 이유로 타입을 확실하게 단정하는 경우가 아니라면 assertion은 사용하지 않는다.

```
function findNumbers(): number[] | undefined {
    return undefined;
}
const numbers = findNumbers()!;
numbers.push(2);
```
> numbers의 타입은 undefined 일 수도 있지만 !를 사용하여 확신한다면 push 를 사용할 수 있다.
