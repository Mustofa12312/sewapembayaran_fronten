import { useState, useEffect } from 'react';
import { ShoppingCart, Filter, Download, Eye, CheckCircle2, Clock, XCircle } from 'lucide-react';
import api from '../../lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/admin/orders');
      setOrders(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders & Payments</h1>
          <p className="text-slate-400">View customer transactions and payment statuses.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-blue-400" /> Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Order ID</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Customer</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Total</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono text-slate-400 text-xs">{o.order_number || o.id}</td>
                  <td className="py-4 px-6">
                    <p className="text-slate-200 font-medium">{o.customer_name || 'Guest'}</p>
                    <p className="text-xs text-slate-500">{o.customer_email || 'N/A'}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{o.product?.name || 'N/A'}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">Rp {parseInt(o.snapshot_price || 0).toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide border 
                      ${o.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors"><Eye size={18} /></button>
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
