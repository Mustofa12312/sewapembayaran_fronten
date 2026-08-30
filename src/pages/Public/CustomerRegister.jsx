import { Link } from 'react-router-dom';

export default function CustomerRegister() {
  const handleRegister = (e) => {
    e.preventDefault();
    alert('Mock: Register flow');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 relative">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto mb-4">
            <span className="font-black text-white text-2xl tracking-tighter">M</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join Midrash Digital to manage your digital licenses seamlessly.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
            <input type="text" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <input type="email" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="name@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input type="password" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Referral Code <span className="text-slate-500 font-normal">(Optional)</span></label>
            <input type="text" className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-sans" placeholder="e.g. AX789B" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
}
