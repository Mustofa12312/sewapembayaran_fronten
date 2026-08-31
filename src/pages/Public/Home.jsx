import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, ChevronRight, CheckCircle2, CreditCard, Key, Clock, ArrowRight, ChevronDown, Sparkles, Globe, Headphones, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { SkeletonProductCard } from '../../components/ui/Skeleton';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const benefits = [
    { icon: Zap, title: 'Instant Delivery', desc: 'Get your license key within seconds after payment confirmation.' },
    { icon: Shield, title: 'Secure Payment', desc: 'All transactions are protected with bank-grade encryption via Midtrans.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our support team is always ready to help you with any issues.' },
    { icon: RefreshCw, title: 'Auto Renewal', desc: 'Never worry about expiration. Subscriptions renew automatically.' },
  ];

  const steps = [
    { num: '01', title: 'Choose Product', desc: 'Browse our catalog and find the perfect digital product for your needs.' },
    { num: '02', title: 'Select Plan', desc: 'Pick a plan that fits your budget — monthly, yearly, or lifetime.' },
    { num: '03', title: 'Pay Securely', desc: 'Complete payment via QRIS, e-wallet, bank transfer, or credit card.' },
    { num: '04', title: 'Get Your License', desc: 'Receive your license key instantly. Start using it right away!' },
  ];

  const faqs = [
    { q: 'How do I receive my license key?', a: 'After successful payment, your license key will be displayed on the order confirmation page and sent to your email. You can also access it anytime from your dashboard.' },
    { q: 'What payment methods are available?', a: 'We support QRIS, GoPay, OVO, ShopeePay, bank transfer (Virtual Account), credit/debit card, and convenience store payment (Indomaret/Alfamart).' },
    { q: 'Can I get a refund?', a: 'Yes, we offer refunds within 7 days of purchase if the license has not been activated. Please contact our support team for assistance.' },
    { q: 'What happens when my subscription expires?', a: 'Your license will be deactivated. You can renew your subscription from your dashboard or purchase a new one. We will send reminder emails before expiration.' },
    { q: 'Is my payment information safe?', a: 'Absolutely. We use Midtrans, a PCI-DSS certified payment gateway. We never store your card or banking details on our servers.' },
  ];

  return (
    <div className="flex flex-col">

      {/* ═══ Hero Section ═══ */}
      <section className="relative w-full overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.05] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center relative z-10">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            All Systems Operational
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-fade-in-up delay-100">
            Premium Digital Licenses{' '}
            <br className="hidden md:block" />
            <span className="text-gradient">Delivered Instantly.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-200">
            Trusted platform for purchasing digital subscriptions and license keys. Secure payment, instant delivery, and dedicated support.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up delay-300">
            <a
              href="#products"
              className="group bg-white text-slate-950 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              Explore Products
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl font-bold text-sm border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all text-white flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Create Free Account
            </Link>
          </div>

          {/* Stats mini */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 animate-fade-in-up delay-400">
            {[
              { value: '1,200+', label: 'Happy Customers' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Products Section ═══ */}
      <section id="products" className="w-full py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 block">Products</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Digital Product</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              High-quality digital licenses and subscriptions at competitive prices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonProductCard key={i} />)
            ) : products.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-16">
                <Globe size={40} className="text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No products available at the moment.</p>
              </div>
            ) : (
              products.map((product, idx) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  <div className="glass-card rounded-2xl p-7 h-full flex flex-col hover:border-blue-500/30 transition-all duration-300 group-hover:-translate-y-1">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-500/15 transition-all duration-300">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-5 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {product.packages?.[0]?.features?.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Starting from</p>
                        <p className="text-lg font-bold text-white">
                          {product.packages?.length > 0
                            ? `Rp ${parseInt(product.packages[0].price).toLocaleString('id-ID')}`
                            : 'N/A'}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══ Benefits Section ═══ */}
      <section className="w-full py-20 md:py-24 border-t border-white/5 bg-[var(--color-dark-surface)]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Trust and Speed</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Everything you need for a seamless digital product purchasing experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="glass-card rounded-2xl p-6 group hover:border-white/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <b.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="how-it-works" className="w-full py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 4 Steps</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              From browsing to license activation in just a few minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}

                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-dark-card)] border border-white/5 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-extrabold text-gradient">{step.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ Section ═══ */}
      <section id="faq" className="w-full py-20 md:py-24 border-t border-white/5 bg-[var(--color-dark-surface)]/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-blue-100 pr-4 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 animate-fade-in">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="w-full py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-purple-500/10 blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get <span className="text-gradient">Started?</span>
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Join thousands of customers who trust Midrash Digital for their digital product needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#products"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} /> Browse Products
                </a>
                <Link
                  to="/register"
                  className="border border-white/10 hover:bg-white/5 hover:border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Create Account <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
