import React, { useEffect, useRef, useState } from 'react';

interface PortfolioItemProps {
  imageSrc: string;
  category: string;
  title: string;
  index: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ imageSrc, category, title, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if(itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    };
  }, []);
  
  return (
    <div 
      ref={itemRef}
      className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img src={imageSrc} alt={title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      
      {/* Darkening overlay on hover to make text pop */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out"></div>

      {/* Text container shifts up and becomes more prominent on hover */}
      <div className="absolute bottom-0 left-0 p-6 text-white w-full transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
        <span className="text-sm font-semibold text-brand-green-400 uppercase tracking-wider">{category}</span>
        <h3 className="text-2xl font-bold mt-1 transition-transform duration-300 ease-in-out group-hover:scale-105 origin-bottom-left">{title}</h3>
      </div>
    </div>
  );
};

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
            <PortfolioItem key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;