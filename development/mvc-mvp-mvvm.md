# MVC, MVP, MVVM 패턴

## MVC
Model, View, Controller로 역할을 나누는 디자인 패턴을 말한다.<br>

### 구조
- Model: 어플리케이션의 데이터와 그 데이터를 처리하는 부분
- View: 사용자에게 보여지는 UI
- Controller: 사용자의 입력을 받고 처리하는 부분

### 동작
- 사용자의 Action이 Controller를 통해 들어온다.
- Controller는 Action을 확인하고 Model을 업데이트한다.
- Controller는 Model을 나타낼 View를 선택한다.
- View는 Model을 이용해 화면을 나타낸다.

> MVC에서 View가 업데이트 되는 방법
> - View가 Model을 이용하여 직접 업데이트
> - Model에서 View에게 알려서 업데이트
> - View가 Polling으로 주기적으로 Model의 변경 감지

### 특징
Controller는 여러개의 View를 선택할 수 있는 1:n 구조이다.<br>
Controller는 View를 선택할 뿐 직접 업데이트 하지는 않는다.

### 장점
단순하다는 점이 가장 큰 장점이다.

### 단점
View와 Model사이에 의존성이 높다.

## MVP
Model + View + Presenter로 나뉘는 디자인 패턴을 말한다.<br>
Model과 View는 MVC와 동일하다.

### 구조
- Model: 어플리케이션의 데이터와 그 데이터를 처리하는 부분
- View: 사용자에게 보여지는 UI
- Presenter: View에서 요청한 정보로 Model을 가공하여 View에게 전달

### 동작
- 사용자의 Action은 View를 통해 들어온다.
- View는 Presenter에게 데이터를 요청한다.
- Presenter는 Model에게 데이터를 요청한다.
- Presenter는 Model에게 응답 받은 데이터를 가공하여 View에게 응답한다.
- View는 Presenter가 응답한 데이터를 이용하여 화면을 구성한다.

### 특징
Presenter는 View와 Model의 인스턴스를 가지고 있어 둘을 연결하는 역할을 한다.<br>
Presenter와 View는 1:1 관계이다.

### 장점
View와 Model 사이의 의존성이 없다.

### 단점
View와 Presenter 사이의 의존성이 높다.<br>

## MVVM
Model, View, View Model로 나뉘는 디자인 패턴이다.

### 구조
- Model: 어플리케이션의 데이터와 그 데이터를 처리하는 부분
- View: 사용자에게 보여지는 UI
- View Model: View를 표현하기 위해 만든 Model이다. View를 나타내기 위한 Model이자 데이터를 처리하는 부분이다.

### 동작
- 사용자의 Action은 View를 통해 들어온다.
- Command 패턴으로 View Model에 Action을 전달한다.
- View Model은 Model에게 데이터를 요청한다.
- View Model은 응답 받은 데이터를 가공하여 저장한다.
- View는 View Model과 Data Binding하여 화면을 나타낸다.


### 특징
Command 패턴과 Data Binding 패턴을 사용하여 View와 View Model 사이의 의존성을 없앴다.<br>
View Model과 View는 1:n 관계이다.

### 장점
View와 Model 사이의 의존성을 없앴으며 View와 View Model 사이의 의존성 또한 없앤 디자인 패턴이다.<br>
각 부분은 독립적이기 때문에 모듈화하여 개발할 수 있다.

### 단점
View Model의 설계가 어렵다.