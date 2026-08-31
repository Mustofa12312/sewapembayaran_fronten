import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Tag, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../../lib/api';

// Midtrans script is loaded once globally (avoids duplicate script tags on remount)
let midtransScriptLoaded = false;

function loadMidtransScript() {
  if (midtransScriptLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const isProduction = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    if (!clientKey || clientKey === 'dummy') {
      if (import.meta.env.PROD) {
        console.error('[Config Error] VITE_MIDTRANS_CLIENT_KEY is not set for production!');
      }
    }

    const script = document.createElement('script');
    script.src = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey || 'dummy');
    script.onload = () => { midtransScriptLoaded = true; resolve(); };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Generate a stable idempotency key per form session
function generateIdempotencyKey() {
  return crypto.randomUUID();
}

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package_id');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [packageDetails, setPackageDetails] = useState(null);
  const [snapReady, setSnapReady] = useState(false);

  // Idempotency key — stable per component mount (one checkout attempt per page load)
  const idempotencyKey = useRef(generateIdempotencyKey());

  // Whether mock payment is enabled (dev only)
  const mockEnabled = import.meta.env.VITE_ENABLE_PAYMENT_MOCK === 'true';

  useEffect(() => {
    loadMidtransScript()
      .then(() => setSnapReady(true))
      .catch(() => console.warn('[Checkout] Midtrans script failed to load.'));

    if (packageId) {
      api.get(`/packages/${packageId}`)
        .then(res => setPackageDetails(res.data))
        .catch(() => setError('Failed to load package details.'));
    }
  }, [packageId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!packageId) { setError('No package selected.'); return; }
    if (loading) return; // Hard guard against double-submit

    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);

      const response = await api.post('/orders', {
        package_id: packageId,
        customer_name: formData.get('customer_name'),
        customer_email: formData.get('customer_email'),
        customer_phone: formData.get('customer_phone'),
        coupon_code: formData.get('coupon_code') || '',
        quantity: 1,
      }, {
        headers: { 'X-Idempotency-Key': idempotencyKey.current },
      });

      const snapToken = response.data.snap_token;
      const orderToken = response.data.order.secure_token;

      // Mock payment bypass (dev only — never active in production)
      if (mockEnabled && snapToken.startsWith('mock_')) {
        try { await api.post(`/orders/${orderToken}/simulate`); } catch (_) {}
        navigate(`/order/${orderToken}`);
        return;
      }

      // Production Midtrans Snap
      if (!window.snap || !snapReady) {
        setError('Payment system is not ready. Please refresh and try again.');
        setLoading(false);
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: () => navigate(`/order/${orderToken}`),
        onPending: () => navigate(`/order/${orderToken}`),
        onError: () => {
          setError('Payment failed. Please try again or choose another payment method.');
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        const message = err.response?.data?.message || 'Failed to initiate payment. Please try again.';
        setError(message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="glass-card rounded-2xl p-6 border border-white/10 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" /> Billing Information
            </h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center mb-4">
                {error}
              </div>
            )}
            <form id="checkoutForm" onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text" name="customer_name" required
                  disabled={loading}
                  className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email" name="customer_email" required
                  disabled={loading}
                  className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Number</label>
                <input
                  type="text" name="customer_phone" required
                  disabled={loading}
                  className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="glass-card rounded-2xl p-6 border border-white/10 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 border-b border-white/5 pb-4">Order Summary</h2>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-white">{packageDetails ? packageDetails.product?.name : 'Loading...'}</h3>
                <p className="text-sm text-slate-400 mt-1">{packageDetails?.name}</p>
              </div>
              <span className="font-bold">Rp {packageDetails ? parseInt(packageDetails.price).toLocaleString('id-ID') : '0'}</span>
            </div>

            <div className="mb-6 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text" name="coupon_code" form="checkoutForm"
                    placeholder="Promo code"
                    disabled={loading}
                    className="w-full bg-slate-900/50 border border-white/10 text-white pl-9 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm uppercase disabled:opacity-50"
                  />
                </div>
                <button type="button" disabled={loading} className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors border border-white/5 text-sm disabled:opacity-50">
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5 mb-6 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>Rp {packageDetails ? parseInt(packageDetails.price).toLocaleString('id-ID') : '0'}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total Amount</span>
                <span className="text-blue-400">Rp {packageDetails ? parseInt(packageDetails.price).toLocaleString('id-ID') : '0'}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkoutForm"
              disabled={loading || !packageDetails}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
            >
              <CreditCard size={18} />
              {loading ? 'Processing...' : 'Pay Securely with Midtrans'}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> End-to-end encrypted transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
