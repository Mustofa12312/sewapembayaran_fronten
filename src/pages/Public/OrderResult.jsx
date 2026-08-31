import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Copy, AlertCircle, RefreshCw, Box, Key, Clock, LogOut } from 'lucide-react';
import api from '../../lib/api';

export default function OrderResult() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders/${token}`);
      setOrder(res.data);
      setError('');
    } catch (e) {
      setError('Failed to load order. Make sure the token is valid.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white">Loading Order Data...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Order Not Found</h2>
        <p className="text-slate-400 mb-8">{error}</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">
          Back to Homepage
        </Link>
      </div>
    );
  }

  const isPaid = order.status === 'ACTIVE' || order.status === 'PAID';
  const hasLicense = order.license_keys && order.license_keys.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        {isPaid ? (
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        ) : (
          <Clock className="w-16 h-16 text-amber-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          {isPaid ? 'Payment Successful!' : 'Waiting for Payment'}
        </h1>
        <p className="text-slate-400">
          Order ID: <span className="font-mono text-white font-bold">{order.order_number}</span>
        </p>
      </div>

      <div className="glass-card rounded-2xl p-8 mb-8 border border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
        
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Box size={16} /> Order Summary
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500">Product</p>
                <p className="font-bold text-lg">{order.product?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Package</p>
                <p className="font-medium text-slate-300">{order.package?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Amount</p>
                <p className="font-bold text-xl text-emerald-400">Rp {parseInt(order.snapshot_price).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Key size={16} /> License Details
            </h3>
            
            {hasLicense ? (
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-4">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">Your License Key</p>
                <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-white/5">
                  <code className="font-mono text-emerald-300 font-bold flex-1 break-all">
                    {order.license_keys[0].license_key}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(order.license_keys[0].license_key)}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded transition-colors shrink-0"
                    title="Copy Key"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                {order.end_date && (
                  <p className="text-xs text-slate-400 mt-4">
                    Expires on: <span className="font-bold text-white">{new Date(order.end_date).toLocaleDateString()}</span>
                  </p>
                )}
                {!order.end_date && isPaid && (
                  <p className="text-xs text-emerald-400 mt-4 font-bold">Lifetime Access (Never Expires)</p>
                )}
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-slate-400 mb-2">License will be revealed after payment is confirmed.</p>
                <button 
                  onClick={fetchOrder}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10 flex items-center gap-2 mx-auto"
                >
                  <RefreshCw size={14} /> Refresh Status
                </button>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {isPaid && (
                <button
                  onClick={async () => {
                    try {
                      const res = await api.get(`/orders/${order.secure_token}/invoice`, { responseType: 'blob' });
                      const url = window.URL.createObjectURL(new Blob([res.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `invoice-${order.order_number}.pdf`);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                    } catch (e) {
                      alert('Failed to download invoice');
                    }
                  }}
                  className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg font-bold transition-colors border border-blue-500/30 flex items-center justify-center gap-2"
                >
                  Download Invoice (PDF)
                </button>
              )}
              
              {!isPaid && order.status === 'PENDING_PAYMENT' && (
                <button
                  onClick={async () => {
                    try {
                      const res = await api.post(`/orders/${order.secure_token}/pay`);
                      if (window.snap) {
                        window.snap.pay(res.data.snap_token, {
                          onSuccess: function(result){ fetchOrder(); },
                          onPending: function(result){ fetchOrder(); },
                          onError: function(result){ alert('Payment failed'); fetchOrder(); },
                          onClose: function(){ fetchOrder(); }
                        });
                      } else {
                        alert('Snap script not loaded');
                      }
                    } catch (e) {
                      alert('Failed to initialize payment');
                    }
                  }}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  Pay Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-6">
          Please save this page URL. It serves as your receipt and access portal.
        </p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors border border-white/10">
          <LogOut size={18} /> Return to Store
        </Link>
      </div>
    </div>
  );
}
