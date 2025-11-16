
import React, { useState, useEffect, useRef } from 'react';
import CalendlyModal from './CalendlyModal';

// Utilisation d'un seul objet vidéo comme demandé
const video = {
  theme: 'Intérieur d\'Hôtel Luxueux',
  poster: "https://images.pexels.com/videos/7578550/pexels-photo-7578550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  sources: [
    { src: "https://videos.pexels.com/video-files/7578550/7578550-hd_1920_1080_30fps.mp4", type: "video/mp4" }
  ]
};

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Effet pour l'animation du texte au chargement
  useEffect(() => {
    const textTimer = setTimeout(() => setIsTextVisible(true), 200);
    return () => clearTimeout(textTimer);
  }, []);

  // Effet pour l'IntersectionObserver qui déclenche le chargement de la vidéo
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // La section Hero est "au-dessus de la ligne de flottaison", elle sera donc immédiatement visible.
        // L'observateur s'assure que nous ne chargeons la vidéo que lorsque le navigateur est prêt à l'afficher.
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect(); // Se déconnecte une fois visible pour éviter un déclenchement inutile
        }
      },
      // Le seuil 0.01 signifie que l'observateur se déclenchera dès qu'un seul pixel sera visible.
      { threshold: 0.01 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  const openCalendly = () => {
    setIsButtonClicked(true);
    setIsModalOpen(true);
    // Réinitialise l'état de l'animation après sa durée pour permettre de la rejouer
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 400); // Durée de l'animation 'button-pulse'
  };

  return (
    <>
      <section 
        id="home" 
        ref={heroRef} // Attache la ref à la section pour l'observer
        className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-black"
      >
        {!loadVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <video 
          autoPlay
          loop
          muted
          playsInline
          poster={video.poster}
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover animate-video-fade-in"
          // preload="metadata" permet de charger les informations de base de la vidéo sans télécharger le fichier entier.
          preload="metadata"
        >
          {/* Les sources vidéo ne sont rendues que lorsque la section est visible, ce qui déclenche le chargement paresseux. */}
          {loadVideo && video.sources.map((source, index) => (
             <source key={index} src={source.src} type={source.type} />
          ))}
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
            className={`bg-brand-green-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-lg ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isButtonClicked ? 'animate-button-pulse' : ''}`}
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