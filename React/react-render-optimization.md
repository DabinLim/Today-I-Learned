# 리액트 렌더링 최적화

## 최적화 전 체크
1. 함수형 컴포넌트는 <strong>함수</strong>다.
2. 컴포넌트가 리렌더링 되면 함수가 다시 호출된다는 것을 말한다.<br>함수 내부에 선언된 표현식도 매번 다시 선언되어 사용된다.
3. 컴포넌트는 자신의 state 또는 부모에게 넘겨 받는 props가 변경될때, 부모가 리렌더링 될때마다 리렌더링 된다.

## Memoization
- 결과를 캐싱하고, 다음 작업에서 캐싱한 것을 재사용 하는 비싼 작업의 속도를 높이는 자바스크립트 기술
- 이전 값을 메모리에 저장해 동일한 계산의 반복을 제거해 빠른 처리를 가능하게 하는 기술
- 캐시에 초기 작업 결과를 저장하여 사용함으로써 최적화 할 수 있다.

## useCallback

useCallback은 함수를 Memoization하는데 사용된다.<br>
2번째 인자로 넘긴 디펜던시 배열을 참조해 디펜던시 값이 바뀌는 경우 새로운 함수를 생성한다.
```js
const [someValue, setSomeValue] = useState('');

// someValue 값이 바뀐 경우에만 새로운 someValue값을 가지고 새로운 함수를 만들어 Memoization한다.
const handleButtonClick = useCallback(() => {
    console.log(someValue)
},[someValue])

```

## useMemo
useMemo는 Memoization된 값을 반환한다.<br>
```js
const [color, setColor] = useState('');
// color 값이 바뀐 경우에만 새로운 color 값이 반영된 함수의 반환값을 Memoization한다.
const colorKor = useMemo(() => getColorKor(color), [color])
```

## React.memo
```js
const Button = ({title, onClick}) => {
  return (
    <button type="button" onClick={onClick}>
    {title}
    </button>
  );
};

export default memo(Button);
```

React.memo는 컴포넌트를 직접 감싸서 사용한다.<br>
Button의 결과를 Memoization해서 props가 변경될때까지 현재 memoized된 내용을 그대로 사용하여 리렌더링을 막는다.<br>
Memoized된 내용을 재사용하여 렌더시 가상 DOM에서 바뀐 부분을 확인하지 않아 성능이 향상된다.<br>
React.memo는 props를 비교할 때 얕은 비교를 진행하므로 원시값이 아닌 경우 참조하는 메모리 주소를 비교하게 된다.<br>

### 주의점
Memoization용 메모리가 추가로 필요하기 때문에 최적화를 위한 연산이 불필요한 경우에는 비용만을 발생시키므로 사용을 지양해야 한다.<br>
일반적으로 class 기반의 컴포넌트에 사용되는 것 또한 적절하지 않다. 이 경우에는 PureComponent를 확장하여 사용하거나 shouldComponentUpdate()를 사용이 권장된다.<br><br>

<strong>props로 전달되는 callback 함수</strong><br>

```js
function App() {
  const [value, setValue] = useState('');
  const handleValueChange = (e) => {
    setValue(e.target.value)
    
  }
  const handleButtonClick = useCallback((param) => {
    console.log(param)
  },[]);
  return (
    <div className="App">
      <Button title={'테스트 버튼'} onClick={() => handleButtonClick('clicked')} />
      <input type="input" value={value} onChange={handleValueChange} />
    </div>
  );
}

export default App;
```
위 코드에서와 같이 부모 컴포넌트에서 props로 인라인 함수를 전달하는 경우 해당 함수는 리렌더링마다 새로운 함수로 만들어지기 때문에 Button 컴포넌트 내부에서는 props가 바뀐 것으로 인식하여 React.memo로 감쌌음에도 불구하고 리렌더링이 된다.<br>
때문에 아래와 같이 인라인 함수를 사용하지 않는 방식으로 최적화를 할 수 있다.

```js
function App() {
  const [value, setValue] = useState('');
  const handleValueChange = (e) => {
    setValue(e.target.value)
    
  }
  const handleButtonClick = useCallback((param) => {
    return () => {
        console.log(param)
    }
  },[]);
  return (
    <div className="App">
      <Button title={'테스트 버튼'} onClick={handleButtonClick('clicked')} />
      <input type="input" value={value} onChange={handleValueChange} />
    </div>
  );
}

export default App;
```

<strong>React.memo는 성능 개선의 도구다.</strong><br>
React.memo는 Memoization을 통해 불필요한 리렌더링을 방지하여 성능 개선을 돕는다.<br>
그렇지만 렌더링을 막는 목적으로 Memoization에 의존해서는 안된다.
<br>

<strong>React.memo를 사용해야 하는 경우</strong>

- 함수형 컴포넌트에 같은 props에 같은 렌더링 결과를 제공하는 경우
- UI element의 양이 많은 컴포넌트의 경우
- Pure Functional Component의 경우

## key prop
리액트 컴포넌트에 부여되는 key 속성은 컴포넌트 인스턴스를 새로 갱신해주기 때문에 리렌더를 일으킨다.<br>
key가 변경될 때 새로 그려지기 때문에 배열을 매핑할 때 변경 가능성이 있는 index를 key로 지정하는 경우에는 주의해서 판단해야 한다.<br>
고유한 id를 key로 지정하면 의도치 않은 리렌더가 발생할 우려를 하지 않아도 된다.
