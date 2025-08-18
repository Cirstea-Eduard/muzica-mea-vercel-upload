'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const RegistrationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const openModal = searchParams.get('openModal');
    if (openModal === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30 mb-8 text-center">
        <h2 className="text-2xl font-bold text-[#d62828] mb-6 flex items-center justify-center">
          <UserPlus className="mr-2 h-6 w-6" />
          Înregistrează-te acum
        </h2>
        
        <p className="text-[#f0f0f0]/80 mb-6">
          Completează formularul și alătură-te familiei MuzicaMea Radio
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#d62828] hover:bg-[#b61e1e] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Înregistrează-te acum
        </button>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RegistrationButton;
