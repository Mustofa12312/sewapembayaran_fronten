import { useState, useEffect } from 'react';
import { Key, UploadCloud, Download, Ban } from 'lucide-react';
import api from '../../lib/api';

export default function AdminLicenses() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [importData, setImportData] = useState({ product_id: '', package_id: '', keys_text: '' });

  const fetchLicenses = async () => {
    try {
      const res = await api.get('/admin/licenses');
      setLicenses(res.data.data || res.data);
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

  const fetchPackages = async () => {
    try {
      const res = await api.get('/admin/packages');
      setPackagesList(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLicenses();
    fetchProducts();
    fetchPackages();
  }, []);

  const handleImport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Basic split by newline
      const keys = importData.keys_text.split('\n').map(k => k.trim()).filter(k => k.length > 0);
      if (keys.length === 0) return alert('No valid keys found');
      
      await api.post('/admin/licenses/import', {
        product_id: importData.product_id,
        package_id: importData.package_id,
        keys: keys
      });
      setIsModalOpen(false);
      setImportData({ product_id: '', package_id: '', keys_text: '' });
      fetchLicenses();
    } catch (err) {
      alert('Failed to import licenses');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPackages = packagesList.filter(p => p.product_id == importData.product_id);

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">License Inventory</h1>
          <p className="text-slate-400">Manage and track digital license keys across all products.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors border border-white/10">
            <Download size={18} /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <UploadCloud size={18} /> Bulk Import
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {['Available', 'Assigned', 'Active', 'Expired', 'Disabled'].map(stat => (
          <div key={stat} className="glass-card p-4 rounded-xl text-center border border-white/5">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">{stat}</p>
            <p className="text-2xl font-bold text-white">
              {stat === 'Available' ? licenses.filter(l => l.status === 'AVAILABLE').length : 
               stat === 'Assigned' ? licenses.filter(l => l.status === 'ASSIGNED').length : 
               stat === 'Active' ? licenses.filter(l => l.status === 'ACTIVE').length : 0}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Key className="text-amber-400" /> Keys Registry</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">License Key</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Product & Package</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Assigned Order</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Expiration</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {licenses.map(l => (
                <tr key={l.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono text-white font-bold">{l.key}</td>
                  <td className="py-4 px-6">
                    <p className="text-slate-200">{l.product?.name || 'N/A'}</p>
                    <p className="text-xs text-slate-500">{l.package?.name || 'N/A'}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide border 
                      ${l.status === 'AVAILABLE' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        l.status === 'ASSIGNED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                        l.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-mono text-xs">{l.assigned_order_id || '-'}</td>
                  <td className="py-4 px-6 text-slate-400">{l.expires_at ? new Date(l.expires_at).toLocaleDateString() : '-'}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-500 hover:text-red-400 transition-colors" title="Disable License"><Ban size={18} /></button>
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
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><UploadCloud className="text-emerald-400" /> Import Licenses</h2>
            <form onSubmit={handleImport} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Product</label>
                  <select 
                    required 
                    value={importData.product_id}
                    onChange={e => setImportData({...importData, product_id: e.target.value, package_id: ''})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Product...</option>
                    {products.map(prod => (
                      <option key={prod.id} value={prod.id}>{prod.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Target Package</label>
                  <select 
                    required 
                    disabled={!importData.product_id}
                    value={importData.package_id}
                    onChange={e => setImportData({...importData, package_id: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none disabled:opacity-50"
                  >
                    <option value="">Select Package...</option>
                    {filteredPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1 flex justify-between">
                  <span>License Keys</span>
                  <span className="text-xs text-slate-500">One key per line</span>
                </label>
                <textarea 
                  required
                  rows="6"
                  placeholder="ABCD-1234-EFGH-5678&#10;WXYZ-9876-QWER-4321"
                  value={importData.keys_text}
                  onChange={e => setImportData({...importData, keys_text: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none font-mono text-sm leading-relaxed" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50">
                  {submitting ? 'Importing...' : 'Import Keys'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
