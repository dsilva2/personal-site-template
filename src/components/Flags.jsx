import React, { useState, useEffect } from "react";
import "../index.css";
import { countries } from "../data/countries";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const Flags = () => {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [remainingCountries, setRemainingCountries] = useState(
    shuffleArray([...countries])
  );
  const [completedCountries, setCompletedCountries] = useState(new Set());

  useEffect(() => {
    if (remainingCountries.length > 0) {
      setCurrentCountry(remainingCountries[0]);
    }
  }, [remainingCountries]);

  useEffect(() => {
    if (!currentCountry || !userInput) return;

    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedCountry = currentCountry.name.toLowerCase();

    if (normalizedInput === normalizedCountry) {
      setCorrectCount((prev) => prev + 1);
      setMessage("Correct!");
      setCompletedCountries((prev) => new Set([...prev, currentCountry.name]));
      setTimeout(() => {
        const newRemaining = remainingCountries.filter(
          (country) => country.name !== currentCountry.name
        );
        setRemainingCountries(newRemaining);
        setUserInput("");
        setMessage("");
        setImageError(false);
      }, 1000);
    }
  }, [userInput, currentCountry, remainingCountries]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!currentCountry) {
    return (
      <div className="flags-container">
        <h1>Flag Quiz Complete!</h1>
        <div className="score">
          Final Score: {correctCount}/{countries.length} correct
        </div>
      </div>
    );
  }

  return (
    <div className="flags-container">
      <h1>Flag Quiz</h1>
      <div className="score">
        Score: {correctCount}/{countries.length} correct
      </div>
      <div className="flag-card">
        {!imageError ? (
          <img
            src={currentCountry.flag}
            alt={`Flag of ${currentCountry.name}`}
            className="flag-image"
            onError={handleImageError}
          />
        ) : (
          <div className="flag-error">Flag image not available</div>
        )}
        <div className="flag-form">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter country name"
            className="flag-input"
            autoFocus
          />
        </div>
        {message && (
          <div
            className={`message ${
              message === "Correct!" ? "correct" : "incorrect"
            }`}
          >
            {message}
          </div>
        )}
        <div className="flag-navigation">
          <button className="nav-arrow" onClick={() => navigateFlag("prev")}>
            ←
          </button>
          <button className="nav-arrow" onClick={() => navigateFlag("next")}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};
