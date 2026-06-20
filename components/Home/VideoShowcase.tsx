"use client";

export default function VideoShowcase() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "80vh", maxHeight: "600px" }}>
      <video
        src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1781948533/WhatsApp_Video_2026-06-19_at_6.07.58_PM_jj6ezx.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}
