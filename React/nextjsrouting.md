# Next.js 

next.js는 리액트의 프레임워크로 공식문서에 나와있는 next.js의 특징은 다음과 같다.

1. 직관적이고 동적인 페이지 기반 라우팅 시스템 지원
2. 프리렌더링(pre-rendering), 정적 사이트 생성(SSG), 서버사이드렌더링(SSR)을 페이지 별로 지원
3. 빠른 페이지 로딩을 위한 자동으로 코드 스플릿
4. 최적화된 prefetching을 사용한 클라이언트 사이트 라우팅 
5. css, sass 를 지원하며 모든 css in js 라이브러리를 지원한다.
6. fast refresh 개발환경을 지원한다. (코드를 작성하고 저장하면 바로 반영됨)
7. 서버리스 함수로 api 엔드포인트를 빌드하기 위한 api routes (이 부분은 아직 이해를 못함)

## next.js 시작하기

공식문서에서는 특별한 이유가 있지 않는 이상 create next-app을 추천한다.
<br>
<br>

- 프로젝트 생성하기
```
npm init next-app
yarn create next-app
```

- 현재 폴더에 생성하기
```
yarn create next-app .
```

- 생성된 프로젝트 실행하기

```
npm run dev
yarn dev
```

- 타입 스크립트 사용하기
프로젝트 루트 디렉토리에 next-env.d.ts 파일 생성 후
```
npm install --save-dev typescript @types/react @types/node
yarn add --dev typescript @types/react @types/node
```

## 링크 

<img src='https://user-images.githubusercontent.com/77574867/122858442-3d5b3300-d355-11eb-9253-06cce2b20ca5.png'>
<br>
위의 사진과 같이 pages내에 posts라는 디렉토리를 생성하고 first-post.js를 만든다.
<br>

```
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
        <a>Back to main</a>
        </Link>
      </h2>
    </>
  );
}
```
<br>
first-post.js의 내용은 위와 같다.<br>
next.js에서 제공하는 링크를 사용하기 위해서는 Link 모듈을 import해서 사용해야 하며 링크 모듈 안에 a 태그를 사용하여야 클라이언트 사이드 라우팅을 사용할 수 있다.<br>
프로젝트 내에서의 페이지 이동이 아닌 다른 페이지로 이동할 경우 a태그에 href 경로를 주어 사용할 수 있다.<br>
또한 className 등을 이용하여 속성을 주고 싶은 경우에는 a태그에 적용하면 된다.