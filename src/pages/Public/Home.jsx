import { Link } from 'react-router-dom';

export default function Home() {
  // Mock data for MVP
  const products = [
    { id: 1, name: 'VPN Premium', slug: 'vpn-premium', description: 'Secure and fast VPN service.' }
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Premium Digital Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
            <h2 className="text-2xl font-bold mb-2">{p.name}</h2>
            <p className="text-slate-600 mb-6">{p.description}</p>
            <Link to={`/product/${p.slug}`} className="block text-center w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              View Packages
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}\n