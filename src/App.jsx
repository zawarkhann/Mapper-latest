import "./App.css";
import { useAppContext } from "./AppContext.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Homee from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details.jsx";

function App() {
  
  return (
   
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/details" element={<Details />} />

      
      </Routes>
    </Router>
  );
}

export default App;
