import { Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut, User, Menu } from "lucide-react";
import { useState } from "react";

export default function PublicLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('customer_token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="font-black text-white text-xl tracking-tighter">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Midrash Digital</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Products</Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
                  <User size={18} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
                <Link to="/register" className="text-sm font-medium bg-white text-slate-950 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">Get Started</Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass absolute top-full left-0 w-full border-b border-white/5 p-4 flex flex-col gap-4">
            <Link to="/" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-red-400 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="text-blue-400 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 relative">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
        </div>
        
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-slate-950/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="font-black text-white text-sm">M</span>
              </div>
              <span className="font-bold text-lg text-white">Midrash Digital</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Premium VPN services and digital licenses. Secure, fast, and reliable infrastructure for your daily online needs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Midrash Digital. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
