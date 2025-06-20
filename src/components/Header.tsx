import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Wrench } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import config from '../data/config';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-900/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-amber-500 mr-2" />
              <span className="font-montserrat font-bold text-xl text-white">
                Auto<span className="text-amber-500">Care</span>
              </span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="text-zinc-300 hover:text-amber-500 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href={`tel:${config.siteMetadata.phone}`}
              className="flex items-center text-amber-500 hover:text-amber-400 transition-colors mr-6"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>{config.siteMetadata.phone}</span>
            </a>
            <Button variant="primary" size="md">
              Get a Quote
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 shadow-lg py-4">
            <div className="flex flex-col space-y-3 px-4">
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href}
                  className="text-zinc-300 hover:text-amber-500 transition-colors py-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <a 
                  href={`tel:${config.siteMetadata.phone}`}
                  className="flex items-center text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{config.siteMetadata.phone}</span>
                </a>
                <Button variant="primary" size="md" className="w-full">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;