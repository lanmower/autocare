import React, { useState } from 'react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import config from '../data/config';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = config.testimonials;

  const handlePrev = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-500/10"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-amber-500/10"></div>
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 rounded-full bg-amber-500/10"></div>
      </div>

      <Container className="relative z-10">
        <SectionHeading 
          title="Client Testimonials" 
          subtitle="What our clients say about our restoration work"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg p-8 shadow-xl">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20}
                          fill={i < testimonial.rating ? "#F59E0B" : "none"}
                          className={i < testimonial.rating ? "text-amber-500" : "text-zinc-600"}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl text-zinc-300 italic mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-amber-500 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-white">{testimonial.name}</p>
                        <p className="text-sm text-zinc-400">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeIndex === index 
                        ? 'bg-amber-500' 
                        : 'bg-zinc-700 hover:bg-zinc-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
              
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;