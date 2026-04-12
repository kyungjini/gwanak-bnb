import React, { useState } from "react";
import SuggestionItem from "./SuggestionItem";

const EXAMPLE_SUGGESTIONS = [
  "Seoul, Korea",
  "Tokyo, Japan",
  "Pittsburgh, US",
  "Budapest, Hungary"
];

function SelectLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [suggestions] = useState(EXAMPLE_SUGGESTIONS);
  const displayText = query || "Search destinations";

  return (
    <div className="location-wrapper">
      <button className="location-pop" onClick={() => setIsOpen((prev) => !prev)} type="button">
        <span className="search-field-title">Where</span>
        <span className="search-field-value">{displayText}</span>
      </button>

      {isOpen && (
        <div className="location-panel">
          <input
            className="location-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations"
          />
          <ul className="suggestion-list">
            {suggestions.map((item, index) => (
              <SuggestionItem key={item} label={item} isActive={index === highlightIndex} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectLocation;
