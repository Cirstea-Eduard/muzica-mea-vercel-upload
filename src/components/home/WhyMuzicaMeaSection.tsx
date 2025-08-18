const WhyMuzicaMeaSection = () => {
  return (
    <section className="py-16 px-4 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d62828] mb-4">
            De ce MuzicaMea?
          </h2>
          <p className="text-xl text-[#f0f0f0]/80">
            Redefinim experiența radio cu muzică de calitate și fără întreruperi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] p-6 border border-[#d62828]/30 rounded-lg text-center hover:border-[#d62828] transition-colors duration-300">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-[#d62828] mb-3">Originalitate</h3>
            <p className="text-[#f0f0f0]/70">
              Accent pe piese originale și artiști autentici, nu doar hiturile mainstream
            </p>
          </div>

          <div className="bg-[#0D0D0D] p-6 border border-[#d62828]/30 rounded-lg text-center hover:border-[#d62828] transition-colors duration-300">
            <div className="text-4xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold text-[#d62828] mb-3">Fără Reclame</h3>
            <p className="text-[#f0f0f0]/70">
              Muzică non-stop, fără întreruperi publicitare care să îți strice experiența
            </p>
          </div>

          <div className="bg-[#0D0D0D] p-6 border border-[#d62828]/30 rounded-lg text-center hover:border-[#d62828] transition-colors duration-300">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-[#d62828] mb-3">Varietate</h3>
            <p className="text-[#f0f0f0]/70">
              De la pop și rock la folk și hip-hop românesc - pentru toate gusturile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMuzicaMeaSection; 