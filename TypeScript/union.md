# Union Types 

발생할 수 있는 모든 경우에 대해 한가지만을 담을 수 있는 타입을 담을 때 사용한다. (or)

```
type Direction = 'left' | 'right' | 'up' | 'down' ;

function move(direction: Direction) {}
```
> Direction 타입은 left, right, up, down 중 한가지만 받을 수 있다.

```
type Size = 8 | 16 | 32;
const size: Size = 16;
```
> Size 타입은 8, 16, 32중 하나만 받을 수 있다.

```
type SuccessState = {
    response: {
        body: string;
    };
};

type FailState = {
    reason: string;
};

type LoginState = SuccessState | FailState;

function login(id: string, password: string): Promise<LoginState> {
    return {
        response: {
            body: 'logged in!',
        },
    };
};

function printLoginState(state: LoginState): void {
    if('response' in state){
        console.log(state.response.body);
    } else {
        console.log(state.reason);
    }
}
```
> LoginState라는 타입을 지정하여 login에 성공했을경우 SuccessState를 실패한 경우 FailState를 출력할 수 있다.<br>

## discriminated union


```
type SuccessState = {
    response: {
        result:'success';
        body: string;
    };
};

type FailState = {
    result:'fail';
    reason: string;
};

type LoginState = SuccessState | FailState;

function login(id: string, password: string): Promise<LoginState> {
    return {
        result:'success'
        response: {
            body: 'logged in!',
        },
    };
};

function printLoginState(state: LoginState): void {
    if(state.result === 'success'){
        console.log(state.response.body);
    } else {
        console.log(state.reason);
    }
}
```
> 공통적으로 result 값을 지정하여 result 값에 따라 출력하여 가독성을 더 좋게 만들 수 있다.