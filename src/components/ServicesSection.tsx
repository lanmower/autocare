import React from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { useConfig } from '../hooks/useConfig';

const ServicesSection: React.FC = () => {
  const { config, loading, cmsDataLoaded } = useConfig();

  return (
    <section id="services" className="py-24 bg-zinc-800">
      <Container>
        <SectionHeading 
          title={config.sections.services.title} 
          subtitle={config.sections.services.subtitle}
        />
        
        {/* Show loading state if CMS data is still loading */}
        {loading && config.services.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-zinc-400 mt-4">Loading services...</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {config.services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <div 
                key={service.id}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-8 transition-transform duration-300 hover:-translate-y-2 group"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-amber-500 group-hover:text-zinc-900" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white font-montserrat">
                    {service.title}
                  </h3>
                  
                  <p className="text-zinc-400 flex-grow">
                    {service.description}
                  </p>
                  
                  <a 
                    href="#contact"
                    className="inline-flex items-center text-amber-500 mt-6 group-hover:text-amber-400 transition-colors"
                  >
                    <span className="mr-2">{config.labels.learnMore}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Show data source indicator in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-center mt-8 text-xs text-zinc-500">
            Data source: {cmsDataLoaded ? 'CMS' : 'Fallback'} • Services: {config.services.length}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServicesSection;