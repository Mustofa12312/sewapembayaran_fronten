import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Copy, AlertCircle, RefreshCw, Box, Key, Clock, LogOut } from 'lucide-react';
import api from '../../lib/api';

const PAID_STATUSES = ['ACTIVE', 'PAID'];
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 90000; // 90 seconds max polling

async function copyToClipboardSafe(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback: create a temporary input
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  }
}

export default function OrderResult() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const pollTimerRef = useRef(null);
  const pollTimeoutRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    setIsPolling(false);
  }, []);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await api.get(`/orders/${token}`);
      const data = res.data;
      setOrder(data);
      setError('');

      // Stop polling once order is in a terminal state
      if (PAID_STATUSES.includes(data.status) || data.status === 'REFUNDED' || data.status === 'EXPIRED') {
        stopPolling();
      }

      return data;
    } catch (e) {
      setError('Failed to load order. The link may be invalid.');
      stopPolling();
    }
  }, [token, stopPolling]);

  // Initial load + start polling if pending
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetchOrder();
      setLoading(false);

      // If still pending after initial load, start polling
      if (data && data.status === 'PENDING_PAYMENT') {
        setIsPolling(true);

        pollTimerRef.current = setInterval(async () => {
          await fetchOrder();
        }, POLL_INTERVAL_MS);

        // Auto-stop after max timeout
        pollTimeoutRef.current = setTimeout(() => {
          stopPolling();
        }, POLL_TIMEOUT_MS);
      }
    };

    init();
    return () => stopPolling();
  }, [token, fetchOrder, stopPolling]);

  const handleCopy = async (text) => {
    const ok = await copyToClipboardSafe(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert('Could not copy automatically. Please copy manually.');
    }
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

  const isPaid = PAID_STATUSES.includes(order.status);
  const isPending = order.status === 'PENDING_PAYMENT';
  const licenseKeys = order.license_keys ?? [];
  const hasLicense = licenseKeys.length > 0;

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
        {/* Polling indicator */}
        {isPolling && (
          <div className="mt-4 flex items-center justify-center gap-2 text-amber-400 text-sm">
            <RefreshCw size={14} className="animate-spin" />
            Checking payment status...
          </div>
        )}
      </div>

      <div className="glass-card rounded-2xl p-8 mb-8 border border-white/10 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />

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
                <p className="font-bold text-xl text-emerald-400">
                  Rp {parseInt(order.snapshot_price).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Key size={16} /> License Details
            </h3>

            {hasLicense ? (
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">⚠️ Keep this key confidential. Do not share it.</p>
                {licenseKeys.map((lk, idx) => (
                  <div key={lk.id ?? idx} className="mt-3">
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">License Key {licenseKeys.length > 1 ? `#${idx + 1}` : ''}</p>
                    <div className="flex items-center gap-2 bg-black/50 rounded-lg p-3 border border-white/5">
                      <code className="font-mono text-emerald-300 font-bold flex-1 break-all text-sm">
                        {lk.license_key}
                      </code>
                      <button
                        onClick={() => handleCopy(lk.license_key)}
                        aria-label="Copy license key"
                        className="p-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded transition-colors shrink-0"
                      >
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                ))}
                {order.end_date && (
                  <p className="text-xs text-slate-400 mt-4">
                    Expires: <span className="font-bold text-white">{new Date(order.end_date).toLocaleDateString()}</span>
                  </p>
                )}
                {!order.end_date && isPaid && (
                  <p className="text-xs text-emerald-400 mt-4 font-bold">Lifetime Access (Never Expires)</p>
                )}
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 text-center">
                {isPending ? (
                  <>
                    <Clock className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm mb-4">
                      Your license will appear here once payment is confirmed by our system.
                    </p>
                  </>
                ) : (
                  <p className="text-slate-400 mb-4 text-sm">License will be revealed after payment is confirmed.</p>
                )}
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
                      alert('Failed to download invoice. Please try again.');
                    }
                  }}
                  className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg font-bold transition-colors border border-blue-500/30 flex items-center justify-center gap-2"
                >
                  Download Invoice (PDF)
                </button>
              )}

              {isPending && (
                <button
                  onClick={async () => {
                    try {
                      const res = await api.post(`/orders/${order.secure_token}/pay`);
                      if (window.snap) {
                        window.snap.pay(res.data.snap_token, {
                          onSuccess: () => fetchOrder(),
                          onPending: () => fetchOrder(),
                          onError: () => { alert('Payment failed.'); fetchOrder(); },
                          onClose: () => fetchOrder(),
                        });
                      } else {
                        alert('Payment system not ready. Please refresh the page.');
                      }
                    } catch (e) {
                      alert('Failed to initialize payment. Please try again.');
                    }
                  }}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-500 mb-6">
          Save this page URL — it is your receipt and license access portal.
        </p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors border border-white/10">
          <LogOut size={18} /> Return to Store
        </Link>
      </div>
    </div>
  );
}
