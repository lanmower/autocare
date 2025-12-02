#!/usr/bin/env node

/**
 * Production Build Test
 * 
 * Tests that the production build includes all necessary files
 * and that the CMS content is accessible from the built application.
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

function testDistDirectoryStructure() {
  log('\n=== Testing Dist Directory Structure ===', colors.bold);
  
  const distDir = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distDir)) {
    logTest('Dist Directory Exists', 'FAIL', 'Run "npm run build" to create production build');
    return false;
  }
  
  logTest('Dist Directory Exists', 'PASS', 'Production build directory found');
  
  // Check for required files
  const requiredFiles = ['index.html'];
  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
      logTest(`Required File: ${file}`, 'PASS', 'File exists in dist');
    } else {
      logTest(`Required File: ${file}`, 'FAIL', 'File missing from dist');
      allFilesExist = false;
    }
  }
  
  // Check for assets directory
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const assets = fs.readdirSync(assetsDir);
    logTest('Assets Directory', 'PASS', `${assets.length} assets found`);
  } else {
    logTest('Assets Directory', 'FAIL', 'Assets directory missing');
    allFilesExist = false;
  }
  
  return allFilesExist;
}

function testContentInDist() {
  log('\n=== Testing Content Files in Dist ===', colors.bold);
  
  const distDir = path.join(__dirname, 'dist');
  const distContentDir = path.join(distDir, 'content');
  
  if (!fs.existsSync(distContentDir)) {
    logTest('Content Directory in Dist', 'FAIL', 'Content directory not copied to dist');
    return false;
  }
  
  logTest('Content Directory in Dist', 'PASS', 'Content directory found in dist');
  
  // Check content subdirectories
  const contentTypes = ['services', 'process', 'testimonials', 'portfolio', 'business-hours'];
  let allContentExists = true;
  
  for (const type of contentTypes) {
    const typeDir = path.join(distContentDir, type);
    if (fs.existsSync(typeDir)) {
      const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'));
      logTest(`Content Type: ${type}`, 'PASS', `${files.length} markdown files`);
    } else {
      logTest(`Content Type: ${type}`, 'FAIL', 'Directory missing in dist');
      allContentExists = false;
    }
  }
  
  return allContentExists;
}

function testIndexHtmlContent() {
  log('\n=== Testing Index HTML ===', colors.bold);
  
  const distDir = path.join(__dirname, 'dist');
  const indexPath = path.join(distDir, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    logTest('Index HTML Exists', 'FAIL', 'index.html not found in dist');
    return false;
  }
  
  try {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check for basic HTML structure
    if (indexContent.includes('<html') && indexContent.includes('</html>')) {
      logTest('HTML Structure', 'PASS', 'Valid HTML structure');
    } else {
      logTest('HTML Structure', 'FAIL', 'Invalid HTML structure');
      return false;
    }
    
    // Check for meta tags
    if (indexContent.includes('<meta') && indexContent.includes('description')) {
      logTest('Meta Tags', 'PASS', 'Meta tags present');
    } else {
      logTest('Meta Tags', 'WARN', 'Meta tags may be missing');
    }
    
    // Check for script tags
    if (indexContent.includes('<script') && indexContent.includes('src=')) {
      logTest('Script Tags', 'PASS', 'JavaScript bundles referenced');
    } else {
      logTest('Script Tags', 'FAIL', 'JavaScript bundles not referenced');
      return false;
    }
    
    // Check for CSS
    if (indexContent.includes('<link') && indexContent.includes('stylesheet')) {
      logTest('CSS Links', 'PASS', 'CSS stylesheets linked');
    } else {
      logTest('CSS Links', 'WARN', 'CSS stylesheets may be inline or missing');
    }
    
    return true;
  } catch (error) {
    logTest('Index HTML Reading', 'FAIL', `Error reading index.html: ${error.message}`);
    return false;
  }
}

function testAssetFiles() {
  log('\n=== Testing Asset Files ===', colors.bold);
  
  const distDir = path.join(__dirname, 'dist');
  const assetsDir = path.join(distDir, 'assets');
  
  if (!fs.existsSync(assetsDir)) {
    logTest('Assets Directory', 'FAIL', 'Assets directory not found');
    return false;
  }
  
  try {
    const assets = fs.readdirSync(assetsDir);
    
    // Check for JavaScript files
    const jsFiles = assets.filter(file => file.endsWith('.js'));
    if (jsFiles.length > 0) {
      logTest('JavaScript Assets', 'PASS', `${jsFiles.length} JS files found`);
      
      // Check if main JS file exists and has content
      const mainJsFile = jsFiles.find(file => file.includes('index') || file.includes('main'));
      if (mainJsFile) {
        const jsPath = path.join(assetsDir, mainJsFile);
        const jsStats = fs.statSync(jsPath);
        if (jsStats.size > 1000) { // Should be reasonably sized
          logTest('JavaScript Bundle Size', 'PASS', `${Math.round(jsStats.size / 1024)}KB`);
        } else {
          logTest('JavaScript Bundle Size', 'WARN', 'JavaScript bundle seems small');
        }
      }
    } else {
      logTest('JavaScript Assets', 'FAIL', 'No JavaScript files found');
      return false;
    }
    
    // Check for CSS files
    const cssFiles = assets.filter(file => file.endsWith('.css'));
    if (cssFiles.length > 0) {
      logTest('CSS Assets', 'PASS', `${cssFiles.length} CSS files found`);
      
      // Check CSS file size
      const mainCssFile = cssFiles[0];
      const cssPath = path.join(assetsDir, mainCssFile);
      const cssStats = fs.statSync(cssPath);
      if (cssStats.size > 100) { // Should have some content
        logTest('CSS Bundle Size', 'PASS', `${Math.round(cssStats.size / 1024)}KB`);
      } else {
        logTest('CSS Bundle Size', 'WARN', 'CSS bundle seems small');
      }
    } else {
      logTest('CSS Assets', 'WARN', 'No separate CSS files (may be inline)');
    }
    
    return true;
  } catch (error) {
    logTest('Asset Files Reading', 'FAIL', `Error reading assets: ${error.message}`);
    return false;
  }
}

function testViteConfig() {
  log('\n=== Testing Vite Configuration ===', colors.bold);
  
  const viteConfigPath = path.join(__dirname, 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    logTest('Vite Config Exists', 'FAIL', 'vite.config.ts not found');
    return false;
  }
  
  try {
    const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Check for public directory config
    if (viteConfig.includes('publicDir') || viteConfig.includes('content')) {
      logTest('Public Directory Config', 'PASS', 'Content directory configuration found');
    } else {
      logTest('Public Directory Config', 'WARN', 'May need to configure content directory copying');
    }
    
    // Check for build configuration
    if (viteConfig.includes('build') && viteConfig.includes('outDir')) {
      logTest('Build Configuration', 'PASS', 'Build output configured');
    } else {
      logTest('Build Configuration', 'WARN', 'Default build configuration');
    }
    
    return true;
  } catch (error) {
    logTest('Vite Config Reading', 'FAIL', `Error reading vite.config.ts: ${error.message}`);
    return false;
  }
}

function testPackageJson() {
  log('\n=== Testing Package Configuration ===', colors.bold);
  
  const packagePath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    logTest('Package JSON Exists', 'FAIL', 'package.json not found');
    return false;
  }
  
  try {
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    
    // Check for build script
    if (packageJson.scripts && packageJson.scripts.build) {
      logTest('Build Script', 'PASS', `Build command: ${packageJson.scripts.build}`);
    } else {
      logTest('Build Script', 'FAIL', 'No build script defined');
      return false;
    }
    
    // Check for preview script
    if (packageJson.scripts && packageJson.scripts.preview) {
      logTest('Preview Script', 'PASS', 'Preview script available');
    } else {
      logTest('Preview Script', 'WARN', 'No preview script (recommended for testing builds)');
    }
    
    // Check for essential dependencies
    const requiredDeps = ['react', 'react-dom', 'vite'];
    let allDepsPresent = true;
    
    for (const dep of requiredDeps) {
      const hasInDeps = packageJson.dependencies && packageJson.dependencies[dep];
      const hasInDevDeps = packageJson.devDependencies && packageJson.devDependencies[dep];
      
      if (hasInDeps || hasInDevDeps) {
        logTest(`Dependency: ${dep}`, 'PASS', 'Present');
      } else {
        logTest(`Dependency: ${dep}`, 'FAIL', 'Missing');
        allDepsPresent = false;
      }
    }
    
    return allDepsPresent;
  } catch (error) {
    logTest('Package JSON Reading', 'FAIL', `Error reading package.json: ${error.message}`);
    return false;
  }
}

function generateBuildRecommendations() {
  log('\n=== Build Recommendations ===', colors.bold);
  
  const distDir = path.join(__dirname, 'dist');
  const hasDistDir = fs.existsSync(distDir);
  
  if (!hasDistDir) {
    log('📋 To create a production build:', colors.cyan);
    log('   npm run build', colors.cyan);
    log('');
    log('📋 To test the production build:', colors.cyan);
    log('   npm run preview', colors.cyan);
    log('');
  } else {
    log('✅ Production build exists', colors.green);
    log('');
    log('📋 To update the build:', colors.cyan);
    log('   npm run build', colors.cyan);
    log('');
    log('📋 To test the production build locally:', colors.cyan);
    log('   npm run preview', colors.cyan);
    log('');
  }
  
  log('📋 For deployment checklist:', colors.cyan);
  log('   1. Ensure all content files are in /content directory', colors.cyan);
  log('   2. Run npm run build to create production bundle', colors.cyan);
  log('   3. Test with npm run preview before deploying', colors.cyan);
  log('   4. Deploy the entire /dist directory to your web server', colors.cyan);
  log('   5. Ensure web server can serve .md files with correct MIME type', colors.cyan);
}

// Main test runner
async function runProductionBuildTests() {
  log(`${colors.bold}${colors.blue}
╔════════════════════════════════════════════════════════════════╗
║                AutoCare Production Build Test                 ║
║              Testing Build Configuration & Output             ║
╚════════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  log('Testing production build readiness...', colors.cyan);
  
  const tests = [
    { name: 'Dist Directory Structure', fn: testDistDirectoryStructure },
    { name: 'Content in Dist', fn: testContentInDist },
    { name: 'Index HTML', fn: testIndexHtmlContent },
    { name: 'Asset Files', fn: testAssetFiles },
    { name: 'Vite Configuration', fn: testViteConfig },
    { name: 'Package Configuration', fn: testPackageJson }
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
  log(`${colors.bold}Production Build Test Results${colors.reset}`, colors.blue);
  log(`${colors.bold}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  
  log(`${colors.green}Passed: ${testResults.passed}${colors.reset}`);
  log(`${colors.red}Failed: ${testResults.failed}${colors.reset}`);
  log(`${colors.yellow}Warnings: ${testResults.warnings}${colors.reset}`);
  log(`Total Tests: ${testResults.tests.length}`);
  log(`Duration: ${duration}ms`);
  
  if (testResults.failed === 0) {
    log(`\n${colors.green}${colors.bold}🎉 Production build tests passed!${colors.reset}`);
    
    if (testResults.warnings > 0) {
      log(`${colors.yellow}⚠️  ${testResults.warnings} warnings found - review recommendations below.${colors.reset}`);
    }
  } else {
    log(`\n${colors.red}${colors.bold}❌ ${testResults.failed} test(s) failed.${colors.reset}`);
    log(`${colors.red}Fix these issues before deploying to production.${colors.reset}`);
  }
  
  // Generate recommendations
  generateBuildRecommendations();
  
  return testResults.failed === 0;
}

// Run the tests
runProductionBuildTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Production build test runner failed:', error);
  process.exit(1);
});