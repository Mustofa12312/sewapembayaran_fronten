import { useState } from 'react';
import { Plus, Package, Edit, Settings2 } from 'lucide-react';

export default function AdminProducts() {
  const [products] = useState([
    { id: 1, name: 'VPN Premium', status: 'ACTIVE', created_at: '2026-08-30' },
    { id: 2, name: 'Proxy Elite', status: 'ACTIVE', created_at: '2026-08-30' },
    { id: 3, name: 'RDP Admin', status: 'INACTIVE', created_at: '2026-08-31' }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-slate-400">Manage digital products and their visibility.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> Create Product
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Package className="text-blue-400" /> All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">ID</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Name</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Created At</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono text-slate-500">{p.id}</td>
                  <td className="py-4 px-6 font-medium text-white">{p.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{p.created_at}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-slate-400 hover:text-white transition-colors" title="Manage Status"><Settings2 size={18} /></button>
                      <button className="text-slate-400 hover:text-blue-400 transition-colors" title="Edit Product"><Edit size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
