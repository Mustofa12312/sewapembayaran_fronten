import { useState } from 'react';
import { Plus, Box, Edit, Settings2 } from 'lucide-react';

export default function AdminPackages() {
  const [packages] = useState([
    { id: 1, product: 'VPN Premium', name: 'Monthly Subscription', price: '50000', is_recurring: true, status: 'ACTIVE' },
    { id: 2, product: 'VPN Premium', name: '1 Year Plan', price: '450000', is_recurring: false, status: 'ACTIVE' },
    { id: 3, product: 'Proxy Elite', name: 'Standard 10 IPs', price: '25000', is_recurring: false, status: 'INACTIVE' }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Packages</h1>
          <p className="text-slate-400">Manage pricing, billing cycle, and features of product packages.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> Create Package
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Box className="text-blue-400" /> All Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Package Name</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Price</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Type</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {packages.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-slate-300">{p.product}</td>
                  <td className="py-4 px-6 font-medium text-white">{p.name}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">Rp {parseInt(p.price).toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-slate-400">{p.is_recurring ? 'Subscription' : 'One-time'}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-slate-400 hover:text-white transition-colors" title="Manage Features"><Settings2 size={18} /></button>
                      <button className="text-slate-400 hover:text-blue-400 transition-colors" title="Edit Price/Name"><Edit size={18} /></button>
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
