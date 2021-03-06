# Protype
<br>

## 자바스크립트(JS)와 클래스 기반 객체 지향 언어

- JS는 동적 언어이고 클래스가 없는 언어이다.

- JS는 프로토타입 기반 동적 언어이다.

- JS의 클래스는 ES6부터 지원하는 <키워드> 이다.

- 클래스 기반 : 객체 생성 전에 클래스 정의, 이를 통해 객체(인스턴스) 생성

- JS : 클래스 없이 객체 생성 ( 리터럴과 생성자 )

## 프로토타입이란?

- 디자인 패턴 중 하나이다. (복사해서 새거 만듬)

- JS의 모든 객체는 자신의 부모 객체와 연결되어 있다. ( 부모 객체의 원형 )

- 마치 객체지향의 상속 개념처럼 부모 객체의 프로퍼티나 메소드를 상속받아 쓸 수 있다.(정확히는 위임)

- 이런 부모 객체를 프로토타입 객체 또는 프로토타입이라 부른다.

- 객체는 함수의 프로토타입 객체를 복사해서 생성한다.

- 부모 객체를 참조 하는 것을 프로토타입 링크라고 한다.

- 자신이 어디에서 복제 되었는지 기억하고 있다.

- 프로토타입 체인 : 상위(부모)부터 하위(자식)까지 이어져 있는 프로토타입의 연결

- JS의 객체를 가장 저렴하게 리소스 낭비 없이 생성하려는 방식