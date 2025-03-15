import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

export default function Verification() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [addresslocal, setAddresslocal] = useState("");
  const [email, setEmail] = useState("");
  const [deviceLatitude, setDeviceLatitude] = useState(null);
  const [deviceLongitude, setDeviceLongitude] = useState(null);
  const [addressLatitude, setAddressLatitude] = useState(null);
  const [addressLongitude, setAddressLongitude] = useState(null);
  const [isAddressValid, setIsAddressValid] = useState(null);
  const [isAddressChecked, setIsAddressChecked] = useState(false);
  const [exactocation,setexactlocation] = useState(true);

  const { address, setAddress } = useAppContext();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDeviceLatitude(position.coords.latitude);
        setDeviceLongitude(position.coords.longitude);
        console.log("Device Latitude:", position.coords.latitude);
        console.log("Device Longitude:", position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const validateAddress = async () => {
    try {
      const response = await axios.post("https://house-analysis-439e40d8d94b.herokuapp.com/get_zillow_data", {
        data: addresslocal,
      });
      if (response.status === 200 && response.data.latitude && response.data.longitude) {
        setAddressLatitude(response.data.latitude);
        setAddressLongitude(response.data.longitude);
        setIsAddressValid(true);
        toast.success("Address verified successfully!");
        console.log("Latitude from response:", response.data.latitude);
        console.log("Longitude from response:", response.data.longitude);
      }
    } catch (error) {
      setIsAddressValid(false);
      toast.error("Enter a correct address.");
      console.error("An unexpected error occurred:", error);
    }
    setIsAddressChecked(true);
  };

  const isWithinDeviation = () => {
    return (
      Math.abs(deviceLatitude - addressLatitude) <= 1 &&
      Math.abs(deviceLongitude - addressLongitude) <= 1
    );
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.trim() && isAddressValid && emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isWithinDeviation()) {
      setexactlocation(false);
      toast.error("Verification Cannot Proceed. Your Device's Location must match coordinates of Entered Address");
    } else {
      setAddress(addresslocal);
      navigate("/record");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-bold text-center">Verification Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Address"
              value={addresslocal}
              onChange={(e) => {
                setAddresslocal(e.target.value);
                setIsAddressChecked(false);
              }}
              className={`w-4/5 p-2 border rounded ${isAddressChecked && !isAddressValid ? "border-red-500" : ""}`}
              required
            />
            {isAddressChecked ? (
              isAddressValid ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )
            ) : (
              <button
                type="button"
                onClick={validateAddress}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Verify
              </button>
            )}
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded ${isFormValid() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
        {!exactocation &&
        <div className="text-sm text-red-600 text-center mt-2">
          Your coordinates must match within ±1 deviation to proceed with verification. If they don't, a video recording is required to verify your device location and address.
        </div>
}
        <ToastContainer />
      </div>
    </div>
  );
}
