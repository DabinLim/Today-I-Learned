# 전략 패턴

전략 패턴은 전략에 따라 런타임에 알고리즘을 선택할 수 있는 디자인 패턴이다.<br><br>

GOF의 디자인패턴에서 정의하는 전략 패턴
> 동일 계열의 알고리즘들을 정의하고, 각 알고리즘을 캡슐화하며, 알고리즘을 해당 계열 안에서 상호 교제가 가능하도록 만든다.<br>
또한 알고리즘을 사용하는 클라이언트와 상관 없이 독립적으로 알고리즘을 다양하게 변경할 수 있게 한다.
<br><br>
하나의 클래스가 많은 행동들을 정의하고, 이런 행동들이 그 클래스의 연산 안에서 복잡한 다중 조건문을 필요로 할때, 조건문 대신 행동을 하나하나의 전략 클래스로 만들고, 동적으로 행동의 변경이 필요한 경우 전략을 바꾸는 방식의 디자인 패턴이다.

## 결제 수단을 선택하는 전략패턴의 예시
```js
class PaymentStrategy {
    pay() {
        throw new Error ('pay() must be implement')
    }
}

class TossPay extends PaymentStrategy {
    pay() {
        console.log('pay with TossPay')
    }
}

class NaverPay extends PaymentStrategy {
    pay() {
        console.log('pay with NaverPay')
    }
}

class KakaoPay extends PaymentStrategy {
    pay() {
        console.log('pay with KakaoPay')
    }
}

class PaymentProgram {
    constructor(strategy) {
        this.strategy = strategy;
    }

    pay() {
        if (!this.strategy) {
            console.log('No Strategy');
            return;
        }
        this.strategy.pay();
    }
}

const paymentProgram = new PaymentProgram(new TossPay());

paymentProgram.pay();
```

전략 패턴에는 항상 다음 두 객체가 포함된다.
1. 컨텍스트
2. 전략

컨텍스트는 PaymentProgram에 해당한다.
컨텍스트에는 항상 사용 중인 현재 전략에 대한 참조 또는 포인터가 있어야 합니다.<br>
위 예시에서 3개의 결제 전략이 있다면 나머지 2개는 선택사항이 되며 비활성화 상태라고 볼 수 있다.

컨텍스트는 호출하는 사람 (사용자 또는 클라이언트)에게 인터페이스(pay()메소드)를 제공한다.<br>


## 장점
- 동일 계열의 알고리즘을 정의하고 재사용도 가능하게 한다.
- PaymentProgram 클래스를 서브 클래싱하여 pay의 방법을 다르게 처리할 수 있으나 PaymentProgram과 pay의 알고리즘이 혼합되어 유지보수가 어려줘 질 수 있다.<br> pay 관련 알고리즘을 Strategy 클래스로 독립시켜 Program과 무관하게 알고리즘을 변형, 확장을 쉽게 만든다.
- 조건문을 없앨 수 있다.


## 단점

- 모든 Strategy 클래스를 상속 받은 전략클래스들은 Strategy 클래스의 인터페이스를 공유한다.<br>이로 인해 불필요한 매개변수를 전달받는 경우가 생길 수 있다.
- 여러 전략들로 인해 생성하는 객체의 수가 증가한다.