import { Link, useNavigate } from 'react-router-dom';

export default function CustomerLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('customer_token', 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 relative">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mx-auto mb-4">
            <span className="font-black text-white text-2xl tracking-tighter">M</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Enter your credentials to access your licenses.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <input type="email" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all" placeholder="name@example.com" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
            </div>
            <input type="password" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] mt-4">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">Create one now</Link>
        </p>
      </div>
    </div>
  );
}
