import { Link, useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { slug } = useParams();
  
  const packages = [
    { id: 1, name: 'Basic', price: '100000', features: ['1 Device', 'Basic Support'], is_recurring: false },
    { id: 2, name: 'Premium (Sub)', price: '500000', features: ['5 Devices', 'Priority Support', 'Auto Renewal'], is_recurring: true }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 capitalize">{slug.replace('-', ' ')}</h1>
      <p className="text-slate-500 mb-8">Choose the best plan for you.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-semibold">{pkg.name}</h3>
              {pkg.is_recurring && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Subscription</span>}
            </div>
            <div className="text-4xl font-extrabold mb-6">Rp {parseInt(pkg.price).toLocaleString('id-ID')} {pkg.is_recurring && <span className="text-lg font-normal text-slate-500">/mo</span>}</div>
            <ul className="space-y-3 mb-8 flex-1">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link to={`/checkout?package=${pkg.id}`} className="w-full text-center py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">
              Select Package
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}\n