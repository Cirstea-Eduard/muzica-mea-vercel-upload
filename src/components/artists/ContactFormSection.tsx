import { Upload, Mail } from 'lucide-react';

const ContactFormSection = () => {
  const emailItems = [
    "Numele artistului/formației",
    "Scurtă biografie (2-3 paragrafe)",
    "2-3 piese demonstrative (link-uri sau fișiere)",
    "Link-uri social media (opțional)",
    "Fotografia artistului/formației"
  ];

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30">
      <h2 className="text-2xl font-bold text-[#d62828] mb-6 flex items-center">
        <Upload className="mr-2 h-6 w-6" />
        Înregistrează-te acum
      </h2>
      
      <div className="bg-[#0D0D0D] p-6 rounded-lg border border-[#d62828]/20">
        <div className="flex items-center justify-center text-center">
          <div>
            <Mail className="h-12 w-12 text-[#d62828] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">
              Trimite-ne muzica ta
            </h3>
            <p className="text-[#f0f0f0]/70 mb-6">
              Pentru a te înregistra ca artist la MuzicaMea Radio, te rugăm să ne contactezi la:
            </p>
            <a 
              href="mailto:contact@soringomoiu.ro?subject=Înregistrare Artist - MuzicaMea Radio"
              className="inline-flex items-center bg-[#d62828] hover:bg-[#b61e1e] text-[#f0f0f0] px-8 py-4 rounded-lg font-semibold text-lg btn-transition"
            >
              <Mail className="mr-2 h-5 w-5" />
              contact@soringomoiu.ro
            </a>
            
            <div className="mt-8 text-left">
              <h4 className="font-semibold text-[#d62828] mb-3">Include în email:</h4>
              <ul className="space-y-2 text-sm text-[#f0f0f0]/70">
                {emailItems.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
