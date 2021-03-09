# Queue


<br>

## Stack 이란
<br>
한쪽 끝으로 자료를 넣고, 반대쪽에서는 자료를 뺄 수 있는 선형구조<br>
주문이 들어왔을 떄 먼저 들어온 순서대로 처리해야 할떄,<br>
혹은 먼저 해야 하는 일들을 저장하고 싶을 때 등,
순서대로 처리 되어야 하는 일에 사용된다.<br>
가장 먼저 넣은 데이터가 가장 먼저 나오며,
이와 같은 자료구조를 First In First Out (FIFO) 라고 한다.

<br><br>


## Python 에서의 Queue
<br>

- list 사용
```
queue = []            # 빈 큐 초기화
queue.append(x)       # 큐 enqueue(x)
queue.pop(0)          # 큐 dequeue()

```
- 반대방향 list 사용 (반대방향 큐)
```
queue = []
queue.insert(0,x)     # 맨 앞에 x 추가
queue.pop()           # 맨 뒤의 데이터 뽑기
```
- deque (collections 모듈) , 뒤에서 앞으로 데이터 흐름
```
from collections import deque

queue = deque([])
queue.append(x)
queue.popleft()
```
- deque (collections 모듈) , 반대 방향 데이터 흐름
```
from collections import deque

queue = deque([])
queue.appendleft(x)
queue.pop()
```

> deque의 popleft 와 appendleft 메소드는 O(1)의 시간 복잡도를 가져, list 의 pop(0) 과 insert(0,x) 대비 성능에 큰 이점이 있다.
<br> 그러나 내부적으로 linked list를 사용하고 있어 무작원 접근(random access)의 시간 복잡도는 O(N)을 갖는다.

- queue 모듈의 Queue 클래스 (방향성 없음)
```
from queue import Queue

que = Queue()
que.put(x)
que.put(y)
que.put(z)
que.get()         # x
que.get()         # y
```
>deque와 마찬가지로 데이터 추가 및 삭제시에는 O(1), 데이터 접근은 O(N)의 시간 복잡도를 갖는다.

<br><br>



## Queue 구현
<br>

### Queue 초기화
<br>

```
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
```
<br>

### enqueue 구현 (맨 뒤에 데이터 넣기)
<br>

```
def enqueue(self, value):
    if self.is_empty():
        self.head = new_node
        self.tail = new_node
        return
    new_node = Node(value)
    self.tail.next = new_node
    self.tail = new_node
    return
```

<br>

### dequeue 기능 구현 (맨 앞의 데이터 뽑기)
<br>

```
def dequeue(self):
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

