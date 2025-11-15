import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarSrc: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, avatarSrc, className }) => {
    return (
        <div 
            className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full max-w-2xl mx-auto ${className || ''}`}
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

const Testimonials: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHeaderVisible(true);
        headerObserver.disconnect();
      }
    }, { threshold: 0.1 });

    const carouselObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCarouselVisible(true);
        carouselObserver.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "-100px" });

    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) headerObserver.observe(currentHeaderRef);

    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) carouselObserver.observe(currentCarouselRef);
    
    return () => { 
      if(currentHeaderRef) headerObserver.unobserve(currentHeaderRef);
      if(currentCarouselRef) carouselObserver.unobserve(currentCarouselRef);
    };
  }, []);
  
  useEffect(() => {
     resetTimeout();
     if (!isPaused && carouselVisible) {
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
            5000 // Change slide every 5 seconds
        );
     }
    return () => resetTimeout();
  }, [currentIndex, isPaused, carouselVisible, resetTimeout]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);


  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-opacity duration-1000 ease-out transform ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Ce Que Disent Nos Clients</h2>
           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            La confiance de nos partenaires est notre plus grande fierté.
          </p>
        </div>
        <div 
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[28rem] flex items-center justify-center">
            <TestimonialCard 
              key={currentIndex} 
              {...testimonials[currentIndex]} 
              className={`w-full ${carouselVisible ? 'animate-fade-in-content' : 'opacity-0'}`}
            />
          </div>
          
          <div className={`transition-opacity duration-500 ${carouselVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Left Arrow */}
            <button onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md transition focus:outline-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            {/* Right Arrow */}
            <button onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md transition focus:outline-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="flex justify-center space-x-2 pt-8">
              {testimonials.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-brand-green-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Aller au témoignage ${slideIndex + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;