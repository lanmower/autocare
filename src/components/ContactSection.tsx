import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { useConfig } from '../hooks/useConfig';

const ContactSection: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <section id="contact" className="py-24 bg-zinc-900">
        <Container>
          <div className="animate-pulse text-center mb-16">
            <div className="h-8 bg-zinc-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-zinc-800 rounded-lg p-8 space-y-4">
              <div className="h-6 bg-zinc-700 rounded w-1/2"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-6 h-6 bg-zinc-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
                    <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-800 rounded-lg p-8 space-y-6">
              <div className="h-6 bg-zinc-700 rounded w-1/2"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-zinc-700 rounded"></div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-zinc-900">
      <Container>
        <SectionHeading 
          title={config.contact.title} 
          subtitle={config.contact.description}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 h-full">
            <h3 className="text-xl font-bold mb-6 text-white">{config.sections.contact.title}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-zinc-400 mb-1">{config.contact.form.labels.phoneLabel}</p>
                  <a 
                    href={`tel:${config.contact.phone}`} 
                    className="text-white hover:text-amber-500 transition-colors"
                  >
                    {config.contact.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-zinc-400 mb-1">{config.contact.form.labels.emailLabel}</p>
                  <a 
                    href={`mailto:${config.contact.email}`} 
                    className="text-white hover:text-amber-500 transition-colors"
                  >
                    {config.contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-zinc-400 mb-1">{config.contact.form.labels.location}</p>
                  <address className="text-white not-italic">
                    {config.contact.address}
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-zinc-400 mb-1">{config.contact.form.labels.businessHours}</p>
                  <div className="space-y-2">
                    {config.businessHours.map((hours, index) => (
                      <div key={index} className="flex justify-between text-white">
                        <span className="font-medium">{hours.day}</span>
                        <span className="text-zinc-400">{hours.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <h3 className="text-xl font-bold mb-6 text-white">{config.sections.contact.formTitle}</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                    {config.contact.form.labels.fullName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                    {config.contact.form.labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-1">
                  {config.contact.form.labels.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-zinc-400 mb-1">
                  {config.contact.form.labels.serviceType}
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">{config.labels.selectService}</option>
                  {config.services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                  <option value="other">{config.labels.other}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
                  {config.contact.form.labels.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={config.contact.form.placeholders.message}
                ></textarea>
              </div>
              
              <div>
                <Button variant="primary" size="lg" className="w-full">
                  {config.labels.sendMessage}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Google Maps */}
        <div className="mt-16 h-80 bg-zinc-800 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(config.contact.address)}&zoom=${config.contact.mapLocation.zoom}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={config.contact.form.accessibility.mapTitle}
            className="grayscale brightness-75 contrast-125"
          ></iframe>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;