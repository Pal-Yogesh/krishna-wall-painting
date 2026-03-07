import ColorCollectionShowcase from "@/components/Home/ColorCollectionShowcase";
import EnquiryLeadForm from "@/components/Home/EnquiryLeadForm";
import HeroBanner from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import InspirationGallery from "@/components/Home/InspirationGallery";
import LiveVisualizerPreview from "@/components/Home/LiveVisualizerPreview";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
   <>
   <HeroBanner />   
   <HowItWorks />
   <LiveVisualizerPreview />
   <ColorCollectionShowcase />
   <InspirationGallery />
   <WhyChooseUs />
   <EnquiryLeadForm />
   </>
  );
}
