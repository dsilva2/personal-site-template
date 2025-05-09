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
  const [remainingCountries, setRemainingCountries] = useState([]);
  const [completedCountries, setCompletedCountries] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize with shuffled countries
  useEffect(() => {
    setRemainingCountries(shuffleArray([...countries]));
  }, []);

  // Set current country when remaining countries change
  useEffect(() => {
    if (remainingCountries.length > 0) {
      setCurrentCountry(remainingCountries[currentIndex]);
    }
  }, [remainingCountries, currentIndex]);

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
        // Only reset index if we're at the end of the array
        if (currentIndex >= newRemaining.length) {
          setCurrentIndex(0);
        }
        setUserInput("");
        setMessage("");
        setImageError(false);
      }, 10);
    }
  }, [userInput, currentCountry, remainingCountries, currentIndex]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const navigateFlag = (direction) => {
    if (!currentCountry || remainingCountries.length <= 1) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % remainingCountries.length;
    } else {
      newIndex =
        (currentIndex - 1 + remainingCountries.length) %
        remainingCountries.length;
    }

    setCurrentIndex(newIndex);
    setUserInput("");
    setMessage("");
    setImageError(false);
  };

  if (remainingCountries.length === 0) {
    return (
      <div className="flags-container">
        <h1>Flag Quiz Complete!</h1>
        <div className="score">
          Final Score: {correctCount}/{countries.length} correct
        </div>
      </div>
    );
  }

  if (!currentCountry) {
    return <div className="flags-container">Loading...</div>;
  }

  return (
    <div className="flags-container">
      <h1>Flag Quiz</h1>
      <div className="score">
        Score: {correctCount}/{countries.length} correct
      </div>
      <div className="flag-card">
        {!imageError ? (
          <div className="flag-image-container">
            <img
              src={currentCountry.flag}
              alt={`Flag of ${currentCountry.name}`}
              className="flag-image"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="flag-error">Flag image not available</div>
        )}

        <div className="flag-form">
          <div className="flag-input-container">
            <button className="nav-arrow" onClick={() => navigateFlag("prev")}>
              ←
            </button>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter country name"
              className="flag-input"
              autoFocus
            />
            <button className="nav-arrow" onClick={() => navigateFlag("next")}>
              →
            </button>
          </div>
        </div>
        {/* {message && (
          <div
            className={`message ${
              message === "Correct!" ? "correct" : "incorrect"
            }`}
          >
            {message}
          </div>
        )} */}
      </div>
    </div>
  );
};
