# 리액트 기본 아키텍처 구현해보기

바벨에서 
/* @jsx createElement */
라는 지시어를 통해 태그를 createElement를 사용하도록 변환
<br/>
<br/>
function Title을 바벨("@babel/preset-react")을 통해 컴파일할때 div, h2태그는 createElement 함수로 변환된다.
```javascript
function Title() {
    return (
        <h2>
            우와아아앙
        </h2>
    )
}
```
createElement의 파라미터
1. 태그 (tagName)
2. props (attributes)
3. 자식요소 (children)

```javascript
React.createElement("h2", null, "\uC815\uB9D0 \uB3D9\uC791\uD560\uAE4C?");
```

<br/>

## 사용자가 작성한 컴포넌트는 대문자로 시작하여야 하는 이유
- jsx 컴파일러가 대문자로 시작하는 태그는 함수형태로 tagName으로 넘겨주도록 설계되어 있다.
- 즉, 컴포넌트와 기본 태그를 구분하기 위한 컨벤션이다.

```javascript
export function createElement(tagName, props, ...children) {
    if (typeof tagName === 'function') {
       return tagName.apply(null, [props, ...children]);
    }
    return {tagName, props, children};
}


```

<br/>

## virtualDom을 realDom으로 변환
- 재귀적으로 호출하며 자식요소 생성
```javascript
function renderRealDom(virtualDom) {
    // virtualDom이 문자열 자체인 경우 마지막 자식 요소이므로 TextNode 리턴
    if (typeof virtualDom === 'string') {
        return document.createTextNode(virtualDom);
    }
    // 재귀 탈출 조건
    if (virtualDom === undefined) return;
    const $el = document.createElement(virtualDom.tagName);

    // 재귀적으로 호출하며 자식 요소 생성
    virtualDom.children.map(renderRealDom).forEach(node => {
        $el.appendChild(node);
    });
    return $el;
}
```

<br/>

## 현재 Dom과 virtualDom이 다른지 판단하는 방식
- 클로저를 통해 이전 상태 저장
- 이전 상태와 비교

```javascript
export const render = (function() {
    let prevVirtualDom = null;
    return function(nextVirtualDom, container) {
        if (prevVirtualDom === null) {
            prevVirtualDom = nextVirtualDom;
        }
        container.appendChild(renderRealDom(nextVirtualDom))
    }
})();
```

<br/>

## 클래스 컴포넌트를 렌더하는 방법
- 컴포넌트 클래스를 extends 하도록 하여 인스턴스를 확인한다.
```javascript
export class Component {};

export function createElement(tagName, props, ...children) {
    if (typeof tagName === 'function') {
        if (tagName.prototype instanceof Component){
            const ins = new tagName({...props, children})
            return ins.render();
        } else {
            return tagName.apply(null, [props, ...children]);
        }
    }
    return {tagName, props, children};
}
```

## useState Hooks를 제공하는 방식
- 함수형 컴포넌트 안에서만 hooks를 사용해야 하며
- 조건에 따라 렌더 되는 컨디셔널 컴포넌트에 state hooks을 사용하지 말아야 하는 이유
- 렌더링된 함수 컴포넌트의 갯수를 세서 hooks의 상태를 저장하기 때문에 위 케이스의 경우 index가 꼬일 수 있음
```javascript
const hooks = [];
let currentComponent = -1;

function useState(initialValue) {
    // 캡처링
    const position = currentComponent;

    if (!hooks[position]) {
        // 최초 호출 
        hooks[currentComponent] = initialValue;
    } 
    return [
        hooks[position],
        (nextValue) => {
            hooks[position] = nextValue;
        }
    ]
}

export function createElement(tagName, props, ...children) {
    if (typeof tagName === 'function') {
        if (tagName.prototype instanceof Component){
            const ins = new tagName({...props, children})
            return ins.render();
        } else {
            currentComponent++;
            return tagName.apply(null, [props, ...children]);
        }
    }
    return {tagName, props, children};
}

```

## 최종코드

- component
```javascript
/* @jsx createElement */
import {createElement, render, Component} from './react.js'

class MyTitle extends Component {
    render() {
        return (
            <p>MyTitle!!</p>
        )
    }
}

function Title() {
    return (
        <div>
            <MyTitle/>
            <h2>
                우와아아앙
            </h2>
            <p>하하 정말 재밌다</p>
        </div>
    )
}

render(<Title />, document.querySelector('#root'))
```

- react
```javascript
const hooks = [];
let currentComponent = 0;

export class Component {};

function useState(initialValue) {
    // 캡처링
    const position = currentComponent;

    if (!hooks[position]) {
        // 최초 호출 
        hooks[currentComponent] = initialValue;
    } 
    return [
        hooks[position],
        (nextValue) => {
            hooks[position] = nextValue;
        }
    ]
}

function renderRealDom(virtualDom) {
    // virtualDom이 문자열 자체인 경우 마지막 자식 요소이므로 TextNode 리턴
    if (typeof virtualDom === 'string') {
        return document.createTextNode(virtualDom);
    }
    // 재귀 탈출 조건
    if (virtualDom === undefined) return;
    const $el = document.createElement(virtualDom.tagName);

    // 재귀적으로 호출하며 자식 요소 생성
    virtualDom.children.map(renderRealDom).forEach(node => {
        $el.appendChild(node);
    });
    return $el;
}



export const render = (function() {
    let prevVirtualDom = null;
    return function(nextVirtualDom, container) {
        if (prevVirtualDom === null) {
            prevVirtualDom = nextVirtualDom;
        }
        container.appendChild(renderRealDom(nextVirtualDom))
    }
})();

export function createElement(tagName, props, ...children) {
    if (typeof tagName === 'function') {
        if (tagName.prototype instanceof Component){
            const ins = new tagName({...props, children})
            return ins.render();
        } else {
            currentComponent++;
            return tagName.apply(null, [props, ...children]);
        }
    }
    return {tagName, props, children};
}


```