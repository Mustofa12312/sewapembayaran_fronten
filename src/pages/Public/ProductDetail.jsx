import { useParams, Link, useNavigate } from 'react-router-dom';
import { Shield, Zap, Lock, CheckCircle2, ChevronLeft, CreditCard, Box, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <HelpCircle className="text-red-400 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-slate-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
        <Button onClick={() => navigate('/')} variant="secondary">Back to Store</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-slate-400 font-medium mb-10">
        <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
          <ChevronLeft size={16} /> Products
        </Link>
        <span className="mx-2 text-slate-600">/</span>
        <span className="text-white">{product.name}</span>
      </nav>
      
      {/* Product Header */}
      <div className="mb-16 max-w-3xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-lg shadow-blue-500/5">
          <Box className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{product.name}</h1>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Pricing/Packages */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-blue-400" size={24} /> Select a Plan
          </h2>
        </div>
        
        {product.packages && product.packages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.packages.map((pkg, idx) => {
              // Highlight the middle package or the first one if less than 3
              const isPopular = product.packages.length >= 3 ? idx === 1 : idx === 0;
              
              return (
                <div 
                  key={pkg.id} 
                  className={`relative rounded-3xl p-[1px] transition-all duration-300 ${
                    isPopular 
                      ? 'bg-gradient-to-b from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/20 hover:-translate-y-2 z-10' 
                      : 'bg-white/10 hover:bg-white/20 hover:-translate-y-1'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`rounded-[23px] h-full p-8 flex flex-col ${isPopular ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-dark-card)]'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      {pkg.is_recurring && (
                        <Badge variant="new" size="sm">Subscription</Badge>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-extrabold text-white">
                          Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mt-2">
                        {pkg.is_recurring ? `Billed every ${pkg.duration_value} ${pkg.duration_unit.toLowerCase()}s` : 'One-time payment'}
                      </p>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">What's included</p>
                      <ul className="space-y-4 mb-8">
                        {pkg.features && pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-300">
                            <CheckCircle2 size={18} className="text-emerald-400 mr-3 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{f.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant={isPopular ? 'primary' : 'secondary'} 
                      size="lg" 
                      className="w-full mt-auto"
                      onClick={() => navigate(`/checkout?package_id=${pkg.id}`)}
                      icon={CreditCard}
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card padding="p-10" className="text-center">
            <p className="text-slate-400">No packages available for this product at the moment.</p>
          </Card>
        )}
      </div>
      
      {/* Product Details Section */}
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <Card padding="p-8 md:p-10">
            <CardHeader>
              <CardTitle className="text-2xl">Product Overview</CardTitle>
            </CardHeader>
            <div className="prose prose-invert prose-blue max-w-none text-slate-300">
              <p className="text-base leading-relaxed mb-6">
                Experience the best digital service with our premium licenses. Carefully curated and instantly delivered to ensure you can start immediately.
              </p>
              <h4 className="text-white font-semibold text-lg mb-3 mt-8">Key Benefits</h4>
              <ul className="space-y-3 mb-6 list-none pl-0">
                <li className="flex items-center gap-3"><Shield className="text-blue-400 w-5 h-5" /> <span>Secure and verified licenses.</span></li>
                <li className="flex items-center gap-3"><Lock className="text-blue-400 w-5 h-5" /> <span>Privacy focused and encrypted transactions.</span></li>
                <li className="flex items-center gap-3"><Zap className="text-blue-400 w-5 h-5" /> <span>Instant automated delivery via email and dashboard.</span></li>
              </ul>
            </div>
          </Card>
        </div>
        
        <div>
          <Card padding="p-6 md:p-8" className="bg-blue-500/5 border-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Have questions about this product or need help choosing the right plan? Our support team is here for you.
            </p>
            <Button variant="outline" className="w-full">Contact Support</Button>
            
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex gap-3">
                <Shield className="text-emerald-400 w-5 h-5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Secure Checkout</h4>
                  <p className="text-xs text-slate-500 mt-1">PCI-DSS Compliant via Midtrans</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
