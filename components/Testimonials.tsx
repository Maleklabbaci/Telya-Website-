
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
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHeaderVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const currentRef = headerRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => { if(currentRef) observer.unobserve(currentRef) };
  }, []);

  const testimonials = [
    {
      quote: "Leur stratégie de contenu et leurs visuels sur Instagram ont attiré une nouvelle clientèle. Nos réservations directes ont grimpé de 35% !",
      author: 'Sarah Chen',
      title: 'Gérante, Riad Al Mamoun, Marrakech',
      avatarSrc: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      quote: "Le nouveau design de nos menus et nos affiches sont superbes. Telya Agency a donné un vrai coup de jeune à notre image de marque. Très professionnels.",
      author: 'Julien Moreau',
      title: 'Propriétaire, Restaurant Le Panoramique',
      avatarSrc: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
        quote: "Les vidéos Reels pour nos excursions dans le désert sont devenues virales ! Une visibilité inespérée qui a boosté notre activité de manière spectaculaire.",
        author: 'Fatima Zahra',
        title: 'Fondatrice, Atlas Excursions',
        avatarSrc: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
        quote: "L'audit stratégique a été une révélation. Leur compréhension du marché du luxe nous a permis de redéfinir notre positionnement digital.",
        author: 'David Lemoine',
        title: 'Directeur Marketing, Groupe Hôtelier "Évasion"',
        avatarSrc: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      quote: "La refonte de notre site web est un succès. Il est magnifique et notre référencement a explosé, nous plaçant en première page sur des mots-clés cruciaux.",
      author: 'Alexandre Dubois',
      title: 'Directeur, Hôtel Belle Rive, Annecy',
      avatarSrc: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    },
    {
      quote: "Le community management est impeccable, ils ont créé une communauté engagée autour de notre spa. On se sent vraiment accompagnés à chaque étape.",
      author: 'Chloé Lambert',
      title: 'Propriétaire, Le Spa d\'Or, Paris',
      avatarSrc: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-opacity duration-1000 ease-out transform ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Ce Que Disent Nos Clients</h2>
           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            La confiance de nos partenaires est notre plus grande fierté.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;