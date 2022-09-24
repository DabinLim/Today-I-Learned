# arrow function

### arrow function의 호출
arrow function은 오직 익명함수이기 때문에 함수 표현식만 사용할 수 있다.<br/>
때문에 호이스팅의 영향을 받지 않는다.<br/>

아래 코드는 호이스팅에 의해 변수의 선언 자체는 끌어올려졌지만 함수가 대입되기 전에 호출하였으므로 에러가 발생한다.
```js
example();

var example = () => {console.log('arrow function')};
```

### arrow function의 this
es5의 function의 경우 메소드 호출 시 this는 메소드를 포함하는 객체를 가리킨다.<br/>
그러나 arrow function의 this는 자신을 포함하는 상위 스코프의 this를 바라보고 이는 변하지 않는다 (Lexical this) <br/>
그러므로 아래 예시에서 call메소드를 통한 this 바인딩이 되면 objFunction에서 리턴된 bar메소드의 this 또한 같이 바인딩된다. (사실 같이 바인딩 된다기 보다는 this가 같다는 말이 더 정확하다.)

```js
function objFunction() {
  console.log('Inside `objFunction`:', this.foo); // 13
  return {
    foo: 25,
    bar: () => console.log('Inside `bar`:', this.foo) // 13
  };
}

objFunction.call({foo: 13}).bar();
```

이러한 특징은 콜백 함수를 작성시에 유용하다.<br/>
다음 예시에서 new Prefixer 생성자에 의해 생성된 pre 객체 안에는 prefixArray 메소드가 있다.<br/>
생성된 객체의 this는 Prefixer {} 객체 자신을 가리키고 그 안의 prefixArray 메소드는 호출되는 순간 Lexical this에 의해 상위 스코프의 this를 가리키게 된다( Prefixer {} 객체 ). <br/>
쉽게 얘기하면 지금 callback함수가 돌고 있는 스코프의 상위 스코프의 this이다.<br/>
(prefixArray() = arr.map(x => `${this.prefix}  ${x}`); 이고 그 상위 스코프는 Prefixer {} 객체이고 this는 Prefixer {} 객체이다.)<br/>
때문에 this.prefix를 통해 Hi를 받아 사용할 수 있다.<br/>
하지만 arrow function이 아니라 es5의 일반 익명 함수였다면 this는 globalThis(window)를 가리켰을 것이다.

```js
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lim', 'Kim']));
```

### arrow function을 쓰면 안되는 경우
 1. 일반 객체의 메소드 
<br/>
일반 객체의 메소드에서 arrow function을 사용하는 경우 this는 해당 객체를 가리키지 않는다.<br/>
Lexical this에 의해 arrow function의 this는 해당 객체가 아닌 상위 환경의 this를 가리키게 되므로 전역객체를 가리키게 된다.<br/>
그러므로 메소드에서 상위 환경의 this를 가리키기 위함이 목적이 아니라면 es5의 일반 함수를 사용해야 한다.

```js
const person = {
  name: 'Lim',
  sayHi: () => console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi undefined​

const person = {
  name: 'Lim',
  sayHi: function(){
    console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi Lim
```

2. prototype
<br/>
메소드를 prototype에 할당할 때도 arrow function을 사용하면 같은 문제가 발생한다.

```js
const person = {
  name: 'Lim',
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

person.sayHi(); // Hi undefined

const person = {
  name: 'Lim',
};

Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lim​
```

3. 생성자 함수
<br/>
arrow function은 생성자 함수로 사용할 수 없다.<br/>
함수 생성자로 객체를 생성하는 경우 해당 함수의 prototype 프로퍼티가 생성된 객체와 연결되는데 arrow function은 prototype 프로퍼티를 포함하고 있지 않기 때문이다.

4. addEventListener 함수의 콜백함수
<br/>
arrow function을 addEventListener의 콜백함수로 넘기면 this는 전역 객체를 가리킨다.<br/>
해당 element의 상위 환경의 this(window)를 가리키기 때문이다.<br/>
그러나 es5 함수를 넘기면 this 해당 element 가리키게 된다.<br/>
그렇다면 addEventListener콜백 내부에서 다른 메소드의 콜백함수를 넘기면 어떻게 될까<br/>
결과는 다음과 같다.

```js
document.getElementById('button').addEventListener('click', function(e){
    var testArray = [1];
    console.log('listener callback this', this) // button element
    testArray.forEach(() =>{
      console.log('forEach callback this', this) // button element
    });
  });

document.getElementById('button2').addEventListener('click', (e) => {
    var testArray = [1];
    console.log('listener callback this', this) // window
    testArray.forEach(() =>{
      console.log('forEach callback this', this) // window
    });
});

document.getElementById('button3').addEventListener('click', (e) => {
    var testArray = [1];
    console.log('listener callback this', this) // window
    testArray.forEach(function () {
      console.log('forEach callback this', this) // window
    });
});

document.getElementById('button4').addEventListener('click', function(e) {
    var testArray = [1];
    console.log('listener callback this', this) // button element
    testArray.forEach(function () {
      console.log('forEach callback this', this) // window
    });
});
```


### 추가로 메소드 안에서 콜백을 사용한 경우의 this는?
콜백으로 es5 function을 넘기면 해당 콜백의 this는 globalThis이고 arrowfunction을 넘긴다면? 아래와 같을 것이다.
```js
var obj = {
    names : ['Lim'],
    test(){ this.names.forEach((v) => {
        console.log(this);
    })}
}

  
obj.test() // { names: [ '김', '이', '박' ], test: [Function: test] }
// 콜백의 this는 상위 스코프 test()메소드의 this를 가리키고 test()메소드의 this는 obj 객체이다.

var obj2 = {
    names : ['Lim'],
    test: () => {
        obj2.names.forEach(() => {
          console.log(this)
        });
    }
}

obj2.test() // globalThis (window)
// 콜백의 this는 상위스코프인 this() 메소드가 되고 이 this() 메소드는 arrow function이므로 둘러싼 스코프의 상위 스코프인 전역객체를 가리킨다.
```

