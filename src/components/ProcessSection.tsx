import React from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import config from '../data/config';

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          <path 
            d="M10 10 H190 V190 H10 Z" 
            stroke="url(#gradient)" 
            strokeWidth="1.5"
            strokeDasharray="10 5"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <Container className="relative z-10">
        <SectionHeading 
          title="Our Restoration Process"
          subtitle="A methodical approach to ensure quality and precision in every project"
        />
        
        <div className="max-w-5xl mx-auto">
          {config.process.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col md:flex-row mb-16 last:mb-0 relative"
            >
              {/* Timeline connector */}
              {index < config.process.length - 1 && (
                <div className="hidden md:block absolute left-9 top-16 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 to-amber-600/30"></div>
              )}
              
              {/* Step number */}
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-2xl font-montserrat mb-6 md:mb-0 relative z-10">
                {step.id}
              </div>
              
              {/* Step content */}
              <div className="md:ml-8 md:mt-4">
                <h3 className="text-xl font-bold mb-3 text-white font-montserrat">
                  {step.title}
                </h3>
                <p className="text-zinc-400 max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;