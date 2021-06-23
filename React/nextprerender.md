# Next.js 의 pre-rendering 및 data fetching

next.js에서 지원하는 Pre-rendering은 개발자도구를 통해 확인 할 수 있다.<br>
개발자 도구에서 command + shift + p를 눌러 javascript를 검색한 후 disabled javascript를 통해 js가 동작하지 않게 만든 후 확인해보면 next.js로 만든 어플리케이션의 경우 css나 link 등은 적용되지 않지만 html 파일이 렌더링 된 것을 확인할 수 있다.<br>
cra로 만든 어플리케이션의 경우에는 렌더링이 되지 않는다.<br>
이는 next.js에서는 자바스크립트가 적용되기 전에 정적인 html 파일을 생성하여 미리 렌더링을 하기 때문인데 이의 장점으로는 검색엔진 최적화가 있다.<br>

### pre-render

<img src='https://user-images.githubusercontent.com/77574867/122868590-1d803b00-d366-11eb-9225-b5caebcb4bea.png' width='400px' height='300px'>

### no pre-render

<img src='https://user-images.githubusercontent.com/77574867/122868585-1b1de100-d366-11eb-95d0-8f008ee34132.png' width='400px' height='300px'>

## SSG , SSR 

next.js에는 두가지 방법의 pre-rendering을 지원한다.

- SSG (정적 사이트 생성)

<img src='https://user-images.githubusercontent.com/77574867/122869515-58cf3980-d367-11eb-9c66-812df84ff88b.png' width='400px' height='300px'>

> 정적 사이트 생성은 빌드 할때 html이 생성되고 요청마다 생성된 html이 재사용된다.


- SSR (서버 사이드 렌더링)

<img src='https://user-images.githubusercontent.com/77574867/122869505-566cdf80-d367-11eb-8da1-80218de35d58.png' width='400px' height='300px'>

> 서버 사이드 렌더링의 경우 각각의 요청마다 html이 생성되어 사용된다.

<br>

next.js 에서는 각각의 페이지마다 원하는 pre-redering 방식을 선택하여 사용이 가능하다.<br>
next.js의 공식문서에서는 가능하면 정적 사이트 생성 사용을 추천한다.<br>
사용자의 요청보다 앞서서 렌더링이 되기를 원할때는 정적 사이트 생성을 사용하고 요청마다 데이터가 업데이트 되야 하거나 페이지의 콘텐츠가 빈번하게 업데이트 되는 경우에는 SSR을 활용한다.<br>
data가 굉장히 빈번하게 업데이트 되는 경우에는 pre-rendering을 하지 않고 클라이언트 사이드 자바스크립트 또한 사용이 가능하다.