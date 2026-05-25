"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const handleEnded = () => {
    setEnded(true);
  };

  const handleSkip = () => {
    setEnded(true);
  };

  return (
    <AnimatePresence>
      {!ended && (
        <motion.section
          key="video-intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full h-full overflow-hidden bg-white  flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dyi6dhgjk/video/upload/q_auto/f_auto/v1779629541/WhatsApp_Video_2026-05-24_at_4.53.28_PM_1_wu4dsc.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="w-full h-full object-cover"
          />

          {/* Skip button */}
          {/* <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/10 backdrop-blur-sm border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-black/20 hover:text-stone-800 transition-all"
          >
            Skip
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button> */}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
