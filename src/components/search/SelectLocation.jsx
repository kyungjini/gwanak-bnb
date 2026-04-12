import React, { useEffect, useRef, useState } from "react";
import SuggestionItem from "./SuggestionItem";
import LOCATION_SUGGESTIONS from "./data/locationSuggestions.json";

function isPrefixMatch(candidate, query) {
  if (!query) {
    return true;
  }

  const normalizedCandidate = candidate.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedCandidate.split(/[\s,/-]+/).filter(Boolean);

  return tokens.some((token) => token.startsWith(normalizedQuery));
}

function SelectLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const suggestionListRef = useRef(null);
  const displayText = query || "Search destinations";
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSuggestions = normalizedQuery
    ? LOCATION_SUGGESTIONS.filter((item) => isPrefixMatch(item, normalizedQuery))
    : LOCATION_SUGGESTIONS;

  useEffect(() => {
    if (filteredSuggestions.length === 0) {
      setHighlightIndex(-1);
      return;
    }

    setHighlightIndex((prev) => {
      if (prev < 0) {
        return -1;
      }
      return prev % filteredSuggestions.length;
    });
  }, [normalizedQuery, filteredSuggestions.length]);

  useEffect(() => {
    if (highlightIndex < 0 || !suggestionListRef.current) {
      return;
    }

    const activeNode = suggestionListRef.current.querySelector(
      `[data-index="${highlightIndex}"]`
    );

    if (activeNode) {
      activeNode.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  const handleKeyDown = (event) => {
    if (filteredSuggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev + 1 + filteredSuggestions.length) % filteredSuggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) => {
        if (prev === -1) {
          return filteredSuggestions.length - 1;
        }

        return (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length;
      });
    }
  };

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
            onKeyDown={handleKeyDown}
            placeholder="Search destinations"
          />
          <ul className="suggestion-list" ref={suggestionListRef}>
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item, index) => (
                <SuggestionItem
                  key={item}
                  index={index}
                  label={item}
                  isActive={index === highlightIndex}
                />
              ))
            ) : (
              <li className="suggestion-item">No destinations found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectLocation;
