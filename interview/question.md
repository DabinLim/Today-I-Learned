# 면접 질문 준비

### 1. InfinityScroll 컴포넌트에 대한 설명

### 2. lodash를 사용한 이유, lodash에 대한 설명

lodash를 사용하면 자비스크립트에서 배열, 숫자, 객체, 문자열 등의 데이터 관리를 쉽게 만들어준다.<br>
배열, 객체 및 문자열 반복값 조작, 복합 함수를 만드는데 적합하다.<br>
실제로 사용해본 메소드는 throttle과 debounce이다.

### 3. throttle과 debounce의 차이

throttle과 debounce를 사용하여 이벤트 발생 빈도수를 조절해준다.<br>
throttle의 경우 아무리 많은 이벤트가 발생하여도 설정한 시간마다 한번씩만 이벤트가 발생하며
debounce의 경우 유저가 행동을 멈춘 후에 설정한 시간이 지나야만 이벤트가 발생한다.<br> 
throttle은 무한스크롤, resize이벤트 등에 사용되고 debounce의 경우 인풋값을 입력할때 입력값 하나하나마다 이벤트가 발생하지 않도록 빈도수를 조절하기 위해 사용된다.

### 4. javascript prototype

자바스크립트에서의 함수는 객체이다.<br>
그러므로 프로퍼티를 가질 수 있다.<br>
함수가 파싱될때 prototype이라는 프로퍼티를 갖는 생성자객체와 constructor 프로퍼티를 갖는 prototype 객체가 생성된다.(상호참조)<br>

\_\_proto__ 를 통해 생성된 객체가 원본 객체에 접근할 수 있다.<br>
해당 객체에 메소드가 존재하지 않으면 해당 객체의 __proto__를 확인 한다.(부모의 prototype)<br>
최상위 __proto__까지 반복<br>

모든 함수의 \_\_proto__는 window.Object.prototype이다.<br>

https://www.youtube.com/watch?v=G8KNTDVEvhE

### 5. javascript this

### 6. OOP에 대한 설명

- class : 템플릿 정의, 한번만 정의, 데이터 없음 (붕어빵 틀)<br>

- object : class에 실제 데이터를 넣어 새로운 인스턴스를 생성하면 나오는 것 (붕어빵)<br>

프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진 객체를 만들고 그 객체들 간의 유기적인상호작용을 통해 로직을 구성

### 7. html이 그려지는 과정

### 8. Promise (비동기 처리)

### 9. javascript 이벤트 위임

### 10. 쿠키에 토큰을 저장한 이유, 장단점, 쿠키에 대한 설명

WebStroage에 토큰을 저장하는 경우 js코드로 접근이 가능해 XSS 공격에 취약하다.<br>
httponly 옵션과 secure 옵션을 활용, csrf 공격에 대비를 하면 webstroage보다는 안전한 쿠키에 저장<br>
여전히 세션 저장보다는 보안에 취약


- XSS : Cross Site Scripting 으로 사용자의 정보 탈취가 목적

- CSRF : Cross Site Request Forgery 으로 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위를 하는 공격 기법



- 쿠키에 대한 설명 : 사용자 정보를 저장하기 위해 디바이스에 저장하는 파일, 장바구니, 방문 기록 등 광고 타겟팅을 위해서도 사용된다.

- 퍼스트파티 쿠키 : 현재 방문하는 도메인에 설정된 쿠키, 장바구니, 토큰 저장

- 서드파티 쿠키 : 방문한 도메인 외에 외부업체가 심는 쿠키, 사이트를 넘나들며 사용자 행동 추적, 타겟팅 광고에 사용된다.

### 11. jwt 토큰을 사용한 이유, 장단점

### 12. 리액트 훅에 대한 설명 (useSelector, useDispatch, useRef, useState, useCallBack)

### 13. Axios를 사용한 이유

### 14. redux toolkit을 사용한 이유, 설명

### 15. 리액트, vue, angular 차이점

### 16. 리액트의 특징, 가상돔에 대한 설명

SPA, CSR : 서버로부터 데이터를 받아 클라이언트에서 렌더링한다.<br>
CSR 과 SSR을 같이 사용하여 SEO해결 가능<br>
여러개의 독립적인 컴포넌트로 분리하여 관리 할 수 있어 재사용성을 높인다.<br>
<br>
가상돔으로 인한 빠른 속도 : 데이터가 변경될때마다 DOM 전체에 직접 접근하여 변화를 주게 되면 성능이 느려질 수 밖에 없음<br>
리액트는 데이터가 변경되면 가상 DOM을 변경하고 실제 DOM과 비교하여 변경된 부분만 실제 DOM에 반영한다.<br>

### 17. webpack 과 babel

- 웹팩: 자바스크립트 어플리케이션을 위한 정적 모듈 번들러<br> 의존성이 있는 모듈들을 하나의 파일로 통합시켜준다.<br>한 웹페이지에서 사용하는 여러개의 자바스크립트를 동시에 가져와서 생기는 네트워크 병목현상 방지<br>모듈 단위로 개발할 수 있어 유지보수성을 높일 수 있음.<br>rollup, parcel 등의 번들러가 있으나 웹팩이 가장 대중적


- 바벨 : 최신 자바스크립트를 사용할 수 있게 하는 트랜스파일러<br>
	다양한 웹 브라우저, node.js 등 각기 다른 환경에서 모두 정상적으로 동작할 수 있도록 한다.

### 18. javascript callstack

### 19. setTimeout

### 20. 웹디자인 길이 단위 px, rem, em, vw, vh, vmax, vmin에 대한 설명

### 21. 콜백 함수란?

인자로 전달한 함수를 필요할떄 호출되게 코드를 작성

### 22. es5 와 es6의 차이

### 23. setter 와 getter

사용자의 실수로 인해 말이 안되는 값을 가지지 않도록 setter와 getter로 제어

```
get age(){
    return this._age;
}

// age의 값이 0보다 적을 경우 0으로 세팅

set age(value){
    this._age = value < 0 ? 0 : value;
}
```

### 24. hoisting 이란?
선언들이 가장 위로 올라간다.
호이스팅 이후 선언된 순서대로 실행된다.

### 25. setTimeout 에 대한 설명

### 26. Arrow function 에 대한 설명