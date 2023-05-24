import AuthTemplate from '@/components/auth/AuthTemplate';
import AuthForm from '@/components/auth/AuthForm';

function Login() {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
}

export default Login;
