# WAS (Web Application Server)

## Static Pages와 Dynamic Pages
1. Static Pages
- Web Server는 파일 경로 이름을 받아 경로와 일치하는 파일을 반환한다.
- 항상 동일한 페이지를 반환한다. (html, css, js, image 등 저장된 파일들)
2. Dynamic Pages
- 인자의 내용에 맞게 동적인 컨텐츠를 반환한다.

## Web Server와 WAS의 차이
### Web Server
- 소프트웨어와 하드웨어로 구분된다.
  - 하드웨어: Web Server가 설치되어 있는 컴퓨터
  - 소프트웨어: 웹 클라이언트로부터 HTTP 요청을 받아 정적 컨텐츠를 제공하는 프로그램
- HTTP 프로토콜을 기반으로 클라이언트의 요청을 서비스 하는 기능을 담당한다.
  - 정적인 컨텐츠 제공 (WAS를 거치지 않고 바로 자원 제공)
  - 동적 컨텐츠 제공을 위한 요청 전달
  - 클라이언트의 요청을 WAS에 보내고 WAS가 처리한 결과를 클라이언트에 응답
- WebServer의 예시
  - Apache, Nginx 등

### WAS (Web Application Server)
- DB 조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 어플리케이션 서버(미들웨어 또는 소프트웨어 엔진)이다.
- 웹 컨테이너 또는 서블릿 컨테이너라고도 불린다.
- WebServer의 기능들을 구조적으로 분리하여 처리하고자 하는 목적으로 제시
- 분산 트랜잭션, 보안, 메시징, 쓰레드처리 등의 기능을 처리하는 분산환경에서 사용된다.
- DB 서버와 같이 수행된다.
- 주요 기능
  - 프로그램 실행 환경과 DB 접속 기능 제공
  - 여러개의 트랜잭션 관리 기능
  - 업무를 처리하는 비즈니스 로직 수행
- WAS 예시
  - Tomcat, JBoss, Web Sphere등


### 정리
WebServer를 통해 정적인 파일들을 Application Server까지 가지 않고 앞단에서 빠르게 보내줄 수 있다.<br/>
Web Server에서는 정적 컨텐츠만 처리하도록 기능을 분배하여 서버의 부담을 줄일 수 있다.
<br/>
<br/>
사용자의 요청에 맞는 데이터를 DB에 가져와 비즈니스 로직에 맞게 동적인 컨텐츠를 만들어 제공하기 위해 WAS가 필요하다.
<br/>
<br/>
WAS가 가지고 있는 WebServer도 정적 컨텐츠를 처리하는데 있어 큰 차이가 없다.
<br/>
그럼에도 분리하는 이유는 다음과 같다.
1. 기능을 분리하여 서버 부하 방지
2. SSL 암복호화 처리에 Web Server사용 (물리적으로 분리)
3. Load Balancing을 Web Server에 사용, fail over, failbaack 처리, 무중단 배포 등을 위한 분리
   
<br/>
웹 서버를 WAS 앞에 두고 필요한 WAS들을 웹 서버에 플러그인 형태로 설정하면 효율적인 분산이 가능하다.