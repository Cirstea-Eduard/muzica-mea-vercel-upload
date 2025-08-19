const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🎵",
      title: "Difuzare Garantată",
      description: "Muzica ta va fi difuzată în programul nostru dacă îndeplinește criteriile de calitate"
    },
    {
      icon: "🚀",
      title: "Promovare Gratuită", 
      description: "Te promovăm pe rețelele noastre sociale și în cadrul emisiunilor speciale"
    },
    {
      icon: "📊",
      title: "Statistici Real-time",
      description: "Primești rapoarte despre difuzarea pieselor tale și feedback de la ascultători"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {benefits.map((benefit, index) => (
        <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 text-center">
          <div className="text-3xl mb-4">{benefit.icon}</div>
          <h3 className="text-lg font-semibold text-[#d62828] mb-2">{benefit.title}</h3>
          <p className="text-[#f0f0f0]/70 text-sm">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BenefitsSection;
