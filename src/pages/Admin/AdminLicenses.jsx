import { useState } from 'react';
import { Key, UploadCloud, Download, Ban } from 'lucide-react';

export default function AdminLicenses() {
  const [licenses] = useState([
    { id: 1, product: 'VPN Premium', package: 'Monthly Subscription', key: 'VPN-ABCD-1234', status: 'AVAILABLE', assigned_order: null, exp: null },
    { id: 2, product: 'VPN Premium', package: 'Monthly Subscription', key: 'VPN-XYZ-9876', status: 'ASSIGNED', assigned_order: 'ORD-2026-XYZ123', exp: null },
    { id: 3, product: 'Proxy Elite', package: 'Standard 10 IPs', key: 'PRX-001', status: 'ACTIVE', assigned_order: 'ORD-2026-ABC456', exp: '2027-08-30' },
    { id: 4, product: 'VPN Premium', package: 'Monthly Subscription', key: 'VPN-OLD-1111', status: 'DISABLED', assigned_order: null, exp: null }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">License Inventory</h1>
          <p className="text-slate-400">Manage and track digital license keys across all products.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors border border-white/10">
            <Download size={18} /> Export
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
            <UploadCloud size={18} /> Bulk Import (CSV)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {['Available', 'Assigned', 'Active', 'Expired', 'Disabled'].map(stat => (
          <div key={stat} className="glass-card p-4 rounded-xl text-center border border-white/5">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">{stat}</p>
            <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 100) + 10}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Key className="text-amber-400" /> Keys Registry</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">License Key</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product & Package</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Assigned Order</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Expiration</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {licenses.map(l => (
                <tr key={l.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono text-white font-bold">{l.key}</td>
                  <td className="py-4 px-6">
                    <p className="text-slate-200">{l.product}</p>
                    <p className="text-xs text-slate-500">{l.package}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide border 
                      ${l.status === 'AVAILABLE' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        l.status === 'ASSIGNED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                        l.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-mono text-xs">{l.assigned_order || '-'}</td>
                  <td className="py-4 px-6 text-slate-400">{l.exp || '-'}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-500 hover:text-red-400 transition-colors" title="Disable License"><Ban size={18} /></button>
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
