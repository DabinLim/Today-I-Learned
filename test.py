n,k = map(int, input().split())

result = 0

while True:
    if n == 1:
        break

    if n % k == 0 :
        n //= k
        result += 1
    else:
        n -= 1
        result += 1

print(result)
