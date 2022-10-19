# React의 Context Api

## Context란?

일반적인 React 애플리케이션에서 데이터는 위에서 아래로 (즉, 부모로부터 자식에게) props를 통해 전달되지만, 애플리케이션 안의 여러 컴포넌트들에 전해줘야 하는 props의 경우 (예를 들면 선호 로케일, UI 테마) 이 과정이 번거로울 수 있습니다. context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.<br>

[React 공식문서의 Context](https://ko.reactjs.org/docs/context.html)
<br>
공식문서에 따르면 Context는 전역적인 데이터를 공유하기 위해 고안되었다. 예를 들면 로그인한 유저 정보나 테마 같은 데이터들
<br>
그러나 context를 사용하면 컴포넌트를 재사용하기 어려워지므로 꼭 필요할때만 사용하는 것이 좋다.
<br>
여러 단계에 거쳐 props를 넘기는 걸 대체하는 방법으로 컴포넌트 합성을 사용하는 방법도 있다.

## API

### React.createContext
Context 객체를 만든다.<br>
Context 객체를 구독하는 컴포넌트를 렌더링할 때 React 트리 상위에서 가장 가까이 있는 Provider로부터 현재값을 읽는다.
<br><br>
defaultValue 적절한 Provider를 찾기 못했을 때 쓰이는 값이다.<br>
Provider에 undefined 값을 보내면 구독 컴포넌트는 undefined을 읽지 defaultValue를 읽지는 않는다.

```js
const MyContext = React.createContext(defaultValue);
```

### React.Provider
Provider는 구독한 컴포넌트들에게 context객체의 변화를 알린다.<br>
Provider를 구독한 컴포넌트는 Provider의 value prop이 바뀔때마다 다시 렌더링 되며 이 전파는 shouldComponentUpdate 메서드가 적용되지 않으므로 상위 컴포넌트가 업데이트를 건너 뛰어도 구독한 컴포넌트는 업데이트 된다.<br>
```js
<MyContext.Provider value={}>
```
context 값의 변경 여부는 Object.is와 동일한 알고리즘을 사용한다.
> 위와 같은 이유로 객체를 value 값으로 사용하는 경우 주의를 요한다.
> 예를 들어 아래와 같이 사용되는 경우 매번 새로운 객체를 생성하기 때문에 Provider가 렌더링 될때마다 구독 컴포넌트가 모두 리렌더링 된다.
```js
export default function App() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
}
```
> 아래와 같이 state로 끌어올려 사용하여 방지한다.
```js
export default function App() {
    const [someContext, setSomeContext] = useState({something: 'something'})
    return (
      <MyContext.Provider value={someContext}>
        <Toolbar />
      </MyContext.Provider>
    );
}
```

### Context.Consumer
함수 컴포넌트에서 context를 구독한다.<br>
Context.Consumer의 자식은 함수여야 한다.
이때 value 매개변수는 해당 context Provider중 가장 가까운 Provider의 value prop과 동일하다.
```js
<MyContext.Consumer>
    {value => (<MyComponent props={value}/>)}
</MyContext.Consumer>
```

### Context.displayName
개발자 도구에서 노출되는 Context의 이름을 지정한다.
```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

## 값이 변하는 context
theme 값이 변하는 Consumer 예시이다.
```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext(
  themes.dark // 기본값
);

export default function Content() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <div style={{backgroundColor: theme.backgroundColor}}>
            )}
        </ThemeContext.Consumer>
    )
}
```

## context 업데이트

```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext({
  theme: themes.dark
});

export default function App() {
    const [someContext, setSomeContext] = useState({
        toggleTheme: () => {
            setSomeContext((state) => ({
                ...state,
                theme: state.theme === themes.dark ? themes.light : themes.dark,
            }))
        },
        theme: themes.dark,
    })

    return (
      <ThemeContext.Provider value={someContext}>
        <ThemeContext.Consumer>
        {theme => <button type='button' onClick={theme.toggleTheme}>테마를 바꾸는 매직</button>}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    );
}
```


## 여러 Context를 구독
context의 변화로 인한 렌더링 과정을 빠르게 유지하기 위해 각 context마다 consumer를 개별 노드로 만들게 설계 되어있다.<br>
즉, 관심사 분리를 통해 필요한 컴포넌트만 리렌더링 할 수 있도록 설계 되었다는 뜻이다.<br>
둘 이상의 Context를 구독하기 위해 아래와 같이 중첩되도록 사용할 수 있다.
```js
// 여러 context의 값을 받는 컴포넌트
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```