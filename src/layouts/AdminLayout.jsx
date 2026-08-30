import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-slate-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-slate-800 transition">Dashboard</Link>
          <Link to="/admin/products" className="block py-2 px-4 rounded hover:bg-slate-800 transition">Products</Link>
          <Link to="/admin/staff" className="block py-2 px-4 rounded hover:bg-slate-800 transition">Staff & Roles</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
