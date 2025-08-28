'use client';

import { useEffect, useState } from 'react';
import { XCircle, Home, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ArtistCancelPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const timeoutId = setTimeout(() => {
        router.push('/#packages');
      }, 100); 

      return () => clearTimeout(timeoutId);
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-6">
            <XCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-4">
            Plata a fost <span className="text-red-500">anulată</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 mb-6">
            Nu-ți face griji! Poți încerca din nou oricând.
          </p>
        </div>

        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-red-500/30 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Ce s-a întâmplat?
            </h2>
            <p className="text-[#f0f0f0]/70 mb-6 text-lg">
              Procesul de plată a fost întrerupt sau anulat. Înregistrarea ta ca artist nu a fost finalizată.
            </p>

            <div className="bg-[#0D0D0D] p-6 rounded-lg border border-red-500/20 mb-6">
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-4 flex items-center justify-center">
                <CreditCard className="mr-2 h-5 w-5 text-red-400" />
                Ce poți face acum?
              </h3>
              <ul className="text-left text-[#f0f0f0]/80 space-y-2">
                <li>• Verifică datele cardului și încearcă din nou</li>
                <li>• Contactează banca pentru eventuale probleme</li>
                <li>• Încearcă cu o altă metodă de plată</li>
                <li>• Contactează-ne pentru asistență la: 
                  <a href="mailto:sorin.gomoiu@yahoo.com" className="text-[#d62828] hover:underline ml-1">
                      sorin.gomoiu@yahoo.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 mb-6">
              <p className="text-blue-300 mb-2">
                Vei fi redirecționat automat către secțiunea de pachete în:
              </p>
              <div className="text-3xl font-bold text-blue-400">
                {countdown} secunde
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/alatura-te-ca-artist"
                className="inline-flex items-center bg-[#d62828] hover:bg-[#b61e1e] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Încearcă din nou
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105"
              >
                <Home className="h-5 w-5 mr-2" />
                Pagina principală
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30">
          <h3 className="text-xl font-bold text-[#d62828] mb-4 text-center">
            Ai nevoie de ajutor?
          </h3>
          <div className="text-center">
            <p className="text-[#f0f0f0]/70 mb-4">
              Dacă întâmpini probleme persistente cu plata sau ai întrebări despre procesul de înregistrare, nu ezita să ne contactezi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:sorin.gomoiu@yahoo.com"
                className="text-[#d62828] hover:text-[#b61e1e] transition-colors text-lg font-semibold"
              >
                📧 sorin.gomoiu@yahoo.com
              </a>
              <span className="hidden sm:block text-[#f0f0f0]/50">|</span>
              <a 
                href="tel:0752268082"
                className="text-[#d62828] hover:text-[#b61e1e] transition-colors text-lg font-semibold"
              >
                📞 0752 268 082
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#f0f0f0]/60 mb-4">
            Sau explorează din nou pachetele noastre:
          </p>
          <Link
            href="/#packages"
            className="inline-flex items-center text-[#d62828] hover:text-[#b61e1e] transition-colors text-lg font-semibold hover:underline"
          >
            Vezi pachetele disponibile →
          </Link>
        </div>
      </div>
    </div>
  );
}
