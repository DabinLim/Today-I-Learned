# 리플로우와 리페인트 최적화

## 리플로우

1. 클래스 변화에 따른 스타일 변경 시, 최대한 DOM 구조 상 끝단에 위치한 노드에 주어야 한다.
   - 가급적 말단에 위치한 노드 수치 변경 시 리플로우 수행 반경을 전체 노드가 아닌 일부 노드로 제한 시킬 수 있다.
2. 인라인 스타일을 최대한 배제하여야 한다.
   - 인라인 스타일의 경우 페이지 전체에 걸쳐 리플로우가 수차례 발생한다.
   - html을 파싱하는 중 인라인 스타일을 만나면 CSSOM 트리를 재생성한다.
3. 애니메이션이 들어간 노드는 가급적 position:fixed 또는 position:absolute로 지정하여 전체 노드에서 분리 시키도록 한다.
   - JS, CSS를 활용한 애니메이션 효과는 프레임마다 리플로우 비용을 발생시킨다.<br>그러나 fixed 또는 absolute 값을 사용하면 지정된 노드는 전체 노드에서 분리되어 해당 노드의 리페인트 들어간다.
   - 초기 position 값이 fixed 또는 absolute가 아니더라도 애니메이션 시작 시 값을 변경하고 종료 시 원래대로 돌리는 방법을 사용해도 효과가 있다.
4. 퀄리티와 퍼포먼스 사이에서 타협이 필요하다.
   - 애니메이션 효과와 같은 CPU 퍼포먼스 비용이 큰 작업은 언제나 퀄리티와 퍼포먼스 사이에 적당한 타협이 필요하다.
5. 테이블 레이아웃을 피한다.
   - 테이블로 구성된 페이지 레이아웃은 점진적 페이지 렌더링이 적용되지 않으며 모두 로드되고 계산된 후에야 화면에 그려진다.<br>그러나 해당 테이블에 table-layout:fixed 속성을 주는 것이 디폴트값인 auto에 비해 성능면에서 더 좋다.
6. cssText 또는 class를 활용한다.
   - DOM과 스타일 변경을 하나로 묶어 리플로우 수행을 최소화한다.
```js
// 1번의 리페인트 2번의 리페인트, 리플로우가 일어남
let elem = document.getElementById('item');

elem.style.backgroundColor = 'red';
elem.style.width = '200px';
elem.style.height = '200px';

// 1번의 리페인트 및 리플로우가 일어남
elem.style.cssText = 'background:red;width:200px;height:200px;';
// 또는
elem.className = 'select';
```
7. 캐싱을 활용해 리플로우를 최소화한다.
```js
// 반복적으로 수행되는 경우 매번 최신 레이아웃(계산된 스타일 정보)을 가져오려고 큐에 있는 모든 리플로우 작업을 수행시킴
for (let i = 0; i < 10; i ++) {
    elem.style.top = `${elem.offsetTop + 10}px`;
    elem.style.left = `${elem.offsetLeft + 10}px`;
}

// 계산된 레이아웃 정보는 한번만 가져오기 때문에 브라우저의 리플로우 최적화를 방해하지 않는다.
let top = elem.offsetTop;
let left = elem.offsetLeft;
for (let i = 0; i < 10; i ++) {
    top += 10;
    left += 10;
}
```
8. documentFragment를 사용해 DOM 사용을 최소화한다.
   - documentFragment는 DOM에 적용되기 전까지는 메모리상에만 존재한다.
```js
let frag = document.createDocumentFragment();
let ul = frag.appendChild(document.createElement('ul'));

for (let i = 1; i <= 3; i++) {
    li = ul.appendChild(document.createElement('li'));
    li.textContent = `item ${i}`;
}

document.body.appendChild(frag);
```


## 리페인트
리페인트는 리플로우에 비해 비용이 적지만 마찬가지로 최소화 방법이 있다.<br>
1. 리플로우의 6번과 같이 cssText 또는 class를 활용한다.
2. transform, opacity, cursor, orphans, perspective 등의 리페인트를 일으키지 않는 속성을 사용
   - (CSS Triggers)[https://csstriggers.com/]를 통해 레이아웃, 페인트, 합성 과정이 일어나는 속성을 확인 가능