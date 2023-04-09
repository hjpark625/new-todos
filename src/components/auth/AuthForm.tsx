import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeField } from '../../modules/auth';
import { setAuthType } from '../../modules/auth';
import * as S from './styles/AuthForm.styled';
import type { AppDispatch, RootState } from '../../modules';
import type { AuthType } from '../types/Auth.type';
import type { AuthFormProps } from '../types/Auth.type';

const textMap: AuthType = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const userInfo = useSelector((state: RootState) => state.auth);

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
      try {
        const response = await axios.post(
          'http://localhost:4000/api/auth/register',
          {
            email: userInfo.register.email,
            password: userInfo.register.password,
          },
          {
            withCredentials: true,
          }
        );
        alert('회원가입 성공!');
        localStorage.setItem('id', response.data.user.info._id);
        localStorage.setItem('access_token', response.data.user.access_token);
        navigate('/todo');
      } catch (e) {
        alert('회원가입 실패');
      }
    } else if (type === 'login') {
      try {
        const response = await axios.post(
          'http://localhost:4000/api/auth/login',
          {
            email: userInfo.login.email,
            password: userInfo.login.password,
          },
          {
            withCredentials: true,
          }
        );
        alert(`어서오세요! ${response.data.user.info.username}님`);
        localStorage.setItem('id', response.data.user.info._id);
        localStorage.setItem('access_token', response.data.user.access_token);
        navigate('/todo');
      } catch (e) {
        alert('로그인 실패');
      }
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
              dispatch(setAuthType('register'));
            }}
          >
            회원가입
          </S.ChangeAuthButton>
        ) : (
          <S.ChangeAuthButton
            onClick={() => {
              dispatch(setAuthType('login'));
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
