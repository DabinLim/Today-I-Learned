# JSX

* React에서 쓰이는 JS 스크립트의 확장판 느낌이다.

* React에서는 하나의 html파일을 사용한다.

* React에서는 뷰를 그리기 위해 JSX 문법을 사용하여 React 요소를 만들고 DOM에 Rendering 시켜서 그린다.

* Js 파일 안의 html === JSX

* React에서 JSX 사용이 필수는 아니지만 JavaScript 코드 안에서 UI 관련 작업을 할 떄 시각적으로 더 도움이 되며 React에서도 더욱 도움이 되는 에러 및 경고 메세지를 표시할 수 있게 해준다.

## JSX 사용 규칙

- html에서 닫지 않고도 사용하던 img, input 등의 태그는 태그 마지막에 /를 추가해 닫아준다.
```
<input type='text'/>
<img src='' />
```

- 1개의 엘리먼트만 반환하기
```
return (
    <p> div 가 누구? </p>

    <div className="App">
      <input type='text'/>
    </div>
  );
```
> p 태그와 div 태그 두가지 엘리먼트를 반환하여 에러가 난다.

```
return (
    <div className="App">
      <p> 나는 div 안에 있는 p 태그 </p>
      <input type='text'/>
    </div>
  );
```
> div 태그 안에 필요한 요소를 추가하여 반환한다.

<br>


- JSX에서 javascript 값 가져오기 = 중괄호 사용

```
const house = 'gryffindor';

    return (
      <div>
        10 points to {house}!
      </div>
    );
```

```
function App() {
  const number = 1;

  return (
    <div className="App">
      <p> Shut up Malfoy </p>

      <p>{Malfoy == Slytherin ? True : False}</p>
    </div>
  );
}

export default App;
```

- class 대신 className 사용

- style 변수 또는 인라인

```
<p style={{color: 'orange', fontSize: '20px'}}>orange</p>
// 인라인

function App() {
  const styles = {
    color: 'orange',
    fontSize: '20px'
  };
                                // 변수에 넣어 사용 (딕셔너리)
  return (
    <div className="App">
      <p style={styles}>orange</p>
    </div>
  );
}
```

styled-components를 주로 사용하므로 마지막 스타일은 참고로만 알아두기로 한다.