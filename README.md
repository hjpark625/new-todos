# Todos APP with Firebase

## 💡 프로젝트 정보

1. 프로젝트 명 : Todos App with Firebase
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

## ⭐ 배포 링크

<br/>

> http://new-todos.vercel.app/

<br/>

---

## 🔐 배포 테스트 계정

<br />

> id(email): tester@naver.com  
> password: 1q2w3e4r!

<br/>

---

## 📚 기술스택

<br />

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.8.3-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.3.0-blue?logo=react-router)  
![firebase](https://img.shields.io/badge/firebase-9.9.4-E1C537?logo=firebase)
![redux](https://img.shields.io/badge/redux-4.2.0-pink?logo=redux)
![react-redux](https://img.shields.io/badge/react--redux-8.0.2-pink?logo=redux)

- **선정 이유**

  - _TypeScript_
    - 정적 타입 지원하므로 컴파일 단계에서 오류를 사전에 포착할 수 있으며 이를 통해 미리 디버깅이 가능함
  - _Styled-Components_
    - CSS-in-JS는 짧은 길이의 유니크한 클래스를 자동적으로 생성하기에 코드 경량화에 효과적
    - 컴포넌트 기반 개발 방법에 적합하고 가장 많이 사용되는 CSS-in-JS 라이브러리
    - JS 상수와 함수를 쉽게 공유하여 props를 활용한 조건부 렌더링에 용이
    - 컴포넌트화하여 재활용 가능
  - _Firebase_
    - 백엔드의 부재로 인한 Todo리스트를 저장할 데이터 구축에 활용
    - email, password로그인 API를 지원
    - DB를 자체적으로 또한 자유롭게 구축할 수 있어 개인 프로젝트에 활용하기에 용이
  - _React-Router-Dom_
    - React의 SPA(Single Page Application)특성상 하나의 페이지(HTML)에서 모든 렌더링이 이루어짐
    - React의 이러한 강점을 활용하기 위해 페이지의 로딩없이 페이지에 필요한 컴포넌트를 렌더링 하기 위해 사용
  - _Redux_ / _React-Redux_
    - 전역 상태 관리하는데 활용
    - 전역 상태 관리에 있어 props drilling을 피할 수 있음과 동시에 성능 최적화에 용이

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

### Firebase 회원가입 및 로그인 기능 구현 및 DB구축

- 회원가입
  - 회원가입은 `firebase`에서 `createUserWithEmailAndPassword`메소드를 제공해준다.
  - 위의 메소드를 활용해서 `firebase.ts`에 `register`함수를 제작해주었다.
    ```ts
    export const register = (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
    ```
- 로그인
  - 로그인은 `firebase`에서 `signInWithEmailAndPassword`메소드를 제공해준다.
  - 위의 메소드를 활용해서 마찬가지로 `firebase.ts`에 `login`함수를 제작했다.
    ```ts
    export const login = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
    ```
- 회원가입 및 로그인 할 때 `firebase`에서 성공했을 때의 응답을 `Realtime Database`에 `set`메소드를 활용해 유저데이터의 `email`과 `uid`를 저장했으며 추후 Todos리스트에 로그인 했을 때 각 고유별로 Todo를 갖게 하기 위해 `uid`를 활용하여 로그인 기능을 같이 구현하였다.
- DB는 `Realtime Database`를 활용하여 구축을 했다.

  - `firebase.ts`에서 `getDatabase`를 활용해서 db라는 이름의 변수를 만들어 주었고 그 db를 활용해서 CRUD에 활용하였다.
  - db를 활용하기 위해서는 `ref`라는 메소드를 같이 활용해서 데이터가 입력되고 요청되어야 할 db의 url을 지정해줘야 한다.

    ```ts
    /* AuthForm.tsx - handleSubmit */
    if (type === 'register') {
    await register(userInfo.register.email, userInfo.register.password)
      .then(res => {
        set(ref(db, `users/${res.user.uid}`), { // set메소드에 ref를 달아준다.(데이터 베이스를 찾아가게 하기 위한 목적)
          id: res.user.uid,
          email: res.user.email,
        });
        alert('회원가입 성공!');
        navigate('/todo');
      })
      /* ... */
    ```

### TodoList 가져오기

- `get`메소드를 활용해 데이터베이스에서 해당 유저 `uid`에 맞는 Todo 데이터를 가져온다

  ```ts
  const token = localStorage.getItem('uid'); // 로그인 시 유저의 uid를 로컬스토리지에 저장한 후 활용하는 상태

  useEffect(() => {
    const todoRef = ref(db, `/todos/${token}`);
    onValue(todoRef, res => {
      setTodos(res.val());
    });
  }, []);
  ```

- 로그인 후 Todo앱으로 `navigate`될 때 최초 TodoList를 한 번 만 받아와서 렌더링을 하기 때문에 `useEffect`를 활용하였다.

- TodoList 추가하기

  - input창에 todo를 적은 후 해당 input의 텍스트를 데이터 베이스로 `submit`한다.

    ```ts
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        const postDB = ref(db, `/todos/${token}/${todoId}`);
        e.preventDefault();
        setTodoId(prev => prev + 1);
        await set(postDB, {
          id: todoId,
          text: todoValue,
          isCompleted: false,
        });
      } catch (err) {
        alert('작성에 실패하였습니다.');
        console.error(err);
      } finally {
        dispatch(changeInput(''));
      }
    };
    ```

    - submit할 때도 마찬가지로 `set`메소드와 `ref`메소드를 활용해 데이터베이스에 해당 유저 `uid`주소의 데이터베이스에 `POST`를 한다.

### TodoList 수정하기

- 수정하기는 `update`메소드를 활용해서 Todo의 수정과 완료/미완료 처리를 구현하였다.

  ```ts
  // Todo를 수정하는 함수
  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editRef = ref(db, `todos/${token}/${id}`);
    await update(editRef, {
      text: editTodo,
    }).catch(err => {
      alert('수정에 실패하였습니다.');
      console.error(err);
    });
    setIsEdit(false);
  };

  // Todo의 완료/미완료를 수정하는 함수
  const getDoneTodo = async () => {
    const doneRef = ref(db, `todos/${token}/${id}`);
    setIsDone(!isDone);
    await update(doneRef, {
      isCompleted: isDone,
    }).catch(err => {
      alert('오류가 발생했습니다.');
      console.error(err);
    });
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

- 삭제는 매우 간단하게 `remove`메소드를 활용해서 삭제버튼 클릭 시 해당 id를 가진 Todo데이터를 삭제하는 것으로 구현했다.
  ```ts
  const deleteTodo = async () => {
    const deleteRef = ref(db, `todos/${token}/${id}`);
    remove(deleteRef);
  };
  ```

### Realtime DB에서 FireStore DB로 마이그레이션(23. 2. 11(토) 완료))

- FireStore는 쿼리 중심의 데이터베이스로 개인적으로 Realtime보다 FireStore 데이터베이스가 인덱싱부터 데이터 관리 측면에 있어 더 효율적이라고 판단되어 마이그레이션을 진행했다.
  - 메서드 들은 Realtime과 큰 차이는 없으며 중점적으로 변경된 사항은 realtime은 ref라는 메서드를 활용해서 데이터 베이스에 접근했지만 firestore는 컬렉션을 기준으로 접근을 한다는 차이가 있다.
  - 초기 데이터를 todos데이터를 불러오는데 있어 사용한 메서드는 query와 onSnapshot이라는 메서드로 get을 사용하던 realtime과의 차이가 있다.
  - 데이터의 추가에 있어서는 realtime은 set, firestore는 addDoc 혹은 setDoc을 사용
  - 삭제는 realtime에서는 remove, firestore는 deleteDoc
  - 수정은 realtime에선 update, firestore는 updateDoc으로 활용된다.
