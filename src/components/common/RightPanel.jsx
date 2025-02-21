


import { useState, useEffect } from "react";


import { useAppContext } from "../../AppContext";
 

 
export default function RightPanel() {

  
  
  const { address, setAddress, imageUrl, data, main, location } = useAppContext();
  
  useEffect(()=>{
console.log("Address changed");
  },[data])
  
  const [firstAddress, setFirstAddress] = useState("");
  const [lastAddress, setLastAddress] = useState("");

  // Function to split the address into two parts
  const formatAddress = (fullAddress) => {
    if (!fullAddress) return { main: "", location: "" }; // Handle empty or undefined addresses

    const parts = fullAddress.split(",");
    if (parts.length < 2) return { main: fullAddress, location: "" }; // If no commas, return whole as main

    const main = parts.slice(0, -2).join(","); // All text before the second last comma
    const location = parts.slice(-2).join(","); // Last two parts

    return { main, location };
  };

  // Effect to update address parts when `data` changes
  useEffect(() => {
    if (!data || !data.fullAddress) {
      setFirstAddress(""); // Reset to prevent errors
      setLastAddress("");
      return;
    }

    const { main, location } = formatAddress(data.fullAddress);
    setFirstAddress(main);
    setLastAddress(location);

    console.log("First Part:", main);
    console.log("Second Part:", location);
  }, [data]); 

  return (
<div className="bg-white shadow-lg rounded-lg overflow-hidden lg:col-span-4 h-[calc(100vh-64px)] flex flex-col">
  

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    
    {/* House Details */}
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold">House Details</h2>
      <div className="relative h-[35vh] rounded-lg ">
        <img
          src={data.imgSrc || "/assets/image.png" }
          alt="House front view"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="mt-3">
        <h2 className="text-xl font-bold">{firstAddress ||"N/A"}</h2>
        <p className="text-xl font-bold">{lastAddress || "N/A"}</p>
        <div className="flex items-center gap-2 my-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 ring-2 ring-blue-100" />
          <span className="font-medium text-sm">Off market</span>
        </div>
        <p className="text-gray-500 text-sm">{data?.bedrooms || "N/A"} beds, {data?.bathrooms || "N/A"} baths, {data?.lotSize || "N/A sqft" }</p>
      </div>
      <div className="grid grid-cols-2 gap-2 py-2">
        <div className="border-r border-gray-400">
          <p className="text-base font-semibold">Zestimate®:</p>
          <p className=" text-xs text-gray-500">${data?.zestimate ? Number(data.zestimate).toLocaleString() : "N/A"}</p>
        </div>
        <div>
          <p className=" text-base font-semibold">Rent Zestimate®:</p>
          <p className="text-xs text-gray-500">${data?.rentZestimate ? Number(data.rentZestimate).toLocaleString() : "N/A"}</p>
        </div>
      </div>
      <div>
              <h3 className="text-base font-semibold flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> House
                Details
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "/assets/Buildings.png",
                    label: "Type",
                    value: data?.propertyType || "None",
                  },
                  {
                    icon: "/assets/Car.png",
                    label: "Parking",
                    value: data?.parkingFeatures || "None",
                  },
                  {
                    icon: "/assets/Fire.png",
                    label: "Heating" ,
                    value: data?.heating || "None",
                  },
                  {
                    icon: "/assets/Wind.png",
                    label: "Cooling",
                    value: data?.cooling || "None",
                  },
                  {
                    icon: "/assets/CalendarDots.png",
                    label: "Year built",
                    value: data?.yearBuilt || "Unknown",
                  },
                  {
  icon: "/assets/HandCoins.png",
  label: "HOA",
  value: data?.hoaFee === "N/A" ? "$0 monthly" : data?.hoaFee || "N/A",
},
                ].map((item, index) => (
                  <div
                    key={index}
                   className={`flex items-center gap-2 ${
  index % 2 === 0 ? "border-r border-gray-400" : "" // Apply border-right only for even indexes
}`}
                  >
                    <div className="p-1.5  rounded-lg">
                      <img src={item.icon}/>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    </div>

    {/* Top 5 House Rental */}
    <div className="bg-white rounded-lg p-4 shadow-md">
      <img src="/assets/top5.png"/>
    </div>

    {/* Recent Houses */}
    <div className="bg-white rounded-lg p-4 shadow-md">
     <img src="/assets/recent.png"/>
    </div>
  </div>

  {/* Sticky Price Section - Now Always Visible */}
  <div className="p-4 bg-[#EEF2FF] text-white flex justify-between items-center sticky bottom-0 z-10 mr-8 ml-4 ">
    <div>
      <h3 className="text-[#3563E9] font-semibold">Home Value</h3>
      <p className="text-xs text-[#90A3BF]">Overall price includes rental discount</p>
    </div>
    <div className="text-2xl font-bold text-[#3563E9]">${data?.zestimate ? Number(data.zestimate).toLocaleString() : "N/A"}
    </div>
  </div>
</div>
  );
}