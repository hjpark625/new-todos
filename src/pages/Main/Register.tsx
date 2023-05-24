import AuthTemplate from '@/components/auth/AuthTemplate';
import AuthForm from '@/components/auth/AuthForm';

function Register() {
  return (
    <AuthTemplate>
      <AuthForm type="register" />
    </AuthTemplate>
  );
}

export default Register;
