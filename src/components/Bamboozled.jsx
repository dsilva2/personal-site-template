import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Bamboozled = () => {
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const secretButtonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({
    top: "20px",
    left: "20px",
  });
  const [secretButtonPosition, setSecretButtonPosition] = useState({
    top: "20px",
    left: "100px",
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

  const secretButtonStyle = {
    position: "absolute",
    top: secretButtonPosition.top,
    left: secretButtonPosition.left,
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

    // Move buttons around every second
    const moveButtons = () => {
      const maxX = window.innerWidth - 100; // Account for button width
      const maxY = window.innerHeight - 50; // Account for button height

      // Move first button
      const newX1 = Math.random() * maxX;
      const newY1 = Math.random() * maxY;
      setButtonPosition({ top: `${newY1}px`, left: `${newX1}px` });

      // Move second button
      const newX2 = Math.random() * maxX;
      const newY2 = Math.random() * maxY;
      setSecretButtonPosition({ top: `${newY2}px`, left: `${newX2}px` });
    };

    const buttonInterval = setInterval(moveButtons, 1000);

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
      if (
        cursorPos.x >= buttonRect.left &&
        cursorPos.x <= buttonRect.right &&
        cursorPos.y >= buttonRect.top &&
        cursorPos.y <= buttonRect.bottom
      ) {
        navigate("/");
      }
    }
    if (secretButtonRef.current) {
      const buttonRect = secretButtonRef.current.getBoundingClientRect();
      if (
        cursorPos.x >= buttonRect.left &&
        cursorPos.x <= buttonRect.right &&
        cursorPos.y >= buttonRect.top &&
        cursorPos.y <= buttonRect.bottom
      ) {
        window.location.href = import.meta.env.VITE_SECRET_SITE_URL;
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
      <button ref={secretButtonRef} style={secretButtonStyle}>
        Secret Site
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
        Get bamboozled
      </div>
    </div>
  );
};
