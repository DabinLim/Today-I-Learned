# CORS (Cross-Origin Resource Sharing)

## Origin 이란?
서버의 위치를 나타내는 url은 다음과 같이 이루어져 있다.<br>
https://www.mywebsite.com/posts?page=1&pageSize=25#foo
- protocol: https://
- host: www.mywebsite.com
- path: posts
- queryString: page=1&pageSize=25
- fragment: foo
- port

Origin이란 protocol, host, port를 모두 합친 것을 말한다.<br>
즉, 서버 위치를 찾기 위한 가장 기본적인 것들을 합쳐놓은 것이다.

## SOP (Same-Origin Policy)
SOP는 2011년 RFC6454에서 처음 등장한 보안 정책으로 같은 Origin에서만 리소스를 공유할 수 있다는 규칙을 가진 정책이다.<br>
그러나 웹에서 다른 Origin의 리소스를 가져와서 사용하는 일은 매우 흔한 일이기 때문에 몇가지 예외조항을 두고 이 조항에 해당하는 리소스 요청은 출처가 다르더라도 허용한다.<br>
그 중 하나가 CORS 정책이다.<br>
Origin이 다른 서버로 요청을 하게 된다면 우선 SOP 정책 위반이고 그에 대한 예외사항인 CORS정책 조차 위반한다면 리소스 요청을 할 수 없다.

## 같은 Origin, 다른 Origin
Origin이 같은지 여부를 판단하는 기준은 Scheme, Host, Port 3가지이다.<br>
https://www.mywebsite.com/<br>
위 웹사이트 예시에서 protocol, host 그리고 숨겨진 port 번호만을 이용하여 구분한다.<br>
Internet Explorer의 경우 port 번호를 완전히 무시한다.<br><br>
> Origin을 비교하는 로직은 서버가 아닌 브라우저에 구현되어 있는 스펙이다.<br>
> 즉, CORS 정책을 위반하는 리소스 요청을 하더라도 해당 서버가 같은 Origin에서 보낸 요청만 받겠다는 로직을 가지고 있는게 아니라면 정상적으로 응답한다.<br>
> 이후 브라우저에서 CORS 정책 위반이라고 판단하면 응답을 사용하지 않고 파기한다.

## CORS 동작 방식
웹 클라이언트에서 다른 Origin에 리소스를 요청하는 경우 요청 헤더에 Origin이라는 필드에 요청을 보내는 Origin을 담아 보낸다.<br>
이후 서버는 응답 헤더에 Access-Control-Allow-Origin이라는 필드에 허용된 Origin을 응답해주고 응답 받은 브라우저는 이를 비교해 정책 위반 여부를 판단한다.<br>
CORS가 동작하는 방식은 다음과 같이 세가지 시나리오가 있다.

### Preflight Request
Preflight란 브라우저가 본 요청을 보내기 전 보내는 예비요청을 말한다.<br>
이 예비 요청에는 HTTP 메소드 중 OPTIONS 메소드가 사용되며 본 요청을 보내기 전에 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인하는 역할이다.<br>
예비 요청을 보내면 서버는 예비 요청에 대한 응답으로 응답헤더에 Access-Control-Allow-Origin을 포함하여 보낸다.<br>
브라우저는 이를 이용하여 CORS 정책 위반 여부를 판단한다.<br>
> CORS 정책 위반 판단 여부는 예비요청의 실패 성공 여부가 아니다.<br>
> 때문에 예비요청이 실패하여 400, 500 같은 에러를 응답 받아도 Access-Control-Allow-Origin 에 포함된 Origin이 일치하면 CORS 정책위반이 아니다.<br>
> 반대로 200 응답을 받아도 해당 필드에 요청을 보낸 곳이 Origin이 포함되지 않으면 CORS 정책 위반 에러를 노출한다.

### Simple Request
Simple Request는 예비 요청 없이 서버에게 본 요청을 보낸 뒤 응답 헤더의 Access-Control-Allow-Origin 필드를 확인하여 CORS 정책 여부를 판단하는 방식이다.<br>
특정 조건을 만족하는 경우에만 예비요청을 생략할 수 있기 때문에 일반적으로 경험하기 힘들다.

### Credentialed Request
인증된 요청을 사용하는 방식이다.<br>
이 방법은 CORS의 기본 방식이라기 보다는 다른 Origin간 통신에서 좀 더 보안을 강화하고 싶을 때 사용하는 방법이다.<br>
기본적으로 브라우저가 제공하는 비동기 리소스 요청 API (fetch)는 별도의 옵션 없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 함부로 요청에 담지 않는다.<br>
이때 인증과 관련된 정보를 담을 수 있도록 해주는 옵션이 Credentials 옵션이다.<br>
옵션은 총 3가지 값을 사용할 수 있다.<br>
- same-origin(기본값): 같은 출처 간 요청에만 인증 정보를 담을 수 있다.
- include: 모든 요청에 인증 정보를 담을 수 있다.
- omit: 모든 요청에 인증 정보를 담지 않는다.

옵션 중 include와 같이 요청에 인증 정보를 담은 상태에서 다른 출처의 리소스를 요청하게 되면 CORS 정책 위반 룰에 2가지가 추가된다.
- Access-Control-Allow-Origin에는 *을 사용할 수 없으며, 명시적인 URL이어야 한다.
- 응답 헤더에는 Access-Control-Allow-Credentials: true가 반드시 존재해야 한다.


## CORS 해결 방법

### Access-Control-Allow-Origin 세팅
가장 대표적이며 위에서 설명된 방법대로 Access-Control-Allow-Origin에 알맞은 값을 세팅해준다.

### Webpack Dev Server로 리버스 프록싱하기
서버에서 Access-Control-Allow-Origin 세팅을 해주더라도 로컬 환경의 Origin을 넣어주는 경우는 드물다.
그렇기 때문에 Webpack Dev Server에서 제공하는 proxy를 기능을 활용해 CORS 정책을 우회할 수 있다.

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.mywebsite.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
}
```

### img 또는 script에 태그에 포함된 요청

아래와 같이 렌더될 이미지, 스크립트, 스타일시트에서 요청하는 경우 SOP의 예외조항에 포함된다.<br>
이런 방식의 요청은 Set-Fetch-Mode: no-cors라는 값을 요청 헤더에 포함시킨다.<br>
이 필드 값이 no-cors 값인 경우 CORS 정책 여부를 검사하지 않으나 이 값이 포함된 요청의 응답은 자바스크립트단에서 접근할 수 없다.<br>

```html
<img src='https://www.mywebsite.com'>
<script src='https://www.mywebsite.com'></script>
```