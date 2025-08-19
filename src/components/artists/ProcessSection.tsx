const ProcessSection = () => {
  const steps = [
    {
      icon: "📝",
      step: "1.",
      description: "Completezi procesul de înregistrare"
    },
    {
      icon: "🎧",
      step: "2.", 
      description: "Echipa noastră evaluează muzica în 7 zile"
    },
    {
      icon: "📻",
      step: "3.",
      description: "Dacă e acceptată, intră în programul radio"
    }
  ];

  return (
    <div className="mt-12 text-center">
      <h3 className="text-xl font-semibold text-[#d62828] mb-4">
        Cum funcționează procesul?
      </h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        {steps.map((step, index) => (
          <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="text-2xl mb-2">{step.icon}</div>
            <p className="text-[#f0f0f0]/70">
              <strong>{step.step}</strong> {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;
