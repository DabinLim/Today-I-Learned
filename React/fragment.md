# React.Fragment

## Fragment의 용도
리액트의 render()함수의 반환값은 하나의 엘리먼트여야 하기 때문에 의미 없는 요소들이 하나씩 더 생기는 경우가 있다.<br>
아래와 같은 예시가 있다.
```js
export default function Container() {
    return (
        <table>
            <tr>
                <Columns />
            </tr>
        </table>
    )
}

export default function Columns(props) {
    return (
        <div>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
        </div>
    )
}
```

Columns 컴포넌트는 하나의 엘리먼트가 되어 반환되어야 하기 때문에 div라는 의미 없는 엘리먼트가 추가되었다.<br>
최적화를 위해서는 쓸모없는 요소를 없애는 것이 가장 쉽고 효과 좋은 방법이므로 쓸모 없는 div 태그를 Fragment로 대체한다.

```js
export default function Columns(props) {
    return (
        <>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
            <td>
                내용
            </td>
        </>
    )
}
```


## Fragment에 key값 할당

Fragment를 축약하지 않고 사용한다.

```js
const renderExample = list.map((item) => (
    <React.Fragment key={item.id}>
        <span>
            {item.name}
        </span>
        <span>
            {item.amount}
        </span>
    </React.Fragment>
))
```