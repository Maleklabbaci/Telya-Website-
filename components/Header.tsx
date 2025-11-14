import React, { useState, useEffect } from 'react';
import { TelyaLogo } from './Logo';
import { useAuth } from '../contexts/AuthContext';

interface NavLinkProps {
  href: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isMobile = false, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`relative group font-medium transition-colors text-white hover:text-gray-200 ${isMobile ? 'text-center py-2' : ''}`}
  >
    {label}
    <span
      className={`absolute bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${isMobile ? 'left-1/4 w-1/2 origin-center' : 'left-0 w-full origin-left'}`}
    ></span>
  </a>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '#contact', label: 'Offres & Tarifs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-green-700 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#home">
            <TelyaLogo className="text-3xl font-extrabold text-white" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
               <NavLink key={link.href} {...link} />
            ))}
          </nav>
          {isAdmin ? (
             <button onClick={logout} className="hidden md:inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 active:scale-100">
              Déconnexion
            </button>
          ) : (
            <a href="#contact" className="hidden md:inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-100 bg-white text-brand-green-700 hover:bg-gray-100">
              Commençons
            </a>
          )}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 rounded-lg shadow-lg p-4 bg-brand-green-700">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} isMobile={true} onClick={() => setIsMenuOpen(false)} />
              ))}
              {isAdmin ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 active:scale-100 text-center">
                  Déconnexion
                </button>
              ) : (
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-100 text-center bg-white text-brand-green-700 hover:bg-gray-100">
                  Commençons
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;