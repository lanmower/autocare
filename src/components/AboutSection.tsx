import React from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { useConfig } from '../hooks/useConfig';
import { BookmarkCheck } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <section id="about" className="py-24 bg-zinc-900">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-pulse">
              <div className="h-8 bg-zinc-700 rounded w-3/4 mb-8"></div>
              <div className="h-4 bg-zinc-700 rounded mb-4"></div>
              <div className="h-4 bg-zinc-700 rounded mb-4"></div>
              <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-96 bg-zinc-700 rounded-lg"></div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-zinc-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <SectionHeading 
              title={config.about.title}
              alignment="left"
              className="mb-8"
            />
            
            <p className="text-zinc-300 mb-8">
              {config.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-amber-500">
                    <BookmarkCheck size={20} />
                  </div>
                  <p className="text-zinc-300">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src={config.about.image} 
                alt={config.about.imageAlt}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                style={{ height: '500px' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-zinc-800 rounded-lg p-6 shadow-xl">
                <p className="text-4xl font-bold text-amber-500 font-montserrat">{config.about.yearsExperience}</p>
                <p className="text-zinc-300 text-sm uppercase tracking-wider font-semibold">{config.labels.yearsExperience}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;