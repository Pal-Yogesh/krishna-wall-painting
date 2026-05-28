"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Unmute the video (requires user gesture first time)
  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
  }, []);

  // Mute the video
  const mute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setIsMuted(true);
  }, []);

  // On first user interaction anywhere on page, unmute and track
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      unmute();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [unmute]);

  // IntersectionObserver: sound on when in view, sound off when not
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasInteracted) return;
        if (entry.isIntersecting) {
          unmute();
        } else {
          mute();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasInteracted, unmute, mute]);

  // Page Visibility API: mute when tab is hidden, unmute when visible + in view
  useEffect(() => {
    const handleVisibility = () => {
      if (!hasInteracted) return;
      if (document.hidden) {
        mute();
      } else {
        // Check if video is in view before unmuting
        const section = sectionRef.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
          if (inView) unmute();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [hasInteracted, mute, unmute]);

  return (
    <motion.section
      ref={sectionRef}
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

      {/* Sound indicator */}
      {isMuted && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-sm font-semibold text-white/70 z-10 pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
          {!hasInteracted ? "Tap to enable sound" : "Sound off"}
        </div>
      )}
    </motion.section>
  );
}
  