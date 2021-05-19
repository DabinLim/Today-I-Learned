# 크롬 익스텐션, CRA(create react app)로 출시하기


## manifest.json 

```
{
  "name": "생각낙서",
  "version": "1.0",
  "description": "생각낙서",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "index.html",
    "default_title": "생각낙서"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "permissions": [],
  "content_security_policy": "script-src 'self' 'sha256-ZPf2L+jefOkpcXXYVFbMk19UuLH+2+POiEHsiR/BmxI='; object-src 'self'"
  
} 
```

- 제목과 버전, 설명 아이콘들을 설정해준다음 빌드한다.
- 빌드된 파일을 크롬 익스텐션 관리 탭에서 개발자모드를 활성화 하고 업로드한다.
<img src='https://user-images.githubusercontent.com/77574867/118772581-e201d500-b8be-11eb-932d-5a96ce6e58b1.png' width='400px'>
<br>
- 위와 같은 에러를 마주한다.
- hash 값을 복사해 content_security_policy의 해시값에 붙여넣는다.
- 다시 업로드한다.

리액트의 경우 인라인 스크립트를 사용하기 때문에 자바스크립트 실행 권한을 설정해야 하기 때문이라는데,<br>

src 디렉토리 안에 .env 파일 만들고
```
INLINE_RUNTIME_CHUNK = false
```
를 추가하면 해시값을 일일히 변경하지 않아도 된다고 한다.<br>

## 제출하고 검수 받기

chrome 웹스토어의 오른쪽 상단 프로필을 보면
<img src='https://user-images.githubusercontent.com/77574867/118773553-ed093500-b8bf-11eb-9b24-d513a33091d1.png'>
<br>
개발자 대시보드가 있다.<br>
개발자 대시보드에 들어가 새 항목을 추가하고 크롬에서 요구하는 설명, 이메일, $5, 스크린샷, 아이콘 이미지 등을 추가하고 제출하면 검수후에 웹스토어에 게시된다.<br>

### 진행중인 프로젝트의 크롬 익스텐션

[생각낙서 (https://thinknote.us)](https://thinknote.us) 라는 프로젝트를 진행중인데 아래의 익스텐션은 생각낙서 웹에서 다른 사람들이 남긴 글들을 둘러볼 수 있으며 상세페이지로 이동할 수 있는 링크를 걸어놓은 익스텐션이다.

[생각낙서 크롬 익스텐션](https://chrome.google.com/webstore/detail/%EC%83%9D%EA%B0%81%EB%82%99%EC%84%9C/bjjoklgeipleefnllgkcmacojnmbplga)