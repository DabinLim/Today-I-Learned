# 이벤트 플로우

```html
<html>
  <body>
    <div>Click Here!</div>
  </body>
</html>
```

위 html 코드에서 div, html, body 모두에 클릭 이벤트가 달려있을때 div를 클릭하면 <strong>3가지 이벤트가 모두 실행</strong>된다.

<br />

그러나 3가지 이벤트가 실행되는 순서가 존재한다.<br />
이 순서를 이벤트 플로우라고 한다.
<br/>

## target vs currentTarget

- target : 시작점을 뜻한다.
- currentTarget : 지금 실행중인 이벤트가 어디에서 실행중인지를 의미한다.

처음 보았던 html 코드에서 div를 클릭해서 이벤트가 발생했을때, div 이벤트 핸들러에서 target과 currentTarget은 모두 div가 된다.
<br/>
<br/>
반면, body 이벤트 핸들러에서는 target은 이벤트의 시작점인 div가 되고 currentTarget은 body에 연결된 핸들러이므로 body가 된다.
<br/>

## 이벤트의 흐름
이벤트가 발생하면 <strong>root에서 가까운 순</strong>으로 이벤트가 실행된다.<br/><br/>
위 코드에서 div를 클릭하여 이벤트가 발생한 경우 html이 가장 root에 가까우므로 html 이벤트 핸들러가 가장 먼저 실행된다.<br/>
그 다음 body 이벤트 핸들러, div 이벤트 핸들러 순으로 이벤트가 실행된다.<br/><br/>
여기서 div에 연결되기까지의 단계를 <strong>Capture Phase</strong>라고 하고 div에 연결된 이벤트 핸들러가 실행되는 단계를 <strong>Target Phase</strong>라고 한다.<br/>
target phase에서 div에 연결된 이벤트 핸들러가 실행되고 나면 다시 역순으로 돌아가며 이벤트 핸들러를 실행시킨다.
이 단계를 <strong>Bubble Phase</strong>라고 하며 이후 이벤트가 종료된다.

즉, 이벤트 플로우의 순서는 다음과 같다.

Capture Phase (html -> body -> div)<br/>-> Target Phase (div) 
<br/>-> Bubble Phase (div -> body -> html)
<br/>

### 브라우저의 선택

위 설명대로라면 div 상위 요소의 이벤트들은 두번씩 실행된다.<br/>
하지만 브라우저는 target과 currentTarget이 일치하지 않는 이벤트 핸들러들에 대해 한번씩 실행되도록 제약을 걸고 Capture Phase에서 실행될 것인지 Bubble Phase에서 실행될 것인지 선택할 수 있게 한다.<br/>

선택 방법은 다음 addEventListener메소드의 useCapture 자리에 불리언 타입을 인자로 받아 설정한다.<br/>
디폴트 값은 false 값으로 따로 설정하지 않으면 Bubble Phase에서 이벤트가 실행되게 된다.


```javascript
// Bubble Phase

let html = document.documentElement;
let body = document.body;
let div = document.querySelector('div');

// 3번째 실행
html.addEventListener('click', function(){
  console.log('I\'m Html Event Handler!')
})

// 2번째 실행
body.addEventListener('click', function(){
  console.log('I\'m Body Event Handler!')
})

// 가장 먼저 실행
div.addEventListener('click', function(){
  console.log('I\'m Div Event Handler!')
})
```

```javascript
// Capture Phase

let html = document.documentElement;
let body = document.body;
let div = document.querySelector('div');

// 1번째 실행
html.addEventListener('click', function(){
  console.log('I\'m Html Event Handler!')
})

// 2번째 실행
body.addEventListener('click', function(){
  console.log('I\'m Body Event Handler!')
})

// 3번째 실행
div.addEventListener('click', function(){
  console.log('I\'m Div Event Handler!')
})
```

## 이벤트 캡처링과 이벤트 버블링
위에서 설명된 것과 같이 상위요소로부터 하위요소로 이벤트가 전달되는 전파 방식을 <strong>이벤트 캡쳐링</strong>, 하위요소로부터 다시 상위요소로 이벤트가 전달되는 전파 방식을 <strong>이벤트 버블링</strong>이라고 한다.

## stopPropagation()
이벤트 전달방식을 신경쓰지 않고 원하는 화면 요소의 이벤트만 신경 쓰고 싶은 경우<br/>
즉, 이벤트 전파 자체를 막고 싶은 경우에 사용된다.<br/>
- 이벤트 버블링의 경우 클릭한 요소의 이벤트만 발생시키고
- 캡처링의 경우 최상위 요소의 이벤트만 동작시킨다.

## 이벤트 위임 (Event Delegation)

이벤트 위임이란 <strong>하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트를 제어하는 방식</strong>이다.<br/> 바닐라 JS로 웹 앱을 구현할 때 자주 사용하는 패턴이다.<br/>

```html
<h1>오늘의 할 일</h1>
<ul class="itemList">
	<li>
		<input type="checkbox" id="item1">
		<label for="item1">이벤트 버블링 학습</label>
	</li>
	<li>
		<input type="checkbox" id="item2">
		<label for="item2">이벤트 캡쳐 학습</label>
	</li>
</ul>
```
```javascript
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('clicked');
	});
});
```

위 html과 자바스크립트 코드에서는 화면의 모든 input에 이벤트 리스너를 달아 클릭시 알럿을 노출시킨다.<br />
여기까지는 이상하지 않지만 이후에 동적으로 새로운 리스트를 추가한다면 문제가 발생한다.

```javascript
var itemList = document.querySelector('.itemList');

var li = document.createElement('li');
var input = document.createElement('input');
var label = document.createElement('label');
var labelText = document.createTextNode('이벤트 위임 학습');

input.setAttribute('type', 'checkbox');
input.setAttribute('id', 'item3');
label.setAttribute('for', 'item3');
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

위와 같은 경우 새로 추가된 인풋은 아무리 클릭해도 알럿이 노출되지 않는다.<br/>
당연하다. 위 상황을 다음과 같은 순서로 진행되었기 때문이다.

1. 인풋이 두개 존재
2. 화면상의 모든 인풋(2개)에 이벤트 핸들러 추가
3. 할 일 목록에 인풋 하나 더 추가

이벤트 핸들러는 2개의 인풋에만 연결되었고 새로 추가된 인풋에는 이벤트 핸들러가 연결되지 않는다.<br/>
이렇게 동적으로 추가되는 요소의 이벤트를 리스너를 평화(?)롭게 달기 위한 방법이 이벤트 위임이다.

```javascript
var itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});
```

위와 같이 인풋이 아닌 인풋의 부모요소인 itemList에 이벤트 리스너를 연결하면 동적으로 추가되는 자식요소에 대해 일일히 이벤트 리스너를 연결시켜주지 않아도 된다.<br/>
물론 위 코드의 경우 itemList의 모든 요소에 이벤트가 전파되어 아래와 같이 원하는 동작을 할 수 있도록 구분히 필요하다.

```javascript
    itemList.addEventListener("click", function (e) {
        let target = e.target;
        if (target.id === 'item1') {
            // 원하는 동작
        }
    });
```

## 참고

[JavaScript Event Flow (planethoon님의 블로그)](https://velog.io/@planethoon/JavaScript-Event-Flow)

[이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지 (캡틴판교님의 블로그)](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)