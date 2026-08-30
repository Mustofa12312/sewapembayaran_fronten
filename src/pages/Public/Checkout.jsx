import { Link } from 'react-router-dom';
import { CreditCard, Tag, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Mock: Processing payment');
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
            <form id="checkoutForm" onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input type="text" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                <input type="email" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Number (For License Delivery)</label>
                <input type="text" required className="w-full bg-slate-900/50 border border-white/10 text-white px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" />
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="glass-card rounded-2xl p-6 border border-white/10 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 border-b border-white/5 pb-4">Order Summary</h2>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-white">VPN Premium</h3>
                <p className="text-sm text-slate-400 mt-1">Monthly Subscription</p>
              </div>
              <span className="font-bold">Rp 50.000</span>
            </div>
            
            <div className="mb-6 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Promo code" className="w-full bg-slate-900/50 border border-white/10 text-white pl-9 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm uppercase" />
                </div>
                <button type="button" className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors border border-white/5 text-sm">
                  Apply
                </button>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-white/5 mb-6 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>Rp 50.000</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Discount</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total Amount</span>
                <span className="text-blue-400">Rp 50.000</span>
              </div>
            </div>
            
            <button form="checkoutForm" type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
              <CreditCard size={18} /> Pay Securely with Midtrans
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
