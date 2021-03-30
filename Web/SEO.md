# Search Engin Optimization (검색 엔진 최적화)

## SEO (검색 엔진 최적화)란?
- 네이버나 구글 같은 검색 엔진에 뭔가를 검색했을 때, 내가 만든 사이트가 검색 결과에 더 잘 보이게 하기 위한 과정이다.

- 검색을 하면 검색 엔진이 내 사이트 내용물을 한번 훑어가고(크롤링) 내용물에 특정한 인덱스를 만들고, 인덱스를 검색 결과에 보여준다.

- 검색 엔진 최적화는 검색 엔진이 내 사이트를 크롤릴할 때 정보를 더 잘 가져갈 수 있도록 도와주는 과정이다.

## React 에서 SEO

- React의 html 파일은 1개이고, 렌더링이 되기 전까지는 빈껍데기이다.

- 즉, 기본적으로는 검색 엔진에 올라가기가 어렵다.
    - React에서도 검색 엔진이 긁어갈 수 있도록 미리 html 파일 내용을 보여줄 필요가 있다.

- React 에서 검색엔진 최적화
    1. meta-tag 넣기
    2. pre-rendering
    3. Server Side Rendering

- Google 검색 엔진은 리액트 같은 CSR방식 사이트도 크롤링을 잘 해간다.(JS를 실행 시킬 수 있다.)


## Pre-rendering

빌드할 때 미리 특정 페에지를 렌더링 해서 html 파일을 만들어 둔다.<br>
검색 엔진이 크롤링하러 사이트에 들어왔을 떄, 렌더링 된 내용물을 크롤링 해 간다.<br><br>
***postman***을 사용하여 크롤링 결과를 확인 할 수 있다.

### react-snap 패키지 사용

- pre-rendering 패키지
    - [react-snap](https://github.com/stereobooster/react-snap)

- react-snap docs에 추가로 어떤 경로들을 pre-rendering 할지 package.json에 추가해준다.

```
Pakage.json >

'reactSnap': {
    'include': ['/','/추가할경로1','/추가할경로2']
}
```

### 로컬에서 빌드된 프로젝트 실행

- 로컬에서 빌드된 프로젝트를 확인할 수 있게 해주는 패키지

```
루트경로에 serve.json >

{
  "rewrites": [
    { "source": "/", "destination": "/200.html" },
    { "source": "/추가할경로1", "destination": "/추가할경로1/index.html" }
    { "source": "/추가할경로2", "destination": "/추가할경로2/index.html" }
  ]
}
```

- 빌드할때
```
$ serve -c serve.json build
```


## Meta-tag

메타태그는 웹페이지의 제목이나 이미지, 간단한 설명을 검색엔진에 알려주는 역할을 한다.

### react-helmet 패키지

install : 
```
yarn add react-helmet
```

usage :<br>
해당하는 컴포넌트에 가서 <Helmet> 태그 안에 원하는 meta-tag를 넣는다.

```
import React from 'react';

const Meta = (props) => {
    return (
        <React.Fragment>
            <Helmet>
            <title>page Meta</title>
            <meta property='og:title' content='og meta'/>
            <meta property='og:description content='blahblahblah'/>
            <meta property='og:image' content='(img_href)'>
            </Helmet>
            <Blahblahblah>
            </Blahblahblah>
        </React.Fragment>
    )
}
```