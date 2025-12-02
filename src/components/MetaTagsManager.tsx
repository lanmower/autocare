import { useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';

/**
 * Component to manage dynamic meta tags based on configuration
 * This updates document head with proper SEO and social media meta tags
 */
const MetaTagsManager: React.FC = () => {
  const { config, loading } = useConfig();

  useEffect(() => {
    if (loading) return;

    // Update document title
    document.title = config.siteMetadata.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', config.siteMetadata.description);
    updateMetaTag('keywords', config.siteMetadata.keywords);
    
    // Open Graph meta tags for social media
    updateMetaTag('og:title', config.siteMetadata.title, true);
    updateMetaTag('og:description', config.siteMetadata.description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', config.siteMetadata.siteUrl, true);
    updateMetaTag('og:site_name', config.branding.name, true);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', config.siteMetadata.title);
    updateMetaTag('twitter:description', config.siteMetadata.description);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.siteMetadata.siteUrl;

    // Structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": config.branding.name,
      "description": config.siteMetadata.description,
      "url": config.siteMetadata.siteUrl,
      "telephone": config.siteMetadata.phone,
      "email": config.siteMetadata.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.siteMetadata.address,
        "addressCountry": "ZA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": config.contact.mapLocation.lat,
        "longitude": config.contact.mapLocation.lng
      },
      "openingHours": config.businessHours.map(hours => {
        if (hours.day === "Sunday" && hours.hours === "Closed") return null;
        
        // Convert "Monday - Friday" to schema format
        if (hours.day.includes(" - ")) {
          const [start, end] = hours.day.split(" - ");
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
          const startIndex = days.indexOf(start);
          const endIndex = days.indexOf(end);
          
          if (startIndex !== -1 && endIndex !== -1) {
            return days.slice(startIndex, endIndex + 1).map(day => 
              `${day.substring(0, 2)} ${hours.hours}`
            ).join(",");
          }
        }
        
        return `${hours.day.substring(0, 2)} ${hours.hours}`;
      }).filter(Boolean),
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": config.testimonials.length.toString()
      }
    };

    // Add or update structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData, null, 2);

    // Add viewport meta if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }

    // Add charset meta if not present  
    if (!document.querySelector('meta[charset]')) {
      const charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charset, document.head.firstChild);
    }

  }, [config, loading]);

  // This component doesn't render anything
  return null;
};

export default MetaTagsManager;