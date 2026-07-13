"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Wait for splash loader to finish (5s), then start video from beginning
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.loop = true;
        video.play().catch(() => {});
        setVideoReady(true);
      }
    }, 5200); // slightly after the 5s loader + 0.6s exit animation
    return () => clearTimeout(timer);
  }, []);

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

  // Toggle play/pause + mute on video click
  const handleVideoClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasInteracted) {
      // First click: unmute and mark as interacted
      setHasInteracted(true);
      video.muted = false;
      setIsMuted(false);
      return;
    }

    if (video.paused) {
      video.play().catch(() => {});
      video.muted = false;
      setIsMuted(false);
      setIsPaused(false);
    } else {
      video.pause();
      video.muted = true;
      setIsMuted(true);
      setIsPaused(true);
    }
  }, [hasInteracted]);

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
        src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1783960295/WhatsApp_Video_2026-07-13_at_9.58.39_PM_uzbhha.mp4"
        muted
        loop
        playsInline
        preload="auto"
        onClick={handleVideoClick}
        onEnded={() => {
          const video = videoRef.current;
          if (video) { video.currentTime = 0; video.play().catch(() => {}); }
        }}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* No visible controls — tap video to toggle */}
    </motion.section>
  );
}
  