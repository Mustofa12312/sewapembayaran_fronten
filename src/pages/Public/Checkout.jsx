import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Tag, ShieldCheck, User, Mail, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import api from '../../lib/api';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { SkeletonCard } from '../../components/ui/Skeleton';

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
  const [isFetchingPackage, setIsFetchingPackage] = useState(true);

  // Idempotency key — stable per component mount (one checkout attempt per page load)
  const idempotencyKey = useRef(generateIdempotencyKey());

  // Whether mock payment is enabled (dev only)
  const mockEnabled = import.meta.env.VITE_ENABLE_PAYMENT_MOCK === 'true';

  useEffect(() => {
    loadMidtransScript()
      .then(() => setSnapReady(true))
      .catch(() => console.warn('[Checkout] Midtrans script failed to load.'));

    if (packageId) {
      setIsFetchingPackage(true);
      api.get(`/packages/${packageId}`)
        .then(res => setPackageDetails(res.data))
        .catch(() => setError('Failed to load package details.'))
        .finally(() => setIsFetchingPackage(false));
    } else {
      setIsFetchingPackage(false);
      setError('No package selected. Please go back and select a package.');
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
    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-3">Secure Checkout</h1>
        <p className="text-slate-400">Complete your purchase quickly and securely.</p>
      </div>

      {error && !packageDetails && (
        <Card className="bg-red-500/10 border-red-500/20 text-center py-12">
          <ShieldCheck className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Checkout Error</h2>
          <p className="text-red-300 mb-6">{error}</p>
          <Link to="/">
            <Button variant="secondary" icon={ArrowRight}>Back to Store</Button>
          </Link>
        </Card>
      )}

      {isFetchingPackage && !error && (
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3"><SkeletonCard className="h-[400px]" /></div>
          <div className="lg:col-span-2"><SkeletonCard className="h-[300px]" /></div>
        </div>
      )}

      {!isFetchingPackage && packageDetails && (
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Billing Info */}
          <div className="lg:col-span-3">
            <Card glow="blue">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <User className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Billing Information</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">Please enter your details to receive the license.</p>
                </div>
              </CardHeader>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
              
              <form id="checkoutForm" onSubmit={handlePayment} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text" name="customer_name" required
                      disabled={loading}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[var(--color-dark-surface)] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50 hover:border-white/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email" name="customer_email" required
                      disabled={loading}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-[var(--color-dark-surface)] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50 hover:border-white/20"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 ml-1">Your license key will be sent to this email.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text" name="customer_phone" required
                      disabled={loading}
                      placeholder="e.g. 08123456789"
                      className="w-full bg-[var(--color-dark-surface)] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50 hover:border-white/20"
                    />
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24 border-blue-500/20 bg-[var(--color-dark-elevated)]">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <ShoppingBag className="text-purple-400 w-5 h-5" />
                </div>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <div className="flex justify-between items-start mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                <div>
                  <h3 className="font-bold text-white mb-1">{packageDetails.product?.name}</h3>
                  <p className="text-sm text-slate-400">{packageDetails.name}</p>
                </div>
                <span className="font-bold whitespace-nowrap bg-white/10 px-2 py-1 rounded text-sm">
                  Rp {parseInt(packageDetails.price).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text" name="coupon_code" form="checkoutForm"
                      placeholder="Promo code (optional)"
                      disabled={loading}
                      className="w-full bg-[var(--color-dark-surface)] border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm uppercase disabled:opacity-50 hover:border-white/20"
                    />
                  </div>
                  <Button type="button" variant="secondary" size="md" disabled={loading} className="px-5">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pt-5 border-t border-white/5 mb-8 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>Rp {parseInt(packageDetails.price).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-white pt-3 border-t border-white/5">
                  <span>Total Amount</span>
                  <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                    Rp {parseInt(packageDetails.price).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkoutForm"
                disabled={loading || !packageDetails}
                variant="primary"
                size="xl"
                className="w-full"
                loading={loading}
                icon={CreditCard}
              >
                {loading ? 'Processing...' : 'Pay Securely with Midtrans'}
              </Button>
              
              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400/80 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck size={14} /> PCI-DSS Compliant Transaction
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
