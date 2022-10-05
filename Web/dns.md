# DNS (Domain Name System)란 ? (주소창에 url 입력시 일어나는 일)

## 1. 브라우저 주소창에 url 입력
- 웹사이트 접속을 위해서는 도메인주소가 아닌 IP주소가 필요하다.
- 하지만 IP 주소는 외우기가 힘들고 가독성이 떨어지기 때문에 도메인 명으로 웹사이트에 접속할 수 있도록 DNS 서버를 이용한다.
- DNS (Domain Name System)은 url의 이름과 IP주소를 저장하고 있는 데이터베이스다.
## 2. 웹 브라우저는 캐싱된 DNS 기록들을 통해 해당 도메인 주소와 대응하는 IP주소를 확인
 - Browser 캐시
 - OS 캐시 (시스템콜)
 - router 캐시
 - ISP(Internet Service Provider, 인터넷 서비스 공급자)캐시를 확인한다.
 - 캐시는 네트워크 트래픽 조절과 데이터 전송시간을 줄여준다.
## 3. 요청한 url이 캐시에 없으면 웹 브라우저가 HTTP 통신을 사용하여 DNS에게 입력된 도메인 주소를 요청
 - ISP는 DNS 서버들을 검색해 해당 도메인의 IP주소를 검색한다.
 - IP주소를 찾을 때까지 DNS서버에서 다른 DNS서버를 오가며 에러가 날때까지 반복적으로 검색한다 (recursive search)
 - 이 상황에서 ISP의 DNS서버를 DNS recursor라고 부르고 다른 DNS 서버들에게 물어 해당하는 도메인의 올바른 IP 주소를 찾는 역할을 한다, 다른 DNS 서버들은 name server라고 한다.
 - 도메인 이름 구조에 기반해서 검색한다.

### 도메인 이름 구조
- root domain: .
- Top-level domains: edu, org, gov, com, au, ...etc
- Second-level domains: <strong>google</strong>.com, <strong>microsoft</strong>.com, <strong>naver</strong>.com, ...etc
- Third-level domains: <strong>www</strong>.google.com, ...etc

### 도메인 이름 구조 기반 검색
www.google.com을 검색할시 DNS recursor가 root name server에 연락한다.<br/>
root name server는 .com 도메인 name server로 리다이렉트한다.<br/>
.com name server는 google.com name server로 리다이렉트 되고 최종적으로 www.google.com에 해당하는 IP주소를 찾아 DNS recursor에게 보낸다.<br/><br/>
이 모든 요청들은 작은 데이터 패킷을 통해 보내지며 이 패킷 안에 요청의 내용과 DNS recursor의 IP주소가 포함된다.<br/>

## 4. DNS가 웹브라우저에게 찾는 사이트의 IP주소를 응답
## 5. 브라우저가 서버와 TCP connection을 한다.
 - 브라우저가 IP 주소를 얻게되면 서버와 http 통신을 통해 서버와 연결된다.
 - http 통신의 대표적인 프로토콜인 tcp 프로토콜을 사용한다.
## 6. 브라우저가 웹서버에 HTTP 요청을 한다. 
 - get 요청을 통해 해당하는 웹사이트의 웹페이지를 요청한다.
## 7. 브라우저가 응답을 받고 웹 컨텐츠가 렌더링된다.