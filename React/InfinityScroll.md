# 리액트 무한스크롤(Infinity Scroll) 구현

## 무한스크롤 스크롤을 사용하는 이유

- 무한 스크롤을 사용하면 따로 페이지를 넘길 필요 없이 계속해서 컨텐츠를 볼 수 있어 유저의 편의성이 높아지며 더 많은 컨텐츠를 볼 수 있다.
- 유저가 한번에 볼 수 있는 만큼의 컨텐츠만 불러와 렌더링해 효율성이 높아진다.

### 서버에서 페이지네이션을 해서 데이터를 보내준 경우

프로젝트를 진행하며 사용한 방법이다.<br>
예를 들면 프론트에서는 처음 화면을 띄울때 페이지 값을 1로 요청해 첫 컨텐츠들만 받아온다.<br>
이후에 페이지 값은 1씩 더해나가 다음 페이지를 받아오고 기존의 데이터들에 push하여 렌더링한다.

- 리덕스의 state
    - 받아온 컨텐츠를 저장할 리스트, 페이지, 다음 컨텐츠의 유무를 구분할 next, 데이터를 받아오는 중에는 중복 요청을 하지 않기 위한 loading을 initialState로 구성한다.

```
initialState: {
        custom_question:[],
        page: 1,
        next:true,
        loading: true,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            // state.book_loading = false;
        },
        setNext: (state, action) => {
            state.next = action.payload;
        },
        setCustomQuestion: (state, action) => {
            action.payload.forEach(v => {
                state.custom_question.push(v);
            })
        },
        setLoading: (state,action) => {
            state.loading = action.payload;
        }
```

- 서버에 api 요청
    - 페이지 1은 첫 렌더링 이므로 이후(page > 1)에는 loading이 true일 경우 return하여 중복 요청을 방지한다.
    - 컨텐츠를 받아오면 state를 업데이트 한다.
    - 서버와 약속한 한 페이지당 컨텐츠는 15개 였기 때문에 컨텐츠가 15개보다 적은 경우는 다음 컨텐츠가 없다는 뜻으로 간주하고 next를 false로 바꾼다.

```
const getMyQuest = () => {
    return function(dispatch, getState){
        const loading = getState().custom.loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            console.log('next is none');
            return
        }
        if(loading && page > 1){
            console.log('잡았다 요놈');
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.myQuestion.length < 15){
                dispatch(setCustomQuestion(response.data.myQuestion));
                dispatch(setCustomCount(response.data.myQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
                return
            }

            dispatch(setCustomQuestion(response.data.myQuestion));
            dispatch(setCustomCount(response.data.myQuestionCount));
            dispatch(setPage(page+1));
            dispatch(setLoading(false));
        }).catch(err => {
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}
```

- 무한 스크롤을 구현하고자 하는 컴포넌트
    - 스크롤이 일어나는 컨테이너 안에 무한스크롤 컴포넌트가 위치하고 그 안에서 컨텐츠들을 렌더링한다.
    - 무한스크롤 컴퍼논트에 props로 다음 컨텐츠를 불러오는 api, next, loading, 무한스크롤을 구현하고자 하는 컨테이너의 ref 값을 넘긴다.

```
    <CardContainer ref={container}>
        <InfinityScroll
            callNext={() => {
              console.log("scroooolled!");
              dispatch(customActions.getMyQuest());
            }}
            is_next={is_next ? true : false}
            is_loading={is_loading}
            ref_value={container.current}
          >
            {custom_question &&
              custom_question.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                  </Card>
                );
              })}
          </InfinityScroll>
    </CardContainer>
```


- 무한 스크롤 (Infinity Scroll) 컴포넌트
    - 컴포넌트 전체 길이 - 컴포넌트에서 현재 보이는 길이 - 스크롤의 위치 < 100 일때, 다음 컨텐츠 받아오기
    - 요청이 여러번 반복 되는 걸 방지하기 위해 이벤트 발생 후 300ms 후에 callNext 호출
    - 컴포넌트를 벗어날때는 항상 이벤트 구독해제를 해준다.
    - next가 true인 경우에는 컨텐츠 가장 아래에 spinner를 둬서 다음 컨텐츠가 있다는 것을 유저가 인식할 수 있도록 한다.

```
const {callNext, is_next, is_loading} = props;

    // 이벤트 발생 300ms 후에 callNext 함수 호출하기
    const _handleScroll = _.throttle(() => {
        if(is_loading){
            return;
        }

        const {clientHeight} = props.ref_value;
        const {scrollHeight} = props.ref_value;
  
        const {scrollTop} = props.ref_value;
   
        if(scrollHeight - clientHeight - scrollTop < 100) {
            callNext();
        }

    },300)

    // 리렌더링이 되더라도 _handleScroll 함수를 초기화 하지 않도록
    const handleScroll = React.useCallback(_handleScroll, [is_loading]);

    React.useEffect(() => {
        if(is_loading){
            return;
        };
        if(!props.ref_value){
            return
        }
        if(is_next){
            props.ref_value.addEventListener('scroll', handleScroll);
        }else{
            props.ref_value.removeEventListener('scroll', handleScroll)
        }

        // 이벤트 구독 해제, Clean up
        return () => props.ref_value.removeEventListener('scroll', handleScroll);
    },[is_next, is_loading]);

    return (
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

```
