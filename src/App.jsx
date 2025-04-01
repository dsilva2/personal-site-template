import "./App.css";
import { Home } from "./best/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Bamboozled } from "./components/Bamboozled";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/football" element={<Football />} /> */}
        <Route path="/bamboozled" element={<Bamboozled />} />
      </Routes>
    </Router>
  );
}

export default App;
