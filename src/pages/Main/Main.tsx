import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import type { RootState } from '../../modules/index';

function Main() {
  const navigate = useNavigate();
  const token = localStorage.getItem('uid');

  const authType = useSelector((state: RootState) => state.auth.authType);

  const checkToken = () => {
    token && navigate('/todo');
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{authType === 'login' ? <Login /> : authType === 'register' && <Register />}</div>;
}

export default Main;
