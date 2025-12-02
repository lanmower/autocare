#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import http from 'http';
import url from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, 'src', 'data', 'config.ts');
const PORT = 3001;

// CORS headers
const setCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

// Execute git command safely
const executeGitCommand = (command) => {
    try {
        return execSync(command, { 
            cwd: __dirname, 
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe']
        });
    } catch (error) {
        throw new Error(`Git command failed: ${error.message}`);
    }
};

// Parse TypeScript config file using a simpler approach
const parseConfigFile = () => {
    try {
        // Import the config file dynamically (since it's TypeScript, we'll create a temporary JS version)
        const content = fs.readFileSync(CONFIG_FILE, 'utf8');
        
        // Create a simplified version for parsing
        let jsContent = content
            // Remove imports and type definitions completely
            .replace(/import[\s\S]*?from[\s\S]*?;\n/g, '')
            .replace(/export type[\s\S]*?};\n\n/g, '')
            // Replace component references with strings
            .replace(/icon: (Spray|Tool|TrendingUp|Wrench)/g, 'icon: "$1"')
            // Handle template literals
            .replace(/`\$\{new Date\(\)\.getFullYear\(\)\}/g, `"${new Date().getFullYear()}`)
            .replace(/`([^`]*)`/g, '"$1"')
            // Replace export default with return
            .replace(/export default config;/, 'return config;')
            // Clean up any remaining semicolons from empty lines
            .replace(/^\s*;\s*$/gm, '');

        // Wrap in a function and evaluate
        const configFunction = new Function(jsContent);
        return configFunction();
    } catch (error) {
        console.error('Error parsing config file:', error);
        console.error('Config file content preview:', fs.readFileSync(CONFIG_FILE, 'utf8').substring(0, 500));
        throw error;
    }
};

// Generate TypeScript config file
const generateConfigFile = (config) => {
    const configString = JSON.stringify(config, null, 2)
        // Restore component imports
        .replace(/"(Spray|Tool|TrendingUp|Wrench)"/g, '$1')
        // Restore template literal for copyright
        .replace(/"(\d{4}) AutoCare\. All rights reserved\."/g, '`© ${new Date().getFullYear()} AutoCare. All rights reserved.`');
    
    return `import { SprayCan as Spray, PenTool as Tool, TrendingUp, Wrench } from 'lucide-react';

export type ServiceType = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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

const config = ${configString};

export default config;`;
};

// API handlers
const handlers = {
    '/api/config': {
        GET: (req, res) => {
            try {
                const config = parseConfigFile();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: config }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        },
        
        POST: (req, res) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { config } = JSON.parse(body);
                    const tsContent = generateConfigFile(config);
                    
                    // Backup current file
                    const backupFile = `${CONFIG_FILE}.backup.${Date.now()}`;
                    fs.copyFileSync(CONFIG_FILE, backupFile);
                    
                    // Write new config
                    fs.writeFileSync(CONFIG_FILE, tsContent, 'utf8');
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        message: 'Configuration saved successfully',
                        backup: backupFile
                    }));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        }
    },
    
    '/api/git/status': {
        GET: (req, res) => {
            try {
                const status = executeGitCommand('git status --porcelain');
                const branch = executeGitCommand('git branch --show-current').trim();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: true, 
                    data: { 
                        status: status.trim(),
                        branch,
                        hasChanges: status.trim().length > 0
                    }
                }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        }
    },
    
    '/api/git/pull': {
        POST: (req, res) => {
            try {
                const result = executeGitCommand('git pull origin main');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: true, 
                    message: 'Changes pulled successfully',
                    output: result
                }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        }
    },
    
    '/api/git/push': {
        POST: (req, res) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const { message = 'Update configuration via editor' } = JSON.parse(body || '{}');
                    
                    // Add, commit, and push
                    executeGitCommand('git add src/data/config.ts');
                    executeGitCommand(`git commit -m "${message}

🤖 Generated with Config Editor"`);
                    executeGitCommand('git push origin main');
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        message: 'Changes committed and pushed successfully'
                    }));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        }
    }
};

// Create HTTP server
const server = http.createServer((req, res) => {
    setCORSHeaders(res);
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Route to handlers
    if (handlers[pathname] && handlers[pathname][req.method]) {
        handlers[pathname][req.method](req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Config Editor Backend running on http://localhost:${PORT}`);
    console.log(`📝 Managing config file: ${CONFIG_FILE}`);
    console.log(`📁 Working directory: ${__dirname}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('\n⏹️  Shutting down Config Editor Backend...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

export default server;