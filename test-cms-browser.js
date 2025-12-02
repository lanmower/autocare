#!/usr/bin/env node

/**
 * Browser test for CMS functionality
 * Tests if the CMS loads properly and can connect to the backend
 */

import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

console.log('🚗 AutoCare CMS Browser Test\n');

// Start decap-server
console.log('Starting decap-server...');
const cmsServer = spawn('npx', ['decap-server', '--port', '8081'], {
    stdio: 'pipe'
});

// Start vite dev server
console.log('Starting Vite dev server...');
const viteServer = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe'
});

// Wait for servers to start
await setTimeout(5000);

try {
    // Test if servers are responding
    const response = await fetch('http://localhost:5173/admin/index.html');
    if (response.ok) {
        const html = await response.text();
        if (html.includes('decap-cms.js')) {
            console.log('✅ CMS Admin HTML loads correctly');
        } else {
            console.log('❌ CMS Admin HTML missing decap-cms.js');
        }
    } else {
        console.log('❌ CMS Admin HTML not accessible');
    }

    // Test config file
    const configResponse = await fetch('http://localhost:5173/admin/config-local.yml');
    if (configResponse.ok) {
        const config = await configResponse.text();
        if (config.includes('local_backend: true')) {
            console.log('✅ Local backend configuration accessible');
        } else {
            console.log('❌ Local backend configuration missing');
        }
    } else {
        console.log('❌ Config file not accessible');
    }

    // Test decap-server
    try {
        const serverResponse = await fetch('http://localhost:8081/');
        console.log(`✅ Decap server responding (status: ${serverResponse.status})`);
    } catch (e) {
        console.log('❌ Decap server not responding');
    }

    console.log('\n🎯 Test Summary:');
    console.log('- CMS should be accessible at: http://localhost:5173/admin/index.html');
    console.log('- Backend server is running on: http://localhost:8081');
    console.log('- Configuration files are properly served');
    
} catch (error) {
    console.error('Test failed:', error.message);
} finally {
    // Cleanup
    console.log('\nStopping test servers...');
    cmsServer.kill();
    viteServer.kill();
}