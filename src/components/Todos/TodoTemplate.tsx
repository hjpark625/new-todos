import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../modules';
import { logout } from '../../modules/auth';
import * as S from './styles/TodoTemplate.styled';

interface ChildrenProps {
  children: React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
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
