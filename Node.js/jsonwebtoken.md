# jsonwebtoken

## node.js에서 jwt 토큰을 사용하기 위해 가장 많이 사용되는 라이브러리

### 설치

```
npm i jsonwebtoken -S
```

### 토큰 생성

```
const jwt = require('jsonwebtoken');

const token = jwt.sign({ test:true }. 'my-secret-key');

```

### decoded (토큰 생김새)

[jwt.io](https://jwt.io)

```
header: {
    'alg': 'HS256',
    'typ': 'JWT'
}

payload: {
    'test':true,
    'iat': ~~~
}

veryfysignature :{
    ~~~
    ~~~
    my-sercret-key
}
```

### decode

> 토큰을 decode 하고 유효성 검증을 한다.<br>
verify 대신 decode를 쓰고 secret key를 입력하지 않으면 복호화는 가능하지만 검증은 되지 않는다.

```
const jwt = require('jsonwebtoken');

const token = jwt.sign({ test:true }. 'my-secret-key');

const decoded = jwt.verify(token,'my-secret-key');

```

### 사용법

- 클라리언트가 로그인을 요청하면 token을 발급해 클라이언트에게 전달
- 클라이언트가 token을 보내 회원정보를 요청 시 유효성 검증 후 해당 회원정보 전달