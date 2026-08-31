import { useNavigate, Link } from 'react-router-dom';
import { Package, RefreshCw, Key, Share2, Wallet, LogOut, ExternalLink, ChevronRight, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import useAuthStore from '../../stores/authStore';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { SkeletonTable, SkeletonCard } from '../../components/ui/Skeleton';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const clearCustomerAuth = useAuthStore((s) => s.clearCustomerAuth);
  const customerUser = useAuthStore((s) => s.customerUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, affiliateRes] = await Promise.all([
          api.get('/customer/orders'),
          api.get('/customer/affiliate')
        ]);
        setOrders(ordersRes.data);
        setAffiliate(affiliateRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          clearCustomerAuth();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, clearCustomerAuth]);

  const handleLogout = async () => {
    try {
      await api.post('/customer/logout');
    } catch(e) {}
    clearCustomerAuth();
    navigate('/login');
  };

  const handleCopyCode = () => {
    if (affiliate?.referral_code) {
      navigator.clipboard.writeText(affiliate.referral_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getStatusVariant = (status) => {
    const s = status?.toUpperCase();
    if (s === 'PAID' || s === 'ACTIVE') return 'active';
    if (s === 'PENDING') return 'pending';
    if (s === 'REFUNDED') return 'refunded';
    if (s === 'EXPIRED') return 'expired';
    if (s === 'FAILED') return 'failed';
    return 'default';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="skeleton h-8 w-64 mb-4" />
            <div className="skeleton h-4 w-96" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <Card>
          <div className="p-6 border-b border-white/5"><div className="skeleton h-6 w-32" /></div>
          <div className="p-6"><SkeletonTable rows={4} /></div>
        </Card>
      </div>
    );
  }

  const activeSubscriptions = orders.filter(o => o.package?.is_recurring && o.status === 'ACTIVE').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back{customerUser?.name ? `, ${customerUser.name}` : '!'}</h1>
          <p className="text-slate-400 text-sm">Manage your licenses, subscriptions, and affiliate earnings.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/">
            <Button variant="outline" size="sm" icon={Package}>Browse Products</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut size={16} className="mr-1.5" /> Sign Out
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Affiliate Card */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-lg shadow-purple-900/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-300 shadow-inner">
                <Share2 size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Affiliate Program</h2>
                <p className="text-xs text-purple-200/70">Earn 10% commission</p>
              </div>
            </div>
            <Link to="/affiliate" className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 p-2 rounded-lg hover:bg-purple-500/20">
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5 flex justify-between items-center mb-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Code</span>
            <button 
              onClick={handleCopyCode}
              className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded transition-colors group/btn"
              title="Copy code"
            >
              <span className="font-mono font-bold text-base text-purple-300">{affiliate?.referral_code || '---'}</span>
              {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-500 group-hover/btn:text-slate-300" />}
            </button>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-slate-400 text-xs mb-1 font-medium">Available Balance</p>
              <p className="text-2xl font-bold text-emerald-400 flex items-baseline gap-1">
                <span className="text-sm font-semibold text-emerald-500/70">Rp</span>
                {parseInt(affiliate?.total_commission || 0).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs mb-1 font-medium">Referrals</p>
              <p className="text-xl font-bold text-white">{affiliate?.total_referrals || 0}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Card className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5 text-slate-400">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Package size={20} />
            </div>
            <span className="font-semibold text-sm uppercase tracking-wider">Total Orders</span>
          </div>
          <div className="text-5xl font-extrabold text-white">{orders.length}</div>
        </Card>
        
        <Card className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5 text-slate-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw size={20} />
            </div>
            <span className="font-semibold text-sm uppercase tracking-wider">Active Subs</span>
          </div>
          <div className="text-5xl font-extrabold text-white">{activeSubscriptions}</div>
        </Card>
      </div>
      
      {/* Orders Table */}
      <Card padding="p-0" className="overflow-hidden border-white/5">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Order History</h2>
        </div>
        
        {orders.length === 0 ? (
          <EmptyState 
            icon={Key}
            title="No orders yet"
            description="You don't have any active licenses or subscriptions."
            actionLabel="Browse Products"
            actionTo="/"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-900/60 border-b border-white/5">
                <tr>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Order ID</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Product</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Date</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Status</th>
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-[11px] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="py-4 px-6">
                      <span className="font-mono text-slate-300 bg-slate-800/50 px-2 py-1 rounded text-xs">{order.order_number || order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{order.product?.name || order.package?.name || 'Unknown'}</p>
                      {order.package?.is_recurring && <p className="text-[11px] text-slate-500 mt-0.5">Subscription</p>}
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-sm">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(order.status)} size="sm" dot>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.package?.is_recurring && order.status === 'ACTIVE' && (
                          <Button variant="ghost" size="xs" onClick={() => alert('Renewal coming soon')} className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10">
                            <RefreshCw size={14} /> Renew
                          </Button>
                        )}
                        <Link to={`/order/${order.secure_token}`}>
                          <Button variant="secondary" size="xs" icon={ExternalLink}>Details</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
