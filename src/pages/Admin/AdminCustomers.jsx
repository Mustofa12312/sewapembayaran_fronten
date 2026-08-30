import { useState } from 'react';
import { UsersRound, ExternalLink } from 'lucide-react';

export default function AdminCustomers() {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '08123456789', total_orders: 2, total_spending: 75000, last_order: '2026-08-30' },
    { id: 2, name: 'Alice Smith', email: 'alice@example.com', phone: '-', total_orders: 1, total_spending: 25000, last_order: '2026-08-30' }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
          <p className="text-slate-400">View customer records derived from orders.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><UsersRound className="text-blue-400" /> Customer Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Name</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Contact</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Total Orders</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Total Spending</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Last Order</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{c.name}</td>
                  <td className="py-4 px-6">
                    <p className="text-slate-200">{c.email}</p>
                    <p className="text-xs text-slate-500">{c.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-bold text-center">{c.total_orders}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">Rp {parseInt(c.total_spending).toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{c.last_order}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors"><ExternalLink size={18} /></button>
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
