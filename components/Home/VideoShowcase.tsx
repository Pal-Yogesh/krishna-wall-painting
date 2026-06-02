"use client";

export default function VideoShowcase() {
  return (
    <section className="relative w-full">
      <video
        src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1780423729/WhatsApp_Video_2026-06-02_at_4.36.05_PM_ugqvt8.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
