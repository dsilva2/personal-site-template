import { useState, useEffect } from "react";

export const Contact = () => {
  const [displayText, setDisplayText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const keyboardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    fontFamily: "monospace",
  };

  const rowStyle = {
    display: "flex",
    gap: "10px",
  };

  const keyStyle = {
    width: "45px",
    height: "45px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    cursor: isMobile ? "pointer" : "default",
    userSelect: "none",
    transition: "background-color 0.1s",
  };

  const displayBoxStyle = {
    width: "80%",
    maxWidth: "400px",
    height: "50px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "20px",
    fontSize: "18px",
    fontFamily: "monospace",
    backgroundColor: "white",
    overflow: "auto",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px 5px",
    color: "white",
  };

  const handleKeyInteraction = (key) => {
    setDisplayText((prev) => prev + key);
  };

  return (
    <div style={keyboardStyle}>
      <div style={rowStyle}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"].map(
          (key) => (
            <div
              key={key}
              style={keyStyle}
              onMouseEnter={
                !isMobile ? () => handleKeyInteraction(key) : undefined
              }
              onClick={isMobile ? () => handleKeyInteraction(key) : undefined}
            >
              {key}
            </div>
          )
        )}
      </div>
      <div style={rowStyle}>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <div
            key={key}
            style={keyStyle}
            onMouseEnter={
              !isMobile ? () => handleKeyInteraction(key) : undefined
            }
            onClick={isMobile ? () => handleKeyInteraction(key) : undefined}
          >
            {key}
          </div>
        ))}
      </div>
      <div style={rowStyle}>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", "@"].map((key) => (
          <div
            key={key}
            style={keyStyle}
            onMouseEnter={
              !isMobile ? () => handleKeyInteraction(key) : undefined
            }
            onClick={isMobile ? () => handleKeyInteraction(key) : undefined}
          >
            {key}
          </div>
        ))}
      </div>
      <div style={rowStyle}>
        {["Z", "X", "C", "V", "B", "N", "M", ".", "+"].map((key) => (
          <div
            key={key}
            style={keyStyle}
            onMouseEnter={
              !isMobile ? () => handleKeyInteraction(key) : undefined
            }
            onClick={isMobile ? () => handleKeyInteraction(key) : undefined}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Display Box */}
      <div style={displayBoxStyle}>
        {displayText ||
          (isMobile ? "Tap keys to type..." : "Hover over keys to type...")}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => setDisplayText((prev) => prev.slice(0, -1))}
          style={{
            ...buttonStyle,
            backgroundColor: "#666",
          }}
        >
          Backspace
        </button>

        <button
          onClick={() => setDisplayText("")}
          style={{
            ...buttonStyle,
            backgroundColor: "#ff4444",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
