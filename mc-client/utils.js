export class ClaudeClientError extends Error {
    constructor(message, operation) {
        super(`Claude Client Error during ${operation}: ${message}`);
        this.name = 'ClaudeClientError';
        this.operation = operation;
    }
}

export async function retry(fn, retries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

export function extractClaudeResponse(snapshot) {
    try {
        // Look for the markdown content in the snapshot that contains Claude's response
        const responseElement = findElementByClass(snapshot, 'markdown-content');
        if (!responseElement) {
            throw new Error('Could not find response element in snapshot');
        }
        return responseElement.textContent || 'Could not extract response text';
    } catch (error) {
        throw new ClaudeClientError('Failed to extract response from snapshot', 'extractResponse');
    }
}

function findElementByClass(element, className) {
    if (!element) return null;
    
    // Check if current element has the class
    if (element.attributes && element.attributes.class && element.attributes.class.includes(className)) {
        return element;
    }
    
    // Recursively check child elements
    if (element.children) {
        for (const child of element.children) {
            const found = findElementByClass(child, className);
            if (found) return found;
        }
    }
    
    return null;
}
