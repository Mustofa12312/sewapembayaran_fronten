import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const orders = [
    { id: 'ORD-2026-XYZ123', product: 'VPN Premium', status: 'ACTIVE', token: 'mock-secure-token', date: '2026-08-30' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Link to="/" className="text-primary font-medium hover:underline">Browse Products</Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-slate-500">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-600">Order ID</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Product</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Date</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Status</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{order.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <Link to={`/order/${order.token}`} className="text-primary hover:underline text-sm font-medium">View License</Link>
                        <button className="text-accent hover:underline text-sm font-medium" onClick={() => alert('Renewal requested for ' + order.id)}>Renew</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}\n