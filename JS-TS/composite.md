# 복합체 패턴 (composite)

복합체 패턴이란 객체들의 관계를 트리 구조로 구성하여 부분-전체 계층을 표현하는  패턴이며,<br>
사용자가 <strong>단일 객체와 복합 객체 모두 동일하게</strong> 다루도록 한다.<br><br>

설계가 거대해질수록 예외 케이스가 늘어나 OCP(개방 폐쇄의 원칙)가 지켜지지 않는다.<br>
이를 해결하기 위해 컴포넌트 조립식 프로그래밍을 위한 복합체 패턴을 사용한다.<br>

## 구조

### Component
Leaf와 Composite가 구현해야 하는 인터페이스다.<br>
Leaf와 Composite는 모두 Component라는 같은 타입으로 다뤄진다.<br>
전체 클래스에 속한 요소들을 관리하는데 필요한 인터페이스, 순환 구조에서 요소들을 관리하는데 필요한 인터페이스를 정의한다.

### Leaf
기본 구성 요소의 기본 동작을 구현한다.<br>
가장 말단의 객체이다.<br>
객체 합성에 가장 기본이 되는 객체의 행동을 정의한다.

### Composite
Leaf를 요소로 가진다.<br>
복수개의 Leaf, 복수개의 Composite을 부분으로 가질 수 있다.<br>
자식이 있는 구성 요소에 대한 행동을 정의한다.
자신이 복합하는 요소들을 저장하면서, Component 인터페이스에 정의된 자식 관련 연산을 구현한다.

## 예시

아래는 중복 할인을 적용하는 복합체 패턴의 예시이다.

```js
// Component
class Discount {
    getDiscountedPrice() {}
}

// Leaf
class BasicDiscount extends Discount {
    constructor(discount) {
        super();
        this.discount = discount;
    }

    getDiscountedPrice(price) {
        return this.discount * price;
    }
}

// Composite
class CompositeDiscount extends Discount {
    constructor() {
        super();
        this.discounts = [];
    }

    addDiscount(discount) {
        this.discounts.push(discount);
        return this;
    }

    // 복합 객체를 단일 객체와 동일하게 다룸
    getDiscountedPrice(price) {
        return price - this.discounts.reduce((acc, discount) => 
        acc + discount.getDiscountedPrice(price), 0)
    }
}
const discountComposite  = new CompositeDiscount()
    .addDiscount(new BasicDiscount(0.1))
    .addDiscount(new BasicDiscount(0.2));

console.log(discountComposite.getDiscountedPrice(100)); // 70
```

아래는 또 다른 예시로 여러 분대(단일 객체)가 모여 만들어진 소대(복합 객체)를 동일하게 다루는 예시이다.
```js
// Component
class MilitaryUnit {
    getLeader() {}
    getNumber() {}
}

// Leaf
class Squad extends MilitaryUnit {
    constructor(leader) {
        super();
        this.leader = leader;
    }

    getLeader() {
        return this.leader;
    }

    getNumber() {
        return 10;
    }
}

// Composite
class Platoon extends MilitaryUnit {
    constructor(leader) {
        super();
        this.leader = leader;
        this.squads = [];
    }

    getLeader() {
        return this.leader;
    }

    getNumber() {
        let sum = 0;
        this.squads.forEach((squad) => {
            sum += squad.getNumber();
        });
        return sum;
    }

    addSquad(newSquad) {
        this.squads.push(newSquad)
        return this;
    }
}

const platoon = new Platoon('Dabin')
    .addSquad(new Squad('commanderA'))
    .addSquad(new Squad('commanderB'))
    .addSquad(new Squad('commanderC'))
    .addSquad(new Squad('commanderD'))

console.log(platoon.getLeader()); // Dabin
console.log(platoon.getNumber()); // 40
```

## 장단점

### 장점
- 객체들이 모두 같은 타입으로 취급되어 새로운 클래스 추가가 용이하다.
- 단일 객체 및 복합 객체를 구분하지 않고 코드 작성이 가능하여 사용자 코드가 단순해진다.


### 단점
- 설계가 지나치게 범용성을 많이 가진다.
- 복합체의 구성 요소에 제약을 가하기 힘들다.