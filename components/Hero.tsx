import React, { useState, useEffect, useRef } from 'react';
import CalendlyModal from './CalendlyModal';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Pre-load the video when it's 100px away from the viewport
    );

    const currentRef = heroRef.current;
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
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        {/* Poster image for fast initial load */}
        <img 
          src="https://images.pexels.com/videos/8763328/pexels-photo-8763328.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
          alt="Vue aérienne de bungalows sur l'eau dans un lagon turquoise"
          className="absolute z-0 w-full h-full object-cover"
        />
        {loadVideo && (
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
            >
              {/* Prioritize WebM for better compression */}
              <source src="https://videos.pexels.com/video-files/8763328/8763328-hd_1920_1080_25fps.webm" type="video/webm" />
              {/* Fallback to MP4 for wider compatibility */}
              <source src="https://videos.pexels.com/video-files/8763328/8763328-hd_1920_1080_25fps.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            Boostez Votre Visibilité
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md font-light">
            Telya Agency - Votre partenaire en marketing digital pour le tourisme et les loisirs.
          </p>
          <button 
            onClick={openCalendly}
            className="bg-brand-green-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-lg"
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