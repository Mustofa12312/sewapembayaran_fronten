import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Menu, X, ShoppingBag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useAuthStore from "../stores/authStore";

export default function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const customerToken = useAuthStore((s) => s.customerToken);
  const clearCustomerAuth = useAuthStore((s) => s.clearCustomerAuth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try { await (await import('../lib/api')).default.post('/customer/logout'); } catch (_) {}
    clearCustomerAuth();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Products' },
    { to: '/#how-it-works', label: 'How It Works' },
    { to: '/#faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-dark-bg)] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* ──── Navbar ──── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
              <span className="font-black text-white text-lg tracking-tighter">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
              Midrash<span className="text-slate-400 font-medium"> Digital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-white bg-white/5'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {customerToken ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <User size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/5 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-white text-slate-950 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-1.5"
                >
                  Get Started <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/5 animate-fade-in">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/5 my-3" />
              {customerToken ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <User size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="block px-3 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/5 rounded-lg transition-colors">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ──── Main Content ──── */}
      <main className="flex-1 relative">
        {/* Abstract Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-blue-600/[0.04] blur-[150px]" />
          <div className="absolute top-[20%] -right-[15%] w-[40%] h-[40%] rounded-full bg-purple-600/[0.04] blur-[150px]" />
          <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-emerald-600/[0.02] blur-[120px]" />
        </div>

        <Outlet />
      </main>

      {/* ──── Footer ──── */}
      <footer className="border-t border-white/5 bg-[var(--color-dark-surface)]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="font-black text-white text-sm">M</span>
                </div>
                <span className="font-bold text-white">Midrash Digital</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Premium digital licenses and subscriptions with instant delivery and secure payment.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Products</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">All Products</Link></li>
                <li><Link to="/register" className="hover:text-blue-400 transition-colors">Create Account</Link></li>
                <li><Link to="/login" className="hover:text-blue-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Midrash Digital. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <ShoppingBag size={12} />
              <span>Powered by Sewapembayaran</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
