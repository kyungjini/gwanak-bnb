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

  const guestTypes = ["adult", "child", "baby"];
  
  return (
    <div>
      {guestTypes.map((type) => (
        <div key={type}>
          <button onClick={() => changeGuest(type, -1)} disabled={guests[type] === 0}>-</button>
          <p>{type}: {guests[type]}</p>
          <button onClick={() => changeGuest(type, 1)}>+</button>
        </div>
      ))}
    </div>
  )
}

export default App
