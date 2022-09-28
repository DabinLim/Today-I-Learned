# 객체 지향 자바스크립트 (prototype)

## 생성자

new 키워드를 붙이고 함수를 호출하는 경우 객체를 생성한다.<br/>
이렇게 객체를 생성하느 함수를 생성자 함수라고 한다.<br/>
다른 언어의 class를 대신한다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    alert(this.name + ' said "hello"');
  }
}

```

생성자 함수로 객체를 생성하면 각자 다른 객체를 생성한다.

```js
var dabin = new Person('Dabin', 29); // Person {name: 'Dabin', age: 29}
var david = new Person('David', 28); // Person {name: 'David', age: 28}
dabin.sayHello(); // 'Dabin said "hello"'
david.sayHello(); // 'David said "hello"'
```

## prototype

생성자 함수의 메소드를 prototype을 통해 넣으면 생성되는 객체들 모두가 해당 메소드를 공유하게 된다.<br/>
함수 내부에 this.sayHello를 작성하는 것보다 prototype에 넣어 공유하는 것이 더 효율적이다.<br/>
prototype은 모든 객체가 공유하고 있어서 한번만 만들어지지만, this.sayHello로 함수 내부에 작성하게 되면 객체를 생성할때마다 메소드가 만들어져 불필요한 메모리 낭비가 발생한다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function() {
  alert(this.name + ' said "hello"');
};
```

## prototype과 __proto__

객체에는 __proto__라는 객체가 포함되어 있다.<br/>
해당 객체는 다음과 같이 생겼다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function() {
  alert(this.name + ' said "hello"');
};

const person = new Person('Dabin', 29);
// Person {name: 'Dabin', age: 29, __proto__: Object} 

// __proto__
{
    constructor: function Person(name, age),
    sayHello: function(),
    __proto__: Object
}

```

실제 객체를 만들 때 (new 키워드를 통해 호출) 생성자의 prototype이 참조된 모습이 __proto__이다.<br/>
사용자는 prototype만 신경쓰면 되고 __proto__는 prototype이 제대로 구현되었는지 확인용으로 사용한다.<br/>
__proto__안의 __proto__는 상속과 관련되어 있으니 아래 상속에 정리한다.

## prototype, __proto__, constructor의 관계
prototype과 constructor는 부모자식 관계이다.<br/>
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function() {
  alert(this.name + ' said "hello"');
};

const person = new Person('Dabin', 29);
```
위 코드에서 Person.prototype.constructor === Person 이다.<br/>
Person.prototype === person.__proto__ 이기 때문에 person.__proto__.constructor === Person 이기도 한다.

## 상속 또는 확장 (extend)
상속이란 부모 생성자의 기능을 물려받으면서 새로운 기능도 추가하는 것을 말한다.

다음은 Vehicle 생성자함수를 상속 받아 다양한 종류의 차량을 생성하는 상속의 예시이다.

```js
function Vehicle(name, speed) {
    // Vehicle 생성자함수가 Sedan함수 내부에서 호출됐을때 this는 Sedan이 되며 Sedan의 프로퍼티에 인자들을 할당 (6)
  this.name = name;
  this.speed = speed;
}
Vehicle.prototype.drive = function () {
  console.log(this.name + ' runs at ' + this.speed)
};

function Sedan(name, speed, maxSpeed) {
  // 생성자 함수를 호출하면 Vehicle 생성자 객체에도 인자들을 넘겨줌 (5)
  Vehicle.apply(this, arguments)
  // 새롭운 프로퍼티 생성 및 할당 (7)
  this.maxSpeed = maxSpeed;
}
// 부모 생성자 함수의 prototype객체를 복사한 후 (1)
Sedan.prototype = Object.create(Vehicle.prototype);
// constructor를 자신으로 넘겨줌 (2)
Sedan.prototype.constructor = Sedan;
// 새로운 메소드 생성 (3)
Sedan.prototype.boost = function () {
  console.log(this.name + ' boosts its speed at ' + this.maxSpeed);
};

// 생성자 함수로 객체 생성 (4)
let avante = new Sedan('avante', 100, 200);

/*
새로운 객체가 생성됨 (8)
Sedan {
    name: 'avante',
    speed: 100,
    maxSpeed: 200,
    __proto__: {
        constructor: function Sedan(name, speed, maxSpeed) {},
        boost: function(),
        __proto__: {
            constructor: function Vehicle(name, speed)
            drive: function(),
            __proto__: Object
        }
    }
}
*/
```

위 코드에서 Vehicle 생성자를 상속 받은 Sedan 생성자로 새로운 객체를 생성하면 __proto__ 객체 내부에 또 다른 __proto__ 객체가 있다.<br/>
이 객체는 부모 객체의 __proto__객체이며 메소드를 호출할때 해당 객체의 __proto__객체에 찾는 메소드가 없다면 부모의 __proto__객체를 거슬러 올라가 찾게 된다.