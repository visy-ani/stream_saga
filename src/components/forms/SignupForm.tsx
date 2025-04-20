import { useState } from "react";
import { Film, Lock, Mail, Key, User } from "lucide-react";

type SignupFormProps = {
  onSwitchMode: () => void;
};

const SignupForm = ({ onSwitchMode }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div 
      className="w-full max-w-md mx-auto space-y-4 bg-transparent"
    >
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Film className="text-red-500 h-7 w-7" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
          Stream Saga
        </h2>
      </div>

      {/* Name Input */}
      <div className="relative">
        <label htmlFor="name" className="block text-base font-medium text-gray-300 mb-2 ml-1">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/60 rounded-lg text-white focus:outline-none focus:border-red-500/70 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 backdrop-blur-sm text-lg"
            placeholder="John Doe"
          />
        </div>
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

      {/* Terms and Conditions */}
      <div className="flex items-start text-sm">
        <div className="flex items-center h-5">
          <input 
            id="terms" 
            type="checkbox" 
            className="h-4 w-4 text-red-600 bg-gray-800/80 border-gray-600 rounded"
          />
        </div>
        <div className="ml-2">
          <label htmlFor="terms" className="text-gray-300">
            I agree to the <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
          </label>
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg text-lg cursor-pointer"
      >
        <span className="flex items-center justify-center">
          <Lock className="mr-2 h-4 w-4" />
          Create Account
        </span>
      </button>

      {/* Sign In */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Already have an account? {" "}
          <a 
            href="#" 
            className="text-red-400 hover:text-red-300 font-medium"
            onClick={onSwitchMode}
          >
            Sign in
          </a>
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
          >
            Google
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 text-base font-medium rounded-md transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;