import React, { useEffect, useMemo, useRef, useState } from "react";
import SuggestionItem from "./SuggestionItem";
import LOCATION_SUGGESTIONS from "./data/locationSuggestions.json";

function isPrefixMatch(candidate, query) {
  if (!query) {
    return true;
  }

  const normalizedCandidate = candidate.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedCandidate.split(/[\s,/-]+/).filter(Boolean);

  return (
    normalizedCandidate.startsWith(normalizedQuery) ||
    tokens.some((token) => token.startsWith(normalizedQuery))
  );
}

function SelectLocation({ selectedLocation = "", onSelectLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const suggestionListRef = useRef(null);
  const displayText = selectedLocation || "Search destinations";
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSuggestions = useMemo(
    () =>
      normalizedQuery
        ? LOCATION_SUGGESTIONS.filter((item) => isPrefixMatch(item, normalizedQuery))
        : LOCATION_SUGGESTIONS,
    [normalizedQuery]
  );

  const commitSelection = (selectedSuggestion) => {
    if (!selectedSuggestion) {
      return;
    }

    setQuery(selectedSuggestion);
    setHighlightIndex(-1);
    setIsOpen(false);
    onSelectLocation(selectedSuggestion);
  };

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
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

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

    if (event.key === "Enter" && highlightIndex >= 0) {
      event.preventDefault();
      commitSelection(filteredSuggestions[highlightIndex]);
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextIsOpen = !prev;
      if (nextIsOpen) {
        setQuery(selectedLocation);
      }

      return nextIsOpen;
    });
  };

  return (
    <div className="location-wrapper">
      <button className="location-pop" onClick={handleToggle} type="button">
        <span className="search-field-title">Where</span>
        <span className="search-field-value">{displayText}</span>
      </button>

      {isOpen && (
        <div className="location-panel">
          <input
            className="location-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(-1);
            }}
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
                  onClick={() => commitSelection(item)}
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
