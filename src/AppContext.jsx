import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AppContext = createContext();

// Context Provider Component
export function AppProvider({ children }) {
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chat,setchat]=useState([]);
  const [verified,setverified] = useState("");
  const [link, setlink]= useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (!address) return;

      setLoading(true);
      setError(""); 

      try {
        const response = await fetch("https://house-analysis-439e40d8d94b.herokuapp.com/get_google_image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: address }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        console.log("✅ Success! Image URL:", imageUrl);
        setImageUrl(imageUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Please Enter Valid Address");
        setError("Invalid address. Please try again."); // Show user-friendly error
       
      }
    };

    fetchImage();
  }, [address]);



  
  useEffect(()=>{
    const fetchData = async () => {
      if (!address) return; // Prevent API call if address is empty
      try {
        const response = await fetch("https://house-analysis-439e40d8d94b.herokuapp.com/get_zillow_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: address }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // setData(data);


        if (!data) {
          // console.error("No data received");
          return;
        }

        // Extracting required values
        const {
          yearBuilt,
          bedrooms,
          bathrooms,
          rentZestimate,
          zestimate,
          imgSrc,
          streetAddress,
          city,
          state,
          resoFacts,
        } = data;

        const atAGlanceFacts = resoFacts?.atAGlanceFacts || [];

        const extractFact = (label) => {
          const fact = atAGlanceFacts.find((item) => item.factLabel === label);
          return fact ? fact.factValue : "N/A";
        };

        const transformedData = {
          yearBuilt,
          bedrooms,
          bathrooms,
          rentZestimate,
          zestimate,
          imgSrc,
          fullAddress: `${streetAddress}, ${city}, ${state}`,
          hoaFee: extractFact("HOA"),
          lotSize: extractFact("Lot"),
          propertyType: extractFact("Type"),
          heating: extractFact("Heating"),
          cooling: extractFact("Cooling"),
          parkingFeatures: extractFact("Parking"),
        };

        setData(transformedData)
        // const { main, location } = formatAddress(transformedData.fullAddress)
        // console.log(main)
        console.log("Formatted Data:", transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[address]);
    





  return (
    <AppContext.Provider value={{ imageUrl, setAddress, loading, error ,data,chat,setchat,verified,setverified,link, setlink}}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook to Use Context
export function useAppContext() {
  return useContext(AppContext);
}
