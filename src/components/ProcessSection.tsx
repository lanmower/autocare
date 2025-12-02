import React from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { useConfig } from '../hooks/useConfig';

const ProcessSection: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <section id="process" className="py-24 bg-zinc-900">
        <Container>
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 bg-zinc-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-zinc-700 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
                  <div className="h-4 bg-zinc-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

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
          title={config.sections.process.title}
          subtitle={config.sections.process.subtitle}
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