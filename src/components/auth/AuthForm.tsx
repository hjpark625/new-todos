import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, login, register } from '../../modules/auth';
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

  const userStore = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem('access_token');

  const error = useMemo(() => {
    if (!userStore[type].email && !userStore[type].password) {
      return '정보를 입력해주세요';
    } else if (!userStore[type].email.includes('@' && ('.com' || '.net' || '.org'))) {
      return '이메일 형식이 아닙니다.';
    } else if (userStore[type].password.length < 8) {
      return '비밀번호는 8자 이상입력해주세요';
    } else {
      return null;
    }
  }, [type, userStore]);

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
      dispatch(register(userStore.register));
    } else if (type === 'login') {
      dispatch(login(userStore.login));
    }
  };

  useEffect(() => {
    if (token) navigate('/todo');
  }, [token, navigate]);

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
          value={userStore[type].email}
          onChange={handleChangeUserInfo}
        />
        <S.StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={userStore[type].password}
          onChange={handleChangeUserInfo}
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.SubmitButton
          cyan
          fullWidth
          disabled={userStore[type].email.includes('@' && '.com') && userStore[type].password.length > 7 ? false : true}
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
