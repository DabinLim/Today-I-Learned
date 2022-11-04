# Server Sent Event

Server Sent Event는 서버에서 클라이언트에 데이터를 전송할 목적으로 사용되는 단방향 통신이다.<br>

## 웹소켓과 차이점
-| Socket | Server-Sent-Event
---|---|---
브라우저 지원 | 대부분 지원 | 대부분 지원
통신 방향 | 양방향 | 단방향
데이터 형태 | Binary, UTF-8 | UTF-8
자동 재접속 | No | Yes(3초마다 재시도)
최대 동시 접속 | 브라우저 연결한도는 없으나 서버 세팅에 따라 다름 | HTTP는 6개까지 HTTP2는 100개
프로토콜 | websocket 프로토콜 | HTTP
배터리 소모량 | 큼 | 작음

<br>
채팅과 같은 리얼타임 데이터를 처리하기 위해 양방향으로 통신하는 소켓을 사용하게 되는데
알람과 같이 클라이언트가 서버에 데이터를 전송할 필요가 없다면 SSE가 답이 될 수 있다.
<br>
웹소켓으로도 충분히 구현할 수 있지만 SSE는 특별한 프로토콜이나 서버 구현이 필요하지 않은 반면 웹소켓은 프로토콜 처리를 위해 전이중 연결과 새로운 웹소켓 서버가 필요하므로 나뉘어 쓰이게 된다.

>EventSource 는 소셜 미디어 상태 업데이트, 뉴스피드나 IndexedDB나 web storage같은 클라이언트-사이드 저장 매커니즘으로 데이터를 전달하는 데 유용한 접근법입니다.
[MDN - EventSource](https://developer.mozilla.org/ko/docs/Web/API/EventSource)


### 서버
```js
const SSE = require('sse');


const server = app.listen(8080, () => {
  console.log('8080 서버 리스닝');
});
 
const sse = new SSE(server);

sse.on('connection', (client) => {
  // 문자열만 전송이 가능함
  const obj = {
    message: '안녕 난 다빈',
  }      
  client.send(JSON.stringify(obj));
});

```
### 프론트
```js
let eventSource = new EventSource('https://dabin.com/sse');
// onmessage 이벤트 등록
eventSource.onmessage = function(e) {
  console.log(JSON.parse(e.data));
}
// 또는 이벤트 핸들러 추가
eventSource.addEventListener("ping", function(event) {
  console.log(JSON.parse(event.data));
});
```
## 브라우저의 SSE 지원 여부 확인
```js
if ('EventSource' in window)
```