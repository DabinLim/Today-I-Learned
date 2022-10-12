# 콘텐츠 모델 (HTML5의 카테고리)

HTML5에 들어서면서 단순히 inline, block의 구분이 아닌 태그 특성에 따라 7가지 카테고리로 분류한다.<br><br>
모든 HTML 요소는 특성을 공유하는 요소끼리 묶는 콘텐츠 카테고리 한가지 이상에 속한다.<br>
- 메인 콘텐츠 카테고리는 여로 요소가 서로 공유하는 일반적인 콘텐츠 규칙을 설명한다.
- 폼 관련 콘텐츠 카테고리는 입력 폼 관련 요소가 공통으로 가지는 규칙을 설명한다.
- 특정 콘텐츠 카테고리는 소수의 요소만 공유하는 카테고리를 설명하며, 특정 문맥에서만 유효하기도 하다.

## 메인 콘텐츠 카테고리

### 1. 메타 데이터 콘텐츠
메타 데이타 콘텐츠는 문서의 표현이나 동작을 설명하거나 다른 문서를 가리키는 링크를 설정하거나 다른 문서에 정보를 전달하는 컨텐츠이다.
`<base>`, `<link>`, `<meta>`, `<noscript>`, `<script>`, `<style>`, `<title>`

### 2. 플로우 콘텐츠
플로우 콘텐츠에 속한 요소는 보통 텍스트나 내장 콘텐츠를 포함한다<br>
Application의 본문 (body)안에 사용되는 콘텐츠이다.
<br><br>

`<a>`, `<abbr>`, `<address>`, `<article>`, `<aside>`, `<audio>`, `<b>,``<bdo>`, `<bdi>` (en-US), `<blockquote>`, `<br>`, `<button>`, `<canvas>`, `<cite>`, `<code>`, `<data>`, `<datalist>`, `<del>`, `<details>`, `<dfn>`, `<div>`, `<dl>`, `<em>`, `<embed>`, `<fieldset>`, `<figure>`, `<footer>`, `<form>`, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<header>`, `<hgroup>`, `<hr>`, `<i>`, `<iframe>`, `<img>`, `<input>`, `<ins>`, `<kbd>`, `<label>`, `<main>`, `<map>`, `<mark>`, `<math`> (en-US), `<menu>`, `<meter>`, `<nav>`, `<noscript>`, `<object>`, `<ol>`, `<output>`, `<p>`, `<picture`> (en-US), `<pre>`, `<progress>`, `<q>`, `<ruby>`, `<s>`, `<samp>`, `<script>`, `<section>`, `<select>`, `<small>`, `<span>`, `<strong>`, `<sub>`, `<sup>`, `<table>`, `<template>`, `<textarea>`, `<time>`, `<ul>`, `<var>`, `<video>`, `<wbr>`, 텍스트 <br><br>
특정 조건을 만족하는 경우 플로우 콘텐츠에 속하는 요소도 있다.<br>
- `<area>`, `<map>` 요소의 자식인 경우
- `<link>`가 itemprop 특성을 가지고 있는 경우
- `<meta>`가 itemprop 특성을 가지고 있는 경우
- `<style>`이 scoped 특성을 가지고 있는 경우

### 3. 구획 콘텐츠
구획 콘텐츠 모델은 범위를 정의하는 구역을 생성한다.<br>
`<article>`, `<aside>`, `<nav>`, `<section>`

### 4. 제목 콘텐츠
header를 정의하는 컨텐츠이다.<br>
`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`

### 5. 구문 (Phrasing) 콘텐츠
텍스타와 텍스타가 포함된 마크업을 정의한다.<br>
`<abbr>`, `<audio>`, `<b>`, `<bdo>`, `<br>`, `<button>`, `<canvas>`, `<cite>`, `<code>`, 공백으로 이루어지지 않은 일반 텍스트.<br><br>
특정 조건을 만족하는 경우 구문 콘텐츠에 속하는 요소도 있다.<br>
- `<a>`, 구문 콘텐츠만 포함하는 경우
- `<area>`, `<map>` 요소의 자식인 경우
- `<del>`, 구문 콘텐츠만 포함하는 경우
- `<ins>`, 구문 콘텐츠만 포함하는 경우
- `<map>`, 구문 콘텐츠만 포함하는 경우
- `<link>`가 itemprop 특성을 가지고 있는 경우
- `<meta>`가 itemprop 특성을 가지고 있는 경우

### 6. 임베디드(내장) 콘텐츠
다른 리소스를 가져오거나, 콘텐츠를 다른 마크업 언어나 네임스페이스로부터 문서에 삽입한다.<br>
`<audio>`, `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<math`> (en-US), `<object>`, `<picture`> (en-US), `<svg`> (en-US), `<video>`.

### 7. 인터랙티브(대화형) 콘텐츠
사용자와의 상호작용을 위해 특별하게 설계된 요소<br>
`<a>`, `<button>`, `<details>`, `<embed>`, `<iframe>`, `<label>`, `<select>`, `<textarea>`<br><br>
특정 조건을 만족하는 경우 대화형 콘텐츠에 속하는 요소도 있다.<br>
- `<audio>`, controls 속성을 가진 경우
- `<video>`, controls 속성을 가진 경우
- `<img>`, usemap 속성을 가진 경우
- `<object>`, usemap 속성을 가진 경우
- `<input>`, type이 hidden이 아닌 경우
- `<menu>`, type이 toolbar인 경우


## 투명 콘텐츠
투명한 요소들은 a, ins, del, object, video, audio, map, noscript, canvas가 있다.<br>
이 요소들의 콘텐츠 모델은 transparent다.<br>
예를 들어 `<p><a><div></div></a></p>`와 같은 마크업의 경우 a는 투명한 요소이다.<br>
투명한 요소는 제거될 수 있으며 제거되어도 유효한 문법이어야 한다.<br>
위 예시의 경우는 p는 구문 콘텐츠이기 때문에 투명 콘텐츠인 a 태그 또한 구문 콘텐츠가 되어 자식요소로 플로우 콘텐츠인 div태그를 가질 수 없다<br>
하지만 p태그가 없거나 p 대신 flow 콘텐츠가 부모가 된다면 flow 콘텐츠를 자식 요소로 가질 수 있다.
p 태그에는 p태그 뿐만 아니라 다른 블록 요소들이 들어갈 수 없는 이유이다.

1. 콘텐츠 모델이 ‘transparent’ 라는 것은 투명한 요소의 콘텐츠 모델이 투명한 요소의 부모 콘텐츠 모델을 따른다는 것을 의미한다.
2. 콘텐츠 모델이 ‘transparent’이면 (투명 요소) 그 부모가 무엇인지에 따라 다양한 유형의 콘텐츠를 자식으로 담을 수 있다.
3. 투명한 요소를 제거하더라도 그 부모와 자식 사이의 관계는 유효해야 한다.