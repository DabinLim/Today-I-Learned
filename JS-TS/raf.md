# requestAnimationFrame

애니메이션이란 여러개의 프레임을 연속적으로 이어붙여 움직이는 것처럼 보이게 하는 것이다.<br>
애니메이션을 자연스럽게 만들기 위해 사람이 최대로 볼 수 있는 1초의 60개의 프레임을 찍어내는 것이 이상적이다.<br>
과거에는 1초의 60개의 프레임을 찍어내기 위해 아래와 같이 setInterval을 통해 16.6ms마다 프레임을 이동시키곤 했다.

```js
setInterval(function(){
    moveFrame()
}, 1000/60)
```

그러나 자바스크립트의 이벤트 루프 특성상 이는 16.6ms마다 실행됨이 보장되지 않고 프레임을 이동시키는 로직이 복잡해 시간이 오래걸릴수록 더 심해져 프레임의 누락을 발생시킨다.<br>
이렇게 되면 사용자 입장에서는 뚝뚝 끊기는 느낌을 받을 수 있다.

requestAnimationFrame은 브라우저의 프레임 생성 초기 단계에 맞춰 프레임 이동을 실행시켜 더 부드럽게 동작한다.<br>
브라우저가 레이아웃을 계산하기 바로 직전에 호출되어 다음 레이아웃 계산에 반영된다.<br>

```js
let position = 0;
let content = document.getElementById('content');
function animation() {
    position += 1;
    content.style.left = position;
    const raf = requestAnimationFrame(animation)
    if (position === 500) {
        cancelAnimationFrame(raf)
    }
}     
animation()
```

requestAnimationFrame는 페이지가 비활성화시 프레임을 그리는 작업을 일시중지해 최적화에 도움을 준다.<br>
또한 raf에 등록된 콜백을 repaint전에 한번에 처리하기 때문에 여기서 DOM 조작을 하게되면 reflow를 최소화 할 수 있다.
[reflow 최소화 예시](https://codepen.io/omerillo/pen/reLmzK)
