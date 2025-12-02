import { loadAllCMSContent, validateCMSData, type CMSData } from '../utils/dataLoader';
import type { 
  ServiceType, 
  ProcessStepType, 
  TestimonialType, 
  ProjectType, 
  BusinessHoursType 
} from './config';

// Enhanced configuration interface that combines static and dynamic data
export interface UnifiedConfig {
  // Static configuration (from config.ts)
  branding: {
    slogan: string;
    name: string;
    nameParts: {
      first: string;
      second: string;
    };
  };

  navigation: {
    items: Array<{ label: string; href: string }>;
    buttons: {
      quote: string;
      contact: string;
      toggleMenu: string;
    };
  };

  labels: {
    scrollDown: string;
    yearsExperience: string;
    learnMore: string;
    requestSimilarWork: string;
    sendMessage: string;
    selectService: string;
    other: string;
    before: string;
    after: string;
  };

  siteMetadata: {
    title: string;
    description: string;
    keywords: string;
    siteUrl: string;
    phone: string;
    email: string;
    address: string;
    googleMapsUrl: string;
  };

  sections: {
    services: {
      title: string;
      subtitle: string;
    };
    process: {
      title: string;
      subtitle: string;
    };
    portfolio: {
      title: string;
      subtitle: string;
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    contact: {
      title: string;
      formTitle: string;
    };
  };

  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };

  about: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    highlights: string[];
  };

  contact: {
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    mapLocation: {
      lat: number;
      lng: number;
      zoom: number;
    };
    form: {
      labels: {
        fullName: string;
        email: string;
        phone: string;
        phoneLabel: string;
        emailLabel: string;
        location: string;
        businessHours: string;
        serviceType: string;
        message: string;
      };
      placeholders: {
        message: string;
      };
      accessibility: {
        mapTitle: string;
      };
    };
  };

  footer: {
    copyrightText: string;
    brandName: string;
    brandNameParts: {
      first: string;
      second: string;
    };
    description: string;
    sections: {
      quickLinks: string;
      contactUs: string;
    };
    socialLinks: Array<{
      platform: string;
      url: string;
    }>;
  };

  accessibility: {
    testimonials: {
      previous: string;
      next: string;
      goTo: string;
    };
  };

  // Dynamic data (from CMS)
  services: ServiceType[];
  process: ProcessStepType[];
  testimonials: TestimonialType[];
  portfolio: ProjectType[];
  businessHours: BusinessHoursType[];

  // Metadata about the data loading
  dataSource: {
    cmsLoaded: boolean;
    lastUpdated: Date;
    errors: string[];
  };
}

// Static configuration (everything except the dynamic content)
const staticConfig = {
  branding: {
    slogan: "your restoration is our care",
    name: "AutoCare",
    nameParts: {
      first: "Auto",
      second: "Care"
    }
  },

  navigation: {
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' }
    ],
    buttons: {
      quote: "Get a Quote",
      contact: "Contact Us",
      toggleMenu: "Toggle menu"
    }
  },

  labels: {
    scrollDown: "Scroll down",
    yearsExperience: "Years Experience",
    learnMore: "Learn More",
    requestSimilarWork: "Request Similar Work",
    sendMessage: "Send Message",
    selectService: "Select a service",
    other: "Other",
    before: "BEFORE",
    after: "AFTER"
  },
  
  siteMetadata: {
    title: "AutoCare | Umtentweni",
    description: "Specialized auto body restoration services in Umtentweni. Expert panel beating, custom fabrication, and precision restoration for classic and modern vehicles.",
    keywords: "auto restoration, panel beating, Umtentweni, car restoration, custom fabrication, auto body repair",
    siteUrl: "https://autocare.co.za",
    phone: "+27 64 163 7521",
    email: "info@autocare.co.za",
    address: "17 Marine Drive, Umtentweni, 4235, South Africa",
    googleMapsUrl: "https://maps.google.com/?q=-30.7196,30.4554",
  },
  
  sections: {
    services: {
      title: "Specialized Services",
      subtitle: "Expert craftsmanship for every aspect of auto body restoration"
    },
    process: {
      title: "Our Restoration Process",
      subtitle: "A methodical approach to ensure quality and precision in every project"
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle: "Explore our restoration and repair projects"
    },
    testimonials: {
      title: "Client Testimonials",
      subtitle: "What our clients say about our restoration work"
    },
    contact: {
      title: "Contact Information",
      formTitle: "Send Us a Message"
    }
  },

  hero: {
    title: "Precision Auto Body Restoration",
    subtitle: "Bringing vehicles back to their original glory with expert craftsmanship",
    description: "Personalized auto body restoration with direct owner involvement. Every vehicle receives individual attention and custom solutions tailored to your specific needs and preferences.",
    ctaText: "View Our Work",
    ctaLink: "#portfolio",
    backgroundImage: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  
  about: {
    title: "Personal Attention, Professional Results",
    description: "At AutoCare, we believe every vehicle deserves personal attention. As a small, family-owned business, we work directly with each customer to understand their vision and preferences. Our flexible approach means we can accommodate special requests and adapt our process to your specific needs - something larger operations simply cannot offer.",
    image: "https://images.pexels.com/photos/3807317/pexels-photo-3807317.jpeg?auto=compress&cs=tinysrgb&w=1280",
    imageAlt: "Auto restoration craftsman at work",
    highlights: [
      "Direct owner involvement in every project",
      "Flexible approach to meet your specific needs",
      "Personal consultation on all restoration decisions",
      "Small business agility with professional results"
    ]
  },
  
  contact: {
    title: "Let's Talk About Your Vision",
    description: "Schedule a personal consultation to discuss your restoration goals. We'll work with you to create a customized approach that reflects your preferences and budget.",
    phone: "+27 64 163 7521",
    email: "info@autocare.co.za",
    address: "17 Marine Drive, Umtentweni, 4235, South Africa",
    mapLocation: {
      lat: -30.7196,
      lng: 30.4554,
      zoom: 15
    },
    form: {
      labels: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        phoneLabel: "Phone Number",
        emailLabel: "Email Address",
        location: "Our Location",
        businessHours: "Business Hours",
        serviceType: "Service Type",
        message: "Message"
      },
      placeholders: {
        message: "Tell us about your project..."
      },
      accessibility: {
        mapTitle: "Google Maps"
      }
    }
  },
  
  footer: {
    copyrightText: `© ${new Date().getFullYear()} AutoCare. All rights reserved.`,
    brandName: "PremierAuto",
    brandNameParts: {
      first: "Premier",
      second: "Auto"
    },
    description: "Family-owned restoration specialists providing personalized service and flexible solutions. Every project receives direct owner attention and custom approaches tailored to your vision.",
    sections: {
      quickLinks: "Quick Links",
      contactUs: "Contact Us"
    },
    socialLinks: [
      { platform: "Facebook", url: "https://facebook.com/" },
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "YouTube", url: "https://youtube.com/" }
    ]
  },

  accessibility: {
    testimonials: {
      previous: "Previous testimonial",
      next: "Next testimonial",
      goTo: "Go to testimonial"
    }
  }
};

/**
 * Create unified configuration by combining static config with CMS data
 */
export async function createUnifiedConfig(): Promise<UnifiedConfig> {
  let cmsData: CMSData;
  let cmsLoaded = false;
  let errors: string[] = [];

  try {
    // Load CMS data
    cmsData = await loadAllCMSContent();
    
    // Validate the loaded data
    const validation = validateCMSData(cmsData);
    if (!validation.isValid) {
      errors = validation.errors;
      console.warn('CMS data validation failed:', errors);
    } else {
      cmsLoaded = true;
    }
  } catch (error) {
    console.error('Failed to load CMS content:', error);
    errors.push(`Failed to load CMS content: ${error}`);
    
    // Fallback to empty arrays
    cmsData = {
      services: [],
      process: [],
      testimonials: [],
      portfolio: [],
      businessHours: []
    };
  }

  // Create unified configuration
  return {
    ...staticConfig,
    ...cmsData,
    dataSource: {
      cmsLoaded,
      lastUpdated: new Date(),
      errors
    }
  };
}

// Create and export a promise-based unified configuration
let unifiedConfigPromise: Promise<UnifiedConfig> | null = null;

/**
 * Get the unified configuration (loads CMS data on first call)
 */
export function getUnifiedConfig(): Promise<UnifiedConfig> {
  if (!unifiedConfigPromise) {
    unifiedConfigPromise = createUnifiedConfig();
  }
  return unifiedConfigPromise;
}

/**
 * Synchronous fallback configuration (without CMS data)
 */
const fallbackUnifiedConfig: UnifiedConfig = {
  ...staticConfig,
  services: [],
  process: [],
  testimonials: [],
  portfolio: [],
  businessHours: [],
  dataSource: {
    cmsLoaded: false,
    lastUpdated: new Date(),
    errors: ['CMS data not loaded - using fallback configuration']
  }
};

export default fallbackUnifiedConfig;
export { fallbackUnifiedConfig };