export default function Landing({ loading }) {
  return (
    <div className="screen">
      <img src="/logo.png" className="logo" />

      <h1>HubX Wallet</h1>
      <p>Powered by FastFitHub</p>

      <button className="btn">
        {loading ? "Opening..." : "Connect Wallet"}
      </button>
    </div>
  )
}