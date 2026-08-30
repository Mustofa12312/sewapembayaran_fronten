import { useState, useEffect } from 'react';
import { Activity, Search, Filter } from 'lucide-react';
import api from '../../lib/api';

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/admin/audit-logs');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-slate-400">Track and monitor all administrative actions across the system.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2"><Activity className="text-blue-400" /> Activity Log</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search logs..." className="bg-slate-900/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64" />
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 border border-white/10 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Timestamp</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Action</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Entity</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">Changes</th>
                <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider text-xs">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400">No logs found</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-slate-400">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="py-4 px-6 font-medium text-white">{log.action}</td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-mono border border-white/5">{log.entity} #{log.entity_id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-slate-400">
                        {log.before && <span className="line-through text-red-400/70 mr-2">{log.before}</span>}
                        {log.after && <span className="text-emerald-400">{log.after}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{log.ip_address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
