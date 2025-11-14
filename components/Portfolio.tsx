
import React from 'react';

interface PortfolioProps {
  setContactMessage: (message: string) => void;
}

const PortfolioItem: React.FC<{ imageSrc: string; title: string; }> = ({ imageSrc, title }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <img src={imageSrc} alt={title} loading="lazy" className="w-full h-full object-cover" />
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ setContactMessage }) => {
  const projects = [
    { imageSrc: 'https://picsum.photos/800/600?random=2' },
    { imageSrc: 'https://picsum.photos/800/600?random=3' },
    { imageSrc: 'https://picsum.photos/800/600?random=4' },
    { imageSrc: 'https://picsum.photos/800/600?random=5' },
  ];

  const handleViewPortfolioClick = () => {
    setContactMessage("Bonjour, je suis intéressé(e) et je souhaiterais voir votre portfolio complet.");
  };

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nos Réalisations</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.
          </p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 filter blur-md brightness-75">
            {projects.map((project, index) => (
              <PortfolioItem key={index} {...project} title={`Portfolio item ${index + 1}`} />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center text-center text-white p-8">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg">Débloquez l'accès à nos réalisations</h3>
            <p className="mb-8 max-w-lg text-lg text-gray-200 drop-shadow-md">
              Laissez-nous vos coordonnées pour découvrir en détail comment nous transformons les marques de nos clients.
            </p>
            <a 
              href="#contact" 
              onClick={handleViewPortfolioClick} 
              className="bg-brand-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-lg"
            >
              Voir notre portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
