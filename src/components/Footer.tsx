import React from 'react';
import Container from './ui/Container';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Wrench } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';

const Footer: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <Container>
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
              </div>
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-zinc-700 rounded w-1/2"></div>
                  ))}
                </div>
              </div>
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-zinc-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
  
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Wrench className="h-8 w-8 text-amber-500 mr-2" />
                <span className="font-montserrat font-bold text-xl text-white">
                  {config.footer.brandNameParts.first}<span className="text-amber-500">{config.footer.brandNameParts.second}</span>
                </span>
              </div>
              <p className="text-zinc-400 mb-6">
                {config.footer.description}
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
              <h3 className="text-lg font-semibold text-white mb-6">{config.footer.sections.quickLinks}</h3>
              <nav className="grid grid-cols-1 gap-3">
                {config.navigation.items.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{config.footer.sections.contactUs}</h3>
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