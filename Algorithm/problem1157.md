# 백준 1157 문제 풀이

## 문제
- 알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.

## 입력
- 첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.


## 출력
- 첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.

## 예제 입력 및 출력

- Mississipi , ?

- zZa , Z

- z , Z

- baaa, A

## 문제 풀이

```
a = str(input())
list_data = (list(a.upper()))
upper_a = list(set(a.upper()))
result = dict()
final = []
for i in upper_a:
    result[i] = list_data.count(i)
    
result_max = max(result.values())
for key, value in result.items():
    if value == result_max:
        final.append(key)
if len(final) > 1 :
    print('?')
else :
    real_final = str(final[0])
    print(real_final)

```

> 입력 받은 문자열을 대문자로 변환하여 리스트에 저장한다.<br>
중복을 제거하기 위해 set 자료형 사용 <br>
문자와 문자가 중복된 횟수를 각각 key와 value로 저장한다.<br>
가장 많은 수의 value값을 이용해 key값을 찾아 리스트에 저장한다.<br>
만약 리스트에 2개 이상의 값이 저장되 있다면 '?' 출력

## 새로 알게 된 개념

- count() : 리스트에서 파라미터로 받은 값이 몇번이나 들어가는지 알아야 할때 사용
- items() : dict의 key와 value 값을 모두 출력 할때 사용
