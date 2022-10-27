# 트리 쉐이킹

트리 쉐이킹은 사용하지 않는 코드를 제거하는 방식이다.<br>

### 필요한 모듈만 import

ES6 모듈의 특정 부분을 가져오는 import 구문의 이점을 활용해 사용하지 않는 코드를 제거할 수 있다.

```js
import { unique, implode, explode } from "array-utils";
```

## 바벨 설정
바벨은 최신 자바스크립트 문법을 지원하지 않는 브라우저에서도 호환이 가능하도록 ES5 문법으로 트랜스파일한다.<br>
그러나 ES5 문법은 import를 지원하지 않기 때문에 commonJS 문법의 require로 변환하는데 require은 export 되는 모든 모듈을 불러오기 때문에 트리쉐이킹이 되지 않는다.<br>
이를 위해 ES5로 변환되는 것을 막을 수 있도록 바벨 설정이 필요하다.
```json
{
  "presets": [ 
    [
      "@babel/preset-env",
      {
	    "modules": false
      }
    ]
 ]
}
```

## sideEffects

트리쉐이킹을 통해 제외되는 함수가 순수함수가 아닌 경우에 사이드 이펙트가 발생할 수 있다.<br>
사용하지 않더라도 트리쉐이킹을 통해 사이드 이펙트가 발생하지 않을거라는 파일을 특정할 수 있다.
```json
// package.json
{
  "name": "tree-shaking",
  "version": "1.0.0",
  "sideEffects": ["./src/components/NoSideEffect.js"]
}
```

## lodash-es
흔히 사용되는 유틸성 라이브러리인 lodash는 es5로 작성되어 트리쉐이킹이 되지 않는다.<br>
es6문법으로 작성된 lodash-es를 사용하면 트리쉐이킹이 가능하다.

### cherry-picking
es5로 작성된 lodash의 특정 경로에서만 모듈을 가져오기 위해 cherry-picking 구문을 사용할 수도 있다.
```js
// 설정이 잘 되어있어도 lodash 모든 것들을 가져온다.
import { sortBy } from "lodash";

// sortBy 경로에서 가져온다.
import sortBy from "lodash-es/sortBy";
```