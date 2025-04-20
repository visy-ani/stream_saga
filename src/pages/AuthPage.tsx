import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';

const AuthPage = () => {
  const location = useLocation();
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Determine the form mode based on the current route
  useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    setIsLoginMode(pathname === '/auth' || pathname === '/');
  }, [location]);

  // Function to manually toggle between login and signup
  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <AuthLayout>
      {isLoginMode ? (
        <LoginForm onSwitchMode={toggleAuthMode} />
      ) : (
        <SignupForm onSwitchMode={toggleAuthMode} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;