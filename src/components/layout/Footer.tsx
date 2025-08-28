import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-[#fff] border-t border-[#d62828]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
         
          <div>
            <h3 className="text-2xl font-semibold text-[#d62828] mb-6">Urmărește-ne</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Youtube className="h-5 w-5 text-[#d62828]" />
                <a 
                  href="https://www.youtube.com/@SorinGomoiu"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg hover:text-[#d62828] transition-colors duration-300"
                >
                  YouTube
                </a>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Facebook className="h-5 w-5 text-[#d62828]" />
                <a 
                  href="https://www.facebook.com/SorinGomoiuMusicProduction" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg hover:text-[#d62828] transition-colors duration-300"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#d62828] mb-6">Link-uri utile</h3>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Acasă
              </Link>
              <Link 
                href="/asculta-live" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Ascultă Live
              </Link>
              <Link 
                href="/contact" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Pagina de contact
              </Link>
              <Link 
                href="/alatura-te-ca-artist" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Alătură-te Ca Artist
              </Link>
              <a 
                href="https://blog.muzicamea.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Blog
              </a>
              <Link 
                href="/despre-noi" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Despre noi
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#d62828] mb-6">Legal</h3>
            <div className="space-y-3">
              <Link 
                href="/termeni-si-conditii" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Termeni și condiții
              </Link>
              <Link 
                href="/politica-de-confidentialitate" 
                className="block text-lg hover:text-[#d62828] transition-colors duration-300"
              >
                Politica de confidențialitate
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#d62828] mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-[#d62828]" />
                <a 
                  href="tel:0752268082" 
                  className="text-lg hover:text-[#d62828] transition-colors duration-300"
                >
                  0752 268 082
                </a>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-[#d62828]" />
                <a 
                  href="mailto:Sorin.gomoiu@yahoo.com"
                  className="text-lg hover:text-[#d62828] transition-colors duration-300"
                >
                    Sorin.gomoiu@yahoo.com
                </a>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <a 
                  href="https://reclamatiisal.anpc.ro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <Image
                    src="/images/footer/footer-image.png"
                    alt="ANPC"
                    width={140}
                    height={50}
                    className="w-auto h-12"
                  />
                </a>
                <a 
                  href="https://consumer-redress.ec.europa.eu/index_en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <Image
                    src="/images/footer/footer-image2.avif"
                    alt="European Consumer Centre"
                    width={140}
                    height={50}
                    className="w-auto h-12"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#d62828] to-[#b61e1e] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white font-medium">
            © {currentYear} MuzicaMea Radio | Toate drepturile rezervate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 