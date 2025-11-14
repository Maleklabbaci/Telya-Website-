import React, { useState, useEffect } from 'react';
import { TelyaLogo } from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#home">
            <TelyaLogo className="h-10 w-auto transition-all duration-300" applyBlend={!isScrolled} />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
               <a key={link.href} href={link.href} className="text-gray-200 hover:text-brand-green-500 font-medium transition-colors">{link.label}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-block bg-brand-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-brand-green-700 transition-transform duration-300 hover:scale-105">
            Commençons
          </a>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-200 hover:text-brand-green-500 font-medium transition-colors text-center py-2">{link.label}</a>
              ))}
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-brand-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-700 transition-transform duration-300 hover:scale-105 text-center">
                Commençons
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
