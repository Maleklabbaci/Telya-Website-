
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

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor && anchor.pathname !== window.location.pathname) {
            // It's an external link or a link to another page, let the browser handle it.
            return;
        }
        
        if (anchor && anchor.hash) {
           const mainSitePath = ['/', '/index.html'].includes(window.location.pathname);
           if (!mainSitePath) {
               window.location.href = `/${anchor.hash}`;
           }
        }
    };
    
    window.addEventListener('popstate', onLocationChange);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  let content;
  if (path === '/admin') {
    content = <AdminLoginPage />;
  } else if (path === '/thank-you') {
    content = <ThankYouPage />;
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