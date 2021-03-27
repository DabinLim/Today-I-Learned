# JWT Token, OAuth2.0

- 예전에는 사용자의 로그인상태를 서버가 전부 가지고 있었다.<br>
서버의 세션에 사용자 정보를 넣고 로그인 여부를 전부 기록하고 기억했다.
- 세션을 서버의 메모리나 데이터베이스 등에 저장해 두는데, 로그인한 사용자가 많아지면 서버에 부하가 생긴다. 그렇다고 서버를 여러개 놓기엔 관리가 까다롭다.

## OAuth 2.0 (Open Authenticatoin, Open Authorization)

***프레임워크***

외부서비스의 인증 및 권한 부여를 관리하는 프레임워크

- 동작 방식 
    - 클라이언트와 서버 사이에 인증(로그인)을 하면 서버가 access_token을 준다.
    - 클라이어트는 acess_token을 이용해서 API요청을 할 수 있다.
    - 서버는 API 요청을 받고, access_token을 가지고 권한을 확인해서 클라이언트에게 결과를 보내준다.

- 외부 서비스
    - 유저가 로그인을 한다 (자원 소유자가 서버에게 권한 요청)
    - 유저가 입력한 정보를 보고 클라이언트에 접근 권한 ( Authorization code ) 을 준다. 
    - 클라이언트는 이 권한을 가지고 Authorization server에 access_token을 요청한다.
    - 유저에게 token을 넘겨주고 유저가 요청할때마다 token을 확인하고 응답한다.
    - token이 만료되면 refresh token(사용기간이 좀 더 김)을 넘겨준다. 둘 다 만료되면 재로그인 요청


## JWT(Json Web Token)
***토큰의 한 형식***

토큰의 한 형식이다. 데이터가 JSON 형태로 이루어진 토큰이다.<br>
전자서명이 포함된 토큰

- 생김새 : [header].[payload(내용)].[signature(서명)]
    - header : 토큰 타입과 암호화 방식 정보가 들어간다.
    - payload : 토큰에 담을 정보가 name : value 쌍으로 들어간다.
    - signature : 서명 정보가 들어간다. secret key를 포함해서 header와 payload 정보가 암호화 되어 들어간다.

- 동작 방식 : 토큰 기반 동작 방식대로 동작한다.
    - 유저 로그인 시도
    - 서버가 요청 확인 후 secret key를 가지고 access_token 발급
    - 클라이언트에 JWT 전달
    - 클라이언트는 API 요청을 할 때 Autorization header에 JWT를 담아서 보낸다.
    - 서버는 JWT의 서명을 확인하고 payload에서 정보를 확인해서 API 응답을 보낸다.
