import React, { useState } from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import BeforeAfterSlider from './BeforeAfterSlider';
import { useConfig } from '../hooks/useConfig';

const PortfolioSection: React.FC = () => {
  const { config, loading } = useConfig();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(config.portfolio.map(project => project.category)))];
  
  // Filter projects by active category
  const filteredProjects = activeCategory === 'all' 
    ? config.portfolio 
    : config.portfolio.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-zinc-800">
        <Container>
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 bg-zinc-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-lg p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 h-64 bg-zinc-700 rounded animate-pulse"></div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-700 rounded"></div>
                    <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-zinc-800">
      <Container>
        <SectionHeading 
          title={config.sections.portfolio.title}
          subtitle={config.sections.portfolio.subtitle}
        />
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-xl"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/2">
                    <BeforeAfterSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                      className="mb-6"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-amber-500 mb-4 inline-block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 text-white font-montserrat">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      {project.description}
                    </p>
                    <a 
                      href="#contact"
                      className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <span className="mr-2">{config.labels.requestSimilarWork}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PortfolioSection;