# Linked List


<br>

## Array 와 Linked List 의 차이
<br>

| 경우 |Array | LinkedList
|------|----------|---------|
| 특정 원소 조회 | O(1) | O(N)
| 중간에 삽입 삭제 | O(N) | O(1)
| 데이터 추가 | 데이터 추가 시 모든 공간이 다 차버렸다면<br>새로운 메모리 공간을 할당 받아야 한다. |모든 공간이 다 찼어도<br>노드만 동적으로 추가하면 된다.
| 정리 | 데이터에 접근하는 경우가 빈번하다면<br>Array를 사용 | 삽입과 삭제가 빈번하다면 <br> LinkedList를 사용
<br>


## Python 에서의 list
<br>
파이썬에서의 list는 array로 구현되어 있다. <br>
하지만 내부적으로 동적 배열이라는 것을 사용해서, 배열의 길이가 늘어나도 O(1)의 시간 복잡도가 걸리도록 설계하였다.<br>
따라서, Python의 list는 링크드 리스트로도 쓸 수 있고 배열로도 쓸 수 있는 효율적인 자료구조이다.
<br><br>


## Linked List 구현
<br>

### Linked List의 head node 생성
<br>

```
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self, value):
        self.head = Node(value)

    def append(self, value):
        cur = self.head
        while cur.next is not None:
            cur = cur.next
        cur.next = Node(value)

```
<br>

### Linked List의 append 함수 만들기
<br>

```
def append(self, value):
        cur = self.head
        while cur.next is not None:
            cur = cur.next
        cur.next = Node(value)
```
<br>

### Linked List의 모든 원소 출력
<br>

```
def print_all(self):
    cur = self.head
    while cur is not None:
        print(cur.data)
        cur = cur.next
```
<br>

### Linked List의 원소 찾기
<br>

```
def get_node(self, index):
    node = self.head
    count = 0
    while count  < index:
        node = node.next
        count +1
    return node
```
<br>

### Linked List의 원소 추가
<br>

```
def add_node(self, index, value):
    new_node = Node(value)
    if index == 0:
        new_node.next = self.head
        self.head = new_node
        return

    node = self.get_node(index - 1)
    next_node = node.next
    node.next = new_node
    new_node.next = next_node
```
<br>

### Linked List의 원소 삭제
<br>

```
def delete_node(self, index):
    if index == 0:
        self.head = self.head.next
    node = self.get_node(index - 1)
    node.next = node.next.next
```
<br>



