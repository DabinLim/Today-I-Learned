# JavaScript 에서의 this

this가 가리키는 것은 코드의 실행 위치, 실행 방법에 따라 달라진다.

1. 함수 실행에 new 키워드를 사용하면, 그 함수 안에서 this는 새로운 객체를 가리킨다.

2. apply, call, bind를 사용해 함수를 호출 또는 생성하였다면 함수 안에서 this는 apply, call, bind 호출시 전달된 객체를 가리킨다.

3. 함수가 객체의 메소드로서 호출되었다면 this는 그 함수의 property로 추가한 객체를 가리킨다.

4. 3가지를 제외한 방식으로 호출되었다면 this는 전역 객체를 가리킨다. 브라우저에서는 window, node에서는 global이 된다. strict 모드에서는 undefined가 된다.

5. 4가지 조건이 중첩된다면 1번 규칙부터 우선 적용된다.

6. arrow function이라면 함수가 만들어진 시점에서 그 함수를 둘러싼 scope의 this를 가리킨다.