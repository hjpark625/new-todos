import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/auth';
import * as S from './styles/TodoTemplate.styled';
import type { AppDispatch } from '../../modules';

interface ChildrenProps {
  children: React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
    alert('로그아웃 되었습니다.');
    return navigate('/');
  };

  return (
    <S.TodoWrapper>
      <S.AppTitle>
        Todo APP{' '}
        <S.LogoutButton
          type="button"
          onClick={() => {
            onLogout();
          }}
        >
          로그아웃
        </S.LogoutButton>
      </S.AppTitle>
      <S.Content>{children}</S.Content>
    </S.TodoWrapper>
  );
}

export default TodoTemplate;
