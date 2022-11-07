# 빌더 패턴

빌터 패턴은 객체를 생성하는 것에 관한 패턴이다.<br>
객체의 생성 과정을 분리해 순차적이고 직관적으로 만들며 객체의 불변성을 유지할수도 있다.


## 생성자 함수를 통한 객체 생성
```js
function User(name, age, height, weight) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.weight = weight;
}

const user1 = new User('Dabin', 10, null, 30);
const user2 = new User('David', 11, 150, null);
const user3 = new User('SomeUser', 10);
```

위 코드에서 User 생성자 함수는 이름, 나이, 키, 몸무게를 순서로 받아 객체를 생성한다.<br>
이때 다음과 같은 문제점이 있다.
- 매번 파라미터 순서를 체크해야 함 (파라미터가 늘어나면 실수하기 쉬워짐)
- 생성하는 부분만 봐서는 숫자와 null이 무엇을 의미하는지 파악하기 힘듬

위 문제를 해결하기 위해 빌더 패턴을 사용한다.

## 빌더 패턴을 활용한 객체 생성

```js
class User {
    #name;
    #age;
    #height;
    #weight;

    constructor(builder) {
        this.#name = builder.getName();
        this.#age = builder.getAge();
        this.#height = builder.getHeight();
        this.#weight = builder.getWeight();
    }

    getName() {
        return this.#name;
    }

    getAge() {
        return this.#age;
    }

    getHeight() {
        return this.#height;
    }

    getWeight() {
        return this.#weight;
    }

    static Builder = class {
        #name = "";
        #age = 0;
        #height = 0;
        #weight = 0;

        getName() {
            return this.#name;
        }

        setName(name) {
            this.#name = name;
            return this;
        }

        getAge() {
            return this.#age;
        }

        setAge(age) {
            this.#age = age;
            return this;
        }

        getHeight() {
            return this.#height;
        }

        setHeight(height) {
            this.#height = height;
            return this;
        }

        getWeight() {
            return this.#weight;
        }

        setWeight(weight) {
            this.#weight = weight;
            return this;
        }

        build() {
            return new User(this);
        }
    }
}

const user = new User.Builder().setName('Dabin').setAge(29).build();
```

위에서 보았던 생성자함수의 문제를 해결하기 위한 클래스 문법을 활용한 빌더 패턴이다.<br>
User 클래스 내부에 Builder라는 static 클래스를 가지고 있고 이 Builder 클래스를 통해 객체를 생성한다.<br>
생성자 함수를 통해 만들었던 방식의 단점이었던 매개변수가 늘어나는 경우의 실수를 해결하였고 어떤 프로퍼티를 만들자고자 하는지 확실하게 알 수 있어 가독성이 향상되었다.<br>

### 빌더 패턴의 단점
가장 큰 단점은 코드의 길이가 길어지는 점이다.<br>
불변성을 유지하기 위해 private 변수를 사용하였기 때문에 프로퍼티에 접근하기 위한 get 메소드를 하나하나 작성해야 하고 새로운 프로퍼티를 추가하기 위해서는 기존 클래스, 빌더 클래스를 모두 수정해야 한다.