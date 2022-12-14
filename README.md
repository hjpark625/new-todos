# Todos APP with Firebase

## ๐ก ํ๋ก์ ํธ ์ ๋ณด

1. ํ๋ก์ ํธ ๋ช : Todos App with Firebase
2. ํ๋ก์ ํธ ๊ธฐ๊ฐ : 2022. 9. 12. ~ 2022. 9. 19.
3. ํ๋ก์ ํธ ์ฐธ๊ฐ ์ธ์: ๋จ๋ํ๋ก์ ํธ

<br />

---

<br/>

## ๐ ์คํ ๋ฐฉ๋ฒ

    $ git clone https://github.com/hjpark625/new-todos.git
    $ cd new-todos
    $ yarn install
    $ yarn start

<br />

---

## โญ ๋ฐฐํฌ ๋งํฌ

<br/>

> http://new-todos.vercel.app/

<br/>

---

## ๐ ๊ธฐ์ ์คํ

<br />

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.8.3-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.3.0-blue?logo=react-router)  
![firebase](https://img.shields.io/badge/firebase-9.9.4-E1C537?logo=firebase)
![redux](https://img.shields.io/badge/redux-4.2.0-pink?logo=redux)
![react-redux](https://img.shields.io/badge/react--redux-8.0.2-pink?logo=redux)

- **์ ์  ์ด์ **

  - _TypeScript_
    - ์ ์  ํ์ ์ง์ํ๋ฏ๋ก ์ปดํ์ผ ๋จ๊ณ์์ ์ค๋ฅ๋ฅผ ์ฌ์ ์ ํฌ์ฐฉํ  ์ ์์ผ๋ฉฐ ์ด๋ฅผ ํตํด ๋ฏธ๋ฆฌ ๋๋ฒ๊น์ด ๊ฐ๋ฅํจ
  - _Styled-Components_
    - CSS-in-JS๋ ์งง์ ๊ธธ์ด์ ์ ๋ํฌํ ํด๋์ค๋ฅผ ์๋์ ์ผ๋ก ์์ฑํ๊ธฐ์ ์ฝ๋ ๊ฒฝ๋ํ์ ํจ๊ณผ์ 
    - ์ปดํฌ๋ํธ ๊ธฐ๋ฐ ๊ฐ๋ฐ ๋ฐฉ๋ฒ์ ์ ํฉํ๊ณ  ๊ฐ์ฅ ๋ง์ด ์ฌ์ฉ๋๋ CSS-in-JS ๋ผ์ด๋ธ๋ฌ๋ฆฌ
    - JS ์์์ ํจ์๋ฅผ ์ฝ๊ฒ ๊ณต์ ํ์ฌ props๋ฅผ ํ์ฉํ ์กฐ๊ฑด๋ถ ๋ ๋๋ง์ ์ฉ์ด
    - ์ปดํฌ๋ํธํํ์ฌ ์ฌํ์ฉ ๊ฐ๋ฅ
  - _Firebase_
    - ๋ฐฑ์๋์ ๋ถ์ฌ๋ก ์ธํ Todo๋ฆฌ์คํธ๋ฅผ ์ ์ฅํ  ๋ฐ์ดํฐ ๊ตฌ์ถ์ ํ์ฉ
    - email, password๋ก๊ทธ์ธ API๋ฅผ ์ง์
    - DB๋ฅผ ์์ฒด์ ์ผ๋ก ๋ํ ์์ ๋กญ๊ฒ ๊ตฌ์ถํ  ์ ์์ด ๊ฐ์ธ ํ๋ก์ ํธ์ ํ์ฉํ๊ธฐ์ ์ฉ์ด
  - _React-Router-Dom_
    - React์ SPA(Single Page Application)ํน์ฑ์ ํ๋์ ํ์ด์ง(HTML)์์ ๋ชจ๋  ๋ ๋๋ง์ด ์ด๋ฃจ์ด์ง
    - React์ ์ด๋ฌํ ๊ฐ์ ์ ํ์ฉํ๊ธฐ ์ํด ํ์ด์ง์ ๋ก๋ฉ์์ด ํ์ด์ง์ ํ์ํ ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋ง ํ๊ธฐ ์ํด ์ฌ์ฉ
  - _Redux_ / _React-Redux_
    - ์ ์ญ ์ํ ๊ด๋ฆฌํ๋๋ฐ ํ์ฉ
    - ์ ์ญ ์ํ ๊ด๋ฆฌ์ ์์ด props drilling์ ํผํ  ์ ์์๊ณผ ๋์์ ์ฑ๋ฅ ์ต์ ํ์ ์ฉ์ด

<br />

---

## ๐ ํด๋ ๊ตฌ์กฐ

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

## ๐ ๊ตฌํ ๊ธฐ๋ฅ

- Firebase ํ์๊ฐ์ ๋ฐ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ ๊ตฌํ ๋ฐ DB๊ตฌ์ถ

  - ํ์๊ฐ์
    - ํ์๊ฐ์์ `firebase`์์ `createUserWithEmailAndPassword`๋ฉ์๋๋ฅผ ์ ๊ณตํด์ค๋ค.
    - ์์ ๋ฉ์๋๋ฅผ ํ์ฉํด์ `firebase.ts`์ `register`ํจ์๋ฅผ ์ ์ํด์ฃผ์๋ค.
      ```ts
      export const register = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
      ```
  - ๋ก๊ทธ์ธ
    - ๋ก๊ทธ์ธ์ `firebase`์์ `signInWithEmailAndPassword`๋ฉ์๋๋ฅผ ์ ๊ณตํด์ค๋ค.
    - ์์ ๋ฉ์๋๋ฅผ ํ์ฉํด์ ๋ง์ฐฌ๊ฐ์ง๋ก `firebase.ts`์ `login`ํจ์๋ฅผ ์ ์ํ๋ค.
      ```ts
      export const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
      };
      ```
  - ํ์๊ฐ์ ๋ฐ ๋ก๊ทธ์ธ ํ  ๋ `firebase`์์ ์ฑ๊ณตํ์ ๋์ ์๋ต์ `Realtime Database`์ `set`๋ฉ์๋๋ฅผ ํ์ฉํด ์ ์ ๋ฐ์ดํฐ์ `email`๊ณผ `uid`๋ฅผ ์ ์ฅํ์ผ๋ฉฐ ์ถํ Todos๋ฆฌ์คํธ์ ๋ก๊ทธ์ธ ํ์ ๋ ๊ฐ ๊ณ ์ ๋ณ๋ก Todo๋ฅผ ๊ฐ๊ฒ ํ๊ธฐ ์ํด `uid`๋ฅผ ํ์ฉํ์ฌ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ๊ฐ์ด ๊ตฌํํ์๋ค.
  - DB๋ `Realtime Database`๋ฅผ ํ์ฉํ์ฌ ๊ตฌ์ถ์ ํ๋ค.

    - `firebase.ts`์์ `getDatabase`๋ฅผ ํ์ฉํด์ db๋ผ๋ ์ด๋ฆ์ ๋ณ์๋ฅผ ๋ง๋ค์ด ์ฃผ์๊ณ  ๊ทธ db๋ฅผ ํ์ฉํด์ CRUD์ ํ์ฉํ์๋ค.
    - db๋ฅผ ํ์ฉํ๊ธฐ ์ํด์๋ `ref`๋ผ๋ ๋ฉ์๋๋ฅผ ๊ฐ์ด ํ์ฉํด์ ๋ฐ์ดํฐ๊ฐ ์๋ ฅ๋๊ณ  ์์ฒญ๋์ด์ผ ํ  db์ url์ ์ง์ ํด์ค์ผ ํ๋ค.

      ```ts
      /* AuthForm.tsx - handleSubmit */
      if (type === 'register') {
      await register(userInfo.register.email, userInfo.register.password)
        .then(res => {
          set(ref(db, `users/${res.user.uid}`), { // set๋ฉ์๋์ ref๋ฅผ ๋ฌ์์ค๋ค.(๋ฐ์ดํฐ ๋ฒ ์ด์ค๋ฅผ ์ฐพ์๊ฐ๊ฒ ํ๊ธฐ ์ํ ๋ชฉ์ )
            id: res.user.uid,
            email: res.user.email,
          });
          alert('ํ์๊ฐ์ ์ฑ๊ณต!');
          navigate('/todo');
        })
        /* ... */
      ```

- TodoList ๊ฐ์ ธ์ค๊ธฐ

  - `get`๋ฉ์๋๋ฅผ ํ์ฉํด ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ํด๋น ์ ์  `uid`์ ๋ง๋ Todo ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์จ๋ค

    ```ts
    const token = localStorage.getItem('uid'); // ๋ก๊ทธ์ธ ์ ์ ์ ์ uid๋ฅผ ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ์ ์ฅํ ํ ํ์ฉํ๋ ์ํ

    useEffect(() => {
      const todoRef = ref(db, `/todos/${token}`);
      onValue(todoRef, res => {
        setTodos(res.val());
      });
    }, []);
    ```

  - ๋ก๊ทธ์ธ ํ Todo์ฑ์ผ๋ก `navigate`๋  ๋ ์ต์ด TodoList๋ฅผ ํ ๋ฒ ๋ง ๋ฐ์์์ ๋ ๋๋ง์ ํ๊ธฐ ๋๋ฌธ์ `useEffect`๋ฅผ ํ์ฉํ์๋ค.

- TodoList ์ถ๊ฐํ๊ธฐ

  - input์ฐฝ์ todo๋ฅผ ์ ์ ํ ํด๋น input์ ํ์คํธ๋ฅผ ๋ฐ์ดํฐ ๋ฒ ์ด์ค๋ก `submit`ํ๋ค.

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
        alert('์์ฑ์ ์คํจํ์์ต๋๋ค.');
        console.error(err);
      } finally {
        dispatch(changeInput(''));
      }
    };
    ```

    - submitํ  ๋๋ ๋ง์ฐฌ๊ฐ์ง๋ก `set`๋ฉ์๋์ `ref`๋ฉ์๋๋ฅผ ํ์ฉํด ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ํด๋น ์ ์  `uid`์ฃผ์์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ `POST`๋ฅผ ํ๋ค.

- TodoList ์์ ํ๊ธฐ

  - ์์ ํ๊ธฐ๋ `update`๋ฉ์๋๋ฅผ ํ์ฉํด์ Todo์ ์์ ๊ณผ ์๋ฃ/๋ฏธ์๋ฃ ์ฒ๋ฆฌ๋ฅผ ๊ตฌํํ์๋ค.

    ```ts
    // Todo๋ฅผ ์์ ํ๋ ํจ์
    const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const editRef = ref(db, `todos/${token}/${id}`);
      await update(editRef, {
        text: editTodo,
      }).catch(err => {
        alert('์์ ์ ์คํจํ์์ต๋๋ค.');
        console.error(err);
      });
      setIsEdit(false);
    };

    // Todo์ ์๋ฃ/๋ฏธ์๋ฃ๋ฅผ ์์ ํ๋ ํจ์
    const getDoneTodo = async () => {
      const doneRef = ref(db, `todos/${token}/${id}`);
      setIsDone(!isDone);
      await update(doneRef, {
        isCompleted: isDone,
      }).catch(err => {
        alert('์ค๋ฅ๊ฐ ๋ฐ์ํ์ต๋๋ค.');
        console.error(err);
      });
    };
    ```

  - ๋ถ๊ฐ์ ์ผ๋ก ์์ ํ  ๋ ์์ ์์ด์ฝ์ ํด๋ฆญํ๋ฉด ์์ ํ๋ input์ผ๋ก focus๋๋๋ก ๊ฐ์ด ๊ตฌํํ์๋ค.
    ```ts
    const editRef = useRef<HTMLInputElement | null>(null); // ref๋ฅผ ์์ ๋ฒํผ ํด๋ฆญ์ input์ฐฝ์ props๋ก ์ ๋ฌ
    useLayoutEffect(() => {
      // useLayoutEffect๋ฅผ ํ์ฉํด ํด๋น input์ผ๋ก focus๋๋๋ก ์ฒ๋ฆฌ
      editRef.current !== null && editRef.current.focus();
    });
    ```

- TodoList ์ญ์ ํ๊ธฐ
  - ์ญ์ ๋ ๋งค์ฐ ๊ฐ๋จํ๊ฒ `remove`๋ฉ์๋๋ฅผ ํ์ฉํด์ ์ญ์ ๋ฒํผ ํด๋ฆญ ์ ํด๋น id๋ฅผ ๊ฐ์ง Todo๋ฐ์ดํฐ๋ฅผ ์ญ์ ํ๋ ๊ฒ์ผ๋ก ๊ตฌํํ๋ค.
    ```ts
    const deleteTodo = async () => {
      const deleteRef = ref(db, `todos/${token}/${id}`);
      remove(deleteRef);
    };
    ```
