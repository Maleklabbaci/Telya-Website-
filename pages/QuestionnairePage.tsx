
import React, { useState } from 'react';
import { TelyaLogo } from '../components/Logo';

const QuestionnairePage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    establishmentType: '',
    objectives: [] as string[],
    budget: '',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newObjectives = checked
        ? [...prev.objectives, value]
        : prev.objectives.filter(obj => obj !== value);
      return { ...prev, objectives: newObjectives };
    });
    if (errors.objectives) {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.objectives;
            return newErrors;
        });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Le nom de l'établissement est requis.";
    if (!formData.establishmentType) newErrors.establishmentType = "Le type d'établissement est requis.";
    if (formData.objectives.length === 0) newErrors.objectives = "Veuillez sélectionner au moins un objectif.";
    if (!formData.budget) newErrors.budget = "Le budget est requis.";
    if (!formData.name.trim()) newErrors.name = "Votre nom est requis.";
    if (!formData.email.trim()) {
        newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    return newErrors;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      if (firstErrorKey) {
        const elementId = firstErrorKey === 'objectives' ? 'objectives-section' : firstErrorKey;
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (elementId !== 'objectives-section' && 'focus' in errorElement) {
             (errorElement as HTMLElement).focus({ preventScroll: true });
          }
        }
      }
      return;
    }
    setErrors({});
    e.currentTarget.submit();
  };

  const objectivesOptions = [
    "Augmenter les réservations directes",
    "Améliorer la visibilité en ligne (SEO)",
    "Développer notre communauté sur les réseaux sociaux",
    "Créer du contenu de qualité (photos/vidéos)",
    "Refonte de notre site web",
    "Lancer des campagnes publicitaires",
    "Autre (à préciser dans le message)",
  ];

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/thank-you` : '';

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <a href="/" className="inline-block">
            <TelyaLogo className="text-4xl font-extrabold text-brand-green-700" />
          </a>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">Prêt à décoller ?</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Remplissez ce questionnaire pour nous aider à mieux comprendre vos besoins. Cela ne prend que 2 minutes !
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          <form 
            action="https://formsubmit.co/telyaagency@gmail.com" 
            method="POST" 
            onSubmit={handleSubmit} 
            className="space-y-8"
            noValidate
          >
            <input type="hidden" name="_subject" value={`Nouveau projet de ${formData.companyName}`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={nextUrl} />
            <input type="hidden" name="_autoresponse" value="Merci pour votre intérêt ! Votre projet a bien été soumis. Notre équipe vous recontactera très prochainement pour discuter des prochaines étapes." />

            <div className="animate-fade-in-content" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-brand-green-200 pb-2">1. À propos de votre établissement</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nom de l'établissement</label>
                  <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleInputChange} className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Ex: Hôtel Le Grand Panorama" required />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label htmlFor="establishmentType" className="block text-sm font-medium text-gray-700">Type d'établissement</label>
                  <select name="establishmentType" id="establishmentType" value={formData.establishmentType} onChange={handleInputChange} className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors ${errors.establishmentType ? 'border-red-500' : 'border-gray-300'}`} required>
                    <option value="">Sélectionnez un type</option>
                    <option>Hôtel</option>
                    <option>Restaurant / Café</option>
                    <option>Agence de voyage / Tour Opérateur</option>
                    <option>Activité de loisir</option>
                    <option>Office de tourisme</option>
                    <option>Autre</option>
                  </select>
                  {errors.establishmentType && <p className="text-red-500 text-xs mt-1">{errors.establishmentType}</p>}
                </div>
              </div>
            </div>

            <div id="objectives-section" className="animate-fade-in-content" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-brand-green-200 pb-2">2. Vos objectifs</h2>
              <div className="space-y-3 mt-4">
                <p className="text-sm font-medium text-gray-700">Quels sont vos principaux objectifs ? (plusieurs choix possibles)</p>
                {objectivesOptions.map(obj => (
                  <label key={obj} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <input type="checkbox" name="objectives" value={obj} checked={formData.objectives.includes(obj)} onChange={handleCheckboxChange} className="h-5 w-5 text-brand-green-600 border-gray-300 rounded focus:ring-brand-green-500" />
                    <span className="text-gray-700">{obj}</span>
                  </label>
                ))}
                {errors.objectives && <p className="text-red-500 text-xs mt-1">{errors.objectives}</p>}
              </div>
            </div>

            <div className="animate-fade-in-content" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-brand-green-200 pb-2">3. Votre budget</h2>
              <div className="mt-4">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Quelle est votre estimation de budget marketing mensuel ?</label>
                <select name="budget" id="budget" value={formData.budget} onChange={handleInputChange} className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors ${errors.budget ? 'border-red-500' : 'border-gray-300'}`} required>
                  <option value="">Sélectionnez une fourchette de prix</option>
                  <option>Moins de 500€</option>
                  <option>500€ - 1,500€</option>
                  <option>1,500€ - 3,000€</option>
                  <option>3,000€ - 5,000€</option>
                  <option>Plus de 5,000€</option>
                  <option>Je ne sais pas encore</option>
                </select>
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </div>
            </div>
            
             <div className="animate-fade-in-content" style={{ animationDelay: '400ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-brand-green-200 pb-2">4. Vos coordonnées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Votre nom complet</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Votre nom" required />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre adresse e-mail</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="Votre e-mail" required />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
              </div>
               <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Votre numéro de téléphone (optionnel)</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500" placeholder="06 12 34 56 78" />
               </div>
            </div>

            <div className="text-center pt-4 animate-fade-in-content" style={{ animationDelay: '500ms' }}>
              <button
                type="submit"
                className="bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform active:scale-95 shadow-lg hover:animate-gentle-pulse"
              >
                Envoyer ma demande de projet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
