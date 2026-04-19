import React, { useState } from "react";
import SelectGuest from "./SelectGuest";
import SelectLocation from "./SelectLocation";

function SearchBar() {
  const [destination, setDestination] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchSummary, setSearchSummary] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!destination.trim()) {
      setErrorMessage("Select the destination");
      return;
    }

    if (guestCount < 1) {
      setErrorMessage("Select at least 1 guest");
      return;
    }

    setIsSearching(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destination.trim(),
          guests: guestCount,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Search failed.");
      }

      setResults(payload.results || []);
      setSearchSummary({
        destination: payload.query?.destination || destination.trim(),
        count: payload.count ?? 0,
      });
    } catch (error) {
      setResults([]);
      setSearchSummary(null);
      setErrorMessage(error.message || "Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="searchbar-wrapper">
          <SelectLocation selectedLocation={destination} onSelectLocation={setDestination} />
          <SelectGuest onTotalChange={setGuestCount} />
          <button className="search-submit" type="submit" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {errorMessage ? <p className="search-message error">{errorMessage}</p> : null}

      {searchSummary ? (
        <div className="results-section">
          <div className="results-header">
            <h2>{searchSummary.destination}</h2>
            <span>{searchSummary.count} stays found</span>
          </div>

          {results.length > 0 ? (
            <div className="results-grid">
              {results.map((accommodation) => (
                <article key={accommodation._id || accommodation.id} className="result-card">
                  <div className="result-card-top">
                    <h3>{accommodation.name}</h3>
                    <span>★ {accommodation.rating}</span>
                  </div>
                  <p className="result-location">{accommodation.location}</p>
                  <p className="result-meta">Up to {accommodation.maxGuests} guests</p>
                  <p className="result-price">₩{accommodation.pricePerNight.toLocaleString()} / night</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="search-message">No accommodations found for this search.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
