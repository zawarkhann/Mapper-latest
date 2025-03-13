import { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { motion } from "framer-motion"; // Import motion for animation

export default function Homee() {
  console.log("Home");
  const { address, setAddress, imageUrl, data } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exitAnimation, setExitAnimation] = useState(false); // State for animation

  const navigate = useNavigate(); // React Router Navigation

  // Function to validate US address format
  const isValidUSAddress = (address) => {
    if (!address || typeof address !== "string") return false; // Ensure input is a valid string
  
    // Basic checks to determine if the input resembles an address
    const hasStreetNumber = /^\d+\s/.test(address); // Starts with a number (e.g., "24 Center Drive")
    const hasComma = address.includes(","); // Contains at least one comma (e.g., "San Ramon, CA")
    const hasLetters = /[A-Za-z]/.test(address); // Ensures there are letters (to avoid just numbers)
  
    // Address is valid if it meets at least two of the three checks
    return (hasStreetNumber && hasComma) || (hasStreetNumber && hasLetters) || (hasComma && hasLetters);
  };

  // Function to handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      fetchAddress();
    }
  };

  // Fetch Address and Start Loading
  const fetchAddress = () => {
    if (inputValue.trim() === "") return;

    // Validate the US Address format before proceeding
    if (!isValidUSAddress(inputValue)) {
      alert("❌ Please enter a valid American address (e.g., '2227 Magnolia Bridge Dr, San Ramon, CA').");
      setError("Please enter a valid American address.");
      return;
    }

    setLoading(true);
    setError(""); 
    setAddress(inputValue);
    console.log("🚀 Address Set in Context:", inputValue);
  };

  // Handle Loading State
  useEffect(() => {
    if (address) {
      setLoading(true);
    }
    
  }, [address]);

  // Handle Success: Navigate to `/details` Page
  useEffect(() => {
    if (imageUrl) {
      console.log("✅ Success! Image URL:", imageUrl);
      setLoading(false);
      setExitAnimation(true); // Trigger exit animation
console.log(data)
      setTimeout(() => {
        navigate("/details"); // Navigate after animation
      }, 500); // Delay to match animation duration
    }
  }, [imageUrl, navigate]);
  useEffect(() => {
    if (address) {
      setLoading(true);
  
      // Set a timeout to check if imageUrl is not updated within 5 seconds
      const timeout = setTimeout(() => {
        if (!imageUrl) {
          alert("❌ Address not found. Please try again with a different address.");
          setLoading(false);
        }
      }, 5000); // 5 seconds timeout
  
      return () => clearTimeout(timeout); // Cleanup on unmount or before running again
    }
  }, [address, imageUrl]);

  // const verifybutton=()=>{
  //   navigate("/verify");
  // }

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: exitAnimation ? 0 : 1, x: exitAnimation ? -100 : 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-[58px] font-bold text-blue-600 mb-8 cursor-pointer leading-[48px] tracking-[-0.03em] font-['Plus_Jakarta_Sans']">
        mapper
      </h1>
      {/* <div className="relative w-96">
        <input
          type="text"
          placeholder="Enter a Valid American Address"
          className="w-full px-4 py-2 pl-10 pr-10 border-none rounded-full bg-gray-100 
           text-sm font-medium leading-[21px] tracking-[-0.02em] font-['Plus_Jakarta_Sans'] 
           text-[#3D5278] focus:outline-none focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <img
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          src={"/assets/search.png"}
          alt="Search"
        />
        <img
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          src={"/assets/filter.png"}
          onClick={fetchAddress}
          alt="Filter"
        />
      </div> */}
      <div className="flex justify-center items-center w-full">
      <button
        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg transition duration-300 ease-in-out"
        onClick={() => navigate('/verification')}
      >
        Verify Yourself
      </button>
    </div>

      {loading && (
        <div className="mt-4 text-blue-500 text-sm font-semibold">Loading...</div>
      )}

      {error && (
        <div className="mt-4 text-red-500 text-sm font-semibold">{error}</div>
      )}
    </motion.div>
  );
}
