
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="bg-white text-gray-800 font-inter">
          <Header />
          <main>
            <ScrollToTopOnNavigate />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/portafolio" element={<Portfolio />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
