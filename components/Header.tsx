
import React, { useState, useEffect } from 'react';
import { TelyaLogo } from './Logo';
import { useAuth } from '../contexts/AuthContext';

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isScrolled, isMobile = false, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`relative group font-medium transition-colors ${isScrolled ? 'text-brand-green-700 hover:text-brand-green-900' : 'text-gray-200 hover:text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]'} ${isMobile ? 'text-center py-2' : ''}`}
  >
    {label}
    <span 
      className={`absolute bottom-0 h-0.5 bg-brand-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${isMobile ? 'left-1/4 w-1/2 origin-center' : 'left-0 w-full origin-left'}`}
    ></span>
  </a>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#home">
            <TelyaLogo className={`text-3xl font-extrabold transition-all duration-300 ${isScrolled ? 'text-brand-green-700' : 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'}`} />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
               <NavLink key={link.href} {...link} isScrolled={isScrolled} />
            ))}
          </nav>
          {isAdmin ? (
             <button onClick={logout} className="hidden md:inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-transform duration-300 hover:scale-105">
              Déconnexion
            </button>
          ) : (
            <a href="#contact" className="hidden md:inline-block bg-brand-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-brand-green-700 transition-transform duration-300 hover:scale-105">
              Commençons
            </a>
          )}
          <button className={`md:hidden transition-colors ${isScrolled ? 'text-gray-900' : 'text-white [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.7))]'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden mt-4 rounded-lg shadow-lg p-4 transition-colors ${isScrolled ? 'bg-white' : 'bg-black/90 backdrop-blur-sm'}`}>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} isScrolled={isScrolled} isMobile={true} onClick={() => setIsMenuOpen(false)} />
              ))}
              {isAdmin ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-transform duration-300 hover:scale-105 text-center">
                  Déconnexion
                </button>
              ) : (
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-brand-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-700 transition-transform duration-300 hover:scale-105 text-center">
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
