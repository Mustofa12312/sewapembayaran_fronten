import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      slug: 'vpn-premium',
      name: 'VPN Premium',
      description: 'Military-grade encryption with ultra-fast servers worldwide. Unblock content securely.',
      price: '50000',
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      popular: true,
      features: ['Unlimited Bandwidth', 'No Logs Policy', '5 Devices', '24/7 Support']
    },
    {
      id: 2,
      slug: 'proxy-elite',
      name: 'Proxy Elite',
      description: 'High anonymity proxies for web scraping, gaming, and secure browsing.',
      price: '25000',
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      popular: false,
      features: ['99.9% Uptime', 'Rotating IPs', 'HTTP/SOCKS5', 'Instant Setup']
    },
    {
      id: 3,
      slug: 'rdp-admin',
      name: 'RDP Admin',
      description: 'Full administrator access to high-performance remote desktop servers.',
      price: '150000',
      icon: <Lock className="w-8 h-8 text-emerald-400" />,
      popular: false,
      features: ['Windows Server 2022', '10Gbps Port', 'DDoS Protection', 'Dedicated IP']
    }
  ]);

  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          System Operational
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Secure Your Digital <br className="hidden md:block" />
          <span className="text-gradient">Presence Today.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Premium licenses and digital subscriptions with instant delivery. Enjoy unmatched privacy, speed, and reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#products" className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
            Explore Products <ChevronRight size={20} />
          </a>
          <Link to="/register" className="glass px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all border border-white/10 text-white flex items-center justify-center">
            Create Account
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Top Products</h2>
          <p className="text-slate-400">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="relative group rounded-2xl glass-card p-1 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]">
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg z-10">
                  Most Popular
                </div>
              )}
              
              <div className="bg-slate-900/80 rounded-xl h-full p-8 flex flex-col relative overflow-hidden">
                {/* Glow effect behind icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors"></div>
                
                <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5">
                  {product.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 mb-6 text-sm flex-1">{product.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">Rp {parseInt(product.price).toLocaleString('id-ID')}</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={`/product/${product.slug}`} className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-center font-semibold rounded-lg transition-colors border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-600/10 group-hover:text-blue-400">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full border-t border-white/5 bg-slate-900/30 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-slate-300 mb-8">Trusted by thousands of users worldwide</h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Mock logos text */}
            <div className="text-2xl font-black tracking-tighter">TECH<span className="text-blue-500">CORP</span></div>
            <div className="text-2xl font-black italic">NetSecure</div>
            <div className="text-2xl font-serif">GlobalPrivacy</div>
            <div className="text-2xl font-mono">/dev/null</div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
