import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (coupon === 'DISCOUNT50') {
      setDiscount(50000);
      alert('Coupon applied!');
    } else {
      alert('Invalid coupon');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Mock Midtrans popup would appear here. Redirecting to success page.');
    navigate('/order/mock-secure-token');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between mb-1">
          <span className="text-slate-600">Subtotal</span>
          <span>Rp 500.000</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-1 text-green-600">
            <span>Discount</span>
            <span>- Rp {discount.toLocaleString('id-ID')}</span>
          </div>
        )}
        <div className="flex justify-between mt-3 pt-3 border-t border-slate-200 font-bold text-lg">
          <span>Total</span>
          <span>Rp {(500000 - discount).toLocaleString('id-ID')}</span>
        </div>
      </div>

      <form onSubmit={applyCoupon} className="flex gap-2 mb-6">
        <input type="text" placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-primary" />
        <button type="submit" className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium transition">Apply</button>
      </form>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary outline-none" />
        </div>
        <button type="submit" className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition">
          Pay with Midtrans
        </button>
      </form>
    </div>
  );
}
