import { connect } from '@playwright/mcp';
import { retry, ClaudeClientError, extractClaudeResponse } from './utils.js';

async function askClaude(client, question) {
    // Type the question
    await retry(async () => {
        await client.invoke('mcp_playwright_browser_type', {
            element: 'Message input textbox',
            ref: 'Write your prompt to Claude',
            text: question
        });
    });

    // Click send button
    await retry(async () => {
        await client.invoke('mcp_playwright_browser_click', {
            element: 'Send message button',
            ref: 'Send message'
        });
    });

    // Wait for response
    await client.invoke('mcp_playwright_browser_wait_for', {
        time: 5
    });

    // Get the snapshot
    const snapshot = await client.invoke('mcp_playwright_browser_snapshot', {});
    
    return extractClaudeResponse(snapshot);
}

async function main() {
    // Initialize MCP client
    // Connect to MCP server
    const client = await connect('http://localhost:8931/mcp');

    try {
        // Initialize the client
        await client.initialize();

        // Navigate to Claude.ai
        await retry(async () => {
            await client.invoke('mcp_playwright_browser_navigate', {
                url: 'https://claude.ai'
            });
        });

        // Wait for page to load
        await client.invoke('mcp_playwright_browser_wait_for', {
            time: 3
        });

        // Type the question in the input field
        await retry(async () => {
            await client.invoke('mcp_playwright_browser_type', {
                element: 'Message input textbox',
                ref: 'Write your prompt to Claude',
                text: 'What is the height of the Eiffel Tower?'
            });
        });

        // Click the send button
        await retry(async () => {
            await client.invoke('mcp_playwright_browser_click', {
                element: 'Send message button',
                ref: 'Send message'
            });
        });

        // Wait for response
        await client.invoke('mcp_playwright_browser_wait_for', {
            time: 5
        });

        // Get the page snapshot to verify the response
        const snapshot = await client.invoke('mcp_playwright_browser_snapshot', {});
        
        // Extract and log the response
        const response = extractClaudeResponse(snapshot);
        console.log('Claude\'s response:', response);

    } catch (error) {
        if (error instanceof ClaudeClientError) {
            console.error(`Claude Client Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
        }
    } finally {
        await client.dispose();
    }
}

main();
