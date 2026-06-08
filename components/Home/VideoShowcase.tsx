"use client";

export default function VideoShowcase() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "60vh", maxHeight: "500px" }}>
      <video
        src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1780937493/WhatsApp_Video_2026-06-06_at_2.45.24_PM_ksxcjg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}
