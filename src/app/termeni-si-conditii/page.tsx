import { Metadata } from 'next';
import { FileText, Scale, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termeni și Condiții - MuzicaMea Radio | Condițiile de utilizare',
  description: 'Termenii și condițiile de utilizare a platformei MuzicaMea Radio. Informații despre drepturile și obligațiile utilizatorilor și artiștilor.',
  keywords: 'termeni și condiții, condiții utilizare, drepturi autor, obligații utilizatori, muzicamea radio',
};

export default function TermeniSiConditiiPage() {
  const lastUpdated = "15 ianuarie 2025";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d62828] rounded-full mb-6">
            <Scale className="h-10 w-10 text-[#f0f0f0]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-4">
            Termeni și <span className="text-[#d62828]">Condiții</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 mb-4">
            Condițiile de utilizare a platformei MuzicaMea Radio
          </p>
          <p className="text-sm text-[#d62828] flex items-center justify-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Actualizat ultima dată: {lastUpdated}
          </p>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg border border-[#d62828]/30 p-8">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              1. Acceptarea Termenilor
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Prin accesarea și utilizarea platformei MuzicaMea Radio (denumită în continuare &quot;Platforma&quot;), 
                confirmați că ați citit, înțeles și acceptat în totalitate prezentii termeni și condiții.
              </p>
              <p>
                Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați Platforma.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              2. Definiții
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>&quot;Platforma&quot;</strong> - site-ul web MuzicaMea Radio și serviciile oferite</li>
                <li><strong>&quot;Utilizator&quot;</strong> - orice persoană care accesează Platforma</li>
                <li><strong>&quot;Artist&quot;</strong> - persoană fizică sau juridică care încarcă conținut muzical</li>
                <li><strong>&quot;Conținut&quot;</strong> - muzică, imagini, texte încărcate pe Platformă</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              3. Utilizarea Platformei
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <h3 className="text-lg font-semibold text-[#f0f0f0]">3.1 Acces liber</h3>
              <p>
                Ascultarea muzicii pe Platformă este gratuită și nu necesită înregistrare.
              </p>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">3.2 Restricții de utilizare</h3>
              <p>Este interzis să:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Descărcați sau redistribuiți conținutul fără autorizare</li>
                <li>Utilizați conținutul în scopuri comerciale fără acordul autorilor</li>
                <li>Perturbați funcționarea Platformei</li>
                <li>Încărcați conținut care încalcă drepturile de autor</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              4. Conținutul Artistului
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <h3 className="text-lg font-semibold text-[#f0f0f0]">4.1 Drepturile de autor</h3>
              <p>
                Artistul garantează că deține toate drepturile asupra conținutului încărcat și că 
                nu încalcă drepturile terților.
              </p>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">4.2 Licența de difuzare</h3>
              <p>
                Prin încărcarea conținutului, Artistul acordă MuzicaMea Radio licența non-exclusivă 
                de difuzare pe Platformă pentru perioada stabilită în pachetul ales.
              </p>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">4.3 Moderarea conținutului</h3>
              <p>
                MuzicaMea Radio își rezervă dreptul de a modera și, dacă este necesar, de a elimina 
                conținutul care nu respectă standardele Platformei.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              5. Plăți și Rambursări
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <h3 className="text-lg font-semibold text-[#f0f0f0]">5.1 Pachete promoționale</h3>
              <p>
                Plățile pentru pachetele promoționale se efectuează prin Stripe și sunt procesate securizat.
              </p>
              
              <h3 className="text-lg font-semibold text-[#f0f0f0]">5.2 Politica de rambursare</h3>
              <p>
                Rambursările sunt disponibile în primele 48 de ore de la efectuarea plății, 
                înainte de începerea difuzării conținutului.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              6. Limitarea Responsabilității
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                MuzicaMea Radio nu își asumă responsabilitatea pentru:
              </p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Conținutul încărcat de artiști</li>
                <li>Întreruperile temporare ale serviciului</li>
                <li>Daunele indirecte rezultate din utilizarea Platformei</li>
                <li>Încălcarea drepturilor de autor de către utilizatori</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              7. Modificarea Termenilor
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                MuzicaMea Radio își rezervă dreptul de a modifica acești termeni în orice moment. 
                Modificările vor fi anunțate pe Platformă și vor intra în vigoare la data specificată.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              8. Legislația Aplicabilă
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Acești termeni sunt guvernați de legislația română. Orice litigiu va fi soluționat 
                de instanțele competente din România.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-4">
              9. Contact
            </h2>
            <div className="space-y-4 text-[#f0f0f0]/80">
              <p>
                Pentru întrebări despre acești termeni, ne puteți contacta la:
              </p>
              <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#d62828]/20">
                <p><strong>Email:</strong> sorin.gomoiu@yahoo.com</p>
                <p><strong>Telefon:</strong> 0752 268 082</p>
              </div>
            </div>
          </section>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/politica-de-confidentialitate"
            className="bg-[#d62828] hover:bg-[#b61e1e] text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Politica de Confidențialitate
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
