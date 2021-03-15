# [백준 2630](https://www.acmicpc.net/problem/2630) 문제 풀이

## 문제 
- 아래 <그림 1>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.<br>
<img src="https://github.com/DabinLim/Today-I-Learned/blob/master/images/2630.png"><br>
전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.

전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.

위와 같은 규칙에 따라 잘랐을 때 <그림 3>은 <그림 1>의 종이를 처음 나눈 후의 상태를, <그림 4>는 두 번째 나눈 후의 상태를, <그림 5>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.<br>
<img src="https://github.com/DabinLim/Today-I-Learned/blob/master/images/2630_02.png"><br>
입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.

## 입력
- 첫째 줄에는 전체 종이의 한 변의 길이 N이 주어져 있다. N은 2, 4, 8, 16, 32, 64, 128 중 하나이다. 색종이의 각 가로줄의 정사각형칸들의 색이 윗줄부터 차례로 둘째 줄부터 마지막 줄까지 주어진다. 하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1로 주어지며, 각 숫자 사이에는 빈칸이 하나씩 있다.
## 출력
- 첫째 줄에는 잘라진 햐얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.

## 예제 입력 
8<br>
1 1 0 0 0 0 1 1<br>
1 1 0 0 0 0 1 1<br>
0 0 0 0 1 1 0 0<br>
0 0 0 0 1 1 0 0<br>
1 0 0 0 1 1 1 1<br>
0 1 0 0 1 1 1 1<br>
0 0 1 1 1 1 1 1<br>
0 0 1 1 1 1 1 1<br>

## 예제 출력

9<br>
7

## 문제 풀이

```
import sys

n = int(sys.stdin.readline())
color_papers = []
for i in range(n):
    color_papers.append(list(map(int, sys.stdin.readline().split())))

blue = 0    
white = 0

def separate(x, y, n):
    global blue, white

    check = color_papers[x][y]    # 나눠진 면의 0,0에 해당하는 부분
    for i in range(x, x+n):       # 체크포인트
        for j in range(y, y+n):
            if check != color_papers[i][j]: # 나눠진 면 안에서 다른색이 있는지 확인
                                            # 하나라도 다른 색이 있다면
                separate(x, y, n//2)        # 4면으로 분할 (재귀호출)
                separate(x, y + n//2, n//2) 
                separate(x + n//2, y, n//2) 
                separate(x + n//2, y + n//2, n//2) 
                return
                            
    if check == 0:          # 면 안의 색이 모두 같다면 도달 하는 곳
        white += 1          # (체크포인트의 for문을 모두 만족한 경우)
        return
    else:
        blue += 1
        return

separate(0,0,n)
print(white)
print(blue)

```
<br>

> [분할정복법](https://github.com/DabinLim/Today-I-Learned/blob/master/Algorithm/divide_and_conquer.md)을 이용한 풀이이다.<br>
위 코드와 같이 해(면이 같은 색으로만 이루어질때까지)를 구할때까지 더 작은 면으로 나누어 해결하는 방법이 분할정복법이다.


