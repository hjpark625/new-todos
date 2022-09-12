import React from 'react';
import AuthTemplate from '../../components/auth/AuthTemplate';
import AuthForm from '../../components/auth/AuthForm';

function Register({
  setAuthType,
}: {
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <AuthTemplate>
      <AuthForm type="register" setAuthType={setAuthType} />
    </AuthTemplate>
  );
}

export default Register;
