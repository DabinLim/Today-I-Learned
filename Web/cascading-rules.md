# Cascading Rules

## Cascading Rules란
cascade란 계단 형식의 폭포수를 의미한다.<br/>
cascading rules란 css에서 단계에 따른 css 우선순위에 대한 규칙이다.

## 대상 명시도에 따른 우선순위

### 1. !important
!important는 속성을 각제 적용시킨다.<br/>
또한 이후 적용될 값들을 전부 무시한다.<br/>
앞선 스타일의 속성이 중요하므로 변경시키지 말라는 의미로 쓰이기도 한다.<br/>

### 2. inline
inline은 html문서의 태그 안에 직접 style을 지정해주는 것이다.<br/>
하지만 inline을 과하게 사용하는 경우 코드 유지가 어려워진다.

### 3. source order
source order는 html 문서 내의 `<style>`태그를 사용하는 방법이다.

### 4. selector
css 선택자를 통해 style을 입히는 방법을 말한다.

### 5. user-agent
user-agent란 브라우저에서 기본적으로 제공되는 StyleSheet을 말한다.

### 6. inheritance
부모 요소에 적용되어 자식요소에도 같이 적용되는 경우를 말한다.<br/>
대표적인 속성으로 color 속성이 있다.


## 중요도에 따른 우선순위
1. head 요소 내의 style 요소
2. head 요소 내의 style 요소 내의 @import문
3. <link>로 연결된 CSS 파일
4. <link>로 연결된 CSS 파일 내의 @import문
5. user-agent

## 적용 범위에 따른 우선순위
기본적으로 스타일 적용 범위가 좁을수록 우선순위가 높아진다.

1. inline
2. id
3. class
4. tag



## 소스 순서에 따른 우선순위
뒤에 적용되는 속성의 우선순위가 높다.

## 상속되는 스타일과 상속되지 않는 스타일
| property | 상속 |
|------|-----|
 width/height  | no 
 margin | no 
 padding |	no 
 border | no 
|box-sizing |	no |
display	| no
visibility|	yes
opacity	|yes
background|	no
font	|yes
color	|yes
line-height|	yes
text-align	|yes
vertical-align|	no
text-decoration|	no
white-space	|yes
position	|no
top/right/bottom/left|	no
z-index	|no
overflow |	no
float|	no