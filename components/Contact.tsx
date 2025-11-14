
import React, { useState, useEffect, useRef, useCallback } from 'react';

const UploadIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-3 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const formObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          formObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentFormRef = formContainerRef.current;
    if (currentFormRef) formObserver.observe(currentFormRef);
    
    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) headerObserver.observe(currentHeaderRef);

    return () => {
      if (currentFormRef) formObserver.unobserve(currentFormRef);
      if (currentHeaderRef) headerObserver.unobserve(currentHeaderRef);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  }, []);

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) newErrors.name = "Le nom complet est requis.";
    if (!formData.email.trim()) {
        newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.message.trim()) newErrors.message = "Votre message est requis.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    
    setErrors({});
    e.currentTarget.submit();
  };

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/thank-you` : '';

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-opacity duration-1000 ease-out transform ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Boostez vos réservations dès aujourd’hui</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir une consultation gratuite.
          </p>
        </div>

        <div
          ref={formContainerRef}
          className={`max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl shadow-lg border border-gray-100 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
            <form 
              action="https://formsubmit.co/telyaagency@gmail.com" 
              method="POST" 
              encType="multipart/form-data"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value={`Nouveau message de ${formData.companyName || formData.name}`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="hidden" name="_autoresponse" value="Merci pour votre message ! Nous avons bien reçu votre demande et notre équipe vous recontactera dans les plus brefs délais." />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Votre e-mail"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nom de votre établissement (Hôtel, Restaurant, Agence…)</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500"
                  placeholder="Ex: Hôtel Le Grand Panorama"
                />
              </div>

              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">Joindre un document (brief, cahier des charges...)</label>
                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-colors ${isDragging ? 'border-brand-green-500' : ''}`}
                  >
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour téléverser</span> ou glissez-déposez</p>
                    <p className="text-xs text-gray-500">PDF, DOCX, PNG, JPG (MAX. 5MB)</p>
                    <input id="attachment" name="attachment" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                    <span className="truncate max-w-xs sm:max-w-sm md:max-w-md">{file.name}</span>
                    <button type="button" onClick={removeFile} className="ml-4 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Parlez-nous de votre établissement et de vos besoins (marketing, réseaux sociaux, shooting…)"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Envoyer le Message
                </button>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;