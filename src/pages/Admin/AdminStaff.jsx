import { useState, useEffect } from 'react';
import { UserPlus, ShieldAlert, Trash2 } from 'lucide-react';
import api from '../../lib/api';

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const fetchStaff = async () => {
    try {
      const res = await api.get('/admin/staff');
      setStaff(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/admin/staff', newStaff);
      setNewStaff({ name: '', email: '', password: '' });
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create staff');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
          <p className="text-slate-400">Manage administrator accounts and permissions.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Create Staff Form */}
        <div className="md:col-span-1">
          <div className="glass-card rounded-2xl p-6 border border-white/10 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-blue-400" /> Add New Staff
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
                <input type="text" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm" placeholder="e.g. Budi Support" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input type="email" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm" placeholder="staff@midrash.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <input type="password" value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-bold transition-all mt-4 text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                Create Account
              </button>
            </form>
            <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex gap-3 items-start">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <p>New accounts are created with the <strong>'staff'</strong> role by default. Staff cannot access this management page.</p>
            </div>
          </div>
        </div>

        {/* Staff List Table */}
        <div className="md:col-span-2">
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h2 className="text-xl font-bold">Active Accounts</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Name</th>
                    <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Email</th>
                    <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Role</th>
                    <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {staff.map(user => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{user.name}</td>
                      <td className="py-4 px-6 text-slate-300">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${user.role === 'super_admin' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {user.role !== 'super_admin' && (
                          <button className="text-slate-500 hover:text-red-400 transition-colors flex items-center justify-end gap-1 text-xs font-medium w-full" onClick={() => alert('Remove requested')}>
                            <Trash2 size={16} /> Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
