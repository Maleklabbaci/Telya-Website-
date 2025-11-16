


import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import AdminLoginPage from './pages/AdminLoginPage';
import ThankYouPage from './pages/ThankYouPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import QuestionnairePage from './pages/QuestionnairePage';
import IntroPage from './pages/IntroPage';
import IntroAnimation from './components/IntroAnimation';

const MainSite: React.FC = () => {

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};


const App: React.FC = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [isIntroVisible, setIsIntroVisible] = useState(sessionStorage.getItem('introShown') !== 'true');


  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        
        if (!anchor || e.metaKey || e.ctrlKey || e.shiftKey) return;
        
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        // External links
        if (anchor.host !== window.location.host) return;

        // Hash links
        if (href.startsWith('#')) {
            const mainSitePath = ['/', '/index.html'].includes(window.location.pathname);
            if (mainSitePath) {
                // Let default browser behavior handle scrolling on main page
                return;
            } else {
                // If on another page, navigate to main page with hash
                // This will be a full page load, which is acceptable for this edge case.
                window.location.href = `/${href}`;
                e.preventDefault();
                return;
            }
        }
        
        // Internal navigation
        e.preventDefault();
        if (window.location.pathname !== href || window.location.search !== anchor.search) {
            window.history.pushState({}, '', href);
            onLocationChange();
        }
    };
    
    window.addEventListener('popstate', onLocationChange);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  const handleIntroEnd = () => {
    sessionStorage.setItem('introShown', 'true');
    setIsIntroVisible(false);
  };

  if (isIntroVisible) {
    return <IntroAnimation onAnimationEnd={handleIntroEnd} />;
  }


  let content;
  if (path === '/admin') {
    content = <AdminLoginPage />;
  } else if (path === '/thank-you') {
    content = <ThankYouPage />;
  } else if (path === '/questionnaire') {
    content = <QuestionnairePage />;
  } else if (path === '/intro') {
    content = <IntroPage />;
  }
  else {
    content = <MainSite />;
  }

  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  );
};

export default App;
