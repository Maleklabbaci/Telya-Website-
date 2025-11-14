
import React, { useEffect, useRef, useState } from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarSrc: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, avatarSrc, index }) => {
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
        if (cardRef.current) {
            observer.unobserve(cardRef.current)
        }
      };
    }, []);

    return (
        <div 
            ref={cardRef}
            className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-500 transform h-full ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <img src={avatarSrc} alt={author} loading="lazy" className="w-20 h-20 rounded-full mb-6 object-cover flex-shrink-0" />
            <div className="flex flex-col flex-grow justify-center">
              <p className="text-gray-600 italic mb-6 text-lg">"{quote}"</p>
              <div className="font-bold text-gray-900">{author}</div>
              <div className="text-sm text-brand-green-600">{title}</div>
            </div>
        </div>
    );
};


const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Leur stratégie de contenu et leurs visuels sur Instagram ont attiré une nouvelle clientèle. Nos réservations directes ont grimpé de 35% !",
      author: 'Sarah Chen',
      title: 'Gérante, Riad Al Mamoun, Marrakech',
      avatarSrc: 'https://i.pravatar.cc/150?u=sarahchen'
    },
    {
      quote: "Le nouveau design de nos menus et nos affiches sont superbes. Telya Agency a donné un vrai coup de jeune à notre image de marque. Très professionnels.",
      author: 'Julien Moreau',
      title: 'Propriétaire, Restaurant Le Panoramique',
      avatarSrc: 'https://i.pravatar.cc/150?u=julienmoreau'
    },
    {
        quote: "Les vidéos Reels pour nos excursions dans le désert sont devenues virales ! Une visibilité inespérée qui a boosté notre activité de manière spectaculaire.",
        author: 'Fatima Zahra',
        title: 'Fondatrice, Atlas Excursions',
        avatarSrc: 'https://i.pravatar.cc/150?u=fatimazahra'
    },
    {
        quote: "L'audit stratégique a été une révélation. Leur compréhension du marché du luxe nous a permis de redéfinir notre positionnement digital.",
        author: 'David Lemoine',
        title: 'Directeur Marketing, Groupe Hôtelier "Évasion"',
        avatarSrc: 'https://i.pravatar.cc/150?u=davidlemoine'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Ce Que Disent Nos Clients</h2>
           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            La confiance de nos partenaires est notre plus grande fierté.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
