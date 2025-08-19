'use client';

import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';

const PackageNotification = () => {
  const searchParams = useSearchParams();
  const packagePrice = searchParams.get('package');

  if (!packagePrice) return null;

  const getPackageName = (price: string) => {
    switch (price) {
      case '50': return 'Start';
      case '100': return 'Plus';
      case '200': return 'Premium';
      default: return 'Selectat';
    }
  };

  return (
    <div className="bg-[#d62828] text-white p-4 rounded-lg mb-8 border-l-4 border-[#b61e1e]">
      <div className="flex items-center space-x-3">
        <Star className="h-6 w-6" />
        <div>
          <h3 className="font-semibold">
            Pachetul {getPackageName(packagePrice)} selectat ({packagePrice} lei)
          </h3>
          <p className="text-sm opacity-90">
            Te rugăm să menționezi în email că dorești pachetul {getPackageName(packagePrice)} 
            pentru promovarea muzicii tale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageNotification;
