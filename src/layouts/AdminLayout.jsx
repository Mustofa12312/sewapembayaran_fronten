import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Package, Box, Key, ShoppingCart, Users, Activity, UsersRound } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-black text-white text-sm">M</span>
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/dashboard') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <div className="pt-4 pb-2 px-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catalog</p>
          </div>
          <Link to="/admin/products" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/products') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Package size={18} /> Products
          </Link>
          <Link to="/admin/packages" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/packages') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Box size={18} /> Packages
          </Link>
          <Link to="/admin/licenses" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/licenses') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Key size={18} /> License Inventory
          </Link>
          
          <div className="pt-4 pb-2 px-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sales</p>
          </div>
          <Link to="/admin/orders" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/orders') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <ShoppingCart size={18} /> Orders & Payments
          </Link>
          <Link to="/admin/customers" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/customers') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <UsersRound size={18} /> Customers
          </Link>
          
          <div className="pt-4 pb-2 px-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">System</p>
          </div>
          <Link to="/admin/staff" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/staff') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Users size={18} /> Staff & Roles
          </Link>
          <Link to="/admin/audit-logs" className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${isActive('/admin/audit-logs') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Activity size={18} /> Audit Logs
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 py-3 px-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors font-medium text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Abstract Background Orbs for Admin */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
          <div className="absolute bottom-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[120px]" />
        </div>

        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-10">
          <h1 className="font-semibold text-lg text-slate-200 capitalize">
            {location.pathname.split('/').pop().replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-300">AD</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative z-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
