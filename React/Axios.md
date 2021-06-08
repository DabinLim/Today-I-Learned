# Axios

## Axios란?

브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다.

### 특징

- 운영환경에 따라 브라우저의 XMLHttpRequest 객체 또는 Node.js의 HTTP API 사용
- Promise(ES6) API 사용
- 요청과 응답 데이터의 변형
- http 요청 및 응답을 json 형태로 자동 변경

### fetch와 비교한 axios의 장점

- IE까지 포함 대부분의 브라우저를 지원한다.
- 요청을 중도 취소, 응답시간 초과 설정 등의 기능이 있다.
- 400,500대의 error 발생시에 reject로 response를 전달해 catch 로 잡아낼 수 있다.<br> fetch의 경우 네트워크 장애나 요청이 완료되지 않은 경우에만 reject로 response를 전달하기 때문에, resolve로 받아 따로 예외처리가 필요하다.
- json 데이터 자동 변환이 가능하다.

## HTTP Methods

클라이언트가 웹서버에게 사용자 요청의 목적/종류를 알리는 수단 (GET, POST, PATCH, DELETE)등
