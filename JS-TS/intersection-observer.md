# Intersection Observer

Intersection Observer는 루트 요소와 타켓 요소의 교차점을 관찰한다.<br>
기존에 가시성(컨텐츠가 보이는지 여부)를 확인하기 이해 스크롤 이벤트와 getBoundingClientRect 메소드를 사용하였으나 이러한 경우 scroll 이벤트의 콜백이 메인 스레드에 부하를 줄 수 있으며 getBoundingClientRect 호출시 최신화된 값을 사용하기 위해 큐에 쌓여있는 reflow를 모두 적용하기 때문에 최적화에 좋지 않다<br><br>
Intersection Observer API는 타켓 요소와 루트 요소가 교차하는지 구별하는 기능을 제공한다.<br>
scroll 이벤트와 달리 교차시 비동기적으로 실행되며 가시성 구분을 위해 reflow를 발생시키지 않는다.

## 가시성 계산 방법
Intersection Observer는 모든 영역을 사각형으로 취급한다.<br>
사각형이 아닌 불규칙한 모습으로 렌더링 되어도 요소의 모든 부분을 감싸는 사각형으로 계산한다.

## 사용법

```js
let options = {
	root: document.querySelector('#scrollArea'),
	rootMargin: '0px',
    threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);

let target = document.querySelector('#listItem');
observer.observe(target);
```

### options

#### <b>root</b>

루트는 교차 여부를 판단할 뷰를 설정한다.<br>
스크롤 영역으로 루트를 설정하여 해당 스크롤 영역에서 타켓 요소가 보여지는지 판단한다.<br>
default 값은 브라우저 뷰포트이다.

#### <b>rootMargin</b>
   
루트 범위의 요소를 확장할 수 있다.

#### <b>threshold</b>

콜백이 실행될 타켓 요소가 보이는 비율을 나타낸다.<br>
[0.25, 0.5, 0.75, 1]과 같이 배열을 넣어 어느정도 보였을때마다 콜백이 실행되도록 할 수 있다.<br>

### callback
```js
const target = document.getElementById('target');
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // entry는 타켓 요소들
  });
  // 아래와 같이 특정 타켓을 찾아 사용 가능
  const targetElement = entries.find(v => v === target);
};
```

#### <b>entry</b>
타켓 요소들을 담은 배열이다.<br>
IntersectionObserver.takeRecords() 메소드를 통해 반환 받을 수도 있다.<br>
모두 읽기 전용 프로퍼티이다.<br><br>
프로퍼티
- boundingClientRect: 타켓 요소의 사각형 정보를 반환한다. reflow를 발생시키지 않는다.
- intersectionRatio: 타켓 요소와 교차하는 비율을 반환한다. (0.0 ~ 1.0)
- isIntersecting: 교차 여부를 Boolean 값으로 반환한다.
- rootBounds: 루투 요소의 사각형 정보를 반환한다. rootMargin 옵션의 영향을 받는다.
- target: 타켓 요소를 반환한다.
- time: 루트 요소와 타켓 요소가 발생한 시간을 반환한다.

### 메소드

- observe(): 타켓 요소에 대한 관찰을 시작한다.
- unobserve(): 타켓 요소에 대한 관찰을 중지한다.
- disconnect(): 인스턴스의 타켓 요소들에 대한 모든 관찰을 중지한다.
- takerecords(): IntersectionObserverEntry 인스턴스 배열을 반환한다.

 


## 사용되는 예시

1. 페이지가 스크롤 되는 도중 발생하는 이미지 또는 다른 컨텐츠의 레이지 로딩
2. 무한스크롤
3. 광고 수익 계산을 위한 가시성 보고
4. 뷰포트 내외의 애니메이션 수행 여부 결정