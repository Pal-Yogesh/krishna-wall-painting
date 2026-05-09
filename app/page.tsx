import HeroBanner from "@/components/Home/HeroBanner";
import AboutSection from "@/components/Home/AboutSection";
import MarketSegments from "@/components/Home/MarketSegments";
import ProductsSection from "@/components/Home/ProductsSection";
import ClientsSection from "@/components/Home/ClientsSection";
import GallerySection from "@/components/Home/GallerySection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <MarketSegments />
      <ProductsSection />
      <ClientsSection />
      <GallerySection />
    </>
  );
}
