import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import emailjs from "emailjs-com";

export default function Verification() {
  const navigate = useNavigate();
  const { address, setAddress,verified,setverified,link, setlink } = useAppContext();
  const [name, setName] = useState("");
  const [addresslocal, setAddresslocal] = useState("");
  const [email, setEmail] = useState("");
  const [deviceLatitude, setDeviceLatitude] = useState(null);
  const [deviceLongitude, setDeviceLongitude] = useState(null);
  const [addressLatitude, setAddressLatitude] = useState(null);
  const [addressLongitude, setAddressLongitude] = useState(null);
  const [isAddressValid, setIsAddressValid] = useState(null);
  const [isAddressChecked, setIsAddressChecked] = useState(false);
  const [exactocation, setexactlocation] = useState(true);
  const [showReminderButton, setShowReminderButton] = useState(false);
  // videoVerified is not required for enabling submission now
  const [videoVerified, setVideoVerified] = useState(null);

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init("UXDTvLz9oDsQTIb5r");
  }, []);

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
      const response = await axios.post(
        "https://house-analysis-439e40d8d94b.herokuapp.com/get_zillow_data",
        { data: addresslocal }
      );
      if (
        response.status === 200 &&
        response.data.latitude &&
        response.data.longitude
      ) {
        setAddressLatitude(response.data.latitude);
        setAddressLongitude(response.data.longitude);
        setIsAddressValid(true);
        toast.success("Address verified successfully!");
        console.log("Latitude from response:", response.data.latitude);
        console.log("Longitude from response:", response.data.longitude);

        // Now check video verification using the address as "name"
        try {
          const videoResponse = await axios.post(
            "https://latest-mapper-6glhtujw8-zawarkhanns-projects.vercel.app/api/v1/check-video",
            { name: addresslocal }
            
          );
         
          if (videoResponse.data.exists) {
            setlink(videoResponse.data.file.webViewLink);
            console.log("Check Video Response:", videoResponse.data.file.webViewLink);
            setVideoVerified(true);
            setverified("true");
            toast.success("Video verified for this property.");
          } else {
            setVideoVerified(false);
            setverified("false");
            toast.info("Video verification for this property is pending.");
            setShowReminderButton(true);
          }
        } catch (videoError) {
          console.error("Error checking video verification:", videoError);
          setVideoVerified(false);
          toast.error("Error checking video verification.");
          setShowReminderButton(true);
        }
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

  // Form is valid if name is non-empty, address is verified, and email is valid.
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.trim() && isAddressValid && emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please ensure all fields are valid.");
      return;
    }
    if (isWithinDeviation()) {
      setexactlocation(false);
      toast.error(
        "Verification Cannot Proceed. Your Device's Location must match coordinates of Entered Address"
      );
      return;
    }
    // Save address and email for later use
    setAddress(addresslocal);
    sessionStorage.setItem("address", addresslocal);
    sessionStorage.setItem("email", email);

    try {
      // Check video status using the entered address as "name"
      const response = await axios.post(
        "https://latest-mapper-6glhtujw8-zawarkhanns-projects.vercel.app/api/v1/check-video",
        { name: addresslocal }
      );
      if (response.data.exists) {
        sessionStorage.setItem("videoInfo", JSON.stringify(response.data.file));
        toast.success("Video verification found.");
      } else {
        toast.info("Video verification for this property is pending.");
        setShowReminderButton(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error checking video verification.");
    }
    // Proceed to record page regardless of video verification status
    navigate("/details");
  };

  // Function to send reminder email using EmailJS
  const handleSendReminder = () => {
    const templateParams = {
      name: "Agent Zawar",
      time: new Date().toLocaleString(),
      message: `Kindy verify your property through following link asap: \nhttps://video-recording-beta.vercel.app/ \nwith your correct address: \n${addresslocal} `,
      email, // recipient email from form
    };

    emailjs
      .send("service_qciqu5c", "template_0ryiqqb", templateParams)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Reminder email sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send reminder email.");
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-bold text-center">Verification Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name of Client"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email of client"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Address of client"
              value={addresslocal}
              onChange={(e) => {
                setAddresslocal(e.target.value);
                setIsAddressChecked(false);
                setVideoVerified(null); // Reset video status when address changes
              }}
              className={`w-4/5 p-2 border rounded ${
                isAddressChecked && !isAddressValid ? "border-red-500" : ""
              }`}
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

          {/* Display video verification status if address is checked */}
          {isAddressChecked && videoVerified !== null && (
            <div className="text-center">
              {videoVerified ? (
                <p className="text-green-600">
                  <CheckCircle className="inline mr-1" /> Video verified for this property.
                </p>
              ) : (
                <div>
                  <p className="text-red-600">
                    <XCircle className="inline mr-1" /> Video verification pending for this property.
                  </p>
                  <button
                    type="button"
                    onClick={handleSendReminder}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Send Reminder Email
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded ${
              isFormValid()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
        {!exactocation && (
          <div className="text-sm text-red-600 text-center mt-2">
            Your coordinates must match within ±1 deviation to proceed with verification. If they don't, a video recording is required to verify your device location and address.
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
