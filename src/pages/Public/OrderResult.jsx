import { useParams } from 'react-router-dom';

export default function OrderResult() {
  const { token } = useParams();
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-slate-600 mb-8">Thank you for your purchase. Here is your license key.</p>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="mb-4 text-sm text-slate-500 font-medium tracking-wide uppercase">Your License Key</div>
        <div className="text-2xl font-mono bg-slate-100 p-4 rounded-xl border border-slate-200 select-all">
          XXXX-XXXX-XXXX-XXXX
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 text-left">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-xs text-slate-500 mb-1">Status</div>
            <div className="font-semibold text-green-600">ACTIVE</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-xs text-slate-500 mb-1">Order Ref</div>
            <div className="font-semibold">{token}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
