import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { logout } from '../../firebase';
import * as S from './styles/TodoTemplate.styled';

interface ChildrenProps {
  children: React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  const navigate = useNavigate();

  const onLogout = async () => {
    const auth = getAuth();
    await logout(auth)
      .then(() => {
        localStorage.removeItem('uid');
        alert('로그아웃 완료되었습니다.');
        navigate('/');
      })
      .catch(() => {
        alert('다시 시도해 주십시오');
      });
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
