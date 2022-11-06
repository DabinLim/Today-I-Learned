# 싱글턴 패턴

필요에 의해 <strong>단 하나</strong>의 객체만 만드는 것을 싱글턴 패턴이라 한다.<br>
- 생성자가 여러 차례 호출 되어도 실제 생성되는 객체는 하나다.
- 최초 생성 이후 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.

자바스크립트의 객체 리터럴이 대표적인 싱글턴 패턴의 예시이다.
```js
let obj = {
    name: 'dabin',
    printName() {
        console.log(this.a)
    }
}
```

리터럴 객체는 모든 속성이 공개되어있기 때문에 다음 코드와 같이 비공개로 만들어야 제대로 된 싱글톤이라 할 수 있다.

```js
let singleton = (function() {
    let instance;
    let name = 'hello';
    function initialize() {
        return {
            name,
            printName() {
                console.log(this.name);
            };
        }
    };
    return {
        getInstance() {
            if (!instance) {
                console.log('initialize');
                instance = initialize();
            }

            return instance;
        }
    }
})();

const first = singleton.getInstance();
const second = singleton.getInstance();
console.log(first === second);
```

singleton은 단 하나의 객체만을 반환해야 하기 때문에 instance가 존재한다면 initialize시 가지고 있는 인스턴스를 반환하도록 하여 같은 객체를 반환한다.<br><br>
또한 외부로 노출하는 메소드가 있고 비공개 변수, 메소드를 작성할 수 있다.

## 용도
데이터베이스 연결과 같이 중복된 연결을 방지하기 위해 동일한 하나의 객체만을 사용해야 하는 경우 사용된다.<br>
하나의 동일한 객체를 참조하기 때문에 메모리 절약에 이점이 있다.<br><br>

프론트엔드에서 싱글톤 패턴의 사용을 확인할 수 있는 대표적인 예는 전역 상태 라이브러리 리덕스가 있다.<br>

> In Redux the State Tree uses the Singleton pattern and the connect method uses the Observer pattern.<br><br>
Redux에서 State Tree는 Singleton 패턴을 사용하고 연결 방법은 Observer 패턴을 사용합니다. 


리덕스는 여러 뷰에서 옵저빙하여 상태를 관찰하고 업데이트 여부를 판단해 최신의 상태를 반영한다.<br>
아래와 같이 유저 정보를 전역 상태로 관리하는데 모든 객체가 다른 객체라면 subscribe된 뷰들이 같은 정보를 반영할 수 없다.
```js
const user = useSelector((state) => state.user.userInfo);
// ... view
```
그렇기 때문에 항상 같은 상태 객체를 반환하며 이는 싱글톤 패턴의 활용으로 볼 수 있다.<br>
