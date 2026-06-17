"use client";

export default function VideoShowcase() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "80vh", maxHeight: "600px" }}>
      <video
        src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1781675697/WhatsApp_Video_2026-06-17_at_11.19.56_AM_ghjlk4.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}
