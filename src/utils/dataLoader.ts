import { SprayCan as Spray, PenTool as Tool, TrendingUp, Wrench } from 'lucide-react';
import { readMarkdownFiles, sortByProperty, ParsedMarkdown } from './markdown';
import type { 
  ServiceType, 
  ProcessStepType, 
  TestimonialType, 
  ProjectType, 
  BusinessHoursType 
} from '../data/config';

// Define interfaces for CMS content structures
export interface ServiceFrontmatter {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessFrontmatter {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface TestimonialFrontmatter {
  id: number;
  name: string;
  position: string;
  rating: number;
}

export interface ProjectFrontmatter {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface BusinessHoursFrontmatter {
  title: string;
  hours: string;
  order: number;
  active?: boolean;
}

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Wrench': Wrench,
  'Tool': Tool,
  'Spray': Spray,
  'TrendingUp': TrendingUp
};

// Define file paths for each content type
const SERVICE_FILES = [
  '/content/services/panel-beating.md',
  '/content/services/rust-remediation.md', 
  '/content/services/welding.md',
  '/content/services/refinishing.md'
];

const PROCESS_FILES = [
  '/content/process/01-initial-assessment.md',
  '/content/process/02-disassembly-documentation.md',
  '/content/process/03-structural-restoration.md',
  '/content/process/04-panel-work-fabrication.md',
  '/content/process/05-surface-preparation.md',
  '/content/process/06-paint-application-finishing.md'
];

const TESTIMONIAL_FILES = [
  '/content/testimonials/james-anderson.md',
  '/content/testimonials/sarah-mitchell.md',
  '/content/testimonials/robert-thompson.md',
  '/content/testimonials/test-testimonial.md',
  '/content/testimonials/cms-test-user.md'
];

const PORTFOLIO_FILES = [
  '/content/portfolio/mustang-restoration.md',
  '/content/portfolio/bmw-m4-repair.md',
  '/content/portfolio/porsche-356-restoration.md'
];

const BUSINESS_HOURS_FILES = [
  '/content/business-hours/monday-friday.md',
  '/content/business-hours/saturday.md',
  '/content/business-hours/sunday.md'
];

/**
 * Load services from CMS markdown files
 */
export async function loadServices(): Promise<ServiceType[]> {
  try {
    const servicesData = await readMarkdownFiles<ServiceFrontmatter>(SERVICE_FILES);
    
    return servicesData.map(service => ({
      id: service.frontmatter.id,
      title: service.frontmatter.title,
      description: service.frontmatter.description,
      icon: iconMap[service.frontmatter.icon] || Wrench
    }));
  } catch (error) {
    console.warn('Failed to load services:', error);
    return [];
  }
}

/**
 * Load process steps from CMS markdown files
 */
export async function loadProcess(): Promise<ProcessStepType[]> {
  try {
    const processData = await readMarkdownFiles<ProcessFrontmatter>(PROCESS_FILES);
    
    // Sort by order property
    const sortedProcess = sortByProperty(
      processData.map(step => ({
        id: step.frontmatter.id,
        title: step.frontmatter.title,
        description: step.frontmatter.description,
        order: step.frontmatter.order || step.frontmatter.id
      })), 
      'order', 
      'asc'
    );

    return sortedProcess;
  } catch (error) {
    console.warn('Failed to load process:', error);
    return [];
  }
}

/**
 * Load testimonials from CMS markdown files
 */
export async function loadTestimonials(): Promise<TestimonialType[]> {
  try {
    const testimonialsData = await readMarkdownFiles<TestimonialFrontmatter>(TESTIMONIAL_FILES);
    
    return testimonialsData
      .map(testimonial => ({
        id: testimonial.frontmatter.id,
        name: testimonial.frontmatter.name,
        position: testimonial.frontmatter.position,
        content: testimonial.content,
        rating: testimonial.frontmatter.rating
      }))
      .filter(testimonial => testimonial.id && testimonial.name); // Filter out incomplete entries
  } catch (error) {
    console.warn('Failed to load testimonials:', error);
    return [];
  }
}

/**
 * Load portfolio projects from CMS markdown files
 */
export async function loadPortfolio(): Promise<ProjectType[]> {
  try {
    const portfolioData = await readMarkdownFiles<ProjectFrontmatter>(PORTFOLIO_FILES);
    
    return portfolioData.map(project => ({
      id: project.frontmatter.id,
      title: project.frontmatter.title,
      category: project.frontmatter.category,
      description: project.frontmatter.description,
      beforeImage: project.frontmatter.beforeImage,
      afterImage: project.frontmatter.afterImage
    }));
  } catch (error) {
    console.warn('Failed to load portfolio:', error);
    return [];
  }
}

/**
 * Load business hours from CMS markdown files
 */
export async function loadBusinessHours(): Promise<BusinessHoursType[]> {
  try {
    const businessHoursData = await readMarkdownFiles<BusinessHoursFrontmatter>(BUSINESS_HOURS_FILES);
    
    // Sort by order and filter active hours
    const sortedHours = sortByProperty(
      businessHoursData
        .filter(hours => hours.frontmatter.active !== false)
        .map(hours => ({
          day: hours.frontmatter.title,
          hours: hours.frontmatter.hours,
          order: hours.frontmatter.order || 999
        })), 
      'order', 
      'asc'
    );

    return sortedHours;
  } catch (error) {
    console.warn('Failed to load business hours:', error);
    return [];
  }
}

/**
 * Load all CMS content
 */
export interface CMSData {
  services: ServiceType[];
  process: ProcessStepType[];
  testimonials: TestimonialType[];
  portfolio: ProjectType[];
  businessHours: BusinessHoursType[];
}

export async function loadAllCMSContent(): Promise<CMSData> {
  try {
    const [services, process, testimonials, portfolio, businessHours] = await Promise.all([
      loadServices(),
      loadProcess(),
      loadTestimonials(),
      loadPortfolio(),
      loadBusinessHours()
    ]);
    
    return {
      services,
      process,
      testimonials,
      portfolio,
      businessHours
    };
  } catch (error) {
    console.error('Failed to load CMS content:', error);
    throw error;
  }
}

/**
 * Validation functions to ensure data integrity
 */
export function validateCMSData(cmsData: CMSData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate services
  if (!cmsData.services || cmsData.services.length === 0) {
    errors.push('No services found in CMS data');
  }

  // Validate required service fields
  cmsData.services.forEach((service, index) => {
    if (!service.id) errors.push(`Service ${index} missing id`);
    if (!service.title) errors.push(`Service ${service.id || index} missing title`);
    if (!service.description) errors.push(`Service ${service.id || index} missing description`);
  });

  // Validate process steps
  if (!cmsData.process || cmsData.process.length === 0) {
    errors.push('No process steps found in CMS data');
  }

  // Validate testimonials
  cmsData.testimonials.forEach((testimonial, index) => {
    if (!testimonial.name) errors.push(`Testimonial ${index} missing name`);
    if (!testimonial.content) errors.push(`Testimonial ${testimonial.name || index} missing content`);
    if (testimonial.rating < 1 || testimonial.rating > 5) {
      errors.push(`Testimonial ${testimonial.name || index} has invalid rating: ${testimonial.rating}`);
    }
  });

  // Validate portfolio projects
  cmsData.portfolio.forEach((project, index) => {
    if (!project.id) errors.push(`Portfolio project ${index} missing id`);
    if (!project.title) errors.push(`Portfolio project ${project.id || index} missing title`);
    if (!project.beforeImage) errors.push(`Portfolio project ${project.id || index} missing beforeImage`);
    if (!project.afterImage) errors.push(`Portfolio project ${project.id || index} missing afterImage`);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}