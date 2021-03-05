# <div style="color:skyblue">map 함수 (파이썬 내장 함수)

- map은 리스트의 요소를 지정된 함수로 처리한다.
- 여러 개의 데이터를 한번에 다른 형태로 바꾸기 위해 사용한다.
- 따라서 리스트나 튜플을 대상으로 주로 사용하는 함수이다.
- map(변환함수, 순회 가능한 데이터)

<br>

## <div style="color:skyblue">리스트 안의 str -> int 

<br>

```
>>> a = ["12","23","324","42"]
>>> a = list(map(int, a))
>>> print(a)
[12, 23, 324, 42]
```
<br>

## <div style="color:skyblue">map으로 입력받기

<br>

```
>>> a,b = map(int, input().split())
3 5
>>> print(a)
3
>>> print(b)
5
```
<br>

## <div style="color:skyblue">일반 함수 매핑

<br>

```
users = [{'mail': 'gregorythomas@gmail.com', 'name': 'Brett Holland'},
...  {'mail': 'hintoncynthia@hotmail.com', 'name': 'Madison Martinez',
...  {'mail': 'wwagner@gmail.com', 'name': 'Michael Jenkins'},
...  {'mail': 'daniel79@gmail.com', 'name': 'Karen Rodriguez'},
...  {'mail': 'ujackson@gmail.com', 'name': 'Amber Rhodes']
```
<br>

>딕셔너리를 담은 리스트를 map() 함수를 이용하여 맵핑
<br><br>

```
def conver_to_name(user):
...     first, last = user["name"].split()
...     return {"first": first, "last": last}
```
<br>

 > map() 함수는 함수를 인자를 받기 때문에 함수를 먼저 작성한 후, <br> cover_to_name() 함수를 첫번쨰 인자로, users list 를 두번쨰 인자로 던져서 map() 함수 호출
<br><br>

```
>>> for name in map(conver_to_name, users):
...     print(name)
...
{'first': 'Brett', 'last': 'Holland'}
{'first': 'Madison', 'last': 'Martinez'}
{'first': 'Michael', 'last': 'Jenkins'}
{'first': 'Karen', 'last': 'Rodriguez'}
{'first': 'Amber', 'last': 'Rhodes'}
```
<br>

> 모든 유저의 first 와 last 를 출력
<br><br>

<br><br><br>

## <div style="color:skyblue">람다 함수 매핑 (코드가 짧은 경우 더욱 간단하게 작성)

<br><br><br>


## <div style="color:skyblue">결과 타입 변환</div>
- map의 return 값은 map object 이므로 자료형 변환이 필요하다.

<br><br><br>

참조 :<a href="https://www.daleseo.com/python-map/" style="text-align"> Dale Seo 님의 블로그</a>