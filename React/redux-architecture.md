## redux의 기본 개념

### redux의 컨셉
1. 전역상태가 필요
2. 전역상태라는 전제 때문에 다양한 컴포넌트에서 접근하기 때문에 어느 컴포넌트에서 문제가 일어났는지 찾기 어려움
3. 각각의 컴포넌트는 상태를 직접 수정하지 못하도록 한다.
4. 대신 수정해주도록 컴포넌트는 수정해달라는 트리거만 준다.

dispatch를 통해 수정할 수 있는 방법을 제공하고 getState를 통해 조회할 수 있게 하여 직접 수정하지 못하도록 한다.
```javascript
// 바깥쪽
function reducer(state, action) {
    state = action;
    return state
}

const store = createStore(reducer)

store.dispatch({count: 1});

// redux
export function createStore(updater) {
    let state;

    function dispatch(action) {
        state = updater(state, action);
    }

    function getState() {
        return state;
    }

    return {
        dispatch,
        getState,
    }
}

```

### 여러가지 상태를 구분하는 방법
여러가지 상태중 변경할 상태를 특정하기 위해 type과 payload로 구분
type에는 어떤 상태를 변경할지 payload에는 데이터를 담도록 약속

```javascript
function reducer(state, action) {
    if (action.type === 'count') {
        return {...state, counter: action.payload.counter}
    }
    return state
}

const store = createStore(reducer)

store.dispatch({
    type: 'count',
    payload: {
        counter: 1,
    },
});
```

## 문제점
여러가지 컴포넌트가 한가지 상태를 바라보고 있을때 상태를 변경한 컴포넌트 빼고는 상태 변경 여부를 알 수가 없음

dispatch 하면 상태 변경 여부를 파악할 수 구현 (구독)
```javascript
export function createStore(updater) {
    let state;
    const handler = [];

    function dispatch(action) {
        state = updater(state, action);
        handler.forEach((listener) => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        handler.push(listener);
    }

    return {
        dispatch,
        getState,
        subscribe,
    }
}

function listener() {
    console.log(store.getState());
}

store.add(listener)

store.dispatch({
    type: 'count',
    payload: {
        counter: 1,
    },
});
// {counter: 1}

```

## action creator
- 중복을 제거하고 상수관리를 위함
- 공통 관심사(어떤 타입의 상태를 변경할지)와 개별 관심사 (dispatch 하고 싶은 data)

```javascript
const COUNTER = 'count'

const store = createStore(reducer)

function listener() {
    console.log(store.getState());
}

function actionCreator(type, payload) {
    return {
        type,
        payload,
    }
}

store.subscribe(listener)

function counter(data) {
    store.dispatch(actionCreator(COUNTER, data));
}

counter({counter: 1});
```

## 문제점 2 : 비동기, 미들웨어
액션을 콜백으로 받아 비동기 처리를 해준다.
미들웨어는 어디에서든 액션을 감지한다.
비동기 작업을 감지하여 dispatch를 콜백으로 받아 비동기 처리를 한다.
```javascript
export function createStore(updater, middleware) {
    let state;
    const handler = [];

    function dispatch(action) {
        middleware(dispatch, action);
        state = updater(state, action);
        handler.forEach((listener) => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        handler.push(listener);
    }

    return {
        dispatch,
        getState,
        subscribe,
    }
}

const FETCH = 'fetch';

function middleware(dispatch, action) {
    if (action.type === FETCH) {
        fetch.then((response) => dispatch(response.json))
    }
}

const store = createStore(reducer, middleware)
```

### 몽키 dispatch
여러개의 미들웨어가 있는 경우에 dispatch의 순서를 조절하기 위한 테크닉
```javascript
// 바깥쪽
const FETCH = 'fetch';
const FETCH_RESPONSE = 'fetch-response';

function reducer(state, action) {
    if (action.type === COUNT) {
        return {...state, counter: action.payload.counter}
    }
    if (action.type === FETCH_RESPONSE) {
        return {...state, response: action.payload.data}
    }
    return state
}

// getState 사용을 위한 store를 한번 더 받을 수 있다.
const middleware1 = (store) => (dispatch) => (action) => {
    console.log('mid1');
    if (action.type === FETCH) {
        setTimeout(() => {
            dispatch({type: FETCH_RESPONSE, payload: {data: '서버에서 온 데이터'}});
        },1000)
    } else {
        dispatch(action);
    }
}

const middleware2 = (store) => (dispatch) => (action) => {
    console.log('mid2')
    dispatch(action);
}


const store = createStore(reducer, [middleware1, middleware2]);

function fetch() {
    store.dispatch(actionCreator(FETCH));
}

fetch();
/*
mid1
fetch
mid2
{response: '서버에서 온 데이터'}
*/

// redux
export function createStore(updater, middleware = []) {
    let state;
    const handler = [];

    function dispatch(action) {
        state = updater(state, action);
        handler.forEach((listener) => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        handler.push(listener);
    }
    const store = {
        dispatch,
        getState,
        subscribe,
    }
    // 들어온 순서대로 호출되도록 역전
    middleware = Array.from(middleware).reverse();
    let lastDispatch = dispatch;

    // 마지막 미들웨어(역전되었으므로 첫번째)의 dispatch를 리턴하기 위해 역전된 배열을 돌면서 재할당
    middleware.forEach(m => {
        lastDispatch = m(store)(lastDispatch);
    })

    return {
        ...store,
        dispatch: lastDispatch,
    }
}

```


### 최종 코드

redux
```javascript
export function createStore(updater, middleware = []) {
    let state;
    const handler = [];

    function dispatch(action) {
        state = updater(state, action);
        handler.forEach((listener) => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        handler.push(listener);
    }
    const store = {
        dispatch,
        getState,
        subscribe,
    }
    middleware = Array.from(middleware).reverse();
    let lastDispatch = dispatch;

    middleware.forEach(m => {
        lastDispatch = m(store)(lastDispatch);
    })

    return {
        ...store,
        dispatch: lastDispatch,
    }
}
```

바깥쪽
```javascript
import {createStore} from './redux.js';


const COUNT = 'count';
const FETCH = 'fetch';
const FETCH_RESPONSE = 'fetch-response';

function reducer(state, action) {
    if (action.type === COUNT) {
        return {...state, counter: action.payload.counter}
    }
    if (action.type === FETCH_RESPONSE) {
        return {...state, response: action.payload.data}
    }
    return state
}

const middleware1 = (store) => (dispatch) => (action) => {
    console.log('mid1');
    if (action.type === FETCH) {
        console.log('fetch');
        setTimeout(() => {
            dispatch({type: FETCH_RESPONSE, payload: {data: '서버에서 온 데이터'}});
        },1000)
    } else {
        dispatch(action);
    }
}

const middleware2 = (store) => (dispatch) => (action) => {
    console.log('mid2')
    dispatch(action);
}

const store = createStore(reducer, [middleware1, middleware2]);

function listener() {
    console.log(store.getState());
}

function actionCreator(type, payload) {
    return {
        type,
        payload,
    }
}

store.subscribe(listener)

function counter(data) {
    store.dispatch(actionCreator(COUNT, data));
}

counter({counter: 1});

function fetch() {
    store.dispatch(actionCreator(FETCH));
}

fetch();
```