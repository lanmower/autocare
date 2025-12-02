#!/usr/bin/env node

/**
 * Test script to validate Decap CMS configuration
 * Checks for common configuration issues and validates file paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, 'public', 'admin', 'config.yml');
const contentDir = path.join(__dirname, 'content');

console.log('🚗 AutoCare CMS Configuration Test\n');

// Check if config file exists
if (!fs.existsSync(configPath)) {
  console.error('❌ Config file not found:', configPath);
  process.exit(1);
}

console.log('✅ Config file found:', configPath);

// Check if content directories exist
const expectedDirs = ['services', 'process', 'portfolio', 'testimonials', 'business-hours'];

expectedDirs.forEach(dir => {
  const dirPath = path.join(contentDir, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ Content directory exists: content/${dir}/`);
    
    // List files in directory
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    if (files.length > 0) {
      console.log(`   📄 Found ${files.length} content file(s): ${files.join(', ')}`);
    } else {
      console.log(`   📝 Directory is empty (ready for new content)`);
    }
  } else {
    console.log(`❌ Content directory missing: content/${dir}/`);
  }
});

// Check if admin files exist
const adminIndexPath = path.join(__dirname, 'public', 'admin', 'index.html');
if (fs.existsSync(adminIndexPath)) {
  console.log('✅ Admin interface file found: public/admin/index.html');
} else {
  console.log('❌ Admin interface file missing: public/admin/index.html');
}

// Check if media directory exists
const mediaDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(mediaDir)) {
  console.log('📁 Creating media directory: public/images/');
  fs.mkdirSync(mediaDir, { recursive: true });
} else {
  console.log('✅ Media directory exists: public/images/');
}

console.log('\n🎯 Configuration Test Summary:');
console.log('- CMS admin will be available at: http://localhost:5173/admin');
console.log('- Content files will be stored in: content/');
console.log('- Media files will be stored in: public/images/');
console.log('- To start CMS: run ./start-cms.sh or start-cms.bat');

console.log('\n📝 Next Steps:');
console.log('1. Start the development servers using the start script');
console.log('2. Open http://localhost:5173/admin in your browser');
console.log('3. Create and edit content using the CMS interface');
console.log('4. Configure GitHub authentication for production use');

console.log('\n✨ CMS Configuration Test Complete!');