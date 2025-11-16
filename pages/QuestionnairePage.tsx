
import React, { useState } from 'react';
import { TelyaLogo } from '../components/Logo';

const QuestionnairePage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    establishmentType: '',
    objectives: [] as string[],
    otherObjectiveMessage: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (formData.objectives.includes("Autre (à préciser dans le message)") && !formData.otherObjectiveMessage.trim()) {
        newErrors.otherObjectiveMessage = "Veuillez préciser votre autre objectif.";
    }
    if (!formData.budget) newErrors.budget = "Le budget est requis.";
    if (!formData.name.trim()) newErrors.name = "Votre nom est requis.";
    if (!formData.email.trim()) {
        newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    }
    return newErrors;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      if (firstErrorKey) {
        const elementId = ['objectives', 'budget'].includes(firstErrorKey) ? `${firstErrorKey}-section` : firstErrorKey;
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (!['objectives-section', 'budget-section'].includes(elementId) && 'focus' in errorElement) {
             (errorElement as HTMLElement).focus({ preventScroll: true });
          }
        }
      }
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    const htmlContent = `
        <h1 style="font-family: Arial, sans-serif; color: #333;">Nouveau questionnaire de projet soumis</h1>
        <hr>
        <h2 style="font-family: Arial, sans-serif; color: #01592C;">1. À propos de l'établissement</h2>
        <p><strong>Nom de l'établissement:</strong> ${formData.companyName}</p>
        <p><strong>Type d'établissement:</strong> ${formData.establishmentType}</p>
        <br>
        <h2 style="font-family: Arial, sans-serif; color: #01592C;">2. Objectifs</h2>
        <ul>
            ${formData.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
        ${formData.objectives.includes("Autre (à préciser dans le message)") ? `<p><strong>Précision (Autre):</strong> ${formData.otherObjectiveMessage.replace(/\n/g, '<br>')}</p>` : ''}
        <br>
        <h2 style="font-family: Arial, sans-serif; color: #01592C;">3. Budget</h2>
        <p><strong>Budget marketing mensuel:</strong> ${formData.budget}</p>
        <br>
        <h2 style="font-family: Arial, sans-serif; color: #01592C;">4. Coordonnées</h2>
        <p><strong>Nom complet:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Téléphone:</strong> ${formData.phone}</p>
    `;

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: `Nouveau questionnaire projet de ${formData.companyName}`,
                htmlContent: htmlContent,
            }),
        });

        if (response.ok) {
            window.location.href = '/thank-you';
        } else {
            setSubmitError("L'envoi de votre demande a échoué. Veuillez réessayer plus tard.");
        }
    } catch (error) {
        setSubmitError("Une erreur réseau s'est produite. Veuillez vérifier votre connexion et réessayer.");
    } finally {
        setIsSubmitting(false);
    }
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
  
  const budgetOptions = [
    "Moins de 75,000 DZD",
    "75,000 - 220,000 DZD",
    "220,000 - 440,000 DZD",
    "440,000 - 730,000 DZD",
    "Plus de 730,000 DZD",
    "Je ne sais pas encore",
  ];

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
              onSubmit={handleSubmit} 
              noValidate
              className="space-y-12"
            >
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
                   {formData.objectives.includes("Autre (à préciser dans le message)") && (
                    <div className="pl-10 mt-2 animate-fade-in">
                      <label htmlFor="otherObjectiveMessage" className="block text-sm font-medium text-gray-700 mb-1">Veuillez préciser :</label>
                      <textarea
                        name="otherObjectiveMessage"
                        id="otherObjectiveMessage"
                        rows={3}
                        value={formData.otherObjectiveMessage}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.otherObjectiveMessage ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Décrivez votre besoin spécifique ici..."
                      />
                      {errors.otherObjectiveMessage && <p className="text-red-500 text-xs mt-1">{errors.otherObjectiveMessage}</p>}
                    </div>
                  )}
                  {errors.objectives && !formData.objectives.includes("Autre (à préciser dans le message)") && <p className="text-red-500 text-xs mt-1">{errors.objectives}</p>}
                </div>
              </div>

              <div id="budget-section" className="animate-fade-in-content" style={{ animationDelay: '300ms' }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-brand-green-200 pb-2">3. Votre budget</h2>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quelle est votre estimation de budget marketing mensuel ?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {budgetOptions.map((option) => (
                        <label key={option} className={`block cursor-pointer rounded-lg border p-3 text-center text-sm font-medium transition-all duration-200 ${
                            formData.budget === option
                              ? 'border-brand-green-600 bg-brand-green-50 ring-2 ring-brand-green-500 shadow-md'
                              : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="budget"
                            value={option}
                            checked={formData.budget === option}
                            onChange={handleInputChange}
                            className="sr-only"
                            aria-labelledby={`budget-label-${option}`}
                          />
                          <span id={`budget-label-${option}`}>{option}</span>
                        </label>
                      ))}
                  </div>
                  {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget}</p>}
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Votre numéro de téléphone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className={`mt-1 block w-full px-4 py-3 bg-white border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition-colors placeholder-gray-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
                      placeholder="06 12 34 56 78" 
                      required 
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                 </div>
              </div>

              <div className="text-center pt-4 animate-fade-in-content" style={{ animationDelay: '500ms' }}>
                 <a href="/" className="text-sm text-gray-600 hover:text-brand-green-700 hover:underline mb-4 block">
                    Retourner au site
                 </a>
                 
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform active:scale-95 shadow-lg hover:animate-gentle-pulse flex items-center justify-center min-w-[280px] mx-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                      <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                      </>
                  ) : (
                      'Envoyer ma demande de projet'
                  )}
                </button>
                {submitError && <p className="text-red-500 text-sm mt-4">{submitError}</p>}
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;