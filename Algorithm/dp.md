# 동적 계획법 (Dynamic Programming)


<br>

## 동적 계획법이란?
<br>

- 동적 계획법이란 복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법을 말한다.<br>
이것은 부분 문제 반복과 최적 부분 구조를 가지고 있는 알고리즘을 일반적인 방법에 비해 더욱 적은 시간 내에 풀 떄 사용한다.

- 여러 개의 하위 문제를 풀고 그 결과를 기록하고 이용해 문제를 해결하는 알고리즘이다.

- 문제를 반복해서 해결해 나가는 모습이 재귀 알고리즘과 닮아있다.<br>
그러나 다른 점은, **그 결과를 기록하고 이용한다**는 점이다.

### 메모이제이션

- 결과를 기록하는 것을 말한다.

- **겹치는 부분 문제(Overlapping Subproblem)** 일 경우 동적 계획법을 사용하면 되는데, 이때 사용하는 방법이 메모이제이션이다.

### 피보나치 수열

가장 흔하게 사용되는 예시이다. 예시로 5번째 피보나치 수열을 구하는 과정을 그림으로 표현하면

<img src="https://github.com/DabinLim/Today-I-Learned/blob/master/images/fibo_example.png"> <br>참조 : [메모이제이션-나무위키](https://namu.wiki/w/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)


<br>
위의 그림과 같이 표현할 수 있다.
위와 같이 5번째 피보나치 수열을 구하는 데 함수를 호출 하는 횟수는 총 15번이다.
하지만 중복돼서 계산하게 되는 값이 무려 11번이다.
위의 예시에서는 입력값이 5라는 작은 숫자였지만 입력값이 늘어날수록 1.6^n 만큼 연산횟수가 폭발적으로 늘어나게 된다.
즉 예시의 함수는 O(1.6^n)의 시간복잡도를 갖는다.
<br><br>
이때, 메모이제이션을 활용한다면 중복된 연산횟수를 줄일 수 있다.

방법은 다음과 같다.

- 메모용 데이터를 만든다.
- 처음 값인 Fib(1), Fib(2)는 각각 1씩 넣어서 저장해둔다.
- Fib(n)을 구할 때 만약 메모에 그 값이 있다면 바로 반환한다.
- Fib(n) 을 처음 구했다면 메모에 그 값을 기록한다.
- 다음 코드는 이를 구현한 코드이다.

```
n = int(input())

memo = {                # memo에 Fib(1)과 Fib(2) 저장
    1: 1,
    2: 1
}

def fibo_dp(n, fibo_memo):
    if n in fibo_memo:
        return fibo_memo[n]    # Fib(n)의 값이 있다면 그대로 반환

    nth_fibo = fibo_dp(n - 1, fibo_memo) + fibo_dp(n - 2, fibo_memo)
    fibo_memo[n] = nth_fibo    # 없다면 새로 계산해서 메모에 저장
    return nth_fibo

print(fibo_dp(n, memo))
```



