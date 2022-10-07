# 디자인 패턴의 종류

- 소프트웨어를 설계할 때 특정 맥락에서 자주 발생하는 고질적인 문제들이 또 발생했을 때 재사용할 수 있는 훌륭한 해결책
- 바퀴를 다시 발명하지 말라


## 디자인 패턴 구조
- 콘텍스트
  - 문제가 발생하는 상황 (패턴이 적용될 수 있는 상황)을 나타낸다.
  - 경우에 따라서는 패턴이 유용하지 못한 상황을 나타내기도 한다.
- 문제
  - 패턴이 적용되어 해결될 필요가 있는 여러 디자인 이슈들
  - 여러 제약사항과 영향력도 고려되어야 한다.
- 해결
  - 문제를 해결하도록 설계를 구성하는 요소들과 그 요소들 사이에 관계, 책임, 협력 관계
  - 해결은 반드시 구체적인 구현 방법이나 언어에 의족적이지 않으며 다양항 상황에 적용할 수 있는 일종의 템플릿이다.

## 디자인 패턴의 종류
- GoF 디자인 패턴
  - Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides
  - 'GoF'(Gang of Fours). Design Patterns: Elements of Reusable Object-Oriented Software.에 수록된 23가지 디자인 패턴
- GoF 디자인 패턴의 분류
  - 생성 패턴
    - <strong>객체 생성</strong>에 관련된 패턴
    - 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성을 제공한다. 
    - 종류
      1. 추상 팩토리 (Abstract Factory)
      2. 빌더 (Builder)
      3. 팩토리 메소드 (Factory Method)
      4. 프로토타입 (Prototype)
      5. 싱글톤 (Singleton)
  - 구조 패턴
    - 클래스나 객체를 조합해 더 큰 구조를 만드는 패턴
    - 예를 들어 서로 다른 인터페이스를 지닌 2개의 객체를 묶어 인터페이스를 제공하거나 객체들을 서로 묶어 새로운 기능을 제공하는 패턴이다. 
    - 종류
      1. 어댑터 (Adapter)
      2. 브리지 (Bridge)
      3. 컴포지트 (Composite)
      4. 데코레이터 (Decorator)
      5. 파사드 (Facade)
      6. 플라이웨이트 (Flyweight)
      7. 프록시 (Proxy)
  - 행위 패턴
    - 객체나 클래스 사이의 알고리즘이나 책임 분배에 관련된 패턴
    - 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 분배 하는 것, 분배하면서 객체 사이의 결합도를 최소화 하는 것에 중점을 둔다.
    - 종류
      1. 옵서버 (Observer)
      2. 책임 연쇄 (Chain of Responsibility)
      3. 인터프리터 (InterPreter)
      4. 이터레이터 (Iterator)
      5. 중재자 (Mediator)
      6. 메멘토 (Memento)
      7. 상태 (State)
      8. 전략 (Strategy)
      9. 템플릿 메소드 (Template Method)
      10. 커맨드 (Command)
      11. 방문자 (Visitor)