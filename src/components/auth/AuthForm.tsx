import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextMap, UserInfo } from '../types/Auth.type';
import { AuthFormProps } from '../types/Auth.type';
import { register, db, login } from '../../firebase';
import { child, ref, set, get } from 'firebase/database';
import * as S from './styles/AuthForm.styled';

const textMap: TextMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, setAuthType }: AuthFormProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const text = textMap[type];

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'register') {
      await register(userInfo.email, userInfo.password)
        .then(res => {
          set(ref(db, `users/${res.user.uid}`), {
            id: res.user.uid,
            email: res.user.email,
          });
          alert('회원가입 성공!');
          navigate('/todo');
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            alert('이미 사용중인 이메일입니다.');
          } else {
            alert('회원가입 실패');
          }
        });
    } else if (type === 'login') {
      const dbRef = ref(db);
      await login(userInfo.email, userInfo.password)
        .then(res => {
          get(child(dbRef, `users/${res.user.uid}`));
          localStorage.setItem('uid', res.user.uid);
          alert(`어서오세요 ${res.user.displayName}님`);
          navigate('/todo');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            alert('회원 정보가 존재하지 않습니다.');
          } else if (err.code === 'auth/wrong-password') {
            alert('비밀번호가 틀렸습니다.');
          } else if (err.code === 'auth/invalid-email') {
            alert('유효하지 않은 이메일입니다.');
          }
        });
    }
  };

  useEffect(() => {
    if (!userInfo.email && !userInfo.password) {
      setError('정보를 입력해주세요');
    } else if (!userInfo.email.includes('@' && '.com')) {
      setError('이메일 형식이 아닙니다.');
    } else if (userInfo.password.length < 8) {
      setError('비밀번호는 8자 이상입력해주세요');
    } else {
      setError(null);
    }
  }, [error, userInfo.email, userInfo.password]);

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
          onChange={handleChangeUserInfo}
        />
        <S.StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          onChange={handleChangeUserInfo}
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.SubmitButton
          cyan
          fullWidth
          disabled={
            userInfo.email.includes('@' && '.com') &&
            userInfo.password.length > 7
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
