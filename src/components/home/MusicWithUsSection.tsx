import Image from "next/image";
import Link from "next/link";
import { Mic } from "lucide-react";

const MusicWithUsSection = () => {
  return (
    <section className="relative py-20 px-4 bg-[#000000] my-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl relative overflow-visible py-5" >
          <div className="flex flex-col lg:flex-row min-h-[450px]">
            <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
              Ești artist și vrei să-ți difuzăm piesa?
              </h2>
              
              <div className="space-y-4 lg:space-y-6 text-black text-center">
                <p className="text-base lg:text-lg leading-relaxed">
                  Devino parte din familia <span className="text-[#d62828]">MuzicaMea</span> și beneficiază de experiența noastră 
                  de peste 10 ani în industria muzicală! 
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed">Oferim artiștilor oportunitatea de a-și 
                  promova muzica pe platformele noastre cu acoperire națională, servicii complete 
                  de producție muzicală și suport profesional pentru cariera lor artistică.
                  </p>
                
                <p className="text-sm lg:text-base">
                Ne pasă de muzica românească autentică. Înregistrează-te și fă parte din familia <span className="text-[#d62828]">MuzicaMea</span>!
                </p>
                
                <div className="mt-6 lg:mt-8">
                  <Link 
                    href="/alatura-te-ca-artist"
                    className="bg-[#d62828] hover:bg-[#b61e1e] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold text-base lg:text-lg transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Alătură-te Ca Artist
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative hidden lg:block" >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-105 h-[610px] bg-transparent">
                  <Image
                    src="/images/muzica-mea.png"
                    alt="Artist"
                    fill
                    className="object-cover rounded-2xl  bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicWithUsSection;
