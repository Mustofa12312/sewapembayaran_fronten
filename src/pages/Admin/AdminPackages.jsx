import { useState, useEffect } from 'react';
import { Tag, Plus, Settings2, Edit, Box } from 'lucide-react';
import api from '../../lib/api';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    product_id: '', name: '', description: '', price: '', 
    duration_value: 1, duration_unit: 'MONTH', is_unlimited: false, status: 'ACTIVE' 
  });

  const fetchPackages = async () => {
    try {
      const res = await api.get('/admin/packages');
      setPackages(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/admin/products');
      setProducts(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/admin/packages', formData);
      setIsModalOpen(false);
      fetchPackages();
    } catch (err) {
      alert('Failed to create package');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Packages</h1>
          <p className="text-slate-400">Manage pricing, billing cycle, and features of product packages.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Create Package
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Box className="text-blue-400" /> All Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Package Name</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Price</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Type</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {packages.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-slate-300">{p.product?.name || 'N/A'}</td>
                  <td className="py-4 px-6 font-medium text-white">{p.name}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">Rp {parseInt(p.price).toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-slate-400">{p.is_recurring ? 'Subscription' : 'One-time'}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-slate-400 hover:text-white transition-colors" title="Manage Features"><Settings2 size={18} /></button>
                      <button className="text-slate-400 hover:text-blue-400 transition-colors" title="Edit Price/Name"><Edit size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Box className="text-blue-400" /> New Package</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Product</label>
                  <select 
                    required 
                    value={formData.product_id}
                    onChange={e => setFormData({...formData, product_id: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Product...</option>
                    {products.map(prod => (
                      <option key={prod.id} value={prod.id}>{prod.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Package Name</label>
                  <input 
                    type="text" required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Price (IDR)</label>
                <input 
                  type="number" required min="0"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none font-mono" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Duration Value</label>
                  <input 
                    type="number" min="1"
                    disabled={formData.is_unlimited}
                    value={formData.duration_value}
                    onChange={e => setFormData({...formData, duration_value: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Duration Unit</label>
                  <select 
                    disabled={formData.is_unlimited}
                    value={formData.duration_unit}
                    onChange={e => setFormData({...formData, duration_unit: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none disabled:opacity-50"
                  >
                    <option value="MONTH">Month(s)</option>
                    <option value="YEAR">Year(s)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="unlimited"
                  checked={formData.is_unlimited}
                  onChange={e => setFormData({...formData, is_unlimited: e.target.checked})}
                  className="rounded border-white/10 bg-slate-900 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="unlimited" className="text-sm font-medium text-slate-300">Lifetime / Unlimited Access</label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
