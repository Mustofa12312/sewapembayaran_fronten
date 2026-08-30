export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow border-l-4 border-primary">Revenue<br/><span className="text-2xl font-bold">Rp 12.000.000</span></div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-accent">Orders<br/><span className="text-2xl font-bold">45</span></div>
      </div>
    </div>
  )
}
