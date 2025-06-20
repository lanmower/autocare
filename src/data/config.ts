import { BookmarkCheck, ChevronDown, MapPin, Phone, SprayCan as Spray, PenTool as Tool, TrendingUp, Wrench } from 'lucide-react';

export type ServiceType = {
  id: string;
  title: string;
  description: string;
  icon: any;
};

export type ProcessStepType = {
  id: number;
  title: string;
  description: string;
};

export type TestimonialType = {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
};

export type ProjectType = {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
};

export type BusinessHoursType = {
  day: string;
  hours: string;
};

const config = {
  siteMetadata: {
    title: "AutoCare | Umtentweni",
    description: "Specialized auto body restoration services in Umtentweni. Expert panel beating, custom fabrication, and precision restoration for classic and modern vehicles.",
    keywords: "auto restoration, panel beating, Umtentweni, car restoration, custom fabrication, auto body repair",
    siteUrl: "https://autocare.co.za",
    phone: "+27 39 695 0122",
    email: "info@autocare.co.za",
    address: "17 Marine Drive, Umtentweni, 4235, South Africa",
    googleMapsUrl: "https://maps.google.com/?q=-30.7196,30.4554",
  },
  
  hero: {
    title: "Precision Auto Body Restoration",
    subtitle: "Bringing vehicles back to their original glory with expert craftsmanship",
    description: "South Coast's premier auto body restoration specialists with over 25 years of experience in reviving classic and modern vehicles.",
    ctaText: "View Our Work",
    ctaLink: "#portfolio",
    backgroundImage: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  
  about: {
    title: "Craftsmanship Beyond Compare",
    description: "At AutoCare, we combine traditional techniques with modern technology to deliver restorations that exceed expectations. Our team of master craftsmen have decades of experience bringing vehicles back to showroom condition.",
    image: "https://images.pexels.com/photos/3807317/pexels-photo-3807317.jpeg?auto=compress&cs=tinysrgb&w=1280",
    highlights: [
      "25+ years of specialist experience",
      "Award-winning restoration projects",
      "Cutting-edge equipment and facilities",
      "Personalized service for every client"
    ]
  },
  
  services: [
    {
      id: "panel-beating",
      title: "Custom Panel Fabrication",
      description: "Our master panel beaters hand-craft custom panels for restoration projects where original parts are unavailable or beyond repair. Using traditional English wheels and modern forming techniques, we create panels that match the original specifications exactly.",
      icon: Wrench
    },
    {
      id: "rust-remediation",
      title: "Comprehensive Rust Remediation",
      description: "We specialize in treating and preventing rust using industry-leading techniques. From minor surface rust to structural corrosion, our team meticulously removes damaged material and replaces it with properly treated new metal.",
      icon: Tool
    },
    {
      id: "welding",
      title: "Precision TIG/MIG Welding",
      description: "Our certified welders use state-of-the-art TIG and MIG welding equipment for seamless, strong joints. We specialize in aluminum, stainless steel, and high-strength steel welding for structural and cosmetic applications.",
      icon: Spray
    },
    {
      id: "refinishing",
      title: "Concours-Level Refinishing",
      description: "Using premium paint systems and meticulous preparation, our refinishing department achieves flawless results. Our climate-controlled spray booth and color-matching technology ensure perfect finishes that stand the test of time.",
      icon: TrendingUp
    }
  ],
  
  process: [
    {
      id: 1,
      title: "Initial Assessment",
      description: "We begin with a comprehensive evaluation of your vehicle's condition, documenting every area needing attention and creating a detailed restoration plan."
    },
    {
      id: 2,
      title: "Disassembly & Documentation",
      description: "Careful disassembly with meticulous documentation of all components ensures everything is preserved and properly cataloged for reassembly."
    },
    {
      id: 3,
      title: "Structural Restoration",
      description: "We address all structural issues, replacing compromised metal, treating corrosion, and ensuring the vehicle's integrity is fully restored."
    },
    {
      id: 4,
      title: "Panel Work & Fabrication",
      description: "Our craftsmen repair or fabricate body panels, ensuring perfect fitment and alignment before moving to the refinishing stage."
    },
    {
      id: 5,
      title: "Surface Preparation",
      description: "Extensive preparation includes multiple stages of sanding, priming, and blocking to create the perfect foundation for the final finish."
    },
    {
      id: 6,
      title: "Paint Application & Finishing",
      description: "Multiple layers of premium basecoat and clearcoat are applied in our controlled environment, followed by wet sanding and polishing for a flawless finish."
    }
  ],
  
  portfolio: [
    {
      id: "project-1",
      title: "1967 Mustang Fastback",
      category: "Classic Restoration",
      description: "Complete frame-off restoration of a classic American muscle car. Every component was disassembled, restored, and reassembled to factory specifications.",
      beforeImage: "https://images.pexels.com/photos/9553704/pexels-photo-9553704.jpeg?auto=compress&cs=tinysrgb&w=1280",
      afterImage: "https://images.pexels.com/photos/12726763/pexels-photo-12726763.jpeg?auto=compress&cs=tinysrgb&w=1280"
    },
    {
      id: "project-2",
      title: "2018 BMW M4 Collision Repair",
      category: "Modern Repair",
      description: "Comprehensive collision repair after a significant front-end impact. Structural components were replaced and all systems restored to factory specifications.",
      beforeImage: "https://images.pexels.com/photos/7196195/pexels-photo-7196195.jpeg?auto=compress&cs=tinysrgb&w=1280",
      afterImage: "https://images.pexels.com/photos/12511453/pexels-photo-12511453.jpeg?auto=compress&cs=tinysrgb&w=1280"
    },
    {
      id: "project-3",
      title: "1958 Porsche 356",
      category: "Vintage Restoration",
      description: "Meticulous restoration of a rare European classic. Extensive rust remediation and custom panel fabrication were required to bring this vehicle back to concours condition.",
      beforeImage: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1280",
      afterImage: "https://images.pexels.com/photos/12903086/pexels-photo-12903086.jpeg?auto=compress&cs=tinysrgb&w=1280"
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: "James Anderson",
      position: "Vintage Car Collector",
      content: "Their attention to detail is unmatched. The restoration of my 356 exceeded all expectations, with historically accurate techniques and materials used throughout.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      position: "Insurance Adjuster",
      content: "As an insurance professional, I've worked with many restoration shops. AutoCare stands head and shoulders above the rest in quality, communication, and timeliness.",
      rating: 5
    },
    {
      id: 3,
      name: "Robert Thompson",
      position: "Classic Car Club President",
      content: "Our members exclusively recommend AutoCare for significant restoration projects. Their craftsmanship and knowledge of historical accuracy is simply outstanding.",
      rating: 5
    }
  ],
  
  contact: {
    title: "Get In Touch",
    description: "Contact us to discuss your restoration needs or schedule an assessment of your vehicle.",
    phone: "+27 39 695 0122",
    email: "info@autocare.co.za",
    address: "17 Marine Drive, Umtentweni, 4235, South Africa",
    mapLocation: {
      lat: -30.7196,
      lng: 30.4554,
      zoom: 15
    }
  },
  
  businessHours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  
  footer: {
    copyrightText: `© ${new Date().getFullYear()} AutoCare. All rights reserved.`,
    socialLinks: [
      { platform: "Facebook", url: "https://facebook.com/" },
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "YouTube", url: "https://youtube.com/" }
    ]
  }
};

export default config;