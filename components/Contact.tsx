
import React, { useState, useEffect, useRef } from 'react';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        const currentRef = sectionRef.current;
        if (currentRef) observer.observe(currentRef);
        
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof typeof errors];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = "Le nom est requis.";
        if (!formData.email.trim()) {
            newErrors.email = "L'e-mail est requis.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "L'adresse e-mail n'est pas valide.";
        }
        if (!formData.subject.trim()) newErrors.subject = "Le sujet est requis.";
        if (!formData.message.trim()) newErrors.message = "Le message est requis.";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        setSubmitError('');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                window.location.href = '/thank-you';
            } else {
                const data = await response.json().catch(() => ({}));
                const errorMessage = data?.message || "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.";
                setSubmitError(errorMessage);
            }
        } catch (error) {
            setSubmitError("Une erreur réseau s'est produite. Veuillez vérifier votre connexion et réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Contactez-Nous</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Une question, un projet ? Nous sommes à votre écoute pour discuter de vos ambitions.
                    </p>
                </div>

                <div className={`grid md:grid-cols-2 gap-16 items-start transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '200ms'}}>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <form action="https://formsubmit.co/telyaagency@gmail.com" method="POST" onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="_subject" value={`Telya Contact: ${formData.subject}`} />
                            <input type="hidden" name="_captcha" value="false" />
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.name ? 'border-red-500' : 'border-gray-200'}`} required />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Votre e-mail" className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.email ? 'border-red-500' : 'border-gray-200'}`} required />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} placeholder="L'objet de votre message" className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.subject ? 'border-red-500' : 'border-gray-200'}`} required />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                                <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Parlez-nous de votre projet..." className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition ${errors.message ? 'border-red-500' : 'border-gray-200'}`} required ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <div className="text-center">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
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
                                        'Envoyer le message'
                                    )}
                                </button>
                                {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
                            </div>
                        </form>
                    </div>
                    
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900">Nos Coordonnées</h3>
                        <div className="flex items-start space-x-4">
                            <div className="bg-brand-green-100 text-brand-green-700 rounded-full p-3 flex-shrink-0">
                                <MailIcon />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Email</h4>
                                <p className="text-gray-600">Discutons de votre projet et de vos ambitions.</p>
                                <a href="mailto:telyaagency@gmail.com" className="text-brand-green-600 hover:underline font-medium break-all">telyaagency@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-brand-green-100 text-brand-green-700 rounded-full p-3 flex-shrink-0">
                                <PhoneIcon />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Téléphone</h4>
                                <p className="text-gray-600">Pour une réponse plus rapide, n'hésitez pas à nous appeler.</p>
                                <a href="tel:+213697660969" className="text-brand-green-600 hover:underline font-medium">+213 (0) 697 66 09 69</a>
                            </div>
                        </div>
                         <div className="pt-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Suivez-nous</h4>
                            <div className="flex space-x-4">
                               <a href="https://www.facebook.com/profile.php?id=61577443097904" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green-600 transition-colors">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="https://www.instagram.com/telyaagency/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green-600 transition-colors">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.803 2.013 10.157 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm4.5-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
