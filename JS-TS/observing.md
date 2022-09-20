# 자바스크립트에서 옵저빙(변수의 변화를 탐지)을 구현하는 방법들

## 옵저버(관찰자) 디자인 패턴

### 리덕스에서 사용되는 옵저버 패턴 예시

디자인 패턴을 파악하기 위한 예시이므로 실제 구현과 차이가 조금 (꽤 많이) 있음에 유의

<br/>

```js
export function createStore() {
    // 외부에서 접근할 수 없도록 클로저 구현
    let state;
    const handlers = [];

    function dispatch(newState) {
        state = newState
        // 호출될때마다 구독된 리스너들 실행
        handlers.forEach((listener) => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    // 리스너 콜백 함수를 등록
    function subscribe(listener) {
        handlers.push(listener);
    }

    return {
        dispatch,
        getState,
        subscribe,
    }
}

const store = createStore()

function renderDom() {
    // 무언가 실제 돔과 가상돔을 비교하여 리렌더링하는중...
    console.log('rerender!');
}

function listener() {
    console.log('변경된 state', store.getState());
    renderDom()
}

store.subscribe(listener)

store.dispatch({
    awesomeData: 'dabin',
});
```

## getter와 setter를 사용

es5에서는 Object.defineProperty를 사용하여 구현하며 es6에서는 get, set 키워드를 사용하여 구현한다.
<br/>
<br/>

### 카운터 예제
```js
// es5
var count = {
}

Object.defineProperty(count, 'number', {
    get() {
        return this.num || 0;
    },
    set(num) {
        this._num = num;
        console.log(this._num);
        document.querySelector('#count').textContent = this._num;
    }
})


document.querySelector('#up').addEventListener('click', function() {
    count.number++;
});
document.querySelector('#down').addEventListener('click', function() {
    count.number--;
});
```

```js
// es6 (es2015)
let count =  {
    get number() {
        return this._num || 0;
    },
    set number(num) {
        console.log(num);
        document.querySelector('#count').textContent = this._num;
    }
};

document.querySelector('#up').addEventListener('click', function() {
    count.number++;
});
document.querySelector('#down').addEventListener('click', function() {
    count.number--;
});
```

## Proxy

es6에서는 Proxy 객체를 통해 구현할 수 있다.

### 카운터 예제

```js
// es6 (es2015) Proxy
const count = {};
const handler = {
    get: (obj, name) => {
        if (name === 'number') {
            return this._num || 0;
        }
    },
    set: (obj, name, value) => {
        if (name === 'number') {
            this._num = value;
            console.log(count);
            document.querySelector('#count').textContent = this._num;
        }
    }
};

const proxy = new Proxy(count, handler);

document.querySelector('#up').addEventListener('click', () => {
    proxy.number++;
});
document.querySelector('#down').addEventListener('click', () => {
    proxy.number--;
});
```

실제 객체와 프록시 객체를 분리하였기 때문에 count 객체는 빈 객체이다.

### 주의할 점
getter에서 대입하는 실수를 하는 경우 무한 루프에 빠져 스택 오버플로우가 일어날 수 있다.

### Proxy란?

Proxy 객체는 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용된다.<br/>
즉 count객체의 속성 접근, 할당에 대한 행동을 새롭게 정의하여 옵저빙을 구현한다.
<br/>
<br/>
Proxy 구문은 다음과 같다.

- target: proxy와 함께 감싸진 target 객체 (native array, function, 다른 proxy를 포함한 객체);
- handler: 프로퍼티들이 function인 객체, 동작이 수행될 때 handler는 proxy의 행동을 정의한다.

```js
new Proxy(target, handler);
```

#### Proxy 기본 getter 예제
프로퍼티가 객체에 존재하지 않는 경우 기본값을 리턴받는 예제
```js
let targetObj = {};
let handler = {
    get: function(target, name) {
        return name in target?
        target[name] : 'default value'
    }
}

let proxy = new Proxy(targetObj, handler);
proxy.a = 1;
proxy.b = undefined;

console.log(proxy.a); // 1
console.log(proxy.b); // undefined
console.log(proxy.c); // default value
```

#### Proxy 기본 setter 예제
setter를 통해 age 프로퍼티의 타입과 범위를 검증하는 예제이다.
```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;
console.log(person.age); // 100
person.age = 'young'; // TypeError
person.age = 300; // RangeError
```