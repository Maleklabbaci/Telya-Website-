
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface CalendlyModalProps {
  onClose: () => void;
  calendlyUrl: string;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ onClose, calendlyUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const themedCalendlyUrl = `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=111827&primary_color=00a066`;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef} 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[700px] flex flex-col transform animate-scale-up"
      >
        <div className="flex justify-end p-2">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition p-1 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div className="flex-grow w-full h-full -mt-10">
             <iframe
                src={themedCalendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Prendre rendez-vous"
            ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CalendlyModal;
