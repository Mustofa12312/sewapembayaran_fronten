import { Link, useNavigate } from 'react-router-dom';

export default function CustomerLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary outline-none" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Login</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Don't have an account? <Link to="/register" className="text-primary font-medium">Register here</Link>
      </p>
    </div>
  );
}
