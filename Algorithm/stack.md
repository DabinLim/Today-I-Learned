# Stack 


<br>

## Stack 이란
<br>
한쪽 끝으로만 자료를 넣고 뺄 수 있는 자료 구조.<br>
컴퓨터의 되돌리기 (ctrl + z 또는 command + z) 와 같이 순서대로 기억해야 할 경우 스택을 사용한다.<br>
되돌리기 기능과 같이 가장 나중에 넣은 데이터가 가장 먼저 나온다.<br>
이와 같은 자료구조를 Last In First Out (LIFO) 라고 한다.

<br>


## Python 에서의 Stack
<br>

```
stack = []            # 빈 스택 초기화
stack.append(4)       # 스택 push(4)
stack.append(3)       # 스택 push(3)
top = stack.pop()     # 스택 pop
print(top)            # 3!
```
<br><br>


## Stack 구현
<br>

### Stack의 head node 생성
<br>

```
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stack:
    def __init__(self):
        self.head = None
```
<br>

### push 기능 구현 (맨 앞에 데이터 넣기)
<br>

```
def push(self, value):
    new_head = Node(value)
    new_head.next = self.head
    self.head = new_head
    return
```

<br>

### pop 기능 구현 (맨 앞의 데이터 뽑기)
<br>

```
def pop(self):
    if self.is_empty():
        return "Stack is Empty"
    delete_head = self.head
    self.head = self.head.next
    return delete_head.data
```
<br>

### peek 기능 구현 (맨 앞의 데이터 출력)
<br>

```
def peek(self):
    if self.is_empty():
        return "Stack is Empty"
    return self.head.data
```
<br>

### isEmpty 기능 구현 (스택이 비었는지 확인)
<br>

```
def is_empty(self):
    return self.head is None
```

