import VideoIntro from "@/components/Home/VideoIntro";
import HeroBanner from "@/components/Home/HeroBanner";
import AboutSection from "@/components/Home/AboutSection";
import MarketSegments from "@/components/Home/MarketSegments";
import ProductsSection from "@/components/Home/ProductsSection";
import ClientsSection from "@/components/Home/ClientsSection";
import GallerySection from "@/components/Home/GallerySection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <VideoIntro />
      {/* <HeroBanner /> */}
      <AboutSection />
      <MarketSegments />
      <ProductsSection />
      <ClientsSection />
      <TestimonialsSection />
      {/* <GallerySection /> */}
    </>
  );
}
