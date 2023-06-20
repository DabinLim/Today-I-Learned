# 웹 성능

## 웹 구조

- URL
- 웹 자원의 인터넷상 위치 표현
  - https://cdn.webfrontend.org/wp-content/uploads/2020/06/book2.png
  - 프로토콜: https
  - 서브 도메인: cdn
  - 톱 레벨 도메인: webfrontend.org
  - 디렉토리: wp-content/uploads/2020/06
  - 최종경로: book2.png

- 네트워크 프로토콜
  - http
    - header: 클라이언트와 서버 사이에 필요한 정보를 주고 받음
    - payload: html이나 이미지 같은 실제 데이터를 주고 받음

- HTML
  - 웹페이지에 실제 나타낼 정보 표현


## 웹 성능
웹 페이지가 로딩되어 내용을 볼 수 있을 때까지 걸린 시간, 웹 로딩 시간

웹 성능이 떨어지면?
- 이탈률이 높아짐
- 월마트
  - 로딩시간 1초 줄일때 구매율 약 2% 증가
- 기업 이미지 추락
- 구글
  - 3초 안에 로딩되지 않으면 53% 사용자 이탈

웹 성능에 영향을 주는 요소
- 사용자 환경
  - 거주지역
  - 네트워크 장비
  - 브라우저
- 공급자 환경
  - DNS 네임서버 응답속도
  - 웹 서버 응답 속도
  - 백엔드 처리 속도
  - 프론트엔드 최적화 여부
- 전달 환경
  - 서버가 위치한 데이터센터의 자체 전용선 보유 여부
  - 유선망과 모바일망 각각 서버 배포 여부


### WebPageTest

세계 여러 위치에서 웹 사이트 로딩 속도 측정 가능<br/>

옵션
- 기본옵션
  - URL
  - Test Location
  - Browser
- 추가옵션
  - Connection
  - Number of Tests to Run
  - Repeat View
  - Capture Video
  - Keep Test Private
  - Label


평가항목
- First Byte Time: 첫 콘텐츠의 첫 바이트 도착 시간
- Keep-Alive Enabled: Keep-Alive 설정 여부
- Compress Transfer: 스크립트 파일이 Content-Encoding으로 압축되어 있는지 여부
- Compress Image: 이미지 압축 여부
- Cache Static content: 정적 파일 브라우저 캐시 설정 여부
- Effective use of CDN: CDN 효과적으로 적용했는지 여부


### 구글 PageSpeed

위치 선택은 불가능

- FCP (First Contentful Paint): 사용자에게 시각적 응답을 보인 시간
- DCL (DOM Content Loaded): 브라우저가 html 문서를 로딩, 해석하는 시간을 측정한 값
- 두 메트릭스를 사용해 성능 측정

Mod_Pagespeed
- Apache나 NginX 웹 서버에 추가하여 웹 성능 최적화를 돕는 오픈소스 모듈


### 최적화 주요 항목 (High Performance Web Sites)

- 백엔드
  - Expires 헤더 추가
  - gzip 압축
  - 페이지 재전송(redirection) 최소화
  - ETag 설정
  - 캐시 지원 Ajax
- 프론트엔드
  - http요청을 줄인다
  - 스타일 시트는 상단에 넣는다
  - 스크립트는 하단에 넣는다
  - css 표현식은 피한다
  - 자바스크립트와 css는 외부 파일에 넣는다
  - 자바스크립트를 작게 한다
  - 중복 스크립트 제거
- 네트워크
  - CDN 사용
  - DNS 조회 줄임

### Yslow

- ajax 캐시
- get 메소드로 XHR 사용
- DOM 개체 수를 줄인다
- 404 Not found를 없앤다
- 쿠키 크기를 줄인다
- 쿠키와 상관없는 정적 콘텐츠를 만든다
- AlphaImageLoader 사용하지 않는다
- html에 이미지 크기를 설정하지 않는다
- 파비콘은 작게 그리고 캐시할 수 있도록 만든다.

페이지 재전송, 도메인 조회, 서버 연결, 서버 응답,

브라우저 렌더링 성능 지표
- FCP(First Contentful Paint): 첫번째 텍스트 또는 이미지가 표시되는데 걸린  시간
- SI(Speed Index): 콘텐츠가 얼마나 빨리 표시되는지에 대한 정보
- LCP(Largest Contentful Paint): 가장 큰 텍스트 또는 이미지가 표시된 시간
- TTI(Time to Interactive): 사용자와 페이지가 상호 작용할 수 있게 된 시간
- TBT(Total Blocking Time): FCP와 TTI 사이 모든 시간의 합, 작업 지속 시간이 50ms를 초과하면 ms단위로 표현
- CLS(Cumulative Layout Shift): 표시 영역 안에 보이는 요소들이 얼마나 이동하는지에 대한 정보

## 웹 성능 예산

웹 성능 목표를 수치화하여 지표로 만들고 관리하는 것
웹 성능에 영향을 미치는 다양한 요소를 제어하는 한곗값
직관적이고 단순한 목표치를 설정하는 것이 중요

예시
- 메인 페이지의 모든 오브젝트 파일 크기는 10MB를 미만으로 제한
- 모든 각 웹 페이지의 포함된 자바스크립트 파일 크기는 1MB 미만으로 제한
- LTE 모바일 환경에서 TTI는 5초 미만이어야 한다

지표
- 정량 기반 지표 : 이미지, 스크립트, 폰트 등의 요소에 대한 한곗값
- 시간 기반 지표 : FCP나 TTI 같이 실제 발생하는 이벤트 시간 측정
- 규칙 기반 지표 : 성능 측정 도구를 이용한 지표


#