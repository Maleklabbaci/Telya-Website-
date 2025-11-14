
import React from 'react';
import { EditableText } from './EditableText';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <video 
        src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
      <div className="relative z-20 text-center px-6">
        <EditableText
          as="h1"
          fieldId="hero.title"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight"
        />
        <EditableText
          as="p"
          fieldId="hero.subtitle"
          className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md font-light"
        />
        <a 
          href="#services"
          className="bg-brand-green-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-lg"
        >
          <EditableText fieldId="hero.cta" />
        </a>
      </div>
    </section>
  );
};

export default Hero;