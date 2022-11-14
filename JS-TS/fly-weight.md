# 플라이급 패턴

플라이급 패턴은 반복적이고 느리고 비효율적으로 데이터를 공유하는 코드를 최적화하기 위한 고전적인 구조 솔루션이다.<br>

## 예시
자바스크립트에서 플라이급 패턴을 활용하는 예시로는 prototype이 있다.
```js
function Character(name) {
    this.name = name;
    this.level = 1;
    this.hp = 50;
    this.move = function() {
        console.log('moving');
    }
}

const character1 = new Character('dabin');
const character2 = new Character('dabin2');
const character3 = new Character('dabin3');
```
위 예시와 같이 함수 내부에서 프로퍼티와 메소드를 만들어주면 객체를 생성할때마다 프로퍼티와 메소드를 만드는 작업을 해야 한다.

```js
function Character(name) {
    this.name = name;
}

Character.prototype.level = 1;
Character.prototype.hp = 50;
Character.prototype.move = function() {
    console.log('moving');
}

const character1 = new Character('dabin');
const character2 = new Character('dabin2');
const character3 = new Character('dabin3');

character1.hp = 40;
console.log(character1.hp) // 40;
console.log(character2.hp) // 50;
```

위 코드처럼 프로토타입에 프로퍼티와 메소드를 할당하면 새로운 객체를 생성할때 프로토타입을 참조하기 때문에 메모리를 아낄 수 있다.<br>
여기서 character1의 hp를 40으로 재할당 하였음에도 character2의 hp가 바뀌지 않는 이유는 값을 대입할때는 프로토타입 체인을 거슬러 올라가지 않기 때문이다.<br>
즉, 메모리를 아끼며 특성도 관리할 수 있다.
