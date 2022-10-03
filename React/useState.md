# useState의 동작 원리

## 함수 컴포넌트의 상태관리
클래스형 컴포넌트와 달리 함수 컴포너트는 렌더링이 발생하면 함수 자체가 다시 호출된다.
때문에 상태를 관리하려면 함수가 다시 호출되었을 때 이전 상태를 기억하고 있어야 한다.
<br/>
useState Hook은 이를 클로저를 통해 해결한다.


### state 값의 저장 (캡처링)

useState함수로 값을 업데이트 할 수 있는 setState() 액션 함수와 state함수의 반환값(value)을 반환한다.<br/>
클로저가 value 변수를 캡처링하고 있기 떄문에 함수 컨텍스트가 종료된 이후에도 접근이 가능하다.

```js
const useState = (initialValue) => {
  let value = initialValue;
  
  const state = () => value;

  const setState = (newValue) => {
    value = newValue;
  };
  
  return [state, setState];
};


const [counter, setCounter] = useState(0);

console.log(counter()); // 0
setCounter(1);
console.log(counter()); // 1
```

### state를 변수로 구현
state가 useState 내부에 있으면 변수로 리턴하는 순간 state의 값을 변경할 수 없기 때문에 (이미 반환되었으므로) state를 useState의 외부에 선언한다.

```js
const MyReact = (function () {
  let state;

  return {
    useState(initialValue) {
      state ||= initialValue;

      const setState = (newValue) => {
        state = newValue;
      };

      return [state, setState];
    },
  };
})();

```

### useState 다수 구현
useState는 한 컴포넌트에서만 사용되지 않는다.<br/>
여러 함수형 컴포넌트에서 사용되기 때문에 이를 위해 state를 배열 형태로 저장한다.<br/>
useState의 호출 순서대로 상태값과 setter함수를 저장하고 index를 통해 접근한다.<br/>
```js
let state = [];
let setters = [];
let cursor = 0;
let firstrun = true;

const createSetter = (cursor) => {
  return (newValue) => {
    state[cursor] = newValue;
  };
};

const useState = (initialValue) => {
  if (firstrun) {
    state.push(initialValue);
    setters.push(createSetter(cursor));
    firstrun = false;
  }

  const resState = state[cursor];
  const resSetter = setters[cursor];
  cursor++;

  return [resState, resSetter];
};
```

### Hook 이용 규칙
이러한 구현을 이유로 리액트에서는 Hook을 안전하게 사용하기 위한 규칙을 정의하였다.

1. 컴포넌트 내부의 최상위 스코프에서만 hook을 호출하여야 한다.
   - 반복문, 조건문, 중첩함수에서 hook을 호출하면 안된다.
   - 조건에 따라 hook의 호출이 달라지면 저장되었던 state를 index를 통해 정확하게 접근할 수 없다.
2. React 함수 컴포넌트 내에서만 hook을 호출해야 한다.

## useState 훅의 배치 프로세스

If the new state is computed using the previous state, you can pass a function to setState.<br/>
새로운 상태가 바로 이전 상태를 통해 계산되어야 하면 함수를 써야 합니다.
<br/><br/>
React may batch multiple setState() calls into a single update for performance.
<br/>
During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.<br/>
리액트는 퍼포먼스 향상을 위해 특별한 배치 프로세스를 사용하기 때문입니다.
<br/>
여러 setState 업데이트를 한 번에 묶어서 처리한 후 마지막 값을 통해 state를 결정하는 방식입니다.

```js
const Counter = () => {
  const [count, setCount] = useState(0);

  const increase1 = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  const increase2 = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }
}

export default Counter;
```
위 코드에서 increase1을 실행하는 경우 count는 1이다<br/>
코드 전에서 설명한 것처럼 리액트의 useState훅은 배치 프로세스를 사용하기 때문에 setState액션을 한번에 묶어 처리하기 때문이다.<br/>
반면 increase2를 실행하는 경우는 이전 상태를 통해 새로운 상태를 결정하여 setState하기 때문에 원하던 결과처럼 count는 3이 된다.
