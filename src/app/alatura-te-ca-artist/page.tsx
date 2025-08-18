import { Metadata } from 'next';
import { Suspense } from 'react';
import ArtistHeroSection from '@/components/artists/ArtistHeroSection';
import BenefitsSection from '@/components/artists/BenefitsSection';
import RegistrationButton from '@/components/artists/RegistrationButton';
import RequirementsSection from '@/components/artists/RequirementsSection';
import ProcessSection from '@/components/artists/ProcessSection';

export const metadata: Metadata = {
  title: 'Alătură-te Ca Artist - MuzicaMea Radio | Înregistrează-te și difuzează-ți muzica',
  description: 'Ești artist? Alătură-te MuzicaMea Radio și fă-ți muzica auzită. Postul radio care promovează artiștii independenți români.',
  keywords: 'alătură-te ca artist, artiști români, înregistrare artiști, difuzare muzică, radio pentru artiști, muzică independentă',
};

export default function ArtistiPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <ArtistHeroSection />
        
        <BenefitsSection />
        
        <Suspense fallback={<div></div>}>
          <RegistrationButton />
        </Suspense>
        
        <RequirementsSection />
        <ProcessSection />
      </div>
    </div>
  );
} 