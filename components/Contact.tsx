
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Prêt à Décoller ?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir une consultation gratuite.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          {isSubmitted ? (
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold text-brand-green-700 mb-2">Merci !</h3>
              <p className="text-gray-700">Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition"
                    placeholder="Votre e-mail"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green-500 focus:border-brand-green-500 transition"
                  placeholder="Parlez-nous de votre projet..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-brand-green-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Envoyer le Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
