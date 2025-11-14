
import React from 'react';

interface PortfolioItemProps {
  imageSrc: string;
  category: string;
  title: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ imageSrc, category, title }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg">
    <img src={imageSrc} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <span className="text-sm font-semibold text-brand-green-400 uppercase tracking-wider">{category}</span>
      <h3 className="text-2xl font-bold mt-1">{title}</h3>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  const projects = [
    {
      imageSrc: 'https://picsum.photos/800/600?random=2',
      category: 'Hôtel de Luxe',
      title: 'Paradise Resort',
    },
    {
      imageSrc: 'https://picsum.photos/800/600?random=3',
      category: 'Aventure',
      title: 'Alpine Adventures',
    },
    {
      imageSrc: 'https://picsum.photos/800/600?random=4',
      category: 'Tourisme Urbain',
      title: 'City Explorer Tours',
    },
    {
      imageSrc: 'https://picsum.photos/800/600?random=5',
      category: 'Bien-être',
      title: 'Serenity Spa & Retreat',
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nos Réalisations</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <PortfolioItem key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
