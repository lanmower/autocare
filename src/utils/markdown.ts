// Browser-compatible markdown utilities
// Note: File reading in browser environments requires different approaches

// Interface for parsed markdown content
export interface ParsedMarkdown<T = Record<string, any>> {
  frontmatter: T;
  content: string;
  filename: string;
  path: string;
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter<T = Record<string, any>>(
  content: string
): { frontmatter: T; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {} as T,
      content: content.trim()
    };
  }

  const [, frontmatterContent, markdownContent] = match;
  const frontmatter = parseFrontmatterYaml<T>(frontmatterContent);

  return {
    frontmatter,
    content: markdownContent.trim()
  };
}

/**
 * Simple YAML parser for frontmatter (handles basic key-value pairs)
 */
function parseFrontmatterYaml<T = Record<string, any>>(yamlContent: string): T {
  const lines = yamlContent.trim().split('\n');
  const result: Record<string, any> = {};

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

  return result as T;
}

/**
 * Read and parse a markdown file (browser-compatible)
 */
export async function readMarkdownFile<T = Record<string, any>>(
  filePath: string
): Promise<ParsedMarkdown<T>> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    const { frontmatter, content: markdownContent } = parseFrontmatter<T>(content);
    
    return {
      frontmatter,
      content: markdownContent,
      filename: filePath.split('/').pop() || '',
      path: filePath
    };
  } catch (error) {
    throw new Error(`Failed to read markdown file ${filePath}: ${error}`);
  }
}

/**
 * Read multiple markdown files (browser-compatible)
 * Requires a predefined list of file paths since browsers can't read directories
 */
export async function readMarkdownFiles<T = Record<string, any>>(
  filePaths: string[]
): Promise<ParsedMarkdown<T>[]> {
  try {
    const filePromises = filePaths.map(filePath => readMarkdownFile<T>(filePath));
    return await Promise.all(filePromises);
  } catch (error) {
    throw new Error(`Failed to read markdown files: ${error}`);
  }
}

/**
 * Sort array by a numeric property (like order, id)
 */
export function sortByProperty<T>(
  array: T[], 
  property: keyof T, 
  direction: 'asc' | 'desc' = 'asc'
): T[] {
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