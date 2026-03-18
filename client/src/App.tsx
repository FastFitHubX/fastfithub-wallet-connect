import './config/appkit'
import { useAppKitAccount } from '@reown/appkit/react'
import { useBalance } from 'wagmi'

export default function App() {
  const { address, isConnected } = useAppKitAccount()

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  })

  return (
    <div style={{
      background:"#0b0b0c",
      minHeight:"100vh",
      color:"white",
      padding:"30px",
      textAlign:"center"
    }}>

      <h1>FastFitHub Wallet</h1>

      {/* THIS IS IMPORTANT */}
      <w3m-button />

      {isConnected && (
        <div style={{marginTop:"20px"}}>
          <p>Connected: {address}</p>
          <p>Balance: {balance?.formatted}</p>
        </div>
      )}

    </div>
  )
}