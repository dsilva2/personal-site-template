import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Bamboozled = () => {
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const buttonStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    zIndex: 1000,
    cursor: "none",
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

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(cursor);
      document.body.style.cursor = "default";
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
