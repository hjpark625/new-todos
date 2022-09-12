import React from 'react';
import AuthTemplate from '../../components/auth/AuthTemplate';
import AuthForm from '../../components/auth/AuthForm';

function Login({
  setAuthType,
}: {
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <AuthTemplate>
      <AuthForm type="login" setAuthType={setAuthType} />
    </AuthTemplate>
  );
}

export default Login;
