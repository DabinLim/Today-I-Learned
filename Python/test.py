a = int(input())

if a < 10:
    a *= 10

origin = a  
num = 0  
b = 0 

while True:
    a_set = (a // 10) + (a % 10)
    b = ((a % 10)*10) + (a_set % 10)
    a = b
    num += 1  
    if b == origin:  
        break  
print(num)