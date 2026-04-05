import './App.css'
import React, { useState } from "react";

function App() {
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
    baby: 0
  });

  const changeGuest = (type, diff) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + diff),
    }));
  };

  return (
    <div>
      <button onClick={() => changeGuest("adult", -1)} disabled={guests["adult"] === 0}>-</button>
      <p>Adult: {guests["adult"]}</p>
      <button onClick={() => changeGuest("adult", 1)}>+</button>
      
      <button onClick={() => changeGuest("child", -1)} disabled={guests["child"] === 0}>-</button>
      <p>Child: {guests["child"]}</p>
      <button onClick={() => changeGuest("child", 1)}>+</button>

      <button onClick={() => changeGuest("baby", -1)} disabled={guests["baby"] === 0}>-</button>
      <p>Baby: {guests["baby"]}</p>
      <button onClick={() => changeGuest("baby", 1)}>+</button>
    </div>
  )
}

export default App
