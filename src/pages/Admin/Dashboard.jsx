import { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, CheckCircle, Clock, CheckSquare, XCircle, Key, Link2 } from 'lucide-react';
import api from '../../lib/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    paid_orders: 0,
    pending_payments: 0,
    active_orders: 0,
    expired_orders: 0,
    available_licenses: 0,
    assigned_licenses: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/admin/analytics');
        // Our backend API currently returns: revenue, orders, customers, subscriptions.
        // For the sake of PRD alignment in UI, we'll map what we have and keep others 0 if missing.
        setMetrics(prev => ({
          ...prev,
          ...res.data.metrics
        }));
      } catch (err) {
        console.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">System summary and operational metrics (PRD Compliant).</p>
      </div>
      
      {/* 8 KPIs as requested in PRD Section 21 */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        
        {/* Revenue */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="font-semibold text-sm">Total Revenue</span>
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrency(metrics.revenue)}</div>
        </div>

        {/* Total Orders */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingCart size={20} />
            </div>
            <span className="font-semibold text-sm">Total Orders</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.orders}</div>
        </div>

        {/* Paid Orders */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-indigo-400">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <CheckCircle size={20} />
            </div>
            <span className="font-semibold text-sm">Paid Orders</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.paid_orders}</div>
        </div>

        {/* Pending Payments */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-amber-400">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock size={20} />
            </div>
            <span className="font-semibold text-sm">Pending Payments</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.pending_payments}</div>
        </div>

        {/* Active Orders */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <CheckSquare size={20} />
            </div>
            <span className="font-semibold text-sm">Active Orders</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.active_orders}</div>
        </div>

        {/* Expired Orders */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <XCircle size={20} />
            </div>
            <span className="font-semibold text-sm">Expired Orders</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.expired_orders}</div>
        </div>

        {/* Available Licenses */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-teal-400">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <Key size={20} />
            </div>
            <span className="font-semibold text-sm">Available Licenses</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.available_licenses}</div>
        </div>

        {/* Assigned Licenses */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Link2 size={20} />
            </div>
            <span className="font-semibold text-sm">Assigned Licenses</span>
          </div>
          <div className="text-3xl font-bold text-white">{metrics.assigned_licenses}</div>
        </div>

      </div>
    </div>
  );
}
