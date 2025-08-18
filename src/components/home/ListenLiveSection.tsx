import RadioPlayer from "@/components/radio/RadioPlayer";
import Playlist from "@/components/radio/Playlist";

const ListenLiveSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#000] to-[#000]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d62828] mb-4">
            Ascultă Live
          </h2>
          <p className="text-xl text-[#f0f0f0]/80">
            Player-ul nostru radio și playlist-ul cu ultimele piese difuzate
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full max-w-full overflow-hidden">
            <RadioPlayer />
          </div>
          <div className="w-full max-w-full overflow-hidden">
            <Playlist />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ListenLiveSection; 