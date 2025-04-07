
const LoginForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 bg-gray-800 rounded-md border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">Remember me</label>
        </div>
        <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">Sign In</button>
      <p className="text-center text-sm text-gray-400">
        Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
      </p>
    </form>
  );
};

export default LoginForm;
