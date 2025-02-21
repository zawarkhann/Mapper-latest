import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import animations
import { useAppContext } from "../AppContext";
import LeftPanel from "../components/common/LeftPanel";
import RightPanel from "../components/common/RightPanel";

export default function Details() {
  const { address } = useAppContext();

  useEffect(() => {
    console.log("🔄 Address Updated in Context:", address);
  }, [address]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${address}-${Date.now()}`} // Ensures re-mount and animation
        initial={{ opacity: 0, y: 30 }} // Start slightly below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        exit={{ opacity: 0, y: -30 }} // Fade out and move up
        transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
      >
        <div className="container mx-auto max-w-7xl p-4 h-screen -mt-3">
          <div className="grid lg:grid-cols-10 gap-6 h-full">
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
