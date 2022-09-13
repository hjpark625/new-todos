import React from 'react';
import { logout } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../styles/palette';

interface ChildrenProps {
  children: JSX.Element | React.ReactElement | React.ReactNode;
}

function TodoTemplate({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const onLogout = async () => {
    const auth = getAuth();
    // localStorage.removeItem('access_token');
    // window.location.reload();
    await logout(auth)
      .then(() => {
        localStorage.removeItem('uid');
        alert('로그아웃 완료되었습니다.');
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('다시 시도해 주십시오');
      });
  };

  return (
    <TodoWrapper>
      <AppTitle>
        Todo APP{' '}
        <LogoutButton
          type="button"
          onClick={() => {
            onLogout();
          }}
        >
          로그아웃
        </LogoutButton>
      </AppTitle>
      <Content>{children}</Content>
    </TodoWrapper>
  );
}

export default TodoTemplate;

const TodoWrapper = styled.div`
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const AppTitle = styled.div`
  position: relative;
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 5%;
  width: 70px;
  height: 30px;
  border: 1px solid ${palette.gray[4]};
  border-radius: 8px;
  background: ${palette.gray[4]};
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    border: 1px solid ${palette.gray[6]};
    background: ${palette.gray[6]};
    color: white;
  }
`;

const Content = styled.div`
  background: white;
  height: 22rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;