# 객체 속성 (writable, enumerable, configurable)

Object.getOwnPropertyDescriptor()함수를 사용하면 객체의 속성에 대한 모든 설명을 확인할 수 있다.<br><br>

```js
const user = {
    name: '임다빈',
    age: 29,
}

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
/*
{
    value: '임다빈',
    writable: true,
    enumerable: true,
    configurable: true,
}
*/
```

writable, enumerable, configurable 라는 속성 설명자를 확인할 수 있으며 이들은 기본적으로 true 값을 가진다.<br>
만약 존재하지 않는 속성에 대한 설명자를 확인하려고 하면 undefined를 반환한다.

## writable
writable은 해당 속성 값을 변경할 수 있는지 여부를 나타낸다.<br>
Object.defineProperty() 메소드를 통해 writable 설명자를 false로 바꿔주면 속성의 value값을 변경할 수 없다.
```js
const user = {
    name: '임다빈',
    age: 29,
}
  
Object.defineProperty(user, 'name', {writable: false});

user.name = 'Dabin Lim';

console.log(user);
// { name: '임다빈', age: 29 }
```

그러나 중첩된 객체의 경우 다르게 동작한다.<br>
name: {
      firstName: '다빈',
      lastName: '임'
    }<br>
에 해당하는 객체는 다른 메모리 주소를 가리키고 있기 떄문이다.
```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}
  
Object.defineProperty(user, 'name', {writable: false});

user.name.firstName = 'Dabin';

console.log(user);
// { name: { firstName: 'Dabin', lastName: '임' }, age: 30 }
```

이런 경우 아래와 같이 해당 객체의 프로퍼티 자체에 접근하여 writable 설명자를 바꿔줄 수도 있고 Object.freeze() 메소드를 통해 해당 객체를 변경 불가능하게 만들 수도 있다.
```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}
  
Object.defineProperty(user.name, 'firstName', {writable: false});

user.name.firstName = 'Dabin';

console.log(user);
// { name: { firstName: '다빈', lastName: '임' }, age: 29 }
```

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}
  
Object.freeze(user.name);

user.name.firstName = 'Dabin';

console.log(user);
// { name: { firstName: '다빈', lastName: '임' }, age: 29 }
```

## enumerable
enumerable은 열거 가능한지 여부를 나타낸다.<br>
enumerable 값이 true인 경우 for-in 반복문으로 접근이 가능하다.

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}

Object.defineProperty(user, 'name', {enumerable: false});

for(let key in user) {
    console.log(key);
    console.log(user[key])
}

// name은 enumerable이 false여서 반복문에서 빠진다.
// age
// 29
```

## configurable

configurable은 false로 설정되면 enumerable, configurable이 다시 변경되지 못하도록 한다.<br>
즉 한번 false로 설정되면 다시 true로 설정할 수 없다.<br>
하지만 writable은 변경이 가능하다.

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}

Object.defineProperty(user, 'name', {configurable: false});
Object.defineProperty(user, 'name', {enumerable: false});
/*
Object.defineProperty(user, 'name', {enumerable: false});
       ^
TypeError: Cannot redefine property: name
*/
```

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}

Object.defineProperty(user, 'name', {configurable: false});
Object.defineProperty(user, 'name', {configurable: true});
/*
다시 true로 변경할 수 없다.

Object.defineProperty(user, 'name', {configurable: true});
       ^
TypeError: Cannot redefine property: name
*/
```

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}

Object.defineProperty(user, 'name', {configurable: false});
Object.defineProperty(user, 'name', {writable: false});
// writable은 변경이 가능하다.
```

```js
const user = {
    name: {
      firstName: '다빈',
      lastName: '임'
    },
    age: 29,
}

Object.defineProperty(user, 'name', {configurable: false});

delete user.name;

console.log(user);
// configurable이 false면 속성값을 제거할 수 없다.
// { name: { firstName: '다빈', lastName: '임' }, age: 29 }
```