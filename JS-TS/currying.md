# Currying 과 Partial application

Currying과 Partial application이란 함수형 프로그래밍 기법 중 하나이다.
## Partial application
여러개의 인자를 받는 함수가 있을 때 일부의 인자를 고정한 함수를 만드는 기법이다.<br/>
아래와 같이 partial메소드를 클로저로 구현하여 args배열을 고정시키고 저장된 args와 새로운 인자를 더해주는 함수를 만들 수 있다.
```js
let plus = function(a, b, c) {
    return a + b + c;
}

Function.prototype.partial = function() {
    console.log(arguments);
    // slice 메소드의 this를 arguments로 바인딩
    // 유사 배열이기 때문에 apply()메소드 사용하여 복사
    // 클로저로 구현되어 함수가 종료되어도 args는 저장되어 유지됨
    let args = [].slice.apply(arguments);
    // Function의 메소드이기 때문에 this는 Function:plus
    let self = this; //[Function: plus]
    return function() {
        // partial() 메소드의 인자로 들어온 arguments들을 저장된 args와 concat함
      return self.apply(null, args.concat([].slice.apply(arguments)));
    };
};

const plus1 = plus.partial(1);
console.log(plus1(2, 3)) // 6 (1 + 2 + 3)
const plus2 = plus1.partial(2); // 3 (1 + 2)
console.log(plus2(4)); // 7 (1 + 2 + 4)
console.log(plus2(5)); // 7 (인수로 넘긴 5는 d 인자에 해당하므로 더해지지 않는다. )
```


bind 메소드를 사용하면 간단하지만 이미 모든 인자를 받았을때 추가로 인수를 넘기는 동작에서 차이가 있다.<br/>
```js
const plus1 = plus.bind(1);
console.log(plus1(2, 3)) // 6 (1 + 2 + 3)
const plus2 = plus1.bind(2); // 3 (1 + 2)
console.log(plus2(4)); // 7 (1 + 2 + 4)
console.log(plus2(5)); // 8 (1 + 2 + 5) (인수로 넘기는 5는 기존의 c인자를 대체한다.)
```

## Currying

커링도 partial application처럼 인자를 미리 고정할 수 있지만 하나씩만 고정한다.<br/>
또한, 모든 인자를 받을 때까지 계속 함수를 생성한다.<br/>
아래와 같은 모습을 가지게 되는데 인자의 갯수가 늘어나면 아래와 같이 구현은 힘들게 된다.<br/>

```js
function sayLoveYou(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
     }
  };
}
sayLoveYou(4)(8)(6); // 18
```

때문에 다음과 같은 방식으로 구현하게 된다.
```js
function sayLoveYou(a, b, c) {
  return a + b + c;
}

// 하나의 인자를 받음
Function.prototype.curry = function(one) {
  let origFunc = this;
  // 인자 갯수
  let target = origFunc.length;
  let args = [];
  function next(nextOne) {
    // 고정된 args에 새로 받은 인자를 더함
    args = args.concat(nextOne);
    // 함수의 인자를 모두 받을때까지 args의 길이 체크
    if (args.length === target) {
      return origFunc.apply(null, args);
    } else {
    // 받을 인자가 더 남았다면 다음 함수 리턴
      return function(nextOne) {
         return next(nextOne) 
      };
    }
  }
  return next(one);
}

sayLoveYou.curry(4)(8)(6); // 18
```

## 차이점
partial application은 함수의 인자들 중 일부를 미리 넣어둔 함수를 새로 만드는 것이며 partial()메소드 다음 호출시에는 결과를 반환해야 한다. (partial()() 하는경우)<br/>
반면, currying의 경우에는 함수의 인자를 하나씩 받는 경우에 사용되며 인자를 모두 받기 전까지는 다음 함수를 반환한다.
