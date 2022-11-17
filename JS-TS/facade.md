# 퍼사드 패턴

퍼사드 패턴은 자주 사용되는 메소드를 묶어 새로운 메소드를 만드는 패턴이다.<br>
메소드는 하나의 역할만을 수행하도록 하기 위해 세부적인 개별 기능 단위로 작성하는 경우가 많은데 이러다 보면 하나의 기능을 위해 사용하는 메소드가 많아질 수 있다.<br>
자주 같이 사용되는 메소드를 묶어 기능을 제공하는 인터페이스를 만들어 사용자 입장에서 쉽게 인터페이스를 사용할 수 있도록 한다.<br>
사용자에게 굳이 내부가 어떻게 구현되어 있는지 알리지 않고 인터페이스(Api)만을 제공한다고 생각하면 된다.

## 예시
차량이 출발하는데는 문을 열고 자리에 앉아 벨트를 매고 시동을 건 다음 액셀을 밟는 과정이 필요하다.<br>
메소드 역할 분리를 위해 이들을 분리하지만 사용자에게 인터페이스를 제공할때 사용자가 하나하나 일일히 조작하기보다는 출발이라는 과정을 묶어 하나의 기능으로 제공할 수 있다.
```js
// 출발할때
openDoor()
getInCar();
closeDoor();
fastenSeatBelt();
turnOnCar();
stepAccelerator();

// 도착했을때
stepBrake();
turnOutCar();
unbelt();
openDoor();
getOutCar();
closeDoor();

// 퍼사드 패턴으로 인터페이스 제공

function startCar() {
    openDoor()
    getInCar();
    closeDoor();
    fastenSeatBelt();
    turnOnCar();
    stepAccelerator();
}

startCar();

function stopCar() {
    stepBrake();
    turnOutCar();
    unbelt();
    openDoor();
    getOutCar();
    closeDoor();
}

stopCar();
```