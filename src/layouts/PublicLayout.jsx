import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Midrash Digital
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary">Login</Link>
            <Link to="/register" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">Register</Link>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500">
          &copy; {new Date().getFullYear()} Midrash Digital. All rights reserved.
        </div>
      </footer>
    </div>
  );
}\n