import "./App.css"

function App() {
  return (
    <div style={{
      background:"#0f0f0f",
      color:"white",
      minHeight:"100vh",
      textAlign:"center",
      padding:"40px"
    }}>
      
      <h1>FastFitHub Wallet</h1>
      <p>Proof-of-Workout Protocol</p>

      <div style={card}>
        HUBX Balance
        <div style={balance}>120 HUBX</div>
      </div>

      <div style={card}>
        DOGE Rewards
        <div style={balance}>0.42 DOGE</div>
      </div>

      <div style={card}>
        BTC Rewards
        <div style={balance}>0.00004 BTC</div>
      </div>

      <button style={button}>Record Workout</button>
      <button style={button}>Leaderboard</button>

    </div>
  )
}

const card = {
  background:"#1e1e1e",
  padding:"20px",
  borderRadius:"12px",
  width:"300px",
  margin:"20px auto"
}

const balance = {
  fontSize:"24px",
  color:"#f0c36d",
  marginTop:"10px"
}

const button = {
  margin:"10px",
  padding:"12px 18px",
  border:"none",
  borderRadius:"8px",
  background:"#f0c36d",
  fontWeight:"bold"
}

export default App