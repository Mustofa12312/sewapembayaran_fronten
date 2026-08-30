import { Link } from 'react-router-dom';
import { Package, RefreshCw, Key, Share2, Wallet } from 'lucide-react';

export default function CustomerDashboard() {
  const orders = [
    { id: 'ORD-2026-XYZ123', product: 'VPN Premium', status: 'ACTIVE', token: 'mock-secure-token', date: '2026-08-30' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-slate-400 text-sm">Manage your licenses, subscriptions, and affiliate earnings.</p>
        </div>
        <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium text-sm bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
          Browse Products
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Affiliate Card */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
              <Share2 size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Affiliate Program</h2>
              <p className="text-xs text-purple-200/70">Earn 10% commission on referrals</p>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5 flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Code</span>
            <span className="font-mono font-bold text-lg text-purple-300">AX789B</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="text-slate-400 text-xs mb-1">Balance</p>
              <p className="text-xl font-bold text-emerald-400">Rp 50.000</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs mb-1">Total Referrals</p>
              <p className="text-xl font-bold text-white">1</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Package size={20} /> <span className="font-medium text-sm">Active Licenses</span>
          </div>
          <div className="text-4xl font-bold text-white">1</div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <RefreshCw size={20} /> <span className="font-medium text-sm">Active Subscriptions</span>
          </div>
          <div className="text-4xl font-bold text-white">0</div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold">Order History</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key size={24} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">You have no active orders yet.</p>
            <Link to="/" className="text-blue-400 hover:underline mt-2 inline-block text-sm">Start browsing products</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Order ID</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Date</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-300">{order.id}</td>
                    <td className="py-4 px-6 font-medium text-white">{order.product}</td>
                    <td className="py-4 px-6 text-slate-400">{order.date}</td>
                    <td className="py-4 px-6">
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium" onClick={() => alert('Renewal requested')}>
                          <RefreshCw size={14} /> Renew
                        </button>
                        <Link to={`/order/${order.token}`} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-1 text-xs font-medium transition-colors">
                          <Key size={14} /> License Key
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
