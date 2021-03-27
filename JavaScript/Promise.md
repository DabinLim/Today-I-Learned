# Promise

- JavaScript는 싱글 쓰레드로 동작하는 언어이다.( 메인쓰레드 하나 , 콜스택 하나 )

- 작업을 시작하면 콜스택에 작업이 쌓이고 실행이 끝나면 사라진다.

- JavaScript는 코어 엔진만 가지고 돌아가지 않는다.<br>
실행환경 (런타임) 의 도움을 받아 동시 실행을 한다.<br>
(***WebApi (dom, ajax, setTimeout...)***, Task Queue(콜백 큐), Event Loop 등)

- JavaScrip의 비동기 처리 방식 작업 : -> ***콜스택*** -> api에게 처리 요청(위임) -> setTimeout만큼 기다림 -> 콜백큐에 콜백함수 넘겨줌 -> 이벤트루프를 통해 ***콜스택***에 콜백함수 넘겨줌 -> 콜스택에서 처리 후 사라짐

## Call back 이란?

<br>
콜백은 자바스크립트가 비동기 처리를 하기 위한 패턴 중 하나이다.<br>
전통적인 콜백 패턴은 일명 콜백 헬로 불리는 엄청난 중첩 문제가 생기기 쉽다.<br><br>

1. 콜백 헬

- 꼬리에 꼬리를 무는 비동기 처리가 늘어나면 호출이 계속 중첩되고, 코드가 깊어지며, 관리는 어려워 진다. 이런 깊은 중첩을 ***콜백 헬*** 또는 ***멸망의 피라미드*** 라고 부른다.

- 비동기 처리 시에는 실행 완료를 기다리지 않고 바로 다음 작업을 실행한다.<br>
즉, 코드 순서대로 작업이 이뤄지지 않는다.

- 비동기 처리 함수 내에서 처리 결과를 반환하는 걸로는 원하는 동작을 하지 않으니, 콜백 함수를 사용해 원하는 동작을 하게 하려고 콜백 함수를 쓴다.

- 이 콜백 함수 내에서 또 다른 비동기 작업이 필요한 경우 중첩이 생기며 콜백 헬 탄생

# Promise 란?

비동기 연산이 종료된 이후 결과를 알기 위해 사용하는 객체<br>
프라미스를 쓰면 비동기 메소드를 마치 동기 메소드처럼 값을 반환할 수 있다.<br>
ES6에서 도입한 또다른 비동기 처리 패턴이다.<br><br>

1. Promise 생성

- Promise 생성자 함수를 통해 생성한다.(객체)
- 비동기 작업을 수행할 콜백 함수를 인자로 전달 받아서 사용한다.

```
// 인자로 (resolve, reject) => {} 이런 excutor 실행자를 받는다.
// 이 실행자는 비동기 작업이 끝나면 바로 두가지 콜백 중 하나를 실행한다.
// resolve: 작업이 성공한 경우 호출할 콜백
// reject: 작업이 실패한 경우 호출할 콜백

const promise = new Promise((resolve, reject)) => {
    if(...){
        ...
        resolve('성공');
    }else{
        ...
        reject('실패');
    }
};
```

2. Promise의 상태값

- pending : 비동기 처리 수행 전 ( resolve, reject가 아직 호출 되기 전 )
- fulfilled : 수행 성공 ( resolve가 호출된 상태 )
- rejected : 수행 실패 ( reject가 호출된 상태 )
- settled : 성공 or 실패 ( resoleve나 reject가 호출된 상태 )

3. Promise 후속 처리 메소드

- Promise로 구현된 함수는 Promise 객체를 반환한다.
- Promise로 구현된 비동기 함수를 호출하는 측에서는 이 Promise 객체의 후속처리 메소드를 통해 비동기 처리 결과를 받아서 처리해야 한다.

- then(성공 시, 실패 시) , 첫번째 인자만 넘겨도 된다.

```
// 1초 후 무조건 성공하는 Promise 객체

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {resolve('성공완료!')}, 1000);
});

// 후속 처리

promise.then(result => {
    console.log(result);
}, error => {
    console.log('error');
});

// Promise{<pending>} -> 1초 후 성공완료! 반환

// Promise{<fulfilled>: '성공완료!'}
```

3. Promise chaining 

- Promise 후속 처리 메서드를 체이닝해서 여러 개의 Promise를 연결

```
new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise 1'), 1000);
}).then((result) => {                // 후속 처리 메소드
    console.log(result);             // promise 1
    return 'promise2';          
}).then.((result) => {               // 연달아 후속 처리
    console.log(result);            
    return 'promise3';
}).then(...);
```

4. async


- 함수 앞에 async를 붙여서 사용
- 항상 Promise를 반환

```
async function myFunc() {
    return '비동기'
}

myFunc().then(result => {
    console.log(result);
});

// 비동기
// Promise{<fulfilled>:undefined}

```

5. await

- async 함수 안에서만 동작한다.
- Promise가 처리될 때까지 기다렸다가 그 이후에 결과를 반환한다.

```
async function myFunc() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('완료'),1000);
    });

    console.log(promise);           // Promise {<pending>}
    let result = await promise;     // 기다림 ~~~~~~ 완료
    console.log(promise);           // Promise {<fulfilled>:'완료'}
    console.log(result);            // 완료
}
```