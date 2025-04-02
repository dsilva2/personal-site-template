import "./App.css";
import { Home } from "./best/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Bamboozled } from "./components/Bamboozled";
import { Contact } from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/football" element={<Football />} /> */}
        <Route path="/bamboozled" element={<Bamboozled />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
