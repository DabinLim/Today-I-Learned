# 커맨드 패턴

커맨트 패턴은 액션을 호출하는 객체를 구현하는 객체와 구분하는 클래스이다.<br>
즉, 명령을 내리는 클래스와 명령을 실행하는 클래스를 구분한다.<br><br>

## 구조

- Invoker: 기능의 실행을 요청하는 호출자 클래스, Client의 요청을 받아 Receiver의 액션을 호출
- Command, ConcreteCommand: Command는 인터페이스, ConcreteCommand는 Receiver가 무엇을 처리하는지의 세부 정의(execute의 세부 구현)이다.
- Receiver: ConcreteCommand에서 execute을 구현할때 필요한 클래스이다. 즉, 기능을 실행하는 클래스이다.

## 예시

다음은 차량 관련 주문을 명령 패턴으로 구현한 예시이다.
```js
class CarManagerCommand {
    constructor(carManager) {
        this.carManager = carManager;
    }

    execute(command, args) {
        this.carManager[command](args);
    }
}

// Receiver + ConcreteCommand의 역할
class CarManager {

    constructor(name) {
        this.name = name;
    }

    buyVehicle(model) {
        console.log(`${this.name} 매니저를 통해 ${model} 차량을 구입합니다.`);
    }

    inspectVehicle(model) {
        console.log(`${this.name} 매니저를 통해 ${model} 차량을 검사합니다.`)
    }

    sellVehicle(model) {
        console.log(`${this.name} 매니저를 통해 ${model} 차량을 판매합니다.`)
    }
    
}

const carManagerCommand = new CarManagerCommand(new CarManager('다빈'));
carManagerCommand.execute('buyVehicle', 'Ferrari 458 Spider');
carManagerCommand.execute('inspectVehicle', 'Porsche 911 Turbo');
carManagerCommand.execute('sellVehicle', 'Lamborghini Aventador');
```

위 예시에서 차량 주문은 커맨드 객체의 execute 메소드를 통해서만 호출하고 실행한다.<br>
커맨드 패턴을 통해 프로그램 내에서 carManager 메소드를 사용하는 경우 직접 접근하지 않아 결합을 느슨하게 할 수 있다.<br><br>

더 엄격하게 Invoker, ConcreteCommand, Receiver, Client의 역할을 구분하면 아래와 같은 코드가 된다.
```js
// Invoker
class CarManagerInvoker {
    #buyVehicleCommand;
    #inspectVehicleCommand;
    #sellVehicleCommand;

    constructor(buyVehicleCommand, inspectVehicleCommand, sellVehicleCommand) {
        this.#buyVehicleCommand = buyVehicleCommand;
        this.#inspectVehicleCommand = inspectVehicleCommand;
        this.#sellVehicleCommand = sellVehicleCommand;
    }

    buyVehicle(args) {
        this.#buyVehicleCommand.execute(args);
    }

    inspectVehicle(args) {
        this.#inspectVehicleCommand.execute(args);
    }

    sellVehicle(args) {
        this.#sellVehicleCommand.execute(args);
    }
}

// ConcreteCommand
class BuyVehicleCommand {
    #carManager;
    constructor(carManager) {
        this.#carManager = carManager;
    }

    execute(args) {
        this.#carManager.buyVehicle(args);
    }
}

class InspectVehicleCommand {
    constructor(carManager) {
        this.carManager = carManager;
    }

    execute(args) {
        this.carManager.inspectVehicle(args);
    }
}

class SellVehicleCommand {
    constructor(carManager) {
        this.carManager = carManager;
    }

    execute(args) {
        this.carManager.sellVehicle(args);
    }
}

// Receiver
class CarManagerReceiver {

    #name;

    constructor(name) {
        this.#name = name;
    }

    buyVehicle(model) {
        console.log(`${this.#name} 매니저를 통해 ${model} 차량을 구입합니다.`);
    }

    inspectVehicle(model) {
        console.log(`${this.#name} 매니저를 통해 ${model} 차량을 검사합니다.`)
    }

    sellVehicle(model) {
        console.log(`${this.#name} 매니저를 통해 ${model} 차량을 판매합니다.`)
    }
    
}


// Client
const buyVehicleCommand = new BuyVehicleCommand(new CarManagerReceiver('다빈'));
const inspectVehicleCommand = new InspectVehicleCommand(new CarManagerReceiver('다빈'));
const sellVehicleCommand = new SellVehicleCommand(new CarManagerReceiver('다빈'));

const carManagerInvoker = new CarManagerInvoker(buyVehicleCommand, inspectVehicleCommand, sellVehicleCommand);

carManagerInvoker.buyVehicle('Ferrari 458 Spider');
carManagerInvoker.sellVehicle('Porsche 911 Turbo');
carManagerInvoker.buyVehicle('Lamborghini Aventador');
```

## 장단점

### 장점
- 작업을 수행하는 객체와 요청하는 객체를 분리하여 단일 책임 원칙에 부합한다.
- 코드의 수정 없이 작업 수행 객체나 추가 구현이 가능하여 개방폐쇠 원칙에 부합한다.
- 커맨드 단위의 액션이 가능하다.

### 단점
- 구조가 간단하지 않아 이해가 쉽지 않다.