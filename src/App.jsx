import './App.css'
import React, { useState } from "react";

function App() {
  const [countAdult, setCountAdult] = useState(0)
  const [countChild, setCountChild] = useState(0)
  const [countBaby, setCountBaby] = useState(0)

  return (
    <div>
      <button onClick={() => setCountAdult(countAdult-1)} disabled={countAdult === 0}>
      -
      </button>
      <p>Guest: {countAdult}</p>
      <button onClick={() => setCountAdult(countAdult+1)}>
      +
      </button>
      
      <button onClick={() => setCountAdult(countAdult-1)} disabled={countAdult === 0}>
      -
      </button>
      <p>Guest: {countAdult}</p>
      <button onClick={() => setCountAdult(countAdult+1)}>
      +
      </button>
    </div>
  )
}

export default App
