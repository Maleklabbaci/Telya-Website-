
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <a href="#home">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAACXCAMAAAAP92sVAAAAQlBMVEX///8AI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5UAI5VWF6dKAAAAFXRSTlMAESIzRFVmd4iZqrvM3e7/73d3d3d3d5f0ygAAAvNJREFUeNrt3N1y4yAUhGEdKzswsLz/K7tAQtpNEkws7/P2Oa90zpshIUEYx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Gca19ac21tLW2R5dLe2g46G1sP1loL2+Jce+n2RLutba3VMnLfO3r72trW6ky5r53eXb11bW23zJy3TvfYt7bXJk1y30t/7W1tr02c5L5X/Kq2t5tmy32/9JPa3m6bLff95Ce1vd02a+57+Yfa3m6bLff95Ce1vd02W+57+Zva3m6bLff98Ke1vV02W+57+We1vV02W+57+We1vV02a+57+We1vV02W+77yZ/W9nabrLk330t/Wtvbbbbk3l//rbW93TZL7vvJT2t7u22W3PdLn6nt7bZbc99LflLb222z5L5X/Kq2t9tmy33v6B9re7tt1sxy3z96e9vatlpmzrtnd1/b2tarTJG3TvfYt7bXJk1y3z96e9ratlpmzltne9/bWl1rNS2Zt8/e3ta2VmfK+9rS29tSk8yTt7e1tX1tLW2R5dLe2g46G1uP1mZtLW2R5dLe2g46G1uP1loL2+Jce+n2RLutba3VMnLfO3r72trW6ky5r53eXb11bW23zJy3TvfYt7bXJk1y30t/7W1tr02c5L5X/Kq2t5tmy32/9JPa3m6bLff95Ce1vd02a+57+Yfa3m6bLff95Ce1vd02W+57+Zva3m6bLff98Ke1vV02W+57+We1vV02W+57+We1vV02a+57+We1vV02W+77yZ/W9nabrLk330t/Wtvbbbbk3l//rbW93TZL7vvJT2t7u22W3PdLn6nt7bZbc99LflLb222z5L5X/Kq2t9tmy33v6B9re7tt1sxy3z96e9vatlpmzrtnd1/b2tarTJG3TvfYt7bXJk1y3z96e9ratlpmzltne9/bWl1rNS2Zt8/e3ta2VmfK+9rS29tSk8yTt7e1tX1tLW2R5dLe2g46G1uP1mZtLW2R5dLe2g7+A+eI4juM4juM4juM4juM4juM4juM4juM4jqN0/gEy/SOW/kG2SAAAAABJRU5ERGkJggg==" alt="Telya Agency Logo" className="h-10 w-auto" />
  </a>
);

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
          <Logo />
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
