import { useState, useEffect } from "react"
import Landing from "./Landing"
import Onboarding from "./Onboarding"
import Dashboard from "./Dashboard"
import "./styles.css"

export default function App() {
  const [connected, setConnected] = useState(false)
  const [onboarded, setOnboarded] = useState(
    localStorage.getItem("hubx_onboarded") === "true"
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (window.ethereum?.selectedAddress) {
      setConnected(true)
    }

    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) return <Landing loading />

  if (!connected) return <Landing />

  if (!onboarded) return <Onboarding setOnboarded={setOnboarded} />

  return <Dashboard />
}