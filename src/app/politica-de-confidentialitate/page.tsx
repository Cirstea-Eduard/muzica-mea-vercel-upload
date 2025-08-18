import { Metadata } from 'next';
import { Shield, Eye, Lock, Database, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate - MuzicaMea Radio | Protecția datelor',
  description: 'Politica de confidențialitate a MuzicaMea Radio. Informații despre colectarea, utilizarea și protecția datelor personale conform GDPR.',
  keywords: 'politica confidențialitate, protecția datelor, GDPR, date personale, privacy, muzicamea radio',
};

export default function PoliticaDeConfidentialitatePage() {
  const lastUpdated = "15 ianuarie 2025";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d62828] rounded-full mb-6">
            <Shield className="h-10 w-10 text-[#f0f0f0]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-4">
            Politica de <span className="text-[#d62828]">Confidențialitate</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 mb-4">
            Cum protejăm și gestionăm datele dumneavoastră personale
          </p>
          <p className="text-sm text-[#d62828] flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Actualizat ultima dată: {lastUpdated}
          </p>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg border border-[#d62828]/30 p-8">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              1. Introducere
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                MuzicaMea Radio respectă confidențialitatea utilizatorilor și se angajează să protejeze 
                datele personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) 
                și legislația română aplicabilă.
              </p>
              <p>
                Această politică explică cum colectăm, utilizăm, stocăm și protejăm informațiile dumneavoastră personale.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2" />
              2. Datele Colectate
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <h3 className="text-lg font-semibold text-[#f0f0f0]">2.1 Informații furnizate voluntar</h3>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li><strong>Pentru artiști:</strong> nume, email, număr de telefon, descriere</li>
                <li><strong>Formularul de contact:</strong> nume, email, subiect, mesaj</li>
                <li><strong>Fișiere:</strong> muzică și imagini încărcate de artiști</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">2.2 Date colectate automat</h3>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Adresa IP și informații despre dispozitiv</li>
                <li>Timpul petrecut pe site și paginile vizitate</li>
                <li>Cookie-uri tehnice pentru funcționarea site-ului</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              3. Scopul Prelucrării
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>Datele personale sunt prelucrate pentru:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Furnizarea serviciilor radio online</li>
                <li>Procesarea înregistrărilor de artiști</li>
                <li>Comunicarea cu utilizatorii</li>
                <li>Îmbunătățirea serviciilor oferite</li>
                <li>Respectarea obligațiilor legale</li>
                <li>Procesarea plăților prin intermediul Stripe</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              4. Temeiurile Legale
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>Prelucrăm datele pe baza:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li><strong>Consimțământul:</strong> pentru comunicări și newsletter</li>
                <li><strong>Executarea contractului:</strong> pentru serviciile de promovare</li>
                <li><strong>Interesul legitim:</strong> pentru îmbunătățirea serviciilor</li>
                <li><strong>Obligația legală:</strong> pentru conformitatea fiscală</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              5. Partajarea Datelor
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <h3 className="text-lg font-semibold text-[#f0f0f0]">5.1 Furnizorii de servicii</h3>
              <p>Partajăm date cu:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li><strong>Stripe:</strong> pentru procesarea plăților</li>
                <li><strong>SendGrid:</strong> pentru trimiterea email-urilor</li>
                <li><strong>Cloudinary:</strong> pentru stocarea fișierelor media</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">5.2 Protecția prin contracte</h3>
              <p>
                Toți furnizorii de servicii sunt obligați contractual să respecte confidențialitatea 
                și să protejeze datele conform standardelor GDPR.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              6. Securitatea Datelor
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>Implementăm măsuri de securitate pentru protecția datelor:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Criptarea în tranzit prin HTTPS/SSL</li>
                <li>Acces restricționat la datele personale</li>
                <li>Monitorizarea activității și detectarea amenințărilor</li>
                <li>Backup-uri regulate și securizate</li>
                <li>Politici stricte de control al accesului</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              7. Perioada de Păstrare
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Date de contact:</strong> până la retragerea consimțământului</li>
                <li><strong>Fișiere muzicale:</strong> conform pachetului ales (7-30 zile)</li>
                <li><strong>Date de plată:</strong> 7 ani pentru conformitatea fiscală</li>
                <li><strong>Date tehnice:</strong> maximum 24 luni</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              8. Drepturile Dumneavoastră
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>Conform GDPR, aveți următoarele drepturi:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                  <h4 className="font-semibold text-[#d62828] mb-2">Dreptul de acces</h4>
                  <p className="text-sm">Să cunoașteți ce date avem despre dumneavoastră</p>
                </div>
                <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                  <h4 className="font-semibold text-[#d62828] mb-2">Dreptul de rectificare</h4>
                  <p className="text-sm">Să corectați informațiile inexacte</p>
                </div>
                <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                  <h4 className="font-semibold text-[#d62828] mb-2">Dreptul la ștergere</h4>
                  <p className="text-sm">Să solicitați eliminarea datelor</p>
                </div>
                <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                  <h4 className="font-semibold text-[#d62828] mb-2">Dreptul la portabilitate</h4>
                  <p className="text-sm">Să primiți datele într-un format utilizabil</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              9. Cookie-uri
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Utilizăm cookie-uri esențiale pentru funcționarea site-ului. Nu utilizăm cookie-uri 
                de tracking sau publicitate fără consimțământul explicit.
              </p>
              <h3 className="text-lg font-semibold text-[#f0f0f0]">Tipuri de cookie-uri:</h3>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li><strong>Tehnice:</strong> pentru funcționarea site-ului</li>
                <li><strong>Sesiune:</strong> pentru menținerea stării utilizatorului</li>
                <li><strong>Preferințe:</strong> pentru salvarea setărilor audio</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              10. Modificări ale Politicii
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Ne rezervăm dreptul de a modifica această politică. Modificările semnificative vor fi 
                comunicate prin email sau notificare pe site cu cel puțin 30 de zile înaintea intrării în vigoare.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              11. Contact și Reclamații
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Pentru exercitarea drepturilor sau întrebări despre această politică:
              </p>
              <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                <p><strong>Email:</strong> contact@soringomoiu.ro</p>
                <p><strong>Telefon:</strong> 0752 268 082</p>
                <p><strong>Autoritatea de supraveghere:</strong> Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/termeni-si-conditii"
            className="bg-[#d62828] hover:bg-[#b61e1e] text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Termeni și Condiții
          </Link>
          <Link
            href="/contact"
            className="border-2 border-[#d62828] text-[#d62828] hover:bg-[#d62828] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Contactează-ne
          </Link>
        </div>
      </div>
    </div>
  );
}
