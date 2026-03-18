import { useAccount, useBalance } from 'wagmi'
import { dogeosTestnet } from './config/wallet'

export default function App() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
    chainId: dogeosTestnet.id,
  })

  return (
    <div style={{
      background:"#0b0b0c",
      minHeight:"100vh",
      color:"white",
      fontFamily:"Inter, sans-serif",
      padding:"30px",
      display:"flex",
      flexDirection:"column",
      alignItems:"center"
    }}>

      <h1 style={{fontSize:"26px",marginBottom:"20px"}}>
        FastFitHub Wallet
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <w3m-button />
      </div>

      {isConnected && (
        <div style={card}>
          <span style={label}>Wallet Address</span>
          <span style={{ ...amount, fontSize: "12px", color: "#9ca3af" }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      )}

      <div style={card}>
        <span style={label}>DOGE Balance</span>
        <span style={amount}>
          {isConnected ? `${Number(balance?.formatted || 0).toFixed(4)} DOGE` : "Connect Wallet"}
        </span>
      </div>

      <div style={card}>
        <span style={label}>HUBX Balance</span>
        <span style={amount}>120 HUBX</span>
      </div>

      <div style={card}>
        <span style={label}>BTC Rewards</span>
        <span style={amount}>0.00004 BTC</span>
      </div>

      <div style={{marginTop:"25px",display:"flex",gap:"12px"}}>
        <button style={primary}>Record Workout</button>
        <button style={secondary}>Leaderboard</button>
      </div>

    </div>
  )
}

const card = {
  width:"320px",
  background:"#18181b",
  borderRadius:"12px",
  padding:"18px",
  marginBottom:"14px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
}

const label = {
  color:"#9ca3af",
  fontSize:"14px"
}

const amount = {
  fontSize:"18px",
  fontWeight:"600",
  color:"#facc15"
}

const primary = {
  background:"#facc15",
  color:"#000",
  border:"none",
  padding:"10px 16px",
  borderRadius:"8px",
  fontWeight:"600"
}

const secondary = {
  background:"#27272a",
  color:"#fff",
  border:"none",
  padding:"10px 16px",
  borderRadius:"8px"
}
