export default function Dashboard() {
  const tokens = ["HUBX", "SOL", "DOGE", "BTC"]

  return (
    <div className="screen">
      <h2>Balance</h2>
      <h1>₹0.00</h1>

      {tokens.map((t) => (
        <div key={t} className="card">
          <span>${t}</span>
          <span>0.00</span>
        </div>
      ))}
    </div>
  )
}