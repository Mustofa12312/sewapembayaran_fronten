import { useState } from 'react';
import { Activity } from 'lucide-react';

export default function AdminAuditLogs() {
  const [logs] = useState([
    { id: 1, action: 'Admin changed package price', entity: 'Package', entity_id: '1', before: 'Rp 45.000', after: 'Rp 50.000', ip: '192.168.1.1', time: '10:45 AM' },
    { id: 2, action: 'Admin created product', entity: 'Product', entity_id: '3', before: '-', after: 'Created', ip: '192.168.1.1', time: '09:30 AM' },
    { id: 3, action: 'Admin imported 500 license keys', entity: 'License', entity_id: 'Batch #23', before: '0 available', after: '500 available', ip: '10.0.0.5', time: 'Yesterday' }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-slate-400">Track all administrative actions across the system.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2"><Activity className="text-blue-400" /> Action Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Action</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Entity</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Before</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">After</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">IP Address</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{log.action}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">{log.entity} #{log.entity_id}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 line-through decoration-red-500/50">{log.before}</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">{log.after}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono text-xs">{log.ip}</td>
                  <td className="py-4 px-6 text-slate-400 text-right text-xs">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
