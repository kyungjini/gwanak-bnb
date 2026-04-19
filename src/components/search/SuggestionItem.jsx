import React from "react";

function SuggestionItem({ label, index, isActive = false, onClick }) {
  return (
    <li
      className={`suggestion-item ${isActive ? "active" : ""}`}
      data-index={index}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {label}
    </li>
  );
}

export default SuggestionItem;
