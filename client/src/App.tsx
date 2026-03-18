import { useAppKitAccount, AppKitButton } from '@reown/appkit/react'
import './config/appkit'

import { useBalance } from 'wagmi'
import { dogeosTestnet } from './config/wallet'

export default function App() {
  const { address, isConnected } = useAppKitAccount()

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

      {/* ✅ FIXED BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <AppKitButton />
      </div>

      {/* ✅ WALLET ADDRESS */}
      {isConnected && (
        <div style={card}>
          <span style={label}>Wallet Address</span>
          <span style={{ ...amount, fontSize: "12px", color: "#9ca3af" }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      )}

      {/* ✅ DOGE BALANCE */}
      <div style={card}>
        <span style={label}>DOGE Balance</span>
        <span style={amount}>
          {isConnected
            ? `${Number(balance?.formatted || 0).toFixed(4)} DOGE`
            : "Connect Wallet"}
        </span>
      </div>

      {/* ✅ HUBX (TEMP DISPLAY) */}
      <div style={card}>
        <span style={label}>HUBX Balance</span>
        <span style={amount}>
          {isConnected ? "120 HUBX" : "Connect Wallet"}
        </span>
      </div>

      {/* ✅ BTC */}
      <div style={card}>
        <span style={label}>BTC Rewards</span>
        <span style={amount}>0.00004 BTC</span>
      </div>

      {/* BUTTONS */}
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