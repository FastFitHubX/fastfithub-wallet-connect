import { useState } from "react"

export default function Onboarding({ setOnboarded }) {
  const [step, setStep] = useState(1)

  const next = () => {
    if (step < 3) setStep(step + 1)
    else {
      localStorage.setItem("hubx_onboarded", "true")
      setOnboarded(true)
    }
  }

  return (
    <div className="screen">
      {step === 1 && (
        <>
          <h1>Welcome to HubX</h1>
          <p>Fitness-powered finance</p>
        </>
      )}

      {step === 2 && (
        <>
          <h1>Earn from workouts</h1>
          <p>Steps • Rewards • HUBX</p>
        </>
      )}

      {step === 3 && (
        <>
          <h1>You’re ready 🚀</h1>
          <p>$HUBX • $SOL • $DOGE • $BTC</p>
        </>
      )}

      <button className="btn" onClick={next}>
        Continue
      </button>
    </div>
  )
}