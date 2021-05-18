# Redux Toolkit

리덕스 툴킷을 사용하여 리덕스를 사용하며 늘어나는 코드의 양을 상당부분 줄이며 쉽게 사용할 수 있다.<br>
리덕스 제작자들이 공식적으로 추천하는 방법이다.

## 설치

```
npm install @reduxjs/toolkit
```

## configureStore

- rootReducer 
```
const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history),
});

```
- 상태변화를 보기 쉽게 하기 위한 logger

```
const { logger } = require("redux-logger");
```

- 해당 프로젝트에서는 default middleware를 사용 하였다.
- moment를 리덕스상태로 사용하기 위해 serializeableCheck는 false로 지정했다. 
- devTools는 배포환경(production)에서는 사용되지 않는다.

```
let store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV !== "production",
});
```

## createSlice

- getDefaultMiddeware 함수를 이용하여 불러온 default middleware에는 thunk, immer, devTools가 기본적으로 포함되어 있다.
- createSlice를 이용해 reducer를 만들어 사용하면 별도의 import , 액션 생성 없이 사용이 가능하다.

```
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});
```

- 아래와 같이 액션과 서버와 연동하는 api를 따로 묶어 사용 중이다.

```
export const {
  setUser,
} = userSlice.actions;

export const api = {
  LoginServer
};

export default userSlice.reducer;
```

## [Redux Toolkit 공식문서](https://redux-toolkit.js.org/)

- 더 다양한 사용법이 나와있다.