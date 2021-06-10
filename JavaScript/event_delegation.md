# 이벤트 위임 (event delegation)

부모 요소에 이벤트 리스너를 붙이는 것으로 하위 요소에 이벤트가 발생하면 이벤트 버블링 때문에 부모요소에 연결된 리스너가 실행된다. 

## 장점

- 이벤트를 부모에 하나만 추가하면 되기 때문에 사용하는 메모리의 양이 감소한다.

- 이벤트 발생하는 요소가 추가되고 제거될때마다 리스너를 추가하고 제거할 필요가 없다.

## 이벤트 버블링, 이벤트 캡처링

- 캡처링 : window로부터 이벤트가 발생한 요소까지 이벤트 전파 (상위->하위)

- 버블링 : 이벤트가 발생한 요소부터 window 까지 이벤트를 전파 (하위->상위)

## 버블링과 캡처링 제어

세번쨰 인자로 useCapture을 Boolean값으로 지정해 제어한다.
default값은 false로 버블링을 통해 이벤트를 전파하게 되며 true로 설정하면 캡처링을 통해 이벤트를 전파한다.

```
target.addEventListener('click', function(){}, true);
```

이벤트 전파를 원하지 않는 경우에는 stopPropagation() 메소드를 사용하면 된다.

```
target.addEventListener('click', function(e){
    e.stopPropagation();
});
```