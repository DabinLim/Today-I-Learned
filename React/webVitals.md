# 성능 지표 보기

React에 기본적으로 설치되는 webVitals를 통해 성능지표를 알아본다.

## webVitals

- CLS (cumulative layout shift) : 이미지가 깨지거나 광고가 많아 클릭하기 힘든 경우 즉, 클릭 미스율을 본다. 

- FID (first input delay) : 이벤트가 시작되는데 걸리는 시간

- FCP (first contentful paint) : 첫 시각적인 요소들이 보이는데 걸리는 시간 (빈껍데기 div같은 요소는 포함되지 않음)

- LCP (largest contentful paint) : 가장 큰 요소(중요도가 높은)가 보이는데 걸리는 시간

- TTFB (time to first byte) : 첫번째 컨텐츠 데이터를 가져오는데 걸리는 시간

### firebase 의 analytics에서 성능지표 확인하기

1. 먼저 firebase.js 에서 firebase를 사용할 준비를 한다. (당연히 firebase install이 더 먼저)

```
shared/firebase.js > 

import 'firebase/analytics'

const analytics = firebase.analytics();

export {analytics};

```

2. index.js 에서 analytics에 성능지표 보내기

```
index.js >

import {analytics} from './shared/firebase/'

function sendToAnalytics(metric){
    const _report = JSON.stringify(metric);

    analytics.logEvent('web_vital_report', _report);

}

reportWebVitals(sendToAnalytics);
```

3. firebase에서 배포 후 firebase의 analytics에서 확인<br>
실 사용 후 firebase의 analytics에 반영되기까지는 시간이 걸림(5분이 걸리기도 하고 30분, 1시간이 걸리기도 함)

<br>
<br>



### 사이트는 다 만들었다고 끝이 아니다!

사이트는 만들었다고 끝이 아니다. 계속 개선해 나가야 한다.<br>
사이트를 개선할 때 알면 좋은 내용

- 성능 최적화
    - 사이트 로딩 개선
    - api 중복 호출 방지
    - api 호출 전후처리 등
    - 이미지 용량 줄이기 (여러갈래 저장, .webp로 확장자 바꾸기, 리사이징 등)

- 사용성 끌어올리기
    - 오류가 나도 빈화면 보지 않도록 에러 페이지 만들기
    - 오래 걸리는 비동기 작업이 있다면 스피너 띄우기
    - 이미지 지연로딩 등
    - 유저의 불편한 점을 고쳐주는 것이 사용성 끌어올리기의 첫단계이다.