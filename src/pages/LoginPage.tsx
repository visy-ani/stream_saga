import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => (
  <AuthLayout>
    <div className="mb-6">
      <h2 className="text-white text-2xl font-bold mb-1">Welcome Back</h2>
      <p className="text-gray-300 text-sm">Sign in to your account</p>
    </div>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
