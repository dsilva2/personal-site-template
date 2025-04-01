import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Bamboozled = () => {
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({
    top: "20px",
    left: "20px",
  });

  const buttonStyle = {
    position: "absolute",
    top: buttonPosition.top,
    left: buttonPosition.left,
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    zIndex: 1000,
    cursor: "none",
    transition: "all 0.3s ease-in-out",
  };

  useEffect(() => {
    // Create a custom cursor element
    const cursor = document.createElement("div");
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "black";
    cursor.style.borderRadius = "50%";
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    document.body.appendChild(cursor);

    // Hide the original cursor
    document.body.style.cursor = "none";

    // Handle mouse movement
    const handleMouseMove = (e) => {
      const invertedX = window.innerWidth - e.clientX;
      const invertedY = window.innerHeight - e.clientY;
      cursor.style.left = invertedX + "px";
      cursor.style.top = invertedY + "px";
      setCursorPos({ x: invertedX, y: invertedY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Move button around every 2 seconds
    const moveButton = () => {
      const maxX = window.innerWidth - 100; // Account for button width
      const maxY = window.innerHeight - 50; // Account for button height
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      setButtonPosition({ top: `${newY}px`, left: `${newX}px` });
    };

    const buttonInterval = setInterval(moveButton, 2000);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(cursor);
      document.body.style.cursor = "default";
      clearInterval(buttonInterval);
    };
  }, []);

  const handleClick = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const invertedX = window.innerWidth - cursorPos.x;
      const invertedY = window.innerHeight - cursorPos.y;

      // Check if the displayed cursor (not the actual mouse) is within button bounds
      if (
        cursorPos.x >= buttonRect.left &&
        cursorPos.x <= buttonRect.right &&
        cursorPos.y >= buttonRect.top &&
        cursorPos.y <= buttonRect.bottom
      ) {
        navigate("/");
        // As a fallback
        window.location.href = "/";
      }
    }
  };

  return (
    <div
      style={{ height: "100vh", position: "relative" }}
      onClick={handleClick}
    >
      <button ref={buttonRef} style={buttonStyle}>
        Back
      </button>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2em",
        }}
      >
        Get bamboozled idiot
      </div>
    </div>
  );
};
