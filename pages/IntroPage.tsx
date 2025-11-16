
import React, { useEffect } from 'react';
import { TelyaLogo } from '../components/Logo';

const IntroPage: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigation programmée vers la page du questionnaire
      window.history.pushState({}, '', '/questionnaire');
      // Déclenche un événement popstate pour que le routeur du composant App prenne connaissance du changement
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 2800); // Délai de 2.8 secondes pour l'animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-green-800 text-white font-sans animate-fade-in overflow-hidden">
      <div className="text-center">
        {/* Animation pour le logo */}
        <div className="animate-scale-up">
          <TelyaLogo className="text-6xl md:text-8xl font-extrabold" />
        </div>
        {/* Animation pour le texte */}
        <p className="text-2xl md:text-3xl mt-6 animate-fade-in-content" style={{ animationDelay: '500ms' }}>
          Prêt à décoller ?
        </p>
        {/* Indicateur de chargement subtil */}
        <div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-fade-in" 
          style={{ animationDelay: '1000ms' }}
        >
            <div className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
