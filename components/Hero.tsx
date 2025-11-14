
import React, { useState, useEffect, useRef } from 'react';
import CalendlyModal from './CalendlyModal';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsTextVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const videoElement = videoRef.current;
        if (entry.isIntersecting && videoElement && videoElement.children.length === 0) {
          const sources = [
            { src: "https://cdn.coverr.co/videos/coverr-maldives-beach-resort-373/1080p.webm", type: "video/webm" },
            { src: "https://cdn.coverr.co/videos/coverr-maldives-beach-resort-373/1080p.mp4", type: "video/mp4" }
          ];

          sources.forEach(sourceInfo => {
            const source = document.createElement('source');
            source.src = sourceInfo.src;
            source.type = sourceInfo.type;
            videoElement.appendChild(source);
          });
          
          videoElement.load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const currentRef = videoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const openCalendly = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <video 
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover animate-video-fade-in"
        >
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        <div className="relative z-20 text-center px-6">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight transition-all duration-700 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
            Boostez Votre Visibilité
          </h1>
          <p className={`text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md font-light transition-all duration-700 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '300ms' }}>
            Plus de 100 clients satisfaits grâce à nos stratégies qui transforment l’audience en réservations..
          </p>
          <button 
            onClick={openCalendly}
            className={`bg-brand-green-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-lg ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '500ms' }}
          >
            Réserver un Appel
          </button>
        </div>
      </section>
      {isModalOpen && (
        <CalendlyModal 
          onClose={() => setIsModalOpen(false)} 
          calendlyUrl="https://calendly.com/telyaagency/appel-15-min"
        />
      )}
    </>
  );
};

export default Hero;
