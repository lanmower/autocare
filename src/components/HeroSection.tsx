import React from 'react';
import { ChevronDown } from 'lucide-react';
import Button from './ui/Button';
import config from '../data/config';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${config.hero.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/80 to-zinc-900"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-montserrat mb-6 text-white leading-tight">
          {config.hero.title}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            {config.hero.subtitle}
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
          {config.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => document.querySelector(config.hero.ctaLink)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {config.hero.ctaText}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/70 text-amber-500 hover:text-amber-400 transition-colors focus:outline-none"
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down"
        >
          <ChevronDown />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;