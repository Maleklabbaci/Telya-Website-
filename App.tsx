
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Ignore empty or simple hash links
      if (!href || href === '#') return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Find the header height to offset the scroll position
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    const onLocationChange = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);


    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const renderContent = () => {
    if (route === '/admin') {
      return <AdminLoginPage />;
    }
    return (
      <>
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </>
    );
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {renderContent()}
    </div>
  );
};

export default App;