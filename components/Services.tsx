
import React, { useEffect, useRef, useState } from 'react';
import { SocialMediaIcon, ContentIcon, DesignIcon, WebsiteSeoIcon, StrategyIcon, InfluencerIcon, DashboardIcon, VipBadgeIcon } from './icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index, isVisible }) => {
  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border border-gray-100 flex flex-col items-center text-center transform transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className={`bg-brand-green-100 text-brand-green-700 rounded-full p-4 mb-6 transition-all duration-300 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
        }`}
        style={{ transitionDelay: `${index * 100 + 200}ms` }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHeaderVisible(true);
        headerObserver.disconnect();
      }
    }, { threshold: 0.1 });

    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) headerObserver.observe(currentHeaderRef);

    const gridObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setGridVisible(true);
        gridObserver.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "-100px" });

    const currentGridRef = gridRef.current;
    if (currentGridRef) gridObserver.observe(currentGridRef);
    
    return () => { 
      if(currentHeaderRef) headerObserver.unobserve(currentHeaderRef);
      if(currentGridRef) gridObserver.unobserve(currentGridRef);
    };
  }, []);
  
  const services = [
    {
      icon: <ContentIcon />,
      title: 'Réel Pro',
      description: 'Création de vidéos type Reels, TikTok et Shorts pour dynamiser votre présence en ligne et captiver votre audience.',
    },
    {
      icon: <DesignIcon />,
      title: 'Design Graphique',
      description: 'Conception de visuels percutants : posters, flyers, menus, et publications pour les réseaux sociaux.',
    },
    {
      icon: <SocialMediaIcon />,
      title: 'Community Management',
      description: 'Gestion complète de vos réseaux sociaux, de la publication de contenu à la modération et l\'engagement.',
    },
    {
      icon: <WebsiteSeoIcon />,
      title: 'Site Web & SEO',
      description: 'Création ou refonte de votre site web et optimisation du référencement pour attirer plus de visiteurs qualifiés.',
    },
    {
      icon: <StrategyIcon />,
      title: 'Stratégie Digitale & Audit',
      description: 'Analyse, positionnement et plan éditorial sur mesure pour construire une stratégie digitale gagnante.',
    },
    {
      icon: <InfluencerIcon />,
      title: 'Collaboration Influenceurs',
      description: 'Sélection, négociation et gestion de collaborations avec des influenceurs pour accroître votre notoriété.',
    },
    {
      icon: <DashboardIcon />,
      title: 'Dashboard Client & Suivi',
      description: 'Accès à un tableau de bord personnalisé pour un suivi transparent et en temps réel de vos performances.',
    },
    {
      icon: <VipBadgeIcon />,
      title: 'Badge VIP',
      description: 'Bénéficiez d\'avantages exclusifs et d\'un service premium pour propulser votre marque au sommet.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-opacity duration-1000 ease-out transform ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nos Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Des stratégies sur mesure pour transformer votre présence en ligne et booster vos réservations.
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
