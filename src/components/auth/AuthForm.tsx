import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextMap } from '../types/Auth.type';
import { AuthFormProps } from '../types/Auth.type';
import { changeField, RootState } from '../../modules/auth';
import { register, db, login } from '../../firebase';
import { child, ref, set, get } from 'firebase/database';
import * as S from './styles/AuthForm.styled';

const textMap: TextMap = {
  login: '로그인',
  register: '회원가입',
};

interface StateProps {
  auth: RootState;
}

const AuthForm = ({ type, setAuthType }: AuthFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const userInfo = useSelector((state: StateProps) => state.auth);

  const text = textMap[type];

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    dispatch(
      changeField({
        form: type,
        key: name,
        value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'register') {
      await register(userInfo.register.email, userInfo.register.password)
        .then(res => {
          console.info(res);
          set(ref(db, `users/${res.user.uid}`), {
            id: res.user.uid,
            email: res.user.email,
          });
          alert('회원가입 성공!');
          navigate('/todo');
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              return alert('이미 사용중인 이메일입니다.');
            default:
              return alert('회원가입 실패');
          }
        });
    } else if (type === 'login') {
      const dbRef = ref(db);
      await login(userInfo.login.email, userInfo.login.password)
        .then(res => {
          get(child(dbRef, `users/${res.user.uid}`));
          localStorage.setItem('uid', res.user.uid);
          alert(`어서오세요 ${res.user.email}님`);
          navigate('/todo');
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/user-not-found':
              return alert('회원 정보가 존재하지 않습니다.');
            case 'auth/wrong-password':
              return alert('비밀번호가 틀렸습니다.');
            case 'auth/invalid-email':
              return alert('유효하지 않은 이메일입니다.');
            default:
              return alert('로그인 실패');
          }
        });
    }
  };

  useEffect(() => {
    if (!userInfo[type].email && !userInfo[type].password) {
      setError('정보를 입력해주세요');
    } else if (!userInfo[type].email.includes('@' && '.com')) {
      setError('이메일 형식이 아닙니다.');
    } else if (userInfo[type].password.length < 8) {
      setError('비밀번호는 8자 이상입력해주세요');
    } else {
      setError(null);
    }
  }, [error, type, userInfo]);

  return (
    <S.AuthFormWrapper>
      <h3>{text}</h3>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <S.StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={userInfo[type].email}
          onChange={handleChangeUserInfo}
        />
        <S.StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={userInfo[type].password}
          onChange={handleChangeUserInfo}
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.SubmitButton
          cyan
          fullWidth
          disabled={
            userInfo[type].email.includes('@' && '.com') &&
            userInfo[type].password.length > 7
              ? false
              : true
          }
        >
          {text}
        </S.SubmitButton>
      </form>
      <S.Footer>
        {type === 'login' ? (
          <S.ChangeAuthButton
            onClick={() => {
              setAuthType('register');
            }}
          >
            회원가입
          </S.ChangeAuthButton>
        ) : (
          <S.ChangeAuthButton
            onClick={() => {
              setAuthType('login');
            }}
          >
            로그인
          </S.ChangeAuthButton>
        )}
      </S.Footer>
    </S.AuthFormWrapper>
  );
};

export default AuthForm;
