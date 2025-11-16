
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PortfolioModalProps {
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', companyName: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; companyName?: string }>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = () => {
    const newErrors: { name?: string; email?: string; companyName?: string } = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis.";
    if (!formData.email.trim()) {
        newErrors.email = "L'e-mail est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Le nom de l'établissement est requis.";
    
    return newErrors;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstErrorKey = Object.keys(newErrors)[0] as keyof typeof newErrors;
        if (firstErrorKey) {
            const elementId = `modal-${firstErrorKey}`;
            const errorElement = document.getElementById(elementId);
            if (errorElement) {
                errorElement.focus();
            }
        }
        return;
    }
    setErrors({});
    
    const subject = encodeURIComponent(`Demande de Portfolio de ${formData.companyName || formData.name}`);
    const body = encodeURIComponent(
`Bonjour,

Je suis intéressé(e) et je souhaiterais voir votre portfolio complet.

Nom: ${formData.name}
Email: ${formData.email}
Établissement: ${formData.companyName}
`
    );
    const mailtoLink = `mailto:telyaagency@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col transform animate-scale-up overflow-hidden"
      >
        <div className="p-8 text-center relative">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Accéder au Portfolio</h3>
              <p className="text-gray-600 mb-6">Remplissez ce formulaire pour recevoir un accès exclusif à nos réalisations.</p>
              <form 
                onSubmit={handleSubmit}
                className="space-y-4 text-left"
                noValidate
              >
                  <div>
                      <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <input type="text" name="name" id="modal-name" value={formData.name} onChange={handleChange} placeholder="Votre nom" className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                      <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                      <input type="email" name="email" id="modal-email" value={formData.email} onChange={handleChange} placeholder="Votre e-mail" className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                      <label htmlFor="modal-companyName" className="block text-sm font-medium text-gray-700 mb-1">Nom d'établissement</label>
                      <input type="text" name="companyName" id="modal-companyName" value={formData.companyName} onChange={handleChange} placeholder="Ex: Hôtel Le Grand Panorama" className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`} required/>
                      {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                  </div>
                  
                  <div className="pt-2 text-center">
                      <button
                        type="submit"
                        className="w-full bg-brand-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg"
                      >
                        Préparer l'e-mail
                      </button>
                  </div>
              </form>
            </>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortfolioModal;
