# Todos APP ~~with Firebase~~

## 💡 프로젝트 정보

1. 프로젝트 명 : Todos App ~~with Firebase~~
2. 프로젝트 기간 : 2022. 9. 12. ~ 2022. 9. 19.
3. 프로젝트 참가 인원: 단독프로젝트

<br />

---

<br/>

## 🌈 실행 방법

    $ git clone https://github.com/hjpark625/new-todos.git
    $ cd new-todos
    $ yarn install
    $ yarn start

<br />

---

## ~~⭐ 배포 링크~~

<br/>

> ~~http://new-todos.vercel.app/~~  
> 자체 개발한 서버 사용으로 인한 배포 중단

<br/>

---

## 🔐 테스트 계정

<br />

> id(email): jeff@naver.com  
> password: 1q2w3e4r!

<br/>

---

## 📚 사용 기술 스택

<br />

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.8.3-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.3.0-blue?logo=react-router)  
![redux](https://img.shields.io/badge/redux--toolkit-1.9.1-pink?logo=redux)
![react-redux](https://img.shields.io/badge/react--redux-8.0.2-pink?logo=redux)
![redux-saga](https://img.shields.io/badge/react--saga-1.2.3-pink?logo=redux-saga)

- **선정 이유**

  - *TypeScript*
    - 정적 타입 지원하므로 컴파일 단계에서 오류를 사전에 포착할 수 있으며 이를 통해 미리 디버깅이 가능함
  - *Styled-Components*
    - CSS-in-JS는 짧은 길이의 유니크한 클래스를 자동적으로 생성하기에 코드 경량화에 효과적
    - 컴포넌트 기반 개발 방법에 적합하고 가장 많이 사용되는 CSS-in-JS 라이브러리
    - JS 상수와 함수를 쉽게 공유하여 props를 활용한 조건부 렌더링에 용이
    - 컴포넌트화하여 재활용 가능
  - ~~*Firebase*~~(23. 4. 16(일)부 자체 개발 서버로 전환)
    - ~~백엔드의 부재로 인한 Todo리스트를 저장할 데이터 구축에 활용~~
    - ~~email, password로그인 API를 지원~~
    - ~~DB를 자체적으로 또한 자유롭게 구축할 수 있어 개인 프로젝트에 활용하기에 용이~~
  - *React-Router-Dom*
    - React의 SPA(Single Page Application)특성상 하나의 페이지(HTML)에서 모든 렌더링이 이루어짐
    - React의 이러한 강점을 활용하기 위해 페이지의 로딩없이 페이지에 필요한 컴포넌트를 렌더링 하기 위해 사용
  - *Redux* / *React-Redux*
    - 전역 상태 관리하는데 활용
    - 전역 상태 관리에 있어 props drilling을 피할 수 있음과 동시에 성능 최적화에 용이
  - *Redux-Saga*
    - 로그인, 로그아웃, TODO CRUD 등 각종 비동기 처리(middleware)를 위해 사용

<br />

---

## 📁 폴더 구조

    root
    |-- tsconfig.json
    |-- README.md
    |-- package.json
    |-- yarn.lock
    |-- .gitignore
    |-- public
    |   |-- index.html
    |-- src
        |-- compoenents
           |-- auth
               |-- styles
           |-- Todos
           |-- types
        |-- pages
           |-- Main
           |-- Todo
        |-- modules
        |-- styles
        |-- Router.tsx
        |-- index.tsx
        |-- react-app-env.d.ts
        |-- firebase.ts

---

## 📝 구현 기능

### 로그인 및 회원가입

- 로그인 및 회원가입할 때 saga를 제작해서 적용했다.
- auth에 관련된 saga들은 로그인과 거의 동일하게 작업했다.
  ```typescript
  function* loginSaga(
    action: PayloadAction<{ email: string; password: string }>
  ):
    | Generator<CallEffect<AxiosResponse<AuthResponseType, any>>>
    | PutEffect<{ payload: undefined; type: 'auth/LOGIN_SUCCESS' }> {
    yield put(startLoading(LOGIN));
    try {
      const res = yield call(authAPI.login, action.payload);
      localStorage.setItem('access_token', res.user.access_token);
      alert(`어서오세요 ${res.user.info.username}님!`);
      yield put(loginSuccess(res));
    } catch (e: unknown) {
      if (isAxiosError<AuthErrorType>(e)) {
        const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
        alert(data.message);
        yield put(loginFailure(data));
      }
    } finally {
      yield put(finishLoading(LOGIN));
    }
  }
  ```
  - `login`이라는 action을 dispatch해서 loginSaga가 실행되면 `put`이라는 effect통해 `startLoading`이라는 action을 dispatch한다.
  - 그리고 `call`이라는 effect를 통해 login api를 호출하고 그 return 값을 res에 담아주고 saga의 이벤트가 아닌 일반 액션들을 실행한다.(로컬 스토리지, welcome alert 등)
  - `put` effect를 통해서 로그인이 성공됐을 때의 action을 dispatch한다. 이때 api의 return값인 res를 payload로 넣어준다.
  - 만약 에러가 발생한다면 `isAxiosError`라는 axios에서 제공해주는 함수를 통해 에러 객체의 타입을 확실하게 지정하고 그 에러 객체의 response값을 data에 담아준다.
  - 서버에서 정해둔 error 메세지를 alert를 통해 띄워주고 `put` effect를 통해 로그인이 실패됐을 때의 action을 dispatch한다.
  - 최종적으로 finally에서 `put` effect로 로그인 액션이 종료되었음을 알려주는 action을 dispatch한다.

### TodoList 가져오기

- `getTodosSaga`를 활용해 데이터베이스에서 해당 유저의 토근에 맞춰 `_id`에 맞는 Todo 데이터를 가져온다
  - 기존에 firebase와 활용할때와는 다르게 쿠키를 활용했기 때문에 따로 user의 id를 가져올 필요 없이 저장된 쿠키에 유저의 JWT토큰을 헤더에 담아서 요청을 하면된다.
  ```ts
  const getDatas = async () => {
    // async await과 try catch가 필요할지는 생각 해봐야 될듯...
    // 이유: saga에서 처리하고 있기때문
    try {
      return dispatch(getTodos());
    } catch (e) {
      return e
    }
  }
  useEffect(() => {
    getData();
  }, []);
  ```

- 로그인 후 Todo앱으로 `navigate`될 때 최초 TodoList를 한 번 만 받아와서 렌더링을 하기 때문에 `useEffect`를 활용하였다.

- TodoList 추가하기

  - input창에 todo를 적은 후 해당 input의 텍스트를 데이터 베이스로 `submit`한다.

    ```ts
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        if (todoValue.length === 0) return alert('내용을 입력해주세요');
        dispatch(createTodo({ text: todoValue, isCompleted: false, createdAt: new Date().toISOString() }))
        // createdAte에 toISOString을 붙인 이유는 서버에서 받을 때 Date형식으로 받긴하지만 String 타입으로 들어가줘야하기 때문임
      } catch (err) {
        return err
      } finally {
        dispatch(changeInput(''));
      }
    };
    ```

    - submit할 때 createTodo를 disaptch해서 payload로 text, isCompleted, createdAt을 넣어준다.

### TodoList 수정하기

- 수정하기는 `updateTextTodo`와 `updateCheckTodo`액션을 활용해서 Todo의 수정과 완료/미완료 처리를 구현하였다.

  ```ts
  // Todo를 수정하는 함수
  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateTextTodo({ _id, text: editTodoValue }));
    } catch (e) {
      return e;
    } finally {
      dispatch(changeEditInput(''));
    }
    setIsEdit(false);
    
  };

  // Todo의 완료/미완료를 수정하는 함수
  const getDoneTodo = async () => {
    try {
      dispatch(updateCheckTodo({ _id, isComplted: !isComplted }));
    } catch (e) {
      return e;
    }
  };
  ```

- 부가적으로 수정할 때 수정아이콘을 클릭하면 수정하는 input으로 focus되도록 같이 구현하였다.
  ```ts
  const editRef = useRef<HTMLInputElement | null>(null); // ref를 수정버튼 클릭시 input창에 props로 전달
  useLayoutEffect(() => {
    // useLayoutEffect를 활용해 해당 input으로 focus되도록 처리
    editRef.current !== null && editRef.current.focus();
  });
  ```

### TodoList 삭제하기

- 삭제는 매우 간단하게 `deleteTodo`액션을 활용해서 삭제버튼 클릭 시 해당 id를 가진 Todo데이터를 삭제하는 것으로 구현했다.
  ```ts
  const deleteTodo = async () => {
    try {
      dispatch(deleteTodo({ _id }));
    } catch (e) {
      return e;
    }
  };
  ```

### Realtime DB에서 FireStore DB로 마이그레이션(23. 2. 11(토))완료

- FireStore는 쿼리 중심의 데이터베이스로 개인적으로 Realtime보다 FireStore 데이터베이스가 인덱싱부터 데이터 관리 측면에 있어 더 효율적이라고 판단되어 마이그레이션을 진행했다.
  - 메서드 들은 Realtime과 큰 차이는 없으며 중점적으로 변경된 사항은 realtime은 ref라는 메서드를 활용해서 데이터 베이스에 접근했지만 firestore는 컬렉션을 기준으로 접근을 한다는 차이가 있다.
  - 초기 데이터를 todos데이터를 불러오는데 있어 사용한 메서드는 query와 onSnapshot이라는 메서드로 get을 사용하던 realtime과의 차이가 있다.
  - 데이터의 추가에 있어서는 realtime은 set, firestore는 addDoc 혹은 setDoc을 사용
  - 삭제는 realtime에서는 remove, firestore는 deleteDoc
  - 수정은 realtime에선 update, firestore는 updateDoc으로 활용된다.

### Firebase에서 자체 개발한 서버로 마이그레이션(23. 4. 16(일))완료

- 기존에 현재 진행중인 프론트엔드 프로젝트는 vercel로 배포를 완료했었고 거기에 Firebase를 붙여서 Todo를 관리하는 프로젝트를 진행
- 최근에 서버를 직접 개발해보자 하는 생각으로 개발을 진행했었고 1주일 정도 기간에 서버개발을 완료 하고 AWS EC2와 Docker를 활용해 배포를 완료했었으며 가비아에서 도메인을 구입해 서버로 https로 바꾸기 위해 Route53을 활용해 도메인까지 셋팅을 마친 상태
- 하지만 배포한지 얼마 되지 않아서 AWS에서 과금 청구 고지서가 날아와 요금 문제 때문에 배포된 서버를 내림
- 프레임워크는 `Koa`를 DB는 `MongoDB`를 사용했었으며 자세한 서버 프로젝트는 아래 github repo를 참조
  - 링크: [https://github.com/hjpark625/todo-backend](https://github.com/hjpark625/todo-backend)