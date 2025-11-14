
import React from 'react';
import { TelyaLogo } from '../components/Logo';

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="p-8 md:p-12 max-w-2xl w-full bg-white rounded-2xl shadow-xl text-center border border-gray-100 m-4">
        <div className="flex justify-center mb-6">
          <TelyaLogo className="text-4xl font-extrabold text-brand-green-700" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Message envoyé avec succès !</h1>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          Merci de nous avoir contactés. Nous avons bien reçu votre message et reviendrons vers vous dans les plus brefs délais.
        </p>
        <a
          href="/"
          className="inline-block bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Retour au site
        </a>
      </div>
    </div>
  );
};

export default ThankYouPage;
