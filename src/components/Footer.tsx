import React from 'react';
import Container from './ui/Container';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Wrench } from 'lucide-react';
import config from '../data/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Wrench className="h-8 w-8 text-amber-500 mr-2" />
                <span className="font-montserrat font-bold text-xl text-white">
                  Premier<span className="text-amber-500">Auto</span>
                </span>
              </div>
              <p className="text-zinc-400 mb-6">
                South Coast's premier auto body restoration specialists with over 25 years of experience in reviving classic and modern vehicles.
              </p>
              <div className="flex space-x-4">
                {config.footer.socialLinks.map((link, index) => {
                  let Icon;
                  switch (link.platform) {
                    case 'Facebook':
                      Icon = Facebook;
                      break;
                    case 'Instagram':
                      Icon = Instagram;
                      break;
                    case 'YouTube':
                      Icon = Youtube;
                      break;
                    default:
                      Icon = Facebook;
                  }
                  
                  return (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:border-amber-600 hover:text-black transition-colors"
                      aria-label={link.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <nav className="grid grid-cols-1 gap-3">
                <a href="#home" className="text-zinc-400 hover:text-amber-500 transition-colors">Home</a>
                <a href="#services" className="text-zinc-400 hover:text-amber-500 transition-colors">Services</a>
                <a href="#process" className="text-zinc-400 hover:text-amber-500 transition-colors">Process</a>
                <a href="#portfolio" className="text-zinc-400 hover:text-amber-500 transition-colors">Portfolio</a>
                <a href="#testimonials" className="text-zinc-400 hover:text-amber-500 transition-colors">Testimonials</a>
                <a href="#contact" className="text-zinc-400 hover:text-amber-500 transition-colors">Contact</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <address className="text-zinc-400 not-italic">
                    {config.siteMetadata.address}
                  </address>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <a 
                    href={`tel:${config.siteMetadata.phone}`}
                    className="text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {config.siteMetadata.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <a 
                    href={`mailto:${config.siteMetadata.email}`}
                    className="text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {config.siteMetadata.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            {config.footer.copyrightText}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;