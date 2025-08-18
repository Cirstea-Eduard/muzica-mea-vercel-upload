import HeroSection from "@/components/home/HeroSection";
import MusicWithUsSection from "@/components/home/MusicWithUsSection";
import PricePackagesSection from "@/components/home/PricePackagesSection";
import WhyMuzicaMeaSection from "@/components/home/WhyMuzicaMeaSection";
import ListenLiveSection from "@/components/home/ListenLiveSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff]">
      <HeroSection />
      <ListenLiveSection />
      <WhyMuzicaMeaSection />
      <MusicWithUsSection />
      <PricePackagesSection />
    </div>
  );
}
