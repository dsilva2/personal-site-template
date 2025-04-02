import { useState, useEffect } from "react";

export const Contact = () => {
  const [displayText, setDisplayText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: showModal ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const handleSubmit = () => {
    setShowModal(true);
    // Auto-hide modal after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
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

        <button
          onClick={handleSubmit}
          style={{
            ...buttonStyle,
            backgroundColor: "#4CAF50",
            marginLeft: "10px",
          }}
        >
          Submit
        </button>
      </div>

      {/* Modal */}
      <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: "0 0 10px 0" }}>Oops!</h3>
          <p style={{ margin: "0" }}>
            Not done yet but thanks for entering your email!
          </p>
        </div>
      </div>
    </div>
  );
};
