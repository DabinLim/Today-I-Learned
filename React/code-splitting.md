# 코드 스플리팅

리액트 프로젝트를 배포하기 위해 빌드하는 경우 별도의 설정이 없다면 webpack은 모든 JS파일을 하나의 파일로 번들링한다.<br>
이러한 이유로 파일의 크기는 매우 커지게 되며 수정하는 경우에도 하나의 파일만 수정해도 전체 파일을 전부 빌드해야 한다.<br>
이때 빌드되는 파일을 분리하는 것을 코드 스플리팅이라고 한다.<br>

## Dynamic Import
import()함수를 통해 분리할 수 있다.<br>
import() 함수 형태로 메소드 안에서 사용하게 되면 필요할 때 해당 스크립트를 불러와서 사용할 수 있다.<br>
import()함수는 Promise객체를 반환한다.<br>
아래 dynamic import 문법은 웹팩에서 지원하고 있어 별도의 설정없이 사용할 수 있ek.

```js
// src/notify.js
export default function notify() {
  console.log('notify');
}

// src/App.js

import React from 'react';

function App() {
  const onClick = () => {
    import('./notify').then(res => res.default());
  };
  
  return (
    <div>
      <p onClick={onClick}>Hello World</p>
    </div>
  );
}

export default App;
```

## React.lazy, Suspense

React.lazy는 16.6 버전 이후 사용할 수 있다.<br>
webpack은 dynamic import 구문을 만나면 코드를 분리한다<br>
React.lazy를 통해 해당 컴포넌트가 필요한 시점에 컴포넌트를 불러와 사용할 수 있다.<br>
React.lazy는 동적 import()를 호출하는 함수를 인자로 가져야 하며 import()함수에는 default export로 리액트 컴포넌트를 반환하는 파일을 넘겨야 한다.<br><br>

Suspense는 React.lazy가 컴포넌트를 로드하는 동안 보여줄 로딩화면을 보여준다.

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Webpack의 Entry Point
webpack.config.js의 Entry Point를 지정해 코드 스플리팅을 할 수 있다.<br>
entry 프로퍼티를 작성하면 index와 another을 다른 chunk로 관리한다.<br>
둘 간의 의존성도 분리해서 관리하는게 되는데 두 파일간에 동일한 의존성을 가지고 있다면 중복되는 번들 코드와 로딩이 많아져 성능 저하를 가져올 수 있다.

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```