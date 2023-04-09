import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './styles/TodoTemplate.styled';

interface ChildrenProps {
  children: React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  const navigate = useNavigate();

  const onLogout = async () => {
    await axios.post('http://localhost:4000/api/auth/logout');
    localStorage.removeItem('id');
    localStorage.removeItem('access_token');
    alert('로그아웃 완료되었습니다.');
    navigate('/');
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
