import './config/appkit'
import { useAppKitAccount } from '@reown/appkit/react'
import { useBalance } from 'wagmi'
import { dogeosTestnet } from './config/wallet'

export default function App() {
  const { address, isConnected } = useAppKitAccount()

  const { data: balance } = useBalance({
    address: address as `0x${string}` | undefined,
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

      {/* FIXED BUTTON */}
      <appkit-button />

      {isConnected && (
        <div style={card}>
          <span style={label}>Wallet</span>
          <span style={{ fontSize: "12px" }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      )}

      <div style={card}>
        <span style={label}>DOGE Balance</span>
        <span style={amount}>
          {isConnected
            ? `${Number(balance?.formatted || 0).toFixed(4)}`
            : "Connect Wallet"}
        </span>
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
  justifyContent:"space-between"
}

const label = {
  color:"#9ca3af"
}

const amount = {
  color:"#facc15",
  fontWeight:"600"
}