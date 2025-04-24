import "./App.css";
import { Home } from "./best/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bamboozled } from "./components/Bamboozled";
import { Contact } from "./components/Contact";
import { Navigation } from "./components/Navigation";
import { Projects } from "./pages/Projects";
import { Flags } from "./components/Flags";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/flags" element={<Flags />} />
        <Route path="/bamboozled" element={<Bamboozled />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
