# Defer vs Async 스크립트
일반적으로 브라우저는 HTML을 읽다가 스크립트 태그를 만나면 DOM생성을 멈추고 스크립트를 다운로드 받고 실행 시킨 후에야 다시 DOM 생성을 시작한다.<br>
이로 인해 자바스크립트의 용량이 크거나 네트워크 상태가 안좋은 경우(외부 스크립트 다운로드 시)사용자가 화면을 보는데까지 시간이 오래 걸린다.
<br>
또한 스크립트 실행시 DOM 생성이 완료되지 않아 DOM 요소에 접근이 불가능해진다.<br>
이를 해결하기 위해 아래와 같이 페이지 맨 아래에 script를 놓을 수 있지만 아래 해결 방법은 HTML이 문서 전체를 다운로드 한 후에 스크립트를 받기 때문에 HTML이 아주 크거나 네트워크가 아주 느린곳에서는 지연이 크게 된다.
```html
<body>
    <script src=''></script>
</body>
```
때문에 async와 defer 속성을 사용해 스크립트를 백그라운드에서 다운로드할 수 있다.

## defer
defer속성이 있는 스크립트는 자바스크립트를 백그라운드에서 다운로드한다.<br>
따라서 스크립트를 다운로드 하는 동안에도 HTML 파싱이 지속되며 페이지 구성이 끝난 뒤(DOMContentLoaded 실행전)에 다운로드된 defer 스크립트들이 실행된다.<br><br>
브라우저는 스크립트를 병렬적으로 다운로드한다.<br>
따라서 작은 파일이 먼저 다운로드 될 수 있지만 실행의 경우 defer 속성을 사용한 스크립트는 먼저 작성된 스크립트 순으로 실행된다.<br><br>
defer 속성은 외부 스크립트에만 유효하다 (src 속성이 없으면 무시됨)

## async
async 속성이 있는 스크립트는 페이지와 완전히 독립적으로 동작한다.<br><br>
마찬가지로 백그라운드에서 스크립트를 다운로드하지만 페이지 구성 또는 DOMContentLoaded와 관계 없이 실행까지 완료한다.<br><br>
다른 스크립트들 또한 async 스크립트를 기다리지 않고 async 스크립트 또한 다른 스크립트를 기다리지 않는다.<br>
따라서 다운로드가 끝난 순서대로 바로 실행되며 <strong>실행이 되는 동안에는 HTML 파싱이 멈춘다.</strong>

## 동적 스크립트
```js
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script);
```

동적 스크립트는 기본적으로 async 처럼 동작한다.<br>
script.async 속성을 false로 지정하여 순서대로 실행되도록 할 수 있다.

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```