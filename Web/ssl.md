# SSL 암호화 통신

## SSL (Secure Socket Layer) 또는 TLS (Transport Layer Security)

SSL(Secure Sockets Layer)은 <strong>암호화 기반 인터넷 보안 프로토콜</strong>이다.
<br/>
인터넷 통신의 개인정보보호, 인증, 데이터 무결성을 보장하기 위해 Netscape가 1995년 처음으로 개발하였다.<br/>
SSL은 높은 수준의 개인정보 보호를 제공하기 위해, 웹에서 전송되는 데이터를 암호화 한다.<br/>
두 통신 장치(서버와 클라이언트) 사이에 핸드셰이크라는 인증 프로세스를 시작하여 두 장치의 ID를 확인한다.<br/>
데이터 무결성을 제공하기 위해 데이터에 디지털 서명하여 데이터가 의도된 수신자에 의해 도착 전에 조작되지 않았음을 확인한다.<br/>
데이터 송/수신 과정에서 암/복호화가 발생하므로 속도가 느리다.


### HTTPS, SSL, TLS의 차이
HTTP는 응용 계층에 속하며
<br/>
SSL, TLS는 보안계층이라는 독립적인 프로토콜 계층에 속하여 응용계층과 전송계층(tcp) 사이에 속한다.<br/>
HTTPS는 HTTP와 SSL이 조합된 프로토콜을 말한다.<br/>
반면 SSL과 TLS는 같은 의미의 단어이다.<br/>
1999년 IETF가 SSL의 업데이트를 제안하였고 이 업데이트를 개발하면서 Netscape는 더 이상 이 업데이트에 참여하지 않게 된 후로 TLS로 이름이 변경되었다.<br/>
때문에 두 단어가 혼합되는 경우가 많지만 엄밀히 말하면 SSL 프로토콜은 알려진 취약성이 여러가지 있으며 실제 최신 웹 브라우저는 SSL을 지원하지 않는다.<br/>
하지만 여전히 SSL이라는 단어가 거의 20년 동안 업계 표준으로 자리잡고 있으며 많은 고객들이 SSL 보호를 찾고 있기 때문에 SSL이라는 용어를 많이 사용한다.<br/>

## SSL 암호화 통신 방식

1. 핸드셰이크
<br/>
핸드셰이크 단계에서는 데이터를 주고받기 위해 어떤 방법을 사용해야 하는지 서로의 상태를 파악한다.<br/>
HTTP통신의 경우 80번 포트를 사용하지만 SSL은 443번 포트를 기본으로 사용하는 tcp기반의 프로토콜이다.<br/>
tcp 기반이기 때문에 SSL 핸드셰이크 전에 tcp 3-way 핸드셰이크 또한 수행한다.<br/>

2. 전송
<br/>
협상이 완료되면 SSL 세션이 생성되고 클라이언트와 서버는 서로 데이터를 주고 받는다.

3. 종료
<br/>
서로에게 데이터 전송이 끝났음을 알리며 사용했던 Session Key를 폐기하며 세션을 종료한다.

### 잠깐 CA란?
CA는 어떤 사이트가 신뢰할 수 있는 사이트인지 보장하는 역할을 하는 기업들이다.<br/>
이 기업들은 서비스를 제공하는 회사들에게 사이트에 대한 자료와 공개키를 받아 검토를 마친 후 사이트 정보와 공개키를 인증기관의 비공개키로 암호화한다.<br/>
이 정보가 사이트 인증서가 된다.<br/>
또한 브라우저마다 공인된 CA리스트와 각 CA의 공개키가 탑재되어 있어 클라이언트는 해당 공개키와 서버에 요청시 받은 공개키를 통해 대칭키를 암호화하여 서버에 전송하게 된다.


### 핸드셰이크 단계의 순서
<br/>
1. Client hello
<br/>
<br/>
클라이언트가 서버에게 다음 정보를 포함하여 요청한다.<br/><br/>

- 브라우저가 지원하는 암호화 방식(Cipher Suite)
-  암호화 프로토콜 정보 (프로토콜, 버전 등)
-  난수 데이터
-  세션 아이디
-  기타 확장 정보

클라이언트 주요 정보를 서버에 전송하여 클라이언트를 식별하고 어떤 암호화를 사용할 수 있는지 인지하도록 한다.<br/>

<br/>
2. Server hello
<br/>
<br/>
서버가 클라이언트에게 다음 정보를 포함하여 응답한다.<br/><br/>

 - 난수 데이터 (Client에서 받은 데이터와 무관)
 - 서버가 사용할 암호화 기법
 - 인증서
   - CA
   - 도메인
   - 공개키

서버는 클라이언트가 제시한 암호화 방식 중 하나를 선정하여 알려준다.<br/>
또한 서버의 서버의 공개키가 포함된 서버 자신의 인증서를 전달한다.<br/>
서버의 공개키로 데이터를 암호화하면 서버는 이를 받아 개인키로 복호화하여 요청을 분석한다.

<br/>
3. 인증서 검토
<br/>
<br/>
서버가 전달한 인증서가 실제 해당 서버의 인증서인지, 신뢰할 수 있는 CA에서 발급된 것인지, 실제 해당 CA에서 발급된 것인지 검토한다.<br/>
만약 문제가 있다면 (공인된 인증서가 아니라면) 브라우저는 사용자에게 해당 사이트의 인증서가 올바르지 않다는 경고문을 노출한다.<br/>


<br/>
4. Client key exchange (Premaster Secret 송수신 -> 통신 키 생성)
<br/>
<br/>
- Premaster Secret 송수신<br/>
클라이언트는 미리 주고 받은 자신과 서버의 난수 데이터를 참고하여 서버와 암호화 통신을 할 때 사용할 키를 생성한 후 서버에 전달한다.<br/>
이때 키는 서버로부터 받은 공개키로 암호화되어 보내지고 서버는 개인키를 이용하여 복호화한다.<br/><br/>
- 통신 키 생성<br/>
보유한 Premaster Secret을 토대로 Premaster Secret ->Master Secret -> Session Key를 생성한다.<br/>
이를 통해 클라이언트와 서버가 동일한 키(Session Key)를 보유하게 된다.

<br/>
5. Finished
<br/>
<br/>
핸드셰이크 과정이 정상적으로 마무리되면 클라이언트와 서버 모두 finished 메세지를 보낸다<br/> 이후 클라이언트가 생성한 키를 이용하여 암호화된 데이터를 주고 받는다.

### 한눈에 보는 SSL
<img src='https://user-images.githubusercontent.com/77574867/191717090-ca91fe34-d606-4517-bf8b-d43b177a6929.png'>