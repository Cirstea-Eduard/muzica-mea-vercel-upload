'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Music, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-[#d62828] opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#1a1a1a] p-6 rounded-full border-2 border-[#d62828]/30">
              <Music className="h-16 w-16 text-[#d62828]" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-4">
          Ups! Piesa nu a fost găsită
        </h1>
        
        <p className="text-xl text-[#f0f0f0]/80 mb-8">
          Se pare că pagina pe care o cauți nu există sau a fost mutată. 
          Poate melodia s-a terminat și e timpul pentru una nouă?
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30">
            <Home className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Acasă</h3>
            <p className="text-[#f0f0f0]/70 text-sm">
              Întoarce-te la pagina principală și descoperă muzica noastră
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30">
            <Music className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Alătură-te Ca Artist</h3>
            <p className="text-[#f0f0f0]/70 text-sm">
              Explorează secțiunea dedicată artiștilor noștri
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30">
            <Search className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Caută</h3>
            <p className="text-[#f0f0f0]/70 text-sm">
              Folosește navigația pentru a găsi ce cauți
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        
          
          <button
            onClick={() => router.back()}
            className="border-2 border-[#d62828] text-[#d62828] hover:bg-[#d62828] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Pagina anterioară
          </button>
          <Link
            href="/"
            className="bg-[#d62828] hover:bg-[#b61e1e] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Înapoi acasă
          </Link>
        </div>

        <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg border border-[#d62828]/30">
          <p className="text-[#f0f0f0]/70 italic">
            &quot;Muzica este un limbaj universal, dar păcatul că nu toți știu adresa.&quot; 
            <span className="text-[#d62828]">- Echipa MuzicaMea</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#f0f0f0]/60 text-sm mb-2">
            Dacă crezi că aceasta este o eroare, nu ezita să ne contactezi:
          </p>
          <a 
            href="mailto:sorin.gomoiu@yahoo.com"
            className="text-[#d62828] hover:text-[#b61e1e] transition-colors"
          >
              sorin.gomoiu@yahoo.com
          </a>
        </div>
      </div>
    </div>
  );
}
