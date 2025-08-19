import Link from "next/link";
import { Check, Music, Star, Zap } from "lucide-react";

const PricePackagesSection = () => {
  const packages = [
    {
      id: "start",
      name: "Start",
      price: 50,
      duration: "7 zile",
      icon: <Music className="h-8 w-8" />,
      features: [
        "10 difuzări garantate în 7 zile",
        "Difuzare standard în playlist",
        "Suport tehnic de bază"
      ],
      buttonText: "Alege Start",
      popular: false,
      size: "small"
    },
    {
      id: "premium",
      name: "Premium", 
      price: 200,
      duration: "30 zile",
      icon: <Zap className="h-8 w-8" />,
      features: [
        "60 difuzări garantate în 30 zile",
        "Fotografie + nume pe site",
        "Promovare pe Facebook și TikTok",
        "Postare dedicată + story",
        "Consultanță artistică"
      ],
      buttonText: "Alege Premium",
      popular: true,
      size: "large"
    },
    {
      id: "plus", 
      name: "Plus",
      price: 100,
      duration: "14 zile",
      icon: <Star className="h-8 w-8" />,
      features: [
        "25 difuzări garantate în 14 zile",
        "Difuzare prioritară în playlist",
        "Fotografie + nume afișate pe site",
        "Secțiunea 'Artiști Recomandați'"
      ],
      buttonText: "Alege Plus",
      popular: false,
      size: "small"
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#d62828] mb-6">
            Pachete de Promovare
          </h2>
          <p className="text-xl text-[#f0f0f0]/80 max-w-3xl mx-auto">
            Alege pachetul perfect pentru a-ți promova muzica și a ajunge la mii de ascultători din România
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl shadow-2xl transition-all duration-300 hover:transform hover:scale-105 flex flex-col w-full max-w-sm lg:max-w-none ${
                pkg.popular ? 'ring-4 ring-[#d62828] ring-opacity-50' : ''
              } ${
                pkg.size === 'large' ? 'lg:w-96 p-6 lg:p-8' : 'lg:w-84 h-auto lg:h-[480px] p-6 lg:p-7'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#d62828] text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Cel mai popular
                  </span>
                </div>
              )}

              <div className="text-center flex-grow flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d62828]/10 rounded-2xl">
                    <div className="text-[#d62828]">
                      {pkg.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className={`font-bold text-gray-900 mb-2 ${pkg.size === 'large' ? 'text-2xl' : 'text-xl'}`}>
                  Pachetul {pkg.name}
                </h3>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className={`font-bold text-[#d62828] ${pkg.size === 'large' ? 'text-4xl' : 'text-3xl'}`}>
                    {pkg.price}
                  </span>
                  <span className="text-lg text-gray-600 ml-2">lei</span>
                </div>
                
                <p className="text-gray-600 mb-6">{pkg.duration}</p>

                <div className="space-y-3 flex-grow">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-[#d62828] rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p className={`text-gray-700 leading-relaxed ${pkg.size === 'large' ? 'text-sm' : 'text-xs'}`}>
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/alatura-te-ca-artist?package=${pkg.price}&openModal=true`}
                className={`w-full block text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 mt-6 ${
                  pkg.popular
                    ? 'bg-[#d62828] text-white hover:bg-[#b61e1e] shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-transparent hover:border-[#d62828]'
                }`}
              >
                {pkg.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#f0f0f0]/70 text-sm">
            Toate pachetele includ suport tehnic și monitorizare în timp real
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricePackagesSection;
