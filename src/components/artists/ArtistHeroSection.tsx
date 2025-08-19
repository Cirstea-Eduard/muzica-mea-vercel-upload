import { Music } from 'lucide-react';

const ArtistHeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d62828] rounded-full mb-6">
        <Music className="h-8 w-8 text-[#f0f0f0]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-4">
        Alătură-te familiei <span className="text-[#d62828]">MuzicaMea</span>
      </h1>
      <p className="text-xl text-[#f0f0f0]/80">
        Platforma unde muzica ta authentică găsește audiența care o merită
      </p>
    </div>
  );
};

export default ArtistHeroSection;
