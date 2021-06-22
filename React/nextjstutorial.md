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
// index.js

<h1 className="title">
    Read{' '}
    <Link href="/posts/first-post">
    <a>this page!</a>
    </Link>
</h1>

// first-post.js

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
index.js와 first-post.js의 내용은 위와 같다.<br><br>
next.js에서 제공하는 링크를 사용하기 위해서는 Link 모듈을 import해서 사용해야 하며 링크 모듈 안에 a 태그를 사용하여야 클라이언트 사이드 라우팅을 사용할 수 있다.<br><br>
pages안의 디렉토리와 js파일의 이름을 통해 자동으로 경로가 지정된다.<br><br>
프로젝트 내에서의 페이지 이동이 아닌 다른 페이지로 이동할 경우 a태그에 href 경로를 주어 사용할 수 있다.<br>
또한 className 등을 이용하여 속성을 주고 싶은 경우에는 a태그에 적용하면 된다.

## Next.js 에서의 static 파일 적용

next.js에서는 public 디렉토리가 pages 디렉토리와 비슷하게 참조되어 정적파일(css, image)들을 적용할 수 있다.<br><br>
공식문서에 따르면
public 디렉토리는 구글의 검색엔진에도 유용하게 작용한다.  

### image 파일 적용

link를 사용할때와 같이 publuc 디렉토리 안에 image 디렉토리를 만들고 그 안에 myimage.jpeg 라는 이미지 파일을 다운로드 받는다.

```
<img src='/images/myimage.jpeg' alt='my'/>
```

이미지를 사용할 컴포넌트에서 img 태그를 이용해 적용한다.<br>
next.js에서는 기본적으로 이미지 최적화를 지원한다. 브라우저가 지원하는 경우 webp과 같은 최신형식으로 이미지의 크기를 조정하고 제공한다.<br><br>
또한 이미지는 기본적으로 뷰포트 범위 밖에서는 로드 되지 않는다. 뷰포트 범위 안으로 스크롤 될때 이미지가 로드된다.
<br><br>
이미지의 최적화와 사이즈를 변경하기 유용하게 하는 Image 모듈을 사용할 수 있다.

```
import image from 'next/image'

const YourComponent = () => (
  <Image
    src="/images/myimage.jpeg" 
    height={144} 
    width={144} 
    alt="my"
  />
)
```

## Next.js에서  metadata 적용하기

next.js에서는 Head 컴포넌트를 사용하여 head 태그에 접근할 수 있다.<br>

/posts/first-post에 title 태그를 추가해보자<br>

```
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';

export default function FirstPost() {
  return (
    <>
    <Head>
        <title>First Post</title>
    </Head>
      <h2>
        <Link href="/">
          <a>Back to main</a>
        </Link>
        <Image src="/images/myimage.jpeg" height={144} width={144} alt="my" />
      </h2>
    </>
  );
}

```
<br>
이제 아래와 같이 개발자도구를 통해 head 태그 안에 title태그가 적용된 것을 확인할 수 있다.<br>

<img src='https://user-images.githubusercontent.com/77574867/122861864-21f32680-d35b-11eb-897c-883c2a2a99ef.png'>

## css styling

create next-app을 이용하여 프로젝트를 생성하면 index.js에 `<style jsx>` 태그를 확인할 수 있다.<br>
이는 styled-component와 같은 CSS-in-JS 라이브러리 이며 이외에 다른 CSS-in-JS 라이브러리 또한 사용할 수 있다.<br>
.css 또는 .scss 파일을 import하여 사용도 가능하다.

### css 모듈

css 모듈을 사용하면 자동을 유일성이 보장되는 클래스이름을 생성해준다. <br>
또한 next.js의 코드스플릿이 지원되어 최소한의 css만 각각의 페이지에 로드가 되어 성능에 이익을 준다.<br>
최상위 디렉토리에 components 폴더를 만들고 그 안에 Layout 컴포넌트를 만든다.<br>
같은 디렉토리에 layout.module.css 파일을 만들어 css 코드를 작성하고 Layout컴포넌트에 적용한다.

```
// Layout components 를 생성
import styles from './layout.module.css'

export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>
  }
```
<br>
Layout 컴포넌트를 FirstPost 컴포넌트에 적용한다.

```
export default function FirstPost() {
  return (

    <Layout>
    <Head>
        <title>First Post</title>
    </Head>
      <h2>
        <Link href="/">
          <a>Back to main</a>
        </Link>
        <Image src="/images/myimage.jpeg" height={144} width={144} alt="my" />
      </h2>
    </Layout>

  );
}

```

### global css 적용하기

모든 페이지에 공통으로 css 를 적용하고 싶을때는 pages 디렉토리에 _app.js를 만들고 css를 적용할 수 있다.

```
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
  
```

최상위 디렉토리에 styles라는 디렉토리를 새로 만들고 그 안에서 global.css를 작성에 적용시킨다.<br>
global.css 는 pages/_app.js 에서만 import 할 수 있다.<br>
적용이 안된다면 local 서버를 종료 후 다시 실행시키면 적용된다.
