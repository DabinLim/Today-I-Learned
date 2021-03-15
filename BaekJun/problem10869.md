# [백준 10869](https://www.acmicpc.net/problem/10869) 문제 풀이

## 문제
- 두 자연수 A와 B가 주어진다. 이때, A+B, A-B, A*B, A/B(몫), A%B(나머지)를 출력하는 프로그램을 작성하시오. 

## 입력
- 두 자연수 A와 B가 주어진다. (1 ≤ A, B ≤ 10,000)

## 출력
- 첫째 줄에 A+B, 둘째 줄에 A-B, 셋째 줄에 A*B, 넷째 줄에 A/B, 다섯째 줄에 A%B를 출력한다.

## 예제 입력 
 7 3

## 예제 출력

10<br>4<br>21<br>2<br>1

## 문제 풀이

>처음 풀어 보는 최하 난이도의 문제였다<br> 
정답으로 채점된 코드는 다음과 같다.
```
a, b = map(int, input().split())
print(a + b)
print(a - b)
print(a * b)
print(a // b)
print(a % b)
```
>예제 입력이 7 3 한줄이기 때문에
a, b 를 한번에 입력 받고 spilt() 함수를 이용하여 a,b 변수에 각각 저장한다.<br>
map() 함수를 이용하여 int 자료형으로 입력 받는다.<br>
[map() 함수란?](https://github.com/DabinLim/Today-I-Learned/blob/master/Python/map().md)
<br>
각 줄에 하나씩 연산을 출력해야 하므로 따로 출력한다.<br>

>처음 제출한 코드
```
def sum (a,b) :
    return a+b

def substract (a,b) :
    return a-b

def multiply (a,b) :
    return a*b

def division (a,b) :
    return a//b

def remainder (a,b) :
    return a%b

a, b = map(int, input().split())

if 1 <= a <= 10000 and 1 <= b <= 10000 :
    sum = sum (a, b)
    substract = substract (a, b)
    multiply = multiply (a, b)
    division = division (a, b)
    remainder = remainder (a, b)
    print(sum)
    print(substract)
    print(multiply)
    print(division)
    print(remainder)
else :
    print('벗어난 범위 입니다.')
```

>이 코드도 정답으로 채점이 되기는 한다.<br>
다만 위의 문제는 최하 난이도 문제이고 앞으로 난이도가 올라가면 가능한 간단한 코드로 문제를 푸는 연습이 필요하지 싶다.




