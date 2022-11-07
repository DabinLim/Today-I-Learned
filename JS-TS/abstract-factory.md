# 추상 팩토리 (abstract-factory)

추상 팩토리는 비슷한 유형의 객체를 추상화하여 공장에서 찍어내듯이 만들기 편하도록 디자인된 패턴이다.<br><br>

예를 들어 여러 모델의 차를 만들어내야 한다면 모든 차량의 중복적으로 들어가는 요소들을 일일히 구현하기보다 팩토리를 만들어 객체를 생성할 수 있다.

```js
// 팩토리 
const carFactory = (function() {
    const brands = {};
    return {
        addBrand(brand, Car) {
            if (Car.prototype.move && Car.prototype.stop) {
                brands[brand] = Car;
            }
        },
        create(brand, options) {
            const Car = brands[brand];
            if (Car) {
                console.log(`${options.price}원의 ${options.modelName} 차량이 생산되었습니다.`)
                return new Car(options);
            } else {
                return undefined;
            }
        }
    }
})();

// 차의 추상화

const Car = (function() {
    function Car(options) {
        this.modelName = options.modelName;
        this.price = options.price;
    }

    Car.prototype.move = function() {
        console.log(`${this.modelName}이 출발합니다.`)
    }
    Car.prototype.stop = function() {
        console.log(`${this.modelName}이 멈춥니다.`)
    }
    return Car;
})();

// 팩토리로 여러 종류의 브랜드 만들기

carFactory.addBrand('Ferrari', Car);
carFactory.addBrand('Porsche', Car);
carFactory.addBrand('Lamborghini', Car);

// 팩토리에 등록된 브랜드의 여러 모델들을 만들어내기

const _458Spider = carFactory.create('Ferrari', { modelName: '458 Spider', price: '5억'});
const _911Turbo = carFactory.create('Porsche', { modelName: '911 Turbo', price: '3억'});
const Boxster = carFactory.create('Porsche', { modelName: 'Boxster', price: '1억'});
const Aventador = carFactory.create('Lamborghini', { modelName: 'Aventador', price: '5억'});

```

class 문법을 사용하면 아래와 같이 구현할 수 있다.

```js
class CarFactory {
    brands = {};
    addBrand(brand, Car) {
        if (Car.prototype.move && Car.prototype.stop) {
            this.brands[brand] = Car;
        }
    }

    create(brand, options) {
        const Car = this.brands[brand];
        if (Car) {
            console.log(`${options.price}원의 ${options.modelName} 차량이 생산되었습니다.`)
            return new Car(options);
        } else {
            return undefined;
        }
    }
}

class Car {
    modelName;
    price;

    constructor (options) {
        this.modelName = options.modelName;
        this.price = options.price;
    }

    move() {
        console.log(`${this.modelName}이 출발합니다.`)
    }

    stop() {
        console.log(`${this.modelName}이 멈춥니다.`)
    }
}

const factory = new CarFactory();

factory.addBrand('Ferrari', Car);
factory.addBrand('Porsche', Car);
factory.addBrand('Lamborghini', Car);

const _458Spider = factory.create('Ferrari', { modelName: '458 Spider', price: '5억'});
const _911Turbo = factory.create('Porsche', { modelName: '911 Turbo', price: '3억'});
const Boxster = factory.create('Porsche', { modelName: 'Boxster', price: '1억'});
const Aventador = factory.create('Lamborghini', { modelName: 'Aventador', price: '5억'});

```

실제 구현을 할때에는 내가 만들고자 하는 결과를 먼저 생각하고 해당 결과를 만들기 위한 팩토리를 구상하는 것이 좋다.<br>
즉, 역순으로 구현하는 것이 좋다.