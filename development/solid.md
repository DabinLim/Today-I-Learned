# SOLID (객체 지향 개발 5대 원리)

소프트웨어는 하드웨어의 행위를 부드럽게 변경할 수 있도록 하기 위한 것이다.<br/>
즉, 소프트웨어는 변경하기 쉬워야 한다.<br/>
따라서 아키텍처는 형태에 독립적이어야 하고, 그럴수록 더 실용적인 아키텍처가 된다.<br/><br/>
그러므로 SOLID의 궁극적인 목적은 <strong>변경에 유연해야 한다는 것</strong>이다
## 5가지 원리의 핵심 내용

### SRP (단일책임의 원칙: Single Responsibility Principle)

응집성을 높인다.<br/>
작성된 클래스는 하나의 기능만 가지며 클래스가 제공하는 모든 서비스는 하나의 책임을 수행하는데 집중되어 있어야 한다.<br/>
어떠한 변화에 의해 클래스를 변경해야 하는 이유는 하나뿐이어야 한다.<br/>
SRP원리를 적용하면 책임 영역이 확실해지기 때문에 한 책임의 변경에서 다른 책임의 변경으로의 연쇄작용에서 자유로워 진다.<br/>
또한 책임을 적절히 분배함으로써 코드의 가독성 향상, 유지보수 용이라는 이점까지 생긴다.<br/>
이 원리는 다른 원리들에 비해 개념은 단순하지만 실무 프로세스에서의 적용은 쉽지 않다.<br/>
도메인에 대한 업무 이해가 부족하면 책임 분배가 어렵기 때문에 평소 많은 연습과 경험이 필요하다

```js
// SRP 만족예시
// 남자친구의 역할과 개발자의 역할을 구분하여 데이팅과 코딩을 동시에 해서 여자친구한테 혼나는 일을 방지한다.
class Dabin {
    name: string;
    age: number;
    constructor (name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Boyfriend extends Dabin {
    dating() {
        // ...
    }
    constructor (name: string, age: number) {
        super(name, age)
        this.name = name;
        this.age = age;
    }
}

class Developer extends Dabin {
    coding() {
        //...
    }
    constructor (name: string, age: number) {
        super(name, age)
        this.name = name;
        this.age = age;
    }
}
```

1. 분리된 두 클래스간의 관계의 복잡도를 줄인다.
2. 분리된 클래스들이 유사하고 비슷한 책임을 중복해서 가지고 있다면 분리된 슈퍼클래스를 사용할 수 있다.
3. 각각 공유되는 요소를 부모클래스로 정의하여 부모 클래스에게 위임한다.
4. 클래스는 자신의 이름이 나타내는 일을 해야 한다. 올바른 클래스 이름은 해당 클래스의 책임을 나타낼 수 있는 가장 좋은 방법이다.
5. 개체 간 응집력이 있다면 병합, 결합력이 있다면 분리가 순 작용의 수단이 된다.


### OCP (개방 폐쇠의 원칙: Open Close Principle)

소프트웨어의 구성요소 (컴포넌트, 클래스, 모듈, 함수)는 확장에는 열려있고, 변경(클라이언트 입장)에는 닫혀있어야 한다는 원리이다.<br/>
요구사항의 변경이나 추가사항이 발생하더라도, 기존 구성요소는 수정이 일어나지 말아야 하며, 기존 구성요소를 쉽게 확장해서 재사용할 수 있어야 한다는 뜻이다.<br/>
OCP는 관리가능하고 재사용 가능한 코드를 만드는 기반이며, 이를 가능하게 하는 중요 메커니즘은 추상화와 다형성이다.

```js
// OCP를 만족하는 예시
class Card {
  private code: String;
  private expiration: Date;
  protected monthlyCost: number;

  constructor(code: String, expiration: Date, monthlyCost: number) {
    this.code = code;
    this.expiration = expiration;
    this.monthlyCost = monthlyCost;
  }

  getCode(): String {
    return this.code;
  }

  getExpiration(): Date {
    return this.expiration;
  }

  monthlyDiscount(): number {
    return this.monthlyCost * 0.02;
  }
}

class GoldCard extends Card {
  monthlyDiscount(): number {
    return this.monthlyCost * 0.05;
  }
}

class SilverCard extends Card {
  monthlyDiscount(): number {
    return this.monthlyCost * 0.03;
  }
}
```

1. 변경(확장)될 것과 않은 것을 엄격하게 구분한다.
2. 두 모듈이 만나는 지점에 인터페이스를 정의한다.
3. 구현에 의존하기보다 정의한 인터페이스에 의존하도록 코드를 작성한다.
4. 확장되는 것과 변경되지 않는 모듈을 분리하는 과정에서 크기 조절에 실패하면 오히려 관계가 더 복잡해질 수 있다.
5. 인터페이스는 가능하면 변경되어서는 안된다.
6. 추상화(다른 모든 종류의 객체로부터 식별될 수 있는 객체의 본질적인 특징)를 통해 인터페이스 식별

### LSP (리스코브 치환의 원칙: The Liskov Substitution Principle)

서브 타입은 언제나 기반 타입과 호환될 수 있어야 한다.<br/>
ex) 기반 타입 : 동물, 서브 타입: 포유류<br/>
서브 타입은 반드시 기반 타입이 약속한 규약 (public 인터페이스, 메소드가 던지는 예외)을 지켜야 한다.<br/><br/>


```js
//LSP를 만족하는 예시
abstract class Address {
  addressee: string;
  country: string;
  postalCode: string;
  city: string;
  street: string;
  house: number;

  abstract writeAddress(): string;
}

class KoreaAddress extends Address {
  writeAddress(): string {
    return "Formatted Address Korea" + this.city;
  }
}

class UKAddress extends Address {
  writeAddress(): string {
    return "Formatted Address UK" + this.city;
  }
}

class USAAddress extends Address {
  writeAddress(): string {
    return "Formatted Address USA" + this.city;
  }
}

// PrintAddress 메서드에서 받을 파라미터는 치환이 가능하다.
class AddressWriter {
  PrintAddress(writer: Address): string {
    return writer.writeAddress();
  }
}
```
1. 서브클래스가 확장에 대한 인터페이스를 준수해야 함을 의미한다.<br/>
2. 하위 타입 객체는 상위 타입 객체에서 가능한 행위를 수행할 수 있어야 한다.<br/>
즉, 상위 타입 객체를 하위 타입 객체로 치환해도 정상 동작하여야 한다.<br/>
3. 상속 관계에서는 반드시 일반화 관계 (IS-A) 가 성립해야 한다.<br/>
상속 관계가 아닌 클래스들을 상속관계로 설정하면 이 원칙이 위배된다.<br/><br/>

리스코프 치환 원칙을 지키지 않으면 개방 폐쇄 원칙을 위반하게 된다.<br/>
기능 확장을 위해 기존의 코드를 여러 번 수정해야 한다.<br/>

### ISP (인터페이스 분리 원칙: Interface Segregation Principle)
클라이언트는 자신이 사용하는 메소드에만 의존해야 한다는 원칙이다.<br/>
한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 않아야 한다.<br/>
하나의 통상적인 인터페이스보다는 여러 개의 세부적인 인터페이스가 낫다.<br/>
즉, 인터페이스 내의 메소드는 최소한 일수록 좋다.
인터페이스는 해당 인터페이스를 사용하는 클라이언트를 기준으로 잘게 분리되어야 한다.

```js
// ISP를 만족하는 예시
interface Printer {
  printDocument(document: Document);
}

interface Stapler {
  stapleDocument(document: Document, tray: number);
}

interface Copier {
  copyDocument();
}

class SimplePrinter implements Printer {
  public printDocument(document: Document) {}
}

class SuperPrinter implements Printer, Stapler, Copier {
  public copyDocument() {}
  public printDocument(document: Document) {}
  public stapleDocument(document: Document, tray: number) {}
}
```

### DIP (의존 역전 원칙: Dependency Inversion Principle)
의존 관계를 맺을 때, 변하기 쉬운 것(구체적인것) 보다는 변하기 어려운 것(추상적인것)에 의존해야 한다.<br/>
구체화된 클래스 보다는 추상 클래스나 인터페이스에 의존해야 한다.<br/>
고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다.<br/>
저수준 모듈이 고수준 모듈에서 정의한 추상 타입에 의존해야 한다.<br/>
저수준 모듈이 변경되어도 고수준 모듈은 변경이 필요없는 형태가 이상적이다.
```js
// DIP를 만족하는 예시
// 인터페이스를 활용하여 고수준에서 저수준을 의존하는 것을 역전시킨다.
interface IWindow {
  open();
  close();
}

class CarWindow implements IWindow {
  open() {
    //...
  }

  close() {
    //...
  }
}

class WindowSwitch {
  private isOn = false;

  constructor(private window: IWindow) {}

  onPress() {
    if (this.isOn) {
      this.window.close();
      this.isOn = false;
    } else {
      this.window.open();
      this.isOn = true;
    }
  }
}
```

## 정리
SRP와 ISP는 객체가 커지는 것을 막아준다.<br/>
객체가 <strong>단일 책임</strong>을 갖도록 하고 클라이언트마다 특화된 인터페이스를 구현하게 함으로써 <strong>한 기능의 변경이 다른곳까지 미치는 영향을 최소화</strong>하고, 이는 <strong>기능 추가 및 변경을 용이</strong>하도록 만들어준다.<br/><br/>

LSP와 DIP는 OCP를 서포트한다.<br/>
OCP는 자주 변화되는 부분을 추상화하고 다형성을 이용함으로써 기능 확장에는 용이하되 기존 코드의 변화에는 보수적이도록 만들어준다.<br/>
변화되는 부분을 추상화를 도와주는 원칙 : DIP<br/>
다형성 구현을 도와주는 원칙 : LSP

## 참조
[Gyun's 개발일지](https://devlog-wjdrbs96.tistory.com/380)<br/>
[Bbaktaeho:티스토리](https://bbaktaeho-95.tistory.com/98)
<br/>
[넥스트리소프트](https://www.nextree.co.kr/p6960/)