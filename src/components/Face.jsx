import { useState } from "react";
import { Link } from "react-router-dom";

export const Face = ({ imageUrl = "me.jpg" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to="/bamboozled" style={{ textDecoration: "none" }}>
      <svg
        width="220"
        height="220"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
      >
        <circle
          cx="110"
          cy="110"
          r="100"
          stroke="lightBlue"
          strokeWidth="5"
          fill="none"
        />
        <clipPath id="circleView">
          <circle cx="110" cy="110" r="90" />
        </clipPath>
        <image
          href={isHovered ? "me.png" : imageUrl}
          width="180"
          height="180"
          x="20"
          y="20"
          clipPath="url(#circleView)"
        />
      </svg>
    </Link>
  );
};
