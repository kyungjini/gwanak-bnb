import React from "react";

function SuggestionItem({ label, index, isActive = false }) {
  return (
    <li className={`suggestion-item ${isActive ? "active" : ""}`} data-index={index}>
      {label}
    </li>
  );
}

export default SuggestionItem;
