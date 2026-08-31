import { useState, useEffect } from 'react';
import { ShoppingCart, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../../lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Refund Modal State
  const [refundModal, setRefundModal] = useState({ isOpen: false, order: null, reason: '' });
  const [isRefunding, setIsRefunding] = useState(false);

  // Fulfill Modal State
  const [fulfillModal, setFulfillModal] = useState({ isOpen: false, order: null });
  const [isFulfilling, setIsFulfilling] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
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

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    if (!refundModal.reason.trim()) return alert("Reason is required");
    
    setIsRefunding(true);
    try {
      await api.post(`/admin/orders/${refundModal.order.id}/refund`, {
        reason: refundModal.reason
      });
      alert('Order successfully refunded');
      setRefundModal({ isOpen: false, order: null, reason: '' });
      fetchOrders();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to process refund');
    } finally {
      setIsRefunding(false);
    }
  };

  const handleFulfillSubmit = async (e) => {
    e.preventDefault();
    setIsFulfilling(true);
    try {
      await api.post(`/admin/orders/${fulfillModal.order.id}/mark-paid`);
      alert('Order manually fulfilled successfully!');
      setFulfillModal({ isOpen: false, order: null });
      fetchOrders();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to manually fulfill order');
    } finally {
      setIsFulfilling(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'PAID' || status === 'ACTIVE') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
    if (status === 'REFUNDED') {
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders & Payments</h1>
          <p className="text-slate-400">View customer transactions and payment statuses.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-blue-400" /> Transaction History</h2>
          <button onClick={fetchOrders} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
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
                    <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide border ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {o.status === 'PENDING_PAYMENT' && (
                      <button 
                        onClick={() => setFulfillModal({ isOpen: true, order: o })}
                        className="text-xs px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors border border-blue-500/20"
                      >
                        Approve
                      </button>
                    )}
                    {(o.status === 'PAID' || o.status === 'ACTIVE') && (
                      <button 
                        onClick={() => setRefundModal({ isOpen: true, order: o, reason: '' })}
                        className="text-xs px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors border border-red-500/20"
                      >
                        Refund
                      </button>
                    )}
                    <button className="text-slate-500 hover:text-white transition-colors"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {refundModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Refund Order</h2>
            </div>
            
            <form onSubmit={handleRefundSubmit} className="p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  You are about to refund order <strong className="text-white font-mono">{refundModal.order?.order_number}</strong>. 
                  This will revoke the customer's license and attempt to return the funds via Midtrans.
                </p>
                
                <label className="block text-sm font-medium text-slate-300 mb-1">Reason for Refund</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-slate-200"
                  placeholder="e.g. Customer request, accidental purchase..."
                  value={refundModal.reason}
                  onChange={(e) => setRefundModal({...refundModal, reason: e.target.value})}
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setRefundModal({isOpen: false, order: null, reason: ''})}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
                  disabled={isRefunding}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isRefunding}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isRefunding ? <RefreshCw size={18} className="animate-spin" /> : 'Confirm Refund'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fulfill Modal */}
      {fulfillModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Manual Fulfillment</h2>
            </div>
            
            <form onSubmit={handleFulfillSubmit} className="p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  You are about to manually mark order <strong className="text-white font-mono">{fulfillModal.order?.order_number}</strong> as paid. 
                  This will immediately generate a license key and send an email to the customer.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setFulfillModal({isOpen: false, order: null})}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
                  disabled={isFulfilling}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isFulfilling}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isFulfilling ? <RefreshCw size={18} className="animate-spin" /> : 'Confirm Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
