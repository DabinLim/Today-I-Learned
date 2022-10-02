# 제어 컴포넌트

## 제어 컴포넌트와 비제어 컴포넌트의 차이

### 제어 컴포넌트란 ?
제어 컴포넌트는 사용자 입력을 기반으로 자신의 state를 관리하고 업데이트한다.<br/>
React에 의해 값이 제어디는 입력 폼 엘리먼트를 제어 컴포넌트라고 한다.
```js
export default function Controlled() {
  const [input, setInput] = useState("");
  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input onChange={onChange} />
    </div>
  );
}
```

위 코드처럼 setState()를 통해 값이 제어되는 컴포넌트를 제어 컴포넌트라 한다.<br/>
제어 컴포넌트는 실시간으로 데이터가 동기화되기 때문에 실시간 유효성 검사, 조건부 버튼 비활성화, 실시간 입력 형식 제어 등에 유용하다.<br/>
그러나 값이 바뀔때마다 매번 리렌더링 되기 때문에 불필요한 리렌더링이 발생할 수 있다.<br/>
해결 방법으로는 debounce가 있다.

### 비제어 컴포넌트란 ?
```js
export default function Uncontrolled() {
  const inputRef = useRef();
  const onClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button type="submit" onClick={onClick}>
        전송
      </button>
    </div>
  );
}
```
비제어 컴포넌트란 제어컴포넌트와 달리 리액트에 의해 제어되지 않는다.<br/>
실시간으로 값이 동기화되지 않으며 전송시에 input의 데이터를 가져온다.<br/>
때문에 즉각적인 반응이 어렵다.<br/>
그러나 불필요한 리렌더링을 방지하기 때문에 렌더링 최적화에 유리하다.<br/>
이러한 이점을 활용해 렌더링을 최적화 하는 라이브러리로 react-hook-form이 있다.

### useRef
useRef는 heap영역에 저장되는 자바스크립트 객체이며 변경되어도 동일한 메모리 주소를 바라보고 있기 때문에 리렌더링 되지 않는다.