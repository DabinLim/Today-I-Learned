# Portals

Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법을 제공한다.
```js
ReactDom.createPortal(child, container)
```

첫번쨰 인자는 렌더링할 자식요소, 두번째 인자는 container가 될 DOM엘리먼트이다.

## 사용 예시

아래와 같이 부모 컴포넌트의 레이아웃에 구애받지 않고 Application 외부 DOM 요소에 렌더링이 필요한 경우 유용하게 쓰일 수 있다.<br>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
    <title>The Carpet 휴가 대작전</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="modal-root"></div>
  </body>
</html>

```
```js
export default function Alert({
  title,
  body,
  onConfirm,
  onConfirmText,
}: PropsWithChildren<Props>) {
  const modalRoot = document.querySelector('#modal-root');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
  <Background>
    <ModalContainer>
        ...
    </ModalContainer>
  </Background>, modalRoot);
}
```

```js
export default function App() {
    return (
        <Routes />
        <Alert />
    )
}
```

### Portal로 생성된 component의 이벤트
실제 렌더링 위치는 아래 예시와 같을 것이다.
```js
<div id='root'>
    <App />
    <div id='modal-root'>
        <Alert />
    </div>
</div>
```

그러나 이벤트는 부모 컴포넌트인 App 컴포넌트의 하위 dom처럼 동작하게 된다.<br>
실제 DOM트리와 달리 React 트리 (React의 Virtual Dom트리)에서는 컴포넌트를 작성했을때와 같이 App 컴포넌트의 자식으로 위치해 있기 때문이다.<br>
그렇기 때문에 자식 컴포넌트(Alert)의 이벤트를 부모 컴포넌트로 전달해야 하는 경우에도 문제가 없다.