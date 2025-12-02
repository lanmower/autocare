# Claude.ai MCP Client

This is a Model-Core Protocol (MCP) client that automates interactions with Claude.ai using Playwright.

## Prerequisites

- Node.js 14 or higher
- An active Claude.ai account
- Already logged in to Claude.ai in your default browser

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the client:
```bash
npm start
```

## How it Works

The client performs the following steps:
1. Navigates to Claude.ai
2. Uses your existing session (make sure you're logged in)
3. Types the question about the Eiffel Tower's height
4. Sends the message
5. Waits for and captures Claude's response

## Notes

- This client assumes you're already logged in to Claude.ai
- The session must be active in your default browser
- The client uses MCP Playwright for browser automation
- Response times may vary based on network conditions
