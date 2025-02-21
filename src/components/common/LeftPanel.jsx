import { useState, useEffect, useRef } from "react";
import { Plus, Send } from "lucide-react";
import { useAppContext } from "../../AppContext";

export default function LeftPanel() {
  const { imageUrl, address } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null); 

  // Predefined bot responses
  const botResponses = [
    "I can help you find great places around!",
    "Let me know what you're searching for.",
    "Looking for something specific?",
    "Tell me more about what you're looking for!",
    "I'm here to help. Just ask!",
  ];

  // Add default bot message when component mounts
  useEffect(() => {
    setMessages([
      { text: "To give you the best suggestions, what are your interests?", sender: "bot" },
    ]);
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send message
  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { text: inputMessage, sender: "user" };

    // Clear input
    setInputMessage("");

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botReply = {
        text: botResponses[Math.floor(Math.random() * botResponses.length)], // Random bot response
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000); // 1-second delay for bot reply
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:col-span-6 flex flex-col h-[calc(100vh-64px)]">
      <h2 className="text-lg font-semibold px-4 pt-1">Satellite View</h2>

      {/* Image Section */}
      <div className="relative h-[41vh] overflow-hidden rounded-lg p-4">
        <img
          src={imageUrl || "/assets/image.png"}
          alt="Satellite view"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-sm border border-gray-200 rounded-xl py-3 px-4 max-w-[70%] break-words 
              ${msg.sender === "bot" ? "bg-purple-600 text-white self-start" : "bg-gray-400 text-black self-end ml-auto"}`}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }} // Ensures long words wrap
          >
          
            <p>{msg.text}</p>
          </div>
        ))}
         <div ref={chatEndRef} /> 
      </div>

      {/* Chat Input */}
      <div className="p-4 sticky bottom-0 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Plus size={20} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Ask something..."
              className="bg-transparent flex-1 outline-none text-sm"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="ml-2 text-blue-600">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
