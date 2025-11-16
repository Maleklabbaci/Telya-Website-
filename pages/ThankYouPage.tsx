
import React, { useEffect, useState } from 'react';
import { TelyaLogo } from '../components/Logo';

const CheckmarkIcon: React.FC = () => (
  <svg className="w-20 h-20 text-brand-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const ThankYouPage: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      // Utilise pushState et un événement pour une navigation plus fluide dans l'application monopage (SPA)
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
      <div className="p-8 md:p-12 max-w-2xl w-full bg-white rounded-2xl shadow-xl text-center border border-gray-100 transform animate-scale-up">
        <div className="animate-fade-in mb-6">
            <CheckmarkIcon />
        </div>
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <TelyaLogo className="text-4xl font-extrabold text-brand-green-700" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in-content" style={{ animationDelay: '400ms' }}>Message envoyé avec succès !</h1>
        <p className="text-gray-600 leading-relaxed text-lg mb-8 animate-fade-in-content" style={{ animationDelay: '600ms' }}>
          Merci de nous avoir contactés. Nous avons bien reçu votre message et reviendrons vers vous dans les plus brefs délais.
        </p>
        <div className="animate-fade-in-content" style={{ animationDelay: '800ms' }}>
          <a
            href="/"
            className="inline-block bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Retour à l'accueil
          </a>
           <p className="text-gray-500 text-sm mt-6">
            Vous serez redirigé automatiquement dans {countdown} seconde{countdown > 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
