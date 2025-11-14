
import React, { useEffect, useRef, useState } from 'react';
import { SeoIcon, SocialMediaIcon, ContentIcon, PpcIcon } from './icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if(cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col items-center text-center transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-brand-green-100 text-brand-green-700 rounded-full p-4 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <SeoIcon />,
      title: 'SEO & Référencement',
      description: 'Augmentez votre visibilité sur les moteurs de recherche et attirez des voyageurs qualifiés prêts à réserver.',
    },
    {
      icon: <SocialMediaIcon />,
      title: 'Gestion des Réseaux Sociaux',
      description: 'Créez une communauté engagée autour de votre marque avec des stratégies de contenu captivantes sur les plateformes sociales.',
    },
    {
      icon: <ContentIcon />,
      title: 'Création de Contenu Immersif',
      description: 'Vidéos, photos, articles de blog... Nous produisons du contenu qui fait rêver et inspire le voyage.',
    },
    {
      icon: <PpcIcon />,
      title: 'Campagnes Publicitaires',
      description: 'Ciblez précisément vos futurs clients avec des campagnes PPC (Pay-Per-Click) optimisées pour un retour sur investissement maximal.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nos Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Des stratégies sur mesure pour transformer votre présence en ligne et booster vos réservations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;