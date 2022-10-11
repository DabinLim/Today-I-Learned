# inline, block element

## inline
`<span>`, `<a>`, `<em>`<br>
컨텐츠 만큼의 공간만 차지하기 때문에  width, height 속성은 무시된다.<br>
margin과 padding은 좌우 간격만 반영되고 상하 간격은 반영되지 않는다.<br>
기본적으로 글자로 취급하는 요소이기 때문에 알파벳을 기준이로 높이기 정해져 영역 아래에 약간의 공간을 가질 수 있다.

## block
`<div>`, `<p>`, `<h1>` 등이 있다.<br>
width, height, margin, padding속성이 모두 반영된다.

## inline-block
`<button>`, `<input>`, `<select>` 등이 있다.<br>
inline 엘리먼트와 같이 컨텐츠만큼의 공간을 차지하지만 width, height, margin, padding 모두 반영된다.

## inline요소 안의 block
보통 인라인 요소는 데이터와 다른 인라인 요소만 포함할 수 있으며, 블록 요소는 포함할 수 없다.<br>

```html
    <span style="border: 1px solid black">
        span
        <div>
            div in span
        </div>
        span
    </span>
```
css display 속성을 사용해 요소의 시각적 표현 레벨을 바꿀 수 있다<br>
ex) span의 display를 block으로 변경<br>
그러나 요소의 카테고리와 콘텐츠모델은 바뀌지 않기 때문에 그 안에 div를 넣을 수 는 없다.<br>
[MDN 인라인요소](https://developer.mozilla.org/ko/docs/Web/HTML/Inline_elements)<br><br>

html5에서는 a 태그가 flow 컨텐츠 (div, p, ul...)의 부모요소가 될 수 있다.<br>

html5에서는 단순히 block, inline으로 구분되지 않고 콘텐츠 카테고리 별로 구분된다.

## p 태그
p 태그에는 p태그 뿐만 아니라 다른 블록 요소들이 들어갈 수 없다.<br>
p 태그는 Phrasing(구문) 콘텐츠이기 때문에 Flow 콘텐츠인 다른 블록요소를 포함할 수 없기 때문이다.