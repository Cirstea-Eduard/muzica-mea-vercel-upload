import { Headphones } from "lucide-react";

const MusicGenresSection = () => {
  const musicGenres = [
    { icon: "🎵", name: "Pop Românesc", description: "Hiturile momentului și clasicele pop românești" },
    { icon: "🎸", name: "Rock", description: "De la rock clasic la rock alternativ" },
    { icon: "🎻", name: "Folk", description: "Muzică tradițională și folk contemporan" },
    { icon: "🎤", name: "Hip-Hop Românesc", description: "Rap și hip-hop de calitate din România" },
    { icon: "🎺", name: "Jazz", description: "Jazz românesc și internațional" },
    { icon: "🎶", name: "Indie", description: "Artiști independenți și sunet autentic" },
  ];

  return (
    <section className="py-16 px-4 bg-[#f0f0f0]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d62828] mb-4">
            Ce poți asculta la noi
          </h2>
          <p className="text-xl text-[#f0f0f0]/80">
            O selecție diversă de genuri muzicale pentru toate gusturile
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          {musicGenres.map((genre, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer"
            >
              <div className="text-6xl hover:scale-110 transition-transform duration-300">
                {genre.icon}
              </div>
              
              <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-3 whitespace-nowrap">
                  <h3 className="text-lg font-semibold text-[#d62828] text-center">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-[#f0f0f0]/70 text-center max-w-xs">
                    {genre.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-[#0D0D0D] px-6 py-3 rounded-lg border border-[#d62828]/30">
            <Headphones className="mr-2 h-5 w-5 text-[#d62828]" />
            <span className="text-[#f0f0f0]">
              Și multe altele care te așteaptă să le descoperi!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicGenresSection; 