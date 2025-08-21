import { Metadata } from 'next';
import { Heart, Music, Radio, Users, Youtube, Facebook } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Despre noi - MuzicaMea Radio | Povestea noastră muzicală',
  description: 'Descoperă povestea MuzicaMea Radio - platforma dedicată muzicii românești autentice. Pasiunea noastră pentru muzică și comunitatea de artiști.',
  keywords: 'despre muzicamea, poveste radio, muzică românească, platforma muzicală, radio online',
};

export default function DespreNoiPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d62828] rounded-full mb-6">
            <Heart className="h-10 w-10 text-[#f0f0f0]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-6">
            Despre <span className="text-[#d62828]">MuzicaMea</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 max-w-3xl mx-auto">
            O platformă născută din pasiunea pentru muzica românească autentică și dorința de a conecta artiștii cu audiența lor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#d62828] mb-6 text-center lg:text-left">Povestea noastră</h2>
            <div className="space-y-4 text-[#f0f0f0]/80 text-center lg:text-left">
              <p className="text-lg leading-relaxed">
                MuzicaMea Radio s-a născut din dorința de a crea un spațiu dedicat exclusiv 
                muzicii românești de calitate. Platforma noastră reprezintă mai mult decât un simplu post radio.
              </p>
              <p className="text-lg leading-relaxed">
                Suntem o comunitate care celebrează creativitatea, originalitatea și pasiunea 
                pentru muzică. De la piese pop contemporane la folk tradițional, de la hip-hop 
                autentic la rock independent - găsim frumusețea în diversitatea sonoră românească.
              </p>
              <p className="text-lg leading-relaxed">
                Cu peste 10 ani de experiență în industria muzicală, echipa noastră înțelege 
                provocările artiștilor independenți și oferă o platformă unde talentul autentic 
                poate fi descoperit și apreciat.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 text-center">
              <Music className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">500+</h3>
              <p className="text-[#f0f0f0]/70 text-sm">Piese difuzate</p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 text-center">
              <Users className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">100+</h3>
              <p className="text-[#f0f0f0]/70 text-sm">Artiști parteneri</p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 text-center">
              <Radio className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">24/7</h3>
              <p className="text-[#f0f0f0]/70 text-sm">Difuzare live</p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 text-center">
              <Heart className="h-8 w-8 text-[#d62828] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">0</h3>
              <p className="text-[#f0f0f0]/70 text-sm">Reclame</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30 mb-16">
          <h2 className="text-3xl font-bold text-[#d62828] mb-6 text-center">Misiunea noastră</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-[#f0f0f0] mb-3">Promovăm originalitatea</h3>
              <p className="text-[#f0f0f0]/70">
                Căutăm și promovăm muzica originală românească, oferind o alternativă la mainstream-ul comercial.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-[#f0f0f0] mb-3">Sprijinim artiștii</h3>
              <p className="text-[#f0f0f0]/70">
                Oferim o platformă accesibilă pentru artiștii independenți să își facă cunoscute creațiile.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold text-[#f0f0f0] mb-3">Educăm audiența</h3>
              <p className="text-[#f0f0f0]/70">
                Dezvoltăm gustul muzical al ascultătorilor, introducându-i la noi genuri și artiști talentați.
              </p>
            </div>
          </div>
        </div>



        <div className="text-center bg-transparent p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#d62828]">
            Alătură-te comunității noastre muzicale
          </h2>
          <p className="text-white/90 mb-6">
            Fie că ești artist sau iubitor de muzică, te invităm să faci parte din familia MuzicaMea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/alatura-te-ca-artist"
              className="bg-[#d62828] text-[#ffffff] px-6 py-3 rounded-lg font-semibold hover:bg-[#b61e1e] transition-colors text-center"
            >
              Alătură-te Ca Artist
            </a>
            <a 
              href="/contact"
              className="border-2 border-[#d62828] text-[#d62828] px-6 py-3 rounded-lg font-semibold hover:bg-[#d62828] hover:text-[#ffffff] transition-colors text-center"
            >
              Contactează-ne
            </a>
            <a 
              href="https://www.youtube.com/@SorinGomoiu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center"
            >
              <Youtube className="h-5 w-5 mr-2" />
              YouTube
            </a>
            <a 
              href="https://facebook.com/muzicamea"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-transparent hover:border-2 hover:border-blue-600 hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Facebook className="h-5 w-5 mr-2" />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
