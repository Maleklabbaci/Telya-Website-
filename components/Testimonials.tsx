
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarSrc: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, avatarSrc }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
        <img src={avatarSrc} alt={author} className="w-20 h-20 rounded-full mb-6 object-cover" />
        <p className="text-gray-600 italic mb-6 text-lg">"{quote}"</p>
        <div className="font-bold text-gray-900">{author}</div>
        <div className="text-sm text-brand-green-600">{title}</div>
    </div>
);


const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Telya Agency a transformé notre présence en ligne. Nos réservations ont augmenté de 40% en seulement six mois. Une équipe incroyable et dévouée !",
      author: 'Sophie Dubois',
      title: 'Directrice, Hôtel Le Grand Panorama',
      avatarSrc: 'https://picsum.photos/200/200?random=6'
    },
    {
      quote: "Leur expertise dans le secteur du tourisme est inégalée. Ils comprennent nos défis et livrent des résultats concrets. Je les recommande vivement.",
      author: 'Marc Lefebvre',
      title: 'Fondateur, Aventures Nomades',
      avatarSrc: 'https://picsum.photos/200/200?random=7'
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Ce Que Disent Nos Clients</h2>
           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            La confiance de nos partenaires est notre plus grande fierté.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
