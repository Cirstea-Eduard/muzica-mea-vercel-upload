'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, Music, Star, Zap } from 'lucide-react';
import RegistrationForm from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get('package');
  
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackage || '50');

  const packages = [
    {
      value: '50',
      name: 'Start',
      price: 50,
      icon: <Music className="h-6 w-6" />,
      features: ['10 difuzări garantate în 7 zile', 'Difuzare standard în playlist']
    },
    {
      value: '100',
      name: 'Plus',
      price: 100,
      icon: <Star className="h-6 w-6" />,
      features: ['25 difuzări garantate în 14 zile', 'Fotografie + nume pe site']
    },
    {
      value: '200',
      name: 'Premium',
      price: 200,
      icon: <Zap className="h-6 w-6" />,
      features: ['60 difuzări garantate în 30 zile', 'Promovare pe social media']
    }
  ];

  useEffect(() => {
    if (initialPackage) {
      setSelectedPackage(initialPackage);
    }
  }, [initialPackage]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Înregistrare Artist
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selectează pachetul dorit:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.value}
                  onClick={() => setSelectedPackage(pkg.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedPackage === pkg.value
                      ? 'border-[#d62828] bg-[#d62828]/5'
                      : 'border-gray-200 hover:border-[#d62828]/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`${selectedPackage === pkg.value ? 'text-[#d62828]' : 'text-gray-500'}`}>
                      {pkg.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {pkg.name}
                      </h4>
                      <p className="text-[#d62828] font-bold">
                        {pkg.price} lei
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <p key={index} className="text-xs text-gray-600">
                        • {feature}
                      </p>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <RegistrationForm 
            selectedPackage={selectedPackage}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
