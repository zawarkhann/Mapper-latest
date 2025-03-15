// import React, { useState } from 'react';
// import { useAppContext } from '../../AppContext';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { setAddress, verified,link, setlink } = useAppContext(); // Access verified from context
//   const [inputValue, setInputValue] = useState(""); // Local state for input field

//   const goToHome = () => {
//     setAddress(""); // Clear the address from context
//     window.location.href = "/"; // Force redirect to "/"
//   };

//   // Function to handle Enter key press
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && inputValue.trim() !== "") {
//       setAddress(inputValue); // Update global state with input value
//       console.log("Address Set:", inputValue);
//       // navigate("/details"); // Navigate to details page if needed
//     }
//   };

//   return (
//     <nav className="flex justify-between items-center px-6 bg-white shadow-md w-full mt-1 mb-1 sticky">
//       {/* Left - Logo */}
//       <div
//         className="sm:text-3xl text-xl font-bold text-blue-600 mb-1 cursor-pointer leading-[48px] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
//         onClick={goToHome}
//       >
//         mapper
//       </div>

//       {/* Center - Search bar */}
//       <div className="relative w-2/3 sm:w-1/3 lg:w-1/4 mb-1 border border-[#C3D4E9] bg-opacity-40 rounded-full">
//         <input
//           type="text"
//           placeholder="Search Address here"
//           className="w-full px-4 py-2 pl-10 pr-10 border-none rounded-full bg-gray-100 text-sm font-medium leading-[21px] tracking-[-0.02em] font-['Plus_Jakarta_Sans'] text-[#3D5278] focus:outline-none focus:ring-blue-500"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <img
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
//           src={'/assets/search.png'}
//           alt="Search"
//         />
//       </div>

//       {/* Right - Icons and Avatar (Hidden on small screens) */}
//       <div className="hidden md:flex items-center space-x-6 mb-1">
//       {verified !== "" && (
//           <img
//             src={verified === "true" ? "/assets/verified.png" : "/assets/unverified.png"}
//             alt={verified === "true" ? "Verified" : "Unverified"}
//             className="w-6 h-6"
//           />
//         )}
//         <img
//           className="w-9 h-9 hover:text-blue-500 cursor-pointer"
//           src={'/assets/Like.png'}
//           alt="Favorites"
//         />
//         <img
//           className="w-9 h-9 hover:text-blue-500 cursor-pointer"
//           src={'/assets/Notification.png'}
//           alt="Notifications"
//         />
//         <img
//           src="/assets/Profil.png"
//           alt="User"
//           className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
//         />
        
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { setAddress, verified, link } = useAppContext(); // Access verified and link from context
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
      // navigate("/details"); // Navigate to details page if needed
    }
  };

  // Function to handle click on verified/unverified icon
  const handleVerificationClick = () => {
    if (verified === "true") {
      // Open the link from context in a new tab if verified
      if (link && link.trim() !== "") {
        window.open(link, "_blank");
      } else {
        toast.info("No verification link available.");
      }
    } else if (verified === "false") {
      // Show error toast if not verified
      toast.error("The Property is not verified from User.");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 bg-white shadow-md w-full mt-1 mb-1 sticky">
      {/* Left - Logo */}
      <div
        className="sm:text-3xl text-xl font-bold text-blue-600 mb-1 cursor-pointer leading-[48px] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
        onClick={goToHome}
      >
        mapper
      </div>

      {/* Center - Search bar */}
      {/* <div className="relative w-2/3 sm:w-1/3 lg:w-1/4 mb-1 border border-[#C3D4E9] bg-transparent rounded-full">
        <input
          type="text"
          placeholder="Search Address here"
          className="w-full px-4 py-2 pl-10 pr-10 border-none rounded-full bg-gray-100 text-sm font-medium leading-[21px] tracking-[-0.02em] font-['Plus_Jakarta_Sans'] text-[#3D5278] focus:outline-none focus:ring-blue-500"
          value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
        <img
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          src={'/assets/search.png'}
          alt="Search"
        />
      </div> */}

      {/* Right - Icons and Avatar (Hidden on small screens) */}
      <div className="flex items-center space-x-6 mb-1">
        {verified !== "" && (
          <img
            src={verified === "true" ? "/assets/verified.png" : "/assets/unverified.png"}
            alt={verified === "true" ? "Verified" : "Unverified"}
            className="w-6 h-6 cursor-pointer"
            onClick={handleVerificationClick}
          />
        )}
        <img
          className="w-9 h-9 hover:text-blue-500 cursor-pointer"
          src={'/assets/Like.png'}
          alt="Favorites"
        />
        <img
          className="w-9 h-9 hover:text-blue-500 cursor-pointer"
          src={'/assets/Notification.png'}
          alt="Notifications"
        />
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
