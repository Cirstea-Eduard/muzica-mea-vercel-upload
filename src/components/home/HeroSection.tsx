import Image from "next/image";
import Link from "next/link";
import { Radio, Mic } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen px-7 text-center bg-[#000000] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.png"
          alt="Hero Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
   
        
        <h1 className="text-4xl -mt-20 md:mt-0 md:text-6xl font-bold mb-6 fade-in-up text-[#f0f0f0]" style={{animationDelay: '0.2s'}}>
          Muzică bună, mai aproape de{' '}
          <span className="text-[#d62828]">sufletul tău</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#f0f0f0]/80 mb-8 fade-in-up" style={{animationDelay: '0.4s'}}>
          Postul tău radio cu accent pe originalitatea pieselor, fără reclame și cu o varietate incredibilă de genuri muzicale
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{animationDelay: '0.6s'}}>
          <Link 
            href="/asculta-live"
            className="bg-[#d62828] hover:bg-[#b61e1e] text-[#f0f0f0] px-8 py-4 rounded-lg font-semibold text-lg btn-transition flex items-center cursor-pointer"
          >
            <Radio className="mr-2 h-5 w-5" />
            Ascultă Acum Live
          </Link>
          <Link 
            href="/alatura-te-ca-artist"
            className="border-2 border-[#d62828] text-[#d62828] hover:bg-[#d62828] hover:text-[#f0f0f0] px-8 py-4 rounded-lg font-semibold text-lg btn-transition flex items-center"
          >
            <Mic className="mr-2 h-5 w-5" />
            Alătură-te Ca Artist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 