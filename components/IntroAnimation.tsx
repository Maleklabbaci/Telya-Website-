import React, { useEffect, useState } from 'react';
import { TelyaLogo } from './Logo';

interface IntroAnimationProps {
  onAnimationEnd: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationEnd }) => {
  const [phase, setPhase] = useState('start');

  useEffect(() => {
    const sequence = [
      setTimeout(() => setPhase('logoVisible'), 100),       // Logo scales up
      setTimeout(() => setPhase('textVisible'), 600),       // Text fades in
      setTimeout(() => setPhase('fadingOut'), 2600),        // Start fading out the whole container
      setTimeout(() => onAnimationEnd(), 3100),             // Animation finished (matches fade-out duration)
    ];

    return () => {
      sequence.forEach(clearTimeout);
    };
  }, [onAnimationEnd]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-green-800 text-white font-sans transition-opacity duration-500 ease-in
        ${phase === 'fadingOut' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="text-center">
        <div
          className={`transition-all duration-500 ease-out
            ${phase === 'logoVisible' || phase === 'textVisible' || phase === 'fadingOut' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          <TelyaLogo className="text-6xl md:text-8xl font-extrabold" />
        </div>
        <p
          className={`text-2xl md:text-3xl mt-6 transition-all duration-700 ease-out
            ${phase === 'textVisible' || phase === 'fadingOut' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          votre partenaire de succès
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
