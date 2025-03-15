import "./App.css";
import { useAppContext } from "./AppContext.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Homee from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details.jsx";
import Verification from "./components/common/Verification.jsx";
// import VideoRecord from "./components/common/VideoRecord.jsx";
// import VerificationThankYou from "./components/common/Thanks.jsx";



function App() {
  
  return (
   
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/details" element={<Details />} />
        <Route path="/verification" element={<Verification />} />
        {/* <Route path="/record" element={<VideoRecord />} /> */}
        {/* <Route path="/thanks" element={<VerificationThankYou />} /> */}
       

      
      </Routes>
    </Router>
  );
}

export default App;
