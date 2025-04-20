import { useState } from "react";
import { Film, Lock, Mail, Key } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Assuming useAuth is set up to provide the authentication methods
import { useNavigate } from "react-router-dom"; // React Router hook
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"; // Firebase providers

type LoginFormProps = {
  onSwitchMode: () => void;
};

const LoginForm = ({ onSwitchMode }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, signInWithProvider } = useAuth(); 
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/"); 
    } catch {
      setError("Invalid email or password");
    }
  };  

  const handleGoogleLogin = async () => {
    try {
      await signInWithProvider(new GoogleAuthProvider()); // Using Firebase GoogleAuthProvider
      navigate("/"); // Redirect after successful login
    } catch {
      setError("Google login failed");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithProvider(new FacebookAuthProvider()); // Using Firebase FacebookAuthProvider
      navigate("/"); // Redirect after successful login
    } catch {
      setError("Facebook login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Film className="text-red-500 h-7 w-7" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
          Stream Saga
        </h2>
      </div>

      {/* Email Input */}
      <div className="relative">
        <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2 ml-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/60 rounded-lg text-white focus:outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 backdrop-blur-sm text-lg"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="relative">
        <label htmlFor="password" className="block text-base font-medium text-gray-300 mb-2 ml-1">
          Password
        </label>
        <div className="relative">
          <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/60 rounded-lg text-white focus:outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 backdrop-blur-sm text-lg"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-red-600 bg-gray-800/80 border-gray-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-gray-300">
            Remember me
          </label>
        </div>
        <a href="#" className="text-red-400 hover:text-red-300">
          Forgot password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg text-lg cursor-pointer"
        onClick={handleLogin}
      >
        <span className="flex items-center justify-center">
          <Lock className="mr-2 h-4 w-4" />
          Sign In
        </span>
      </button>

      {/* Sign Up */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            className="text-red-400 hover:text-red-300 font-medium cursor-pointer"
            onClick={onSwitchMode}
          >
            Sign up
          </span>
        </p>
      </div>

      {/* Social Login */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/60"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/50 text-gray-400 backdrop-blur-sm">Or</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            className="py-2 px-4 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 text-base font-medium rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer"
            onClick={handleGoogleLogin}
          >
            Google
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 text-base font-medium rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer"
            onClick={handleFacebookLogin}
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
