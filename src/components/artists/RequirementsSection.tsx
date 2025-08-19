import { CheckCircle } from 'lucide-react';

const RequirementsSection = () => {
  const requirements = [
    {
      title: "Calitate audio:",
      description: "Piesele trebuie să fie în format MP3/WAV, minimum 240kbps"
    },
    {
      title: "Conținut original:",
      description: "Muzica trebuie să fie compusă și interpretată de tine"
    },
    {
      title: "Limbă:",
      description: "Acceptăm piese în română și engleză"
    },
    {
      title: "Conținut adecvat:",
      description: "Fără limbaj vulgar excesiv sau mesaje de ură"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30 mb-8">
      <h2 className="text-2xl font-bold text-[#d62828] mb-6 flex items-center">
        <CheckCircle className="mr-2 h-6 w-6" />
        Cerințe pentru înregistrare
      </h2>
      
      <div className="space-y-4">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-[#d62828] mt-0.5 flex-shrink-0" />
            <p className="text-[#f0f0f0]/80">
              <strong>{requirement.title}</strong> {requirement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsSection;
