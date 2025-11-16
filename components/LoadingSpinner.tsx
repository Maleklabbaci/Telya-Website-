import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center animate-fade-in" 
      aria-modal="true" 
      role="dialog" 
      aria-label="Chargement en cours"
    >
      <div className="w-16 h-16 border-8 border-white border-t-brand-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
