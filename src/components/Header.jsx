import { Face } from "./Face";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Header = () => {
  const headerStyle = { marginBottom: "2px", marginTop: "2px" };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Face imageUrl="seriousMe.png" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <h1 style={{ marginBottom: "5px" }}>Drew Silva</h1>
        <h2 style={headerStyle}>MS Student at Stanford University</h2>
        <h3 style={headerStyle}>dsilva24 /at/ stanford.edu</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <a href="https://github.com/dsilva2" aria-label="Github Link">
            <FaGithub
              style={{
                marginRight: "5px",
                fontSize: "xx-large",
                color: "green",
              }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/drew-silva/"
            aria-label="LinkedIn Link"
          >
            <FaLinkedin
              style={{
                marginRight: "5px",
                fontSize: "xx-large",
                color: "#0077B5",
              }}
            />
          </a>
          <a href="https://x.com/drew_silva3" aria-label="Twitter Link">
            <FaTwitter
              style={{
                marginRight: "5px",
                fontSize: "xx-large",
                color: "#26a7de",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
