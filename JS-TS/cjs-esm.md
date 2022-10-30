# CJS, ESM

## CJS (CommonJS)
CommonJS의 줄임말
- 동기적으로 모듈을 import한다.
- require() 구문을 통해 가져오고 module.exports를 통해 내보낸다.
- import 할 때, import한 객체의 복사본을 준다.
- 브라우저에서 작동하지 않는다. 트랜스파일 되어야 하고 번들 되어야 한다.
- 런타임에 모듈을 읽는다.
- 대규모 어플리케이션에서 동기적으로 각각 하나씩 실행된다면 성능 문제가 발생할 수 있다.

### CJS 에서 ESM require
CJS에서는 기본적으로 ESM을 import할 수 없다.<br>
가장 기본이 되는 이유는 ESM은 top level에서 await을 할 수 있지만 CJS는 그렇지 못한다.<br>
require은 불가능하지만 아래와 같은 우회방법으로 import 할 수 있다.
```js
;(async () => {
  const { foo } = await import('./foo.mjs')
})()
```

### CJS 라이브러리에 ESM 래퍼 제공하는 방법
```js
import cjsModule from '../index.js'
export const foo = cjsModule.foo
```

## ESM (ES Modules)
ES Modules의 줄임말
- 많은 최신 브라우저에서 사용 가능
- 모듈로더를 비동기환경에서 실행, import,export 구문을 찾아 파싱
- 더이상 import 할것이 없을 때까지 import를 찾는다.
- 정적 모듈 구조로 인한 트리 쉐이킹 가능
- `<script type="module">`으로 호출하여 사용

### ESM에서 CJS import
ESM에서 CJS의 named exports를 import할 수 는 없다.
```js
//가능
import _ from './lodash.cjs'

// 불가능
import { shuffle } from './lodash.cjs'

// 우회 방법
import _ from './lodash.cjs'
const { shuffle } = _
```
이러한 우회 방법은 모듈 전체를 불러와 트리쉐이킹이 되지 않는다.
