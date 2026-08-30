import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {products.map((product) => (
            <div key={product.id} className="relative group cursor-pointer" onClick={() => window.location.href=`/product/${product.slug}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100 duration-500"></div>
              <div className="relative glass-card rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col hover:bg-blue-500/5">
                <div className="flex-1">
                  <div className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-full h-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.packages && product.packages.length > 0 && product.packages[0].features && product.packages[0].features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Starting from</p>
                    <p className="text-xl font-bold text-white">
                      {product.packages && product.packages.length > 0 
                        ? `Rp ${parseInt(product.packages[0].price).toLocaleString('id-ID')}` 
                        : 'N/A'}
                    </p>
                  </div>
                  <Link to={`/product/${product.slug}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </Link>
                </div>
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
