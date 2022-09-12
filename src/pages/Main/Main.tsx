import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Main() {
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();
  const token = localStorage.getItem('uid');

  const checkToken = () => {
    token && navigate('/todo');
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {authType === 'login' ? (
        <Login setAuthType={setAuthType} />
      ) : (
        authType === 'register' && <Register setAuthType={setAuthType} />
      )}
    </div>
  );
}

export default Main;
