# 중재자 패턴

중재자 패턴은 야러 객체들을 모두 관리하는 관제탑 같은 역할을 한다.<br>
등록된 객체들의 상황을 통제하고 관리할 수 있으며 이름 그대로 중재자의 역할을 할 수 있다.<br>
등록된 객체들을 참여자(participants)라고 하고 중재자(mediator)에 등록한다.<br>
중재자 패턴은 채팅방, 자원 분배기, 가계부 등에 사용될 수 있다.

## 예시
채팅방을 중재자 패턴으로 구현하는 예시이다.

```js
class Participant {
    constructor(name) {
        this.name = name;
        this.chatRoom = null;
        this.messages = [];
    }

    send(message) {
        this.chatRoom.send(`${this.name}님의 채팅: ${message}`, this)
    }

    receive(message) {
        this.messages.push(message);
        console.log(`${this.name}의 채팅창 - ${message}`);
    }
}

class ChatRoom {
    constructor() {
        this.participants = [];
    }

    enter(participant) {
        this.participants.push(participant);
        participant.chatRoom = this;
        this.participants.forEach((v) => {
            v.receive(`${participant.name}님이 입장하였습니다.`);
        });
    }

    send(message) {
        this.participants.forEach((v) => {
            v.receive(message);
        })
    }
}



const dabin = new Participant('Dabin');
const harry = new Participant('Harry');
const ron = new Participant('Ron');
const hermione = new Participant('Hermione');

const gryffindorHouse = new ChatRoom();

gryffindorHouse.enter(dabin);
// Dabin의 채팅창 - Dabin님이 입장하였습니다.
gryffindorHouse.enter(harry);
// Dabin의 채팅창 - Harry님이 입장하였습니다.
// Harry의 채팅창 - Harry님이 입장하였습니다.
gryffindorHouse.enter(ron);
// Dabin의 채팅창 - Ron님이 입장하였습니다.
// Harry의 채팅창 - Ron님이 입장하였습니다.
// Ron의 채팅창 - Ron님이 입장하였습니다.
ron.send('헤르미온느는 언제와?');
// Dabin의 채팅창 - Ron님의 채팅: 헤르미온느는 언제와?
// Harry의 채팅창 - Ron님의 채팅: 헤르미온느는 언제와?
// Ron의 채팅창 - Ron님의 채팅: 헤르미온느는 언제와?
gryffindorHouse.enter(hermione);
// Dabin의 채팅창 - Hermione님이 입장하였습니다.
// Harry의 채팅창 - Hermione님이 입장하였습니다.
// Ron의 채팅창 - Hermione님이 입장하였습니다.
// Hermione의 채팅창 - Hermione님이 입장하였습니다.
hermione.send('나 왔엉');
// Dabin의 채팅창 - Hermione님의 채팅: 나 왔엉
// Harry의 채팅창 - Hermione님의 채팅: 나 왔엉
// Ron의 채팅창 - Hermione님의 채팅: 나 왔엉
// Hermione의 채팅창 - Hermione님의 채팅: 나 왔엉
```

위 코드에서 ChatRoom은 중재자 또는 관제탑의 역할을 하며 각 채팅방의 참여자들이 participant 역할을 한다.<br>
participant의 채팅들은 중재자를 통해 각각의 참여자들에게 전달된다.

## 장단점

### 장점
- 중재자를 통해 관리되므로 participant들간의 결합도가 약해진다.

### 단점
- 특정 어플리케이션에 맞춰 개발이 되기 때문에 재사용이 어렵다.
- 객체간 통신 로직(중재자를 통한)이 복잡해지거나 객체 형태가 자주 변경되는 경우 유지보수가 어렵다.
