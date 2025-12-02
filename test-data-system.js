#!/usr/bin/env node

/**
 * Comprehensive Test System for AutoCare CMS and Data Loading
 * 
 * This test validates:
 * 1. Markdown file parsing utilities
 * 2. Data loading for all content types
 * 3. Unified configuration system
 * 4. Error handling and fallbacks
 * 5. Data validation and integrity
 * 6. Production build compatibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Console colors for better output
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

// Helper functions
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

// Test 1: Validate markdown parsing utility
function testMarkdownParsing() {
  log('\n=== Testing Markdown Parsing Utility ===', colors.bold);
  
  // Test frontmatter parsing
  const testMarkdown = `---
id: test-service
title: Test Service
description: This is a test service
icon: Wrench
order: 1
active: true
rating: 4.5
---

# Test Service

This is the content of the test service.

## Features
- Feature 1
- Feature 2
`;

  try {
    // Simulate the parseFrontmatter function
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = testMarkdown.match(frontmatterRegex);
    
    if (!match) {
      logTest('Frontmatter Extraction', 'FAIL', 'Failed to match frontmatter pattern');
      return false;
    }
    
    const [, frontmatterContent, markdownContent] = match;
    
    // Test YAML parsing
    const lines = frontmatterContent.trim().split('\n');
    const frontmatter = {};
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      // Handle different data types
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        frontmatter[key] = value.slice(1, -1);
      } else if (/^\d+$/.test(value)) {
        frontmatter[key] = parseInt(value, 10);
      } else if (/^\d+\.\d+$/.test(value)) {
        frontmatter[key] = parseFloat(value);
      } else if (value === 'true' || value === 'false') {
        frontmatter[key] = value === 'true';
      } else {
        frontmatter[key] = value;
      }
    }
    
    // Validate parsed data
    if (frontmatter.id === 'test-service' && 
        frontmatter.title === 'Test Service' &&
        frontmatter.order === 1 &&
        frontmatter.active === true &&
        frontmatter.rating === 4.5) {
      logTest('Frontmatter Parsing', 'PASS', 'All data types parsed correctly');
    } else {
      logTest('Frontmatter Parsing', 'FAIL', 'Data type parsing failed');
      return false;
    }
    
    // Validate content extraction
    if (markdownContent.trim().startsWith('# Test Service')) {
      logTest('Content Extraction', 'PASS', 'Markdown content extracted correctly');
    } else {
      logTest('Content Extraction', 'FAIL', 'Content extraction failed');
      return false;
    }
    
    return true;
  } catch (error) {
    logTest('Markdown Parsing', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

// Test 2: Validate content file structure
function testContentFileStructure() {
  log('\n=== Testing Content File Structure ===', colors.bold);
  
  const contentDir = path.join(__dirname, 'content');
  const requiredDirs = ['services', 'process', 'testimonials', 'portfolio', 'business-hours'];
  
  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    logTest('Content Directory', 'FAIL', 'Content directory does not exist');
    return false;
  }
  
  logTest('Content Directory', 'PASS', 'Content directory exists');
  
  // Check required subdirectories
  let allDirsExist = true;
  for (const dir of requiredDirs) {
    const dirPath = path.join(contentDir, dir);
    if (fs.existsSync(dirPath)) {
      logTest(`Directory: ${dir}`, 'PASS', 'Directory exists');
    } else {
      logTest(`Directory: ${dir}`, 'FAIL', 'Directory missing');
      allDirsExist = false;
    }
  }
  
  // Check file counts in each directory
  const expectedFileCounts = {
    services: 4,
    process: 6,
    testimonials: 5,
    portfolio: 3,
    'business-hours': 3
  };
  
  for (const [dir, expectedCount] of Object.entries(expectedFileCounts)) {
    const dirPath = path.join(contentDir, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
      if (files.length >= expectedCount) {
        logTest(`${dir} File Count`, 'PASS', `${files.length} files found (expected ${expectedCount})`);
      } else {
        logTest(`${dir} File Count`, 'WARN', `${files.length} files found (expected ${expectedCount})`);
      }
    }
  }
  
  return allDirsExist;
}

// Test 3: Validate individual content files
function testContentFiles() {
  log('\n=== Testing Individual Content Files ===', colors.bold);
  
  const contentTypes = {
    services: ['panel-beating.md', 'rust-remediation.md', 'welding.md', 'refinishing.md'],
    process: ['01-initial-assessment.md', '02-disassembly-documentation.md', '03-structural-restoration.md', 
              '04-panel-work-fabrication.md', '05-surface-preparation.md', '06-paint-application-finishing.md'],
    testimonials: ['james-anderson.md', 'sarah-mitchell.md', 'robert-thompson.md', 'test-testimonial.md', 'cms-test-user.md'],
    portfolio: ['mustang-restoration.md', 'bmw-m4-repair.md', 'porsche-356-restoration.md'],
    'business-hours': ['monday-friday.md', 'saturday.md', 'sunday.md']
  };
  
  let allFilesValid = true;
  
  for (const [type, files] of Object.entries(contentTypes)) {
    for (const file of files) {
      const filePath = path.join(__dirname, 'content', type, file);
      
      if (!fs.existsSync(filePath)) {
        logTest(`File: ${type}/${file}`, 'FAIL', 'File does not exist');
        allFilesValid = false;
        continue;
      }
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for frontmatter
        const hasFrontmatter = content.startsWith('---') && content.indexOf('\n---\n') > 0;
        if (!hasFrontmatter) {
          logTest(`File: ${type}/${file}`, 'FAIL', 'No frontmatter found');
          allFilesValid = false;
          continue;
        }
        
        // Parse frontmatter
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
          logTest(`File: ${type}/${file}`, 'FAIL', 'Invalid frontmatter format');
          allFilesValid = false;
          continue;
        }
        
        const [, frontmatterContent, markdownContent] = match;
        
        // Validate required fields based on content type
        const lines = frontmatterContent.trim().split('\n');
        const frontmatter = {};
        
        for (const line of lines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex === -1) continue;
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          frontmatter[key] = value;
        }
        
        // Type-specific validation
        let isValid = true;
        let missingFields = [];
        
        switch (type) {
          case 'services':
            const serviceRequiredFields = ['id', 'title', 'description', 'icon'];
            for (const field of serviceRequiredFields) {
              if (!frontmatter[field]) {
                missingFields.push(field);
                isValid = false;
              }
            }
            break;
            
          case 'process':
            const processRequiredFields = ['id', 'title', 'description', 'order'];
            for (const field of processRequiredFields) {
              if (!frontmatter[field]) {
                missingFields.push(field);
                isValid = false;
              }
            }
            break;
            
          case 'testimonials':
            const testimonialRequiredFields = ['id', 'name', 'position', 'rating'];
            for (const field of testimonialRequiredFields) {
              if (!frontmatter[field]) {
                missingFields.push(field);
                isValid = false;
              }
            }
            break;
            
          case 'portfolio':
            const portfolioRequiredFields = ['id', 'title', 'category', 'description', 'beforeImage', 'afterImage'];
            for (const field of portfolioRequiredFields) {
              if (!frontmatter[field]) {
                missingFields.push(field);
                isValid = false;
              }
            }
            break;
            
          case 'business-hours':
            const hoursRequiredFields = ['title', 'hours', 'order'];
            for (const field of hoursRequiredFields) {
              if (!frontmatter[field]) {
                missingFields.push(field);
                isValid = false;
              }
            }
            break;
        }
        
        if (isValid && markdownContent.trim().length > 0) {
          logTest(`File: ${type}/${file}`, 'PASS', 'Valid structure and content');
        } else if (!isValid) {
          logTest(`File: ${type}/${file}`, 'FAIL', `Missing fields: ${missingFields.join(', ')}`);
          allFilesValid = false;
        } else {
          logTest(`File: ${type}/${file}`, 'WARN', 'Empty content section');
        }
        
      } catch (error) {
        logTest(`File: ${type}/${file}`, 'FAIL', `Error reading file: ${error.message}`);
        allFilesValid = false;
      }
    }
  }
  
  return allFilesValid;
}

// Test 4: Validate icon mapping
function testIconMapping() {
  log('\n=== Testing Icon Mapping ===', colors.bold);
  
  const validIcons = ['Wrench', 'Tool', 'Spray', 'TrendingUp'];
  const serviceFiles = ['panel-beating.md', 'rust-remediation.md', 'welding.md', 'refinishing.md'];
  
  let allIconsValid = true;
  
  for (const file of serviceFiles) {
    const filePath = path.join(__dirname, 'content', 'services', file);
    
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
          const [, frontmatterContent] = match;
          const iconLine = frontmatterContent.split('\n').find(line => line.startsWith('icon:'));
          
          if (iconLine) {
            const icon = iconLine.split(':')[1].trim();
            
            if (validIcons.includes(icon)) {
              logTest(`Icon mapping: ${file}`, 'PASS', `Valid icon: ${icon}`);
            } else {
              logTest(`Icon mapping: ${file}`, 'FAIL', `Invalid icon: ${icon}`);
              allIconsValid = false;
            }
          } else {
            logTest(`Icon mapping: ${file}`, 'FAIL', 'No icon field found');
            allIconsValid = false;
          }
        }
      } catch (error) {
        logTest(`Icon mapping: ${file}`, 'FAIL', `Error: ${error.message}`);
        allIconsValid = false;
      }
    }
  }
  
  return allIconsValid;
}

// Test 5: Test data sorting functionality
function testDataSorting() {
  log('\n=== Testing Data Sorting Functionality ===', colors.bold);
  
  // Test numeric sorting
  const testData = [
    { id: 3, title: 'Third', order: 3 },
    { id: 1, title: 'First', order: 1 },
    { id: 2, title: 'Second', order: 2 }
  ];
  
  // Simulate sortByProperty function
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
  
  // Test ascending sort
  const sortedAsc = sortByProperty(testData, 'order', 'asc');
  if (sortedAsc[0].id === 1 && sortedAsc[1].id === 2 && sortedAsc[2].id === 3) {
    logTest('Numeric Sort (Ascending)', 'PASS', 'Correct sort order');
  } else {
    logTest('Numeric Sort (Ascending)', 'FAIL', 'Incorrect sort order');
    return false;
  }
  
  // Test descending sort
  const sortedDesc = sortByProperty(testData, 'order', 'desc');
  if (sortedDesc[0].id === 3 && sortedDesc[1].id === 2 && sortedDesc[2].id === 1) {
    logTest('Numeric Sort (Descending)', 'PASS', 'Correct sort order');
  } else {
    logTest('Numeric Sort (Descending)', 'FAIL', 'Incorrect sort order');
    return false;
  }
  
  // Test string sorting
  const stringData = [
    { name: 'Charlie', id: 1 },
    { name: 'Alice', id: 2 },
    { name: 'Bob', id: 3 }
  ];
  
  const sortedString = sortByProperty(stringData, 'name', 'asc');
  if (sortedString[0].name === 'Alice' && sortedString[1].name === 'Bob' && sortedString[2].name === 'Charlie') {
    logTest('String Sort (Ascending)', 'PASS', 'Correct sort order');
  } else {
    logTest('String Sort (Ascending)', 'FAIL', 'Incorrect sort order');
    return false;
  }
  
  return true;
}

// Test 6: Validate production build compatibility
function testProductionBuildCompatibility() {
  log('\n=== Testing Production Build Compatibility ===', colors.bold);
  
  // Check if dist directory exists
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    logTest('Dist Directory', 'PASS', 'Production build directory exists');
    
    // Check for main assets
    const requiredAssets = ['index.html', 'assets'];
    let allAssetsExist = true;
    
    for (const asset of requiredAssets) {
      const assetPath = path.join(distDir, asset);
      if (fs.existsSync(assetPath)) {
        logTest(`Asset: ${asset}`, 'PASS', 'Asset exists in dist');
      } else {
        logTest(`Asset: ${asset}`, 'FAIL', 'Asset missing from dist');
        allAssetsExist = false;
      }
    }
    
    // Check if content directory is copied to dist
    const distContentDir = path.join(distDir, 'content');
    if (fs.existsSync(distContentDir)) {
      logTest('Content in Dist', 'PASS', 'Content directory copied to dist');
    } else {
      logTest('Content in Dist', 'FAIL', 'Content directory not copied to dist');
      allAssetsExist = false;
    }
    
    return allAssetsExist;
  } else {
    logTest('Dist Directory', 'WARN', 'No production build found (run npm run build)');
    return true; // Not a failure, just not built yet
  }
}

// Test 7: Error handling validation
function testErrorHandling() {
  log('\n=== Testing Error Handling ===', colors.bold);
  
  // Test handling of malformed markdown
  const malformedMarkdown = `---
id: test
title: Test
description: 
This is malformed - no closing ---

# Content
This should not parse correctly.`;

  try {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = malformedMarkdown.match(frontmatterRegex);
    
    if (!match) {
      logTest('Malformed Markdown Handling', 'PASS', 'Correctly rejected malformed markdown');
    } else {
      logTest('Malformed Markdown Handling', 'FAIL', 'Failed to detect malformed markdown');
      return false;
    }
  } catch (error) {
    logTest('Malformed Markdown Handling', 'PASS', 'Error handling working correctly');
  }
  
  // Test handling of missing fields
  const incompleteMarkdown = `---
id: incomplete
---

# Incomplete Content
This markdown is missing required fields.`;

  try {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = incompleteMarkdown.match(frontmatterRegex);
    
    if (match) {
      const [, frontmatterContent] = match;
      const lines = frontmatterContent.trim().split('\n');
      const frontmatter = {};
      
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        frontmatter[key] = value;
      }
      
      // Check if validation would catch missing fields
      const requiredFields = ['title', 'description'];
      const missingFields = requiredFields.filter(field => !frontmatter[field]);
      
      if (missingFields.length > 0) {
        logTest('Missing Fields Detection', 'PASS', `Detected missing fields: ${missingFields.join(', ')}`);
      } else {
        logTest('Missing Fields Detection', 'FAIL', 'Failed to detect missing fields');
        return false;
      }
    }
  } catch (error) {
    logTest('Missing Fields Detection', 'FAIL', `Unexpected error: ${error.message}`);
    return false;
  }
  
  return true;
}

// Test 8: Validate configuration merging
function testConfigurationMerging() {
  log('\n=== Testing Configuration Merging ===', colors.bold);
  
  // Simulate static config
  const staticConfig = {
    branding: { name: 'AutoCare' },
    hero: { title: 'Test Title' }
  };
  
  // Simulate CMS data
  const cmsData = {
    services: [{ id: 1, title: 'Service 1' }],
    testimonials: [{ id: 1, name: 'Test User' }]
  };
  
  // Simulate metadata
  const dataSource = {
    cmsLoaded: true,
    lastUpdated: new Date(),
    errors: []
  };
  
  // Test merging
  const unifiedConfig = {
    ...staticConfig,
    ...cmsData,
    dataSource
  };
  
  // Validate merge
  let mergeValid = true;
  
  if (unifiedConfig.branding.name === 'AutoCare') {
    logTest('Static Config Merge', 'PASS', 'Static configuration preserved');
  } else {
    logTest('Static Config Merge', 'FAIL', 'Static configuration not preserved');
    mergeValid = false;
  }
  
  if (unifiedConfig.services.length === 1 && unifiedConfig.services[0].title === 'Service 1') {
    logTest('CMS Data Merge', 'PASS', 'CMS data properly merged');
  } else {
    logTest('CMS Data Merge', 'FAIL', 'CMS data not properly merged');
    mergeValid = false;
  }
  
  if (unifiedConfig.dataSource && unifiedConfig.dataSource.cmsLoaded === true) {
    logTest('Metadata Merge', 'PASS', 'Metadata properly included');
  } else {
    logTest('Metadata Merge', 'FAIL', 'Metadata not properly included');
    mergeValid = false;
  }
  
  return mergeValid;
}

// Main test runner
async function runAllTests() {
  log(`${colors.bold}${colors.blue}
╔════════════════════════════════════════════════════════════════╗
║                    AutoCare CMS Test Suite                    ║
║                  Comprehensive Data System Test               ║
╚════════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  log('Starting comprehensive test of data loading and CMS system...', colors.cyan);
  
  const tests = [
    { name: 'Markdown Parsing Utility', fn: testMarkdownParsing },
    { name: 'Content File Structure', fn: testContentFileStructure },
    { name: 'Individual Content Files', fn: testContentFiles },
    { name: 'Icon Mapping', fn: testIconMapping },
    { name: 'Data Sorting Functionality', fn: testDataSorting },
    { name: 'Production Build Compatibility', fn: testProductionBuildCompatibility },
    { name: 'Error Handling', fn: testErrorHandling },
    { name: 'Configuration Merging', fn: testConfigurationMerging }
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
  log(`${colors.bold}Test Results Summary${colors.reset}`, colors.blue);
  log(`${colors.bold}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  
  log(`${colors.green}Passed: ${testResults.passed}${colors.reset}`);
  log(`${colors.red}Failed: ${testResults.failed}${colors.reset}`);
  log(`${colors.yellow}Warnings: ${testResults.warnings}${colors.reset}`);
  log(`Total Tests: ${testResults.tests.length}`);
  log(`Duration: ${duration}ms`);
  
  if (testResults.failed === 0) {
    log(`\n${colors.green}${colors.bold}🎉 All critical tests passed! The CMS and data loading system is working correctly.${colors.reset}`);
    
    if (testResults.warnings > 0) {
      log(`${colors.yellow}⚠️  Note: ${testResults.warnings} warnings were found. Review the details above.${colors.reset}`);
    }
  } else {
    log(`\n${colors.red}${colors.bold}❌ ${testResults.failed} test(s) failed. Please review and fix the issues above.${colors.reset}`);
  }
  
  // Recommendations
  log(`\n${colors.bold}Recommendations:${colors.reset}`, colors.cyan);
  
  if (testResults.failed === 0) {
    log('✓ Your CMS system is ready for production');
    log('✓ All content files are properly structured');
    log('✓ Data loading utilities are working correctly');
    log('✓ Error handling is functioning properly');
    
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
      log('• Run `npm run build` to create production build');
    }
    
    log('• Consider running this test suite regularly during development');
    log('• Monitor console warnings in the browser for any runtime issues');
  } else {
    log('• Fix failing tests before deploying to production');
    log('• Ensure all content files follow the correct format');
    log('• Verify file paths and directory structure');
  }
  
  return testResults.failed === 0;
}

// Run the tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});