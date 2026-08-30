import { useParams, Link } from 'react-router-dom';
import { Shield, Zap, Lock, CheckCircle2, ChevronLeft, CreditCard } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  
  // Mock data mapping
  const packages = [
    { id: 1, name: 'Basic (1 Month)', price: '50000', features: ['1 Device', 'Standard Speed', 'Email Support'], is_recurring: false },
    { id: 2, name: 'Premium (Subscription)', price: '45000', features: ['5 Devices', 'Max Speed', '24/7 Priority Support', 'Auto Renewal'], is_recurring: true },
    { id: 3, name: 'Ultimate (1 Year)', price: '450000', features: ['Unlimited Devices', 'Max Speed', 'Dedicated Account Manager'], is_recurring: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-1" /> Back to Products
      </Link>
      
      <div className="mb-12">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">VPN Premium</h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          Military-grade encryption with ultra-fast servers worldwide. Unblock content securely and browse with complete anonymity.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Select a Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className="relative group rounded-2xl glass-card p-1 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
              <div className="bg-slate-900/90 rounded-xl h-full p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  {pkg.is_recurring && <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">Subscription</span>}
                </div>
                
                <div className="text-4xl font-extrabold mb-6 text-white">
                  Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                  {pkg.is_recurring && <span className="text-lg font-normal text-slate-500">/mo</span>}
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-blue-400 mr-2 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                
                <Link to={`/checkout?package_id=${pkg.id}`} className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                  <CreditCard size={18} /> Purchase Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Product Details</h3>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm">
          <p>
            Our Premium VPN service gives you the freedom to browse the internet securely and without borders. 
            With servers in over 60 countries, you can bypass geo-restrictions, secure your public Wi-Fi connections, 
            and keep your ISP from tracking your online activities.
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>Zero-logs policy audited by independent security firms.</li>
            <li>WireGuard and OpenVPN protocols available.</li>
            <li>Kill switch and DNS leak protection built-in.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
