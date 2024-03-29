# 객체지향 프로그래밍

객체지향 프로그램은 컴퓨터 프로그래밍 패러다임중 하나로, 프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진 객체를 만들고 그 객체들 간의 유기적인상호작용을 통해 로직을 구성하는 프로그래밍 방법이다.<br>

## 객체 지향 프로그래밍의 장점

- 코드 재사용이 용이
남이 만든 클래스를 가져와서 이용할 수 있고 상속을 통해 확장해서 사용할 수 있음.

- 유지보수가 쉬움
절차 지향 프로그래밍에서는 코드를 수정해야 할 때 일일이 찾아 수정해야하는 반면 객체 지향 프로그래밍에서는 해당 부분만 수정 가능.

- 대형 프로젝트에 적합
클래스 단위로 모듈화 시켜서 개발할 수 있으므로 대형 프로젝트에서 업무 분담이 쉽다.

## 객체지향 프로그래밍의 단점

- 처리속도가 상대적으로 느림

- 객체가 많으면 용량이 커질 수 있음

- 설계 시 많은 시간과 노력이 필요

## 객체 지향 프로그래밍 키워드 

- 클래스 : 추상화를 거쳐 집단에 속하는 속성과 행위를 변수와 메서드로 정의한 것

- 인스턴스(객체) : 클래스에서 정의한 것을 토대로 실제 메모리상에 할당된 것으로 실제 프로그램에서 사용되는 데이터

- 추상화 : 중요한 정보만 표현함으로써 공통의 속성이나 기능을 묶어 이름을 붙이는 것 (클래스를 정의하는 것)<br/>불필요한 정보는 숨기고 중요한 정보만을 표현함으로써 프로그램을 간단하게 만드는 것

- 캡슐화 : 기능과 특성의 모음을 클래스라는 캡슐에 분류해서 넣는 것, 코드를 재수정 없이 재활용하는 것이 목적이다.<br/> 낮은 결합도를 유지할 수 있도록 설계, 정보은닉의 장점

- 상속 : 부모클래스의 속성과 기능을 그대로 이어받아 사용할 수 있게 하고 기능의 일부분을 변경해야 할 경우 상속 받은 자식클래스에서의 해당 기능만 다시 수정하여 사용할 수 있게 하는 것이다.

- 다형성 : 하나의 변수명, 함수명이 상황에 따라 다른 의미로 해석될 수 있는 것, 즉 오버라이딩, 오버로딩이 가능하다.
    - 오버라이딩 : 부모클래스의 메서드와 같은 이름, 매개변수를 재 정의 하는 것
    - 오버로딩 : 같은 이름의 함수를 여러개 정의하고, 매개변수의 타입과 개수를 다르게 하여 호출
