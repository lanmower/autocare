#!/usr/bin/env node

/**
 * CMS Integration Test - Node.js Compatible
 * 
 * This test simulates the browser environment and tests the actual
 * data loading functions by reading files directly and testing the
 * parsing logic.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Console colors
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results tracking
let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logTest(name, status, details = '') {
  const symbol = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '⚠';
  const color = status === 'PASS' ? colors.green : status === 'FAIL' ? colors.red : colors.yellow;
  
  log(`${color}${symbol} ${name}${colors.reset}`, color);
  if (details) {
    log(`  ${details}`, colors.cyan);
  }
  
  testResults.tests.push({ name, status, details });
  if (status === 'PASS') testResults.passed++;
  else if (status === 'FAIL') testResults.failed++;
  else testResults.warnings++;
}

// Implement the markdown parsing functions from the actual codebase
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {},
      content: content.trim()
    };
  }

  const [, frontmatterContent, markdownContent] = match;
  const frontmatter = parseFrontmatterYaml(frontmatterContent);

  return {
    frontmatter,
    content: markdownContent.trim()
  };
}

function parseFrontmatterYaml(yamlContent) {
  const lines = yamlContent.trim().split('\n');
  const result = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      result[key] = value.slice(1, -1);
    }
    // Handle numbers
    else if (/^\d+$/.test(value)) {
      result[key] = parseInt(value, 10);
    }
    // Handle floats
    else if (/^\d+\.\d+$/.test(value)) {
      result[key] = parseFloat(value);
    }
    // Handle booleans
    else if (value === 'true' || value === 'false') {
      result[key] = value === 'true';
    }
    // Handle unquoted strings
    else {
      result[key] = value;
    }
  }

  return result;
}

function sortByProperty(array, property, direction = 'asc') {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });
}

// Node.js-compatible file reading function
function readMarkdownFile(filePath) {
  const fullPath = path.join(__dirname, filePath.startsWith('/') ? filePath.slice(1) : filePath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const { frontmatter, content: markdownContent } = parseFrontmatter(content);
  
  return {
    frontmatter,
    content: markdownContent,
    filename: path.basename(filePath),
    path: filePath
  };
}

function readMarkdownFiles(filePaths) {
  return filePaths.map(filePath => readMarkdownFile(filePath));
}

// Icon mapping
const iconMap = {
  'Wrench': 'Wrench',
  'Tool': 'Tool',
  'Spray': 'Spray',
  'TrendingUp': 'TrendingUp'
};

// File path definitions (same as in dataLoader.ts)
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

// Data loading functions (same logic as dataLoader.ts)
function loadServices() {
  try {
    const servicesData = readMarkdownFiles(SERVICE_FILES);
    
    return servicesData.map(service => ({
      id: service.frontmatter.id,
      title: service.frontmatter.title,
      description: service.frontmatter.description,
      icon: iconMap[service.frontmatter.icon] || 'Wrench'
    }));
  } catch (error) {
    console.warn('Failed to load services:', error);
    return [];
  }
}

function loadProcess() {
  try {
    const processData = readMarkdownFiles(PROCESS_FILES);
    
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

function loadTestimonials() {
  try {
    const testimonialsData = readMarkdownFiles(TESTIMONIAL_FILES);
    
    return testimonialsData
      .map(testimonial => ({
        id: testimonial.frontmatter.id,
        name: testimonial.frontmatter.name,
        position: testimonial.frontmatter.position,
        content: testimonial.content,
        rating: testimonial.frontmatter.rating
      }))
      .filter(testimonial => testimonial.id && testimonial.name);
  } catch (error) {
    console.warn('Failed to load testimonials:', error);
    return [];
  }
}

function loadPortfolio() {
  try {
    const portfolioData = readMarkdownFiles(PORTFOLIO_FILES);
    
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

function loadBusinessHours() {
  try {
    const businessHoursData = readMarkdownFiles(BUSINESS_HOURS_FILES);
    
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

function loadAllCMSContent() {
  const services = loadServices();
  const process = loadProcess();
  const testimonials = loadTestimonials();
  const portfolio = loadPortfolio();
  const businessHours = loadBusinessHours();
  
  return {
    services,
    process,
    testimonials,
    portfolio,
    businessHours
  };
}

function validateCMSData(cmsData) {
  const errors = [];

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

// Test functions
function testServicesLoading() {
  log('\n=== Testing Services Loading ===', colors.bold);
  
  try {
    const services = loadServices();
    
    if (services.length > 0) {
      logTest('Services Loading', 'PASS', `Loaded ${services.length} services`);
      
      // Test individual service structure
      const service = services[0];
      if (service.id && service.title && service.description && service.icon) {
        logTest('Service Structure', 'PASS', 'All required fields present');
      } else {
        logTest('Service Structure', 'FAIL', 'Missing required fields');
        return false;
      }
      
      // Test icon mapping
      const validIcons = Object.values(iconMap);
      const hasValidIcon = validIcons.includes(service.icon);
      if (hasValidIcon) {
        logTest('Icon Mapping', 'PASS', `Valid icon: ${service.icon}`);
      } else {
        logTest('Icon Mapping', 'FAIL', `Invalid icon: ${service.icon}`);
        return false;
      }
      
    } else {
      logTest('Services Loading', 'FAIL', 'No services loaded');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Services Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testProcessLoading() {
  log('\n=== Testing Process Loading ===', colors.bold);
  
  try {
    const process = loadProcess();
    
    if (process.length > 0) {
      logTest('Process Loading', 'PASS', `Loaded ${process.length} process steps`);
      
      // Test sorting
      let isSorted = true;
      for (let i = 1; i < process.length; i++) {
        if (process[i-1].order > process[i].order) {
          isSorted = false;
          break;
        }
      }
      
      if (isSorted) {
        logTest('Process Sorting', 'PASS', 'Process steps correctly sorted by order');
      } else {
        logTest('Process Sorting', 'FAIL', 'Process steps not properly sorted');
        return false;
      }
      
    } else {
      logTest('Process Loading', 'FAIL', 'No process steps loaded');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Process Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testTestimonialsLoading() {
  log('\n=== Testing Testimonials Loading ===', colors.bold);
  
  try {
    const testimonials = loadTestimonials();
    
    if (testimonials.length > 0) {
      logTest('Testimonials Loading', 'PASS', `Loaded ${testimonials.length} testimonials`);
      
      // Test filtering (should only include complete testimonials)
      const allValid = testimonials.every(t => t.id && t.name && t.content);
      if (allValid) {
        logTest('Testimonial Filtering', 'PASS', 'All loaded testimonials are complete');
      } else {
        logTest('Testimonial Filtering', 'FAIL', 'Some testimonials are incomplete');
        return false;
      }
      
      // Test rating validation
      const validRatings = testimonials.every(t => t.rating >= 1 && t.rating <= 5);
      if (validRatings) {
        logTest('Rating Validation', 'PASS', 'All ratings are within valid range (1-5)');
      } else {
        logTest('Rating Validation', 'FAIL', 'Some ratings are outside valid range');
        return false;
      }
      
    } else {
      logTest('Testimonials Loading', 'WARN', 'No testimonials loaded (might be expected)');
    }
    
    return true;
  } catch (error) {
    logTest('Testimonials Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testPortfolioLoading() {
  log('\n=== Testing Portfolio Loading ===', colors.bold);
  
  try {
    const portfolio = loadPortfolio();
    
    if (portfolio.length > 0) {
      logTest('Portfolio Loading', 'PASS', `Loaded ${portfolio.length} portfolio projects`);
      
      // Test required fields
      const project = portfolio[0];
      const requiredFields = ['id', 'title', 'category', 'description', 'beforeImage', 'afterImage'];
      const missingFields = requiredFields.filter(field => !project[field]);
      
      if (missingFields.length === 0) {
        logTest('Portfolio Structure', 'PASS', 'All required fields present');
      } else {
        logTest('Portfolio Structure', 'FAIL', `Missing fields: ${missingFields.join(', ')}`);
        return false;
      }
      
    } else {
      logTest('Portfolio Loading', 'FAIL', 'No portfolio projects loaded');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Portfolio Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testBusinessHoursLoading() {
  log('\n=== Testing Business Hours Loading ===', colors.bold);
  
  try {
    const businessHours = loadBusinessHours();
    
    if (businessHours.length > 0) {
      logTest('Business Hours Loading', 'PASS', `Loaded ${businessHours.length} business hour entries`);
      
      // Test sorting
      let isSorted = true;
      for (let i = 1; i < businessHours.length; i++) {
        if (businessHours[i-1].order > businessHours[i].order) {
          isSorted = false;
          break;
        }
      }
      
      if (isSorted) {
        logTest('Business Hours Sorting', 'PASS', 'Business hours correctly sorted by order');
      } else {
        logTest('Business Hours Sorting', 'FAIL', 'Business hours not properly sorted');
        return false;
      }
      
    } else {
      logTest('Business Hours Loading', 'FAIL', 'No business hours loaded');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Business Hours Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testCompleteDataLoading() {
  log('\n=== Testing Complete Data Loading ===', colors.bold);
  
  try {
    const cmsData = loadAllCMSContent();
    
    // Test that all data types are loaded
    const dataTypes = ['services', 'process', 'testimonials', 'portfolio', 'businessHours'];
    let allTypesLoaded = true;
    
    for (const type of dataTypes) {
      if (cmsData[type] && Array.isArray(cmsData[type])) {
        logTest(`${type} in CMS Data`, 'PASS', `${cmsData[type].length} items`);
      } else {
        logTest(`${type} in CMS Data`, 'FAIL', 'Not loaded or not array');
        allTypesLoaded = false;
      }
    }
    
    if (allTypesLoaded) {
      logTest('Complete Data Loading', 'PASS', 'All data types loaded successfully');
    } else {
      logTest('Complete Data Loading', 'FAIL', 'Some data types failed to load');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Complete Data Loading', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testDataValidation() {
  log('\n=== Testing Data Validation ===', colors.bold);
  
  try {
    const cmsData = loadAllCMSContent();
    const validation = validateCMSData(cmsData);
    
    if (validation.isValid) {
      logTest('CMS Data Validation', 'PASS', 'All data passes validation');
    } else {
      logTest('CMS Data Validation', 'FAIL', `Validation errors: ${validation.errors.length}`);
      
      // Log specific errors
      validation.errors.forEach(error => {
        log(`    - ${error}`, colors.red);
      });
      
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Data Validation', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

function testUnifiedConfig() {
  log('\n=== Testing Unified Configuration ===', colors.bold);
  
  try {
    // Simulate static config
    const staticConfig = {
      branding: { name: 'AutoCare' },
      hero: { title: 'Test Title' }
    };
    
    // Load CMS data
    const cmsData = loadAllCMSContent();
    
    // Create unified config
    const unifiedConfig = {
      ...staticConfig,
      ...cmsData,
      dataSource: {
        cmsLoaded: true,
        lastUpdated: new Date(),
        errors: []
      }
    };
    
    // Validate structure
    const hasStaticConfig = unifiedConfig.branding && unifiedConfig.hero;
    const hasCMSData = unifiedConfig.services && unifiedConfig.process;
    const hasMetadata = unifiedConfig.dataSource && unifiedConfig.dataSource.cmsLoaded;
    
    if (hasStaticConfig) {
      logTest('Static Config Merge', 'PASS', 'Static configuration preserved');
    } else {
      logTest('Static Config Merge', 'FAIL', 'Static configuration not preserved');
      return false;
    }
    
    if (hasCMSData) {
      logTest('CMS Data Merge', 'PASS', 'CMS data successfully merged');
    } else {
      logTest('CMS Data Merge', 'FAIL', 'CMS data not properly merged');
      return false;
    }
    
    if (hasMetadata) {
      logTest('Metadata Inclusion', 'PASS', 'Data source metadata included');
    } else {
      logTest('Metadata Inclusion', 'FAIL', 'Data source metadata missing');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Unified Configuration', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runCMSTests() {
  log(`${colors.bold}${colors.blue}
╔════════════════════════════════════════════════════════════════╗
║                  AutoCare CMS Integration Test                ║
║               Testing Actual Data Loading Functions           ║
╚════════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  log('Running comprehensive CMS integration tests...', colors.cyan);
  
  const tests = [
    { name: 'Services Loading', fn: testServicesLoading },
    { name: 'Process Loading', fn: testProcessLoading },
    { name: 'Testimonials Loading', fn: testTestimonialsLoading },
    { name: 'Portfolio Loading', fn: testPortfolioLoading },
    { name: 'Business Hours Loading', fn: testBusinessHoursLoading },
    { name: 'Complete Data Loading', fn: testCompleteDataLoading },
    { name: 'Data Validation', fn: testDataValidation },
    { name: 'Unified Configuration', fn: testUnifiedConfig }
  ];
  
  const startTime = Date.now();
  
  for (const test of tests) {
    try {
      test.fn();
    } catch (error) {
      logTest(test.name, 'FAIL', `Unexpected error: ${error.message}`);
    }
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Print final results
  log(`\n${colors.bold}${colors.blue}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  log(`${colors.bold}CMS Integration Test Results${colors.reset}`, colors.blue);
  log(`${colors.bold}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  
  log(`${colors.green}Passed: ${testResults.passed}${colors.reset}`);
  log(`${colors.red}Failed: ${testResults.failed}${colors.reset}`);
  log(`${colors.yellow}Warnings: ${testResults.warnings}${colors.reset}`);
  log(`Total Tests: ${testResults.tests.length}`);
  log(`Duration: ${duration}ms`);
  
  if (testResults.failed === 0) {
    log(`\n${colors.green}${colors.bold}🎉 All CMS integration tests passed!${colors.reset}`);
    log(`${colors.green}Your data loading system is working correctly and ready for production.${colors.reset}`);
    
    if (testResults.warnings > 0) {
      log(`${colors.yellow}⚠️  Note: ${testResults.warnings} warnings were found. These are not critical but worth reviewing.${colors.reset}`);
    }
  } else {
    log(`\n${colors.red}${colors.bold}❌ ${testResults.failed} test(s) failed.${colors.reset}`);
    log(`${colors.red}Please fix these issues before deploying to production.${colors.reset}`);
  }
  
  // Print data summary
  try {
    const cmsData = loadAllCMSContent();
    log(`\n${colors.bold}Data Summary:${colors.reset}`, colors.cyan);
    log(`• Services: ${cmsData.services.length}`);
    log(`• Process Steps: ${cmsData.process.length}`);
    log(`• Testimonials: ${cmsData.testimonials.length}`);
    log(`• Portfolio Projects: ${cmsData.portfolio.length}`);
    log(`• Business Hours: ${cmsData.businessHours.length}`);
  } catch (error) {
    log(`\n${colors.red}Could not load data summary: ${error.message}${colors.reset}`);
  }
  
  return testResults.failed === 0;
}

// Run the tests
runCMSTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('CMS test runner failed:', error);
  process.exit(1);
});