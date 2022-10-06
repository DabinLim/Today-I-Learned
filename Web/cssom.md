# CSSOM (CSS Object Model) 이란?

웹사이트를 브라우저상에 표현할때 파싱하는 요소중 CSS를 파싱하여 구조화한 것을 CSSOM이라 한다.<br/>
HTML을 파싱하여 DOM트리를 만들듯이 CSS를 해석하여 노드를 만들어 트리 구조로 만든것이다.

## CSSOM이 트리구조인 이유
CSSOM트리가 트리구조인 이유는 CSS가 기본적으로 하향식으로 규칙(cascading rules)을 적용하는 방식을 따르기 때문이다.
<br/>
CSS 문서의 내용이 HTML 내용에 중복되어 적용되었을 경우 브라우저는 최종적인 스타일을 계산할때 일반 규칙에서 시작해 더 구체적인 방식을 적용하는 식으로 짜여져 있다.
<br/>
따라서 HTML과 CSS가 결합되어 문서를 나타내기 때문에 CSSOM 또한 DOM처럼 위아래 관계를 가지게 되고 트리구조가 생긴다.

### CSS와 Parsing
1. HTML을 parsing하는 도중 link라는 태그를 만나게 되면 CSS자체로는 DOM 구조를 변경시킬 수 없기 때문에 HTML파싱을 block하지 않는다.
2. HTML을 parsing하면서 DOM 트리를 만들다가 link 태그에 외부 css 파일이 있으면 다운로딩 요청만 해놓고 계속 DOM트리를 만든다.
3. CSS 파일이 다운로드 되면 CSSOM 트리를 만들고 그것을 종합해서 최종 render tree가 만들어진다.
4. 자바스크립트 파일은 DOM 구조를 변경시킬 수 있기 때문에 script태그를 만나는 경우 defer, async 옵션을 쓰지 않았다면 파싱을 멈추고 자바스크립트를 다운로드 하고 실행하게 된다.
5. 자바스크립트 안에서 CSS 스타일을 변경해 DOM트리 자체를 변경할 수 있기 때문에 자바스크립트에서 완성된 CSSOM 트리의 정보(computed styles과 같은)가 필요한경우 CSS파일을 받아오는 동안 HTML parsing이 멈춰질 수 있다.