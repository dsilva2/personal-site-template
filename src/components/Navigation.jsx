import { Link, useLocation } from "react-router-dom";
import "../index.css";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/projects"
          className={`nav-link ${
            location.pathname === "/projects" ? "active" : ""
          }`}
        >
          Projects
        </Link>
      </div>
    </nav>
  );
};
