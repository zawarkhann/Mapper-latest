import React,{useState} from 'react';
import { useAppContext } from '../../AppContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();
  const { setAddress } = useAppContext(); // Access setAddress from context
  const [inputValue, setInputValue] = useState(""); // Local state for input field


  const goToHome = () => {
    setAddress(""); // Clear the address from context
    window.location.href = "/"; // Force redirect to "/"
};
  
  // Function to handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setAddress(inputValue); // Update global state with input value
      console.log("Address Set:", inputValue);
      // navigate("/details"); // Navigate to details page
    }
  };
  
  return (
    <nav className="flex justify-between items-center px-6 bg-white shadow-md w-full mt-1 mb-1 sticky">
      {/* Left - Logo */}
      <div className=" sticky text-3xl font-bold text-blue-600 mb-1 cursor-pointer leading-[48px] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
      onClick={goToHome}>
        mapper
      </div>

      {/* Center - Search bar (Shifted slightly to the left) */}
      <div className="relative w-1/3 lg:w-1/4 mb-1 -ml-10 border border-[#C3D4E9] bg-opacity-40 rounded-full">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Address here"
          className="w-full px-4 py-2 pl-10 pr-10 border-none rounded-full bg-gray-100 
               text-sm font-medium leading-[21px] tracking-[-0.02em] font-['Plus_Jakarta_Sans'] 
               text-[#3D5278] focus:outline-none  focus:ring-blue-500"
               value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} // Update local state
      onKeyDown={handleKeyDown} // Call function on Enter key press
        />

        {/* Search Icon */}
        <img
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          src={'/assets/search.png'}
        />

        {/* Filter Icon */}
        <img
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          src={'/assets/filter.png'}
        />
      </div>

      {/* Right - Icons and Avatar */}
      <div className="flex items-center space-x-6 mb-1">
        {/* Favorite Icon */}
        <img
          className="w-9 h-9 text-gray-600 hover:text-blue-500 cursor-pointer"
          src={'/assets/Like.png'}
        />

        {/* Notification Icon */}
        <img
          className="w-9 h-9 text-gray-600 hover:text-blue-500 cursor-pointer"
          src={'/assets/Notification.png'}
        />

        {/* Settings Icon */}
        <a href="https://video-recorder-gdrive.vercel.app/" target="_blank" rel="noopener noreferrer">
  <img
    className="w-4 h-4  text-gray-600 hover:text-blue-500 cursor-pointer"
    src="/images.png"
    alt="Clickable Image"
  />
</a>


        {/* User Avatar */}
        <img
          src="/assets/Profil.png"
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
