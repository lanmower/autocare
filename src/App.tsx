import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ConfigStatus from './components/ConfigStatus';
import MetaTagsManager from './components/MetaTagsManager';

function App() {
  // Handle admin route redirect
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      window.location.href = '/admin/index.html';
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MetaTagsManager />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Development tools */}
      <ConfigStatus />
    </div>
  );
}

export default App;