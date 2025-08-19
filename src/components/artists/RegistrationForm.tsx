'use client';

import { useState } from 'react';
import { Music, Send } from 'lucide-react';

interface RegistrationFormProps {
  selectedPackage: string;
  onClose: () => void;
}

interface FormData {
  artistName: string;
  songTitle: string;
  email: string;
  phone: string;
  description: string;
  linkConnectare: string;
  linkMuzica: string;
  agreements: {
    copyright: boolean;
    noVulgar: boolean;
    noHate: boolean;
    allowBroadcast: boolean;
    noFinancial: boolean;
    noSamples: boolean;
  };
}

const RegistrationForm = ({ selectedPackage, onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    artistName: '',
    songTitle: '',
    email: '',
    phone: '',
    description: '',
    linkConnectare: '',
    linkMuzica: '',
    agreements: {
      copyright: false,
      noVulgar: false,
      noHate: false,
      allowBroadcast: false,
      noFinancial: false,
      noSamples: false,
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const agreements = [
    { key: 'copyright', text: 'Dețin toate drepturile de autor asupra piesei.' },
    { key: 'noVulgar', text: 'Piesa nu conține limbaj obscen, vulgar, expresii licențioase.' },
    { key: 'noHate', text: 'Piesa nu incită la ură, violență, rasism, xenofobie sau discriminare.' },
    { key: 'allowBroadcast', text: 'Sunt de acord să fie difuzată la muzicamea.ro.' },
    { key: 'noFinancial', text: 'Nu am pretenții financiare pentru difuzare.' },
    { key: 'noSamples', text: 'Nu conține sample-uri protejate fără licență.' },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.artistName.trim()) {
      newErrors.artistName = 'Numele artistului este obligatoriu';
    }

    if (!formData.songTitle.trim()) {
      newErrors.songTitle = 'Numele piesei este obligatoriu';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email-ul nu este valid';
    }

    if (formData.phone.trim() && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numărul de telefon nu este valid';
    }

    if (formData.description.trim() && formData.description.trim().length < 10) {
      newErrors.description = 'Descrierea trebuie să aibă cel puțin 10 caractere';
    }

    if ((selectedPackage === '100' || selectedPackage === '200') && formData.linkConnectare.trim()) {
      if (!/^https?:\/\/.+/.test(formData.linkConnectare)) {
        newErrors.linkConnectare = 'Link-ul trebuie să înceapă cu http:// sau https://';
      }
    }

    if ((selectedPackage === '100' || selectedPackage === '200') && formData.linkMuzica.trim()) {
      if (!/^https?:\/\/.+/.test(formData.linkMuzica)) {
        newErrors.linkMuzica = 'Link-ul trebuie să înceapă cu http:// sau https://';
      }
    }

    const allAgreementsChecked = Object.values(formData.agreements).every(agreement => agreement);
    if (!allAgreementsChecked) {
      newErrors.agreements = 'Toate condițiile trebuie să fie acceptate';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleAgreementChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreements: {
        ...prev.agreements,
        [key]: checked
      }
    }));
    setErrors(prev => ({ ...prev, agreements: '' }));
  };

  const toggleAllAgreements = () => {
    const allChecked = Object.values(formData.agreements).every(agreement => agreement);
    const newValue = !allChecked;
    
    setFormData(prev => ({
      ...prev,
      agreements: Object.keys(prev.agreements).reduce((acc, key) => ({
        ...acc,
        [key]: newValue
      }), {} as FormData['agreements'])
    }));
  };

  const getPackageKey = (packageValue: string): string => {
    switch (packageValue) {
      case '50': return 'basic';
      case '100': return 'professional';
      case '200': return 'premium';
      default: return 'basic';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = {
        artistName: formData.artistName,
        songTitle: formData.songTitle,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
        linkConnectare: formData.linkConnectare,
        linkMuzica: formData.linkMuzica,
        package: getPackageKey(selectedPackage),
        hasImage: selectedPackage === '100' || selectedPackage === '200',
      };

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.error || 'Eroare la crearea sesiunii de plată');
      }

    } catch (error) {
      console.error('Submit error:', error);
      alert(error instanceof Error ? error.message : 'A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAgreementsChecked = Object.values(formData.agreements).every(agreement => agreement);
  const isFormValid = formData.artistName.trim() && 
                     formData.songTitle.trim() && 
                     formData.email.trim() &&
                     allAgreementsChecked;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numele artistului *
        </label>
        <input
          type="text"
          value={formData.artistName}
          onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="Introdu numele artistului sau al formației"
        />
        {errors.artistName && (
          <p className="text-red-500 text-sm mt-1">{errors.artistName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numele piesei *
        </label>
        <input
          type="text"
          value={formData.songTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, songTitle: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="Introdu numele piesei"
        />
        {errors.songTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.songTitle}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="email@exemplu.ro"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Telefon (opțional)
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
          placeholder="0712345678"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descriere artist/piesă (opțional)
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
          placeholder="Spune-ne despre artist și piesă... (opțional, minim 10 caractere dacă completezi)"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {(selectedPackage === '100' || selectedPackage === '200') && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
            Link-uri opționale ({selectedPackage === '100' ? 'Plus' : 'Premium'})
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link de conectare (opțional)
              </label>
              <input
                type="url"
                value={formData.linkConnectare}
                onChange={(e) => setFormData(prev => ({ ...prev, linkConnectare: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="https://instagram.com/username_tau"
              />
              {errors.linkConnectare && (
                <p className="text-red-500 text-sm mt-1">{errors.linkConnectare}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Ex: Instagram, Facebook, TikTok, etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link pentru a asculta muzica (opțional)
              </label>
              <input
                type="url"
                value={formData.linkMuzica}
                onChange={(e) => setFormData(prev => ({ ...prev, linkMuzica: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828] focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="https://youtube.com/watch?v=..."
              />
              {errors.linkMuzica && (
                <p className="text-red-500 text-sm mt-1">{errors.linkMuzica}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Ex: YouTube, Spotify, SoundCloud, etc.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Music className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Încărcarea fișierelor:</strong> După finalizarea plății, vei fi redirecționat către o pagină unde poți încărca piesa muzicală
              {(selectedPackage === '100' || selectedPackage === '200') && ' și fotografia artistului'}.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              <strong>Cod promoțional:</strong> Poți introduce codul promoțional direct în pagina de plată Stripe.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Condiții și acorduri *
          </label>
          <button
            type="button"
            onClick={toggleAllAgreements}
            className="text-sm text-[#d62828] hover:text-[#b61e1e] transition-colors"
          >
            {allAgreementsChecked ? 'Debifează toate' : 'Bifează toate'}
          </button>
        </div>
        
        <div className="space-y-3">
          {agreements.map((agreement) => (
            <label key={agreement.key} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreements[agreement.key as keyof FormData['agreements']]}
                onChange={(e) => handleAgreementChange(agreement.key, e.target.checked)}
                className="mt-1 h-4 w-4 text-[#d62828] border-gray-300 rounded focus:ring-[#d62828]"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                {agreement.text}
              </span>
            </label>
          ))}
        </div>
        
        {errors.agreements && (
          <p className="text-red-500 text-sm mt-2">{errors.agreements}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Anulează
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center ${
            isFormValid && !isSubmitting
              ? 'bg-[#d62828] text-white hover:bg-[#b61e1e]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Se procesează...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Continuă cu plata
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
