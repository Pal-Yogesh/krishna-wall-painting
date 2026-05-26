"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Start muted for autoplay (browser requirement), then try to unmute
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to unmute after a short delay (some browsers allow after interaction)
    const tryUnmute = () => {
      video.muted = false;
      setIsMuted(false);
    };

    // Listen for first user interaction to unmute
    const handleInteraction = () => {
      tryUnmute();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <motion.section
      className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dyi6dhgjk/video/upload/q_auto/f_auto/v1779629541/WhatsApp_Video_2026-05-24_at_4.53.28_PM_1_wu4dsc.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-sm font-semibold text-white hover:bg-black/60 transition-all z-10"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Unmute
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            Sound On
          </>
        )}
      </button>
    </motion.section>
  );
}
