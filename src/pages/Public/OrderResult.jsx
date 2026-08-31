import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Copy, AlertCircle, RefreshCw, Box, Key, Clock, ArrowLeft, Download, ShieldCheck, Check } from 'lucide-react';
import api from '../../lib/api';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const PAID_STATUSES = ['ACTIVE', 'PAID'];
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 90000; // 90 seconds max polling

async function copyToClipboardSafe(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
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
  const [paymentLoading, setPaymentLoading] = useState(false);

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

      if (PAID_STATUSES.includes(data.status) || data.status === 'REFUNDED' || data.status === 'EXPIRED') {
        stopPolling();
      }
      return data;
    } catch (e) {
      setError('Failed to load order. The link may be invalid.');
      stopPolling();
    }
  }, [token, stopPolling]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetchOrder();
      setLoading(false);

      if (data && data.status === 'PENDING_PAYMENT') {
        setIsPolling(true);
        pollTimerRef.current = setInterval(async () => {
          await fetchOrder();
        }, POLL_INTERVAL_MS);

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
    }
  };

  const handlePayNow = async () => {
    setPaymentLoading(true);
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
    } finally {
      setPaymentLoading(false);
    }
  };

  const downloadInvoice = async () => {
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
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">Retrieving Order...</h2>
        <p className="text-slate-400">Please wait while we fetch your order details.</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <EmptyState 
          icon={AlertCircle}
          title="Order Not Found"
          description={error}
          actionLabel="Return to Homepage"
          actionTo="/"
        />
      </div>
    );
  }

  const isPaid = PAID_STATUSES.includes(order.status);
  const isPending = order.status === 'PENDING_PAYMENT';
  const licenseKeys = order.license_keys ?? [];
  const hasLicense = licenseKeys.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className={`absolute inset-0 blur-2xl opacity-40 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {isPaid ? (
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center relative z-10 mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center relative z-10 mx-auto">
              <Clock className="w-12 h-12 text-amber-400" />
            </div>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {isPaid ? 'Payment Successful!' : 'Waiting for Payment'}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-400 font-medium">
          <p>Order ID: <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded text-sm">{order.order_number}</span></p>
          <Badge variant={isPaid ? 'active' : isPending ? 'pending' : 'default'} size="sm" dot>
            {order.status}
          </Badge>
        </div>
        
        {isPolling && (
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
            <RefreshCw size={16} className="animate-spin" />
            Checking payment status in real-time...
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-5 gap-8 mb-8">
        {/* Order Summary */}
        <div className="md:col-span-2 space-y-8">
          <Card padding="p-6 md:p-8" className="h-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <Box size={20} className="text-blue-400" />
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Product</p>
                <p className="font-bold text-lg text-white">{order.product?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Package</p>
                <p className="font-medium text-slate-300">{order.package?.name || 'N/A'}</p>
                {order.package?.is_recurring && <Badge variant="new" size="xs" className="mt-2">Subscription</Badge>}
              </div>
              <div className="pt-5 border-t border-white/5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Amount</p>
                <p className="font-black text-2xl text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                  Rp {parseInt(order.snapshot_price).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* License Details & Actions */}
        <div className="md:col-span-3">
          <Card padding="p-6 md:p-8" glow={isPaid ? 'emerald' : ''} className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-2">
              <Key size={20} className="text-purple-400" />
              <CardTitle>License Access</CardTitle>
            </CardHeader>

            {hasLicense ? (
              <div className="flex-1 space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3.5 rounded-xl text-sm flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <p className="leading-relaxed font-medium">Keep this license key strictly confidential. Do not share it publicly.</p>
                </div>
                
                {licenseKeys.map((lk, idx) => (
                  <div key={lk.id ?? idx}>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
                      License Key {licenseKeys.length > 1 ? `#${idx + 1}` : ''}
                    </p>
                    <div className="flex items-center gap-3 bg-[var(--color-dark-bg)] rounded-xl p-2 pl-4 border border-emerald-500/30 group">
                      <code className="font-mono text-emerald-300 font-bold flex-1 break-all text-base md:text-lg">
                        {lk.license_key}
                      </code>
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => handleCopy(lk.license_key)}
                        className="shrink-0 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-transparent hover:border-emerald-500/30"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-white/5 flex gap-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Status</p>
                    <p className="text-sm font-bold text-white">Active</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Expiration</p>
                    {order.end_date ? (
                      <p className="text-sm font-bold text-white">{new Date(order.end_date).toLocaleDateString()}</p>
                    ) : (
                      <p className="text-sm font-bold text-emerald-400">Lifetime (Never Expires)</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                {isPending ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 mb-4">
                      <Clock className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Pending Payment</h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-6">
                      Your license key is securely generated and waiting to be revealed once payment is confirmed.
                    </p>
                    <Button variant="outline" size="sm" onClick={fetchOrder} icon={RefreshCw}>
                      Refresh Status
                    </Button>
                  </>
                ) : (
                  <EmptyState 
                    icon={Key} 
                    title="License Hidden" 
                    description="License will be revealed after payment is confirmed."
                  />
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 space-y-3 pt-6 border-t border-white/5">
              {isPaid && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border-transparent hover:border-blue-500/30"
                  onClick={downloadInvoice}
                  icon={Download}
                >
                  Download Invoice (PDF)
                </Button>
              )}

              {isPending && (
                <Button 
                  variant="primary" 
                  size="xl" 
                  className="w-full"
                  onClick={handlePayNow}
                  loading={paymentLoading}
                >
                  Complete Payment Now
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-slate-500 mb-6 font-medium">
          You can always access this page later from your dashboard.
        </p>
        <Link to="/dashboard">
          <Button variant="ghost" size="md" icon={ArrowLeft}>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
