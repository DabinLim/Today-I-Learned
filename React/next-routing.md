# Next의 라우팅

Next의 라우터는 파일시스템 기반으로 제공된다.

- root에 pages폴더가 있으면 src 내부의 pages폴더는 무시된다.


## dynamic route
파일 이름을 대괄호로 묶어 제공한다.
- pages/`[userName]`.js
  - pages/dabin
- pages/my/`[userName]`.js
  - pages/my/dabin
- pages/my/[...userName].js
  - pages/my/dabin/david

## dynamic route 활용

### useRouter을 사용

```js
/*
pages/`[userName]`.js
pages/dabin
*/
const router = useRouter();
const {userName} = router.query;
console.log(userName); // dabin
```

### query를 가져오는 방법

```js
/*
pages/`[userName]`.js
pages/dabin?from=home
*/
const router = useRouter();
const {userName, from} = router.query;
console.log(userName); // dabin
console.log(from); // home
```

### pages 이름과 같은 이름의 query는 무시된다.

```js
/*
pages/`[userName]`.js
pages/dabin?userName=home
*/
const router = useRouter();
const {userName, from} = router.query;
console.log(userName); // dabin
```

### 다중슬러그
배열로 전달된다.

```js
/*
pages/`[...userName]`.js
pages/dabin/david/hi
*/
const router = useRouter();
const {userName, from} = router.query;
console.log(userName); // ["dabin", "david", "hi"]
```

슬러그값을 옵셔널로 사용하고 싶은 경우 대괼호를 한번 더 감싸준다.<br/>
pages/`[[...userName]]`.js

## 라우팅 방법

### Link
```js
<Link href="/dabin" />
```

### button
```js
<button type="button" onClick={() => route.push('/dabin')} />
```

## Shallow Routing
getServerSidePros / getStaticProps를 다시 실행시키지 않고 url을 변경하고 싶은경우<br/>
ex) 사용자의 행동을 query로 남기고 싶은 경우
```js
router.push('/dabin?someData=1', undefined, {shallow: true});
```

## API Routing

중간 api 서버를 둘 수 있다.

```js
// pages/api/user.js
export default function handler(req, res) {
    res.status(200).json({name: 'dabin Lim'});
}

// pages/userName
export default function UserName() {
    const [name, setName] = useState('');
 
    useEffect(() => {
        fetch('/api/user')
            .then((res) => res.json())
            // dabin Lim
            .then((data) => setName(data.name));
    },[])
    return (
        <div>
        {name}
        </div>
    )
}
```

```js
// pages/api/user-info.js
export default function handler(req, res) {
    const {uid} = req.query;
    res.status(200).json({name: `dabin Lim ${uid}`});
}

// pages/userName/[uid]
// pages/userName/3
export default function UserName() {
    const router = useRouter();
    const {uid} = router.query;
    const [name, setName] = useState('');
 
    // 첫 렌더링시 쿼리는 undefined
    useEffect(() => {
        if (!!uid) {
            fetch(`/api/user-info?uid=${uid}`)
                .then((res) => res.json())
                // dabin Lim 3
                .then((data) => setName(data.name));
        }
    },[uid])
    return (
        <div>
        {name}
        </div>
    )
}
```

## MiddleWare
ex) CORS, cookies, etc...