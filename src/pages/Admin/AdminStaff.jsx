import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminStaff() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Super Admin', email: 'admin@example.com', role: 'super_admin' },
    { id: 2, name: 'Support Staff', email: 'support@example.com', role: 'staff' },
  ]);

  const handleAddStaff = (e) => {
    e.preventDefault();
    alert('Mock: Add new staff logic here.');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
      </div>
      
      <div className="bg-white p-6 rounded shadow border-t-4 border-slate-900 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Staff (Super Admin Only)</h2>
        <form onSubmit={handleAddStaff} className="flex gap-4">
          <input type="text" placeholder="Name" required className="px-4 py-2 border border-slate-300 rounded" />
          <input type="email" placeholder="Email" required className="px-4 py-2 border border-slate-300 rounded" />
          <input type="password" placeholder="Password" required className="px-4 py-2 border border-slate-300 rounded" />
          <select className="px-4 py-2 border border-slate-300 rounded">
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded font-semibold hover:bg-slate-800">Add</button>
        </form>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 font-semibold text-slate-600">Name</th>
              <th className="py-3 px-4 font-semibold text-slate-600">Email</th>
              <th className="py-3 px-4 font-semibold text-slate-600">Role</th>
              <th className="py-3 px-4 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(user => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={\`px-2 py-1 rounded text-xs font-bold \${user.role === 'super_admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}\`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {user.role !== 'super_admin' && <button className="text-red-500 hover:underline text-sm">Remove</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
