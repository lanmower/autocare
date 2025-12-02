# AutoCare Data Loading System

## Overview

The AutoCare website now features a comprehensive data loading system that seamlessly combines static configuration with dynamic CMS content from markdown files. This hybrid approach provides the flexibility of a headless CMS while maintaining the reliability of static configuration.

## Architecture

### Core Components

1. **Markdown Parser (`src/utils/markdown.ts`)**
   - Parses frontmatter and content from markdown files
   - Browser-compatible using fetch API instead of Node.js fs module
   - Handles YAML frontmatter with support for strings, numbers, and booleans

2. **Data Loader (`src/utils/dataLoader.ts`)**
   - Loads content from predefined markdown file paths
   - Transforms CMS content into application-ready data structures
   - Includes validation and error handling

3. **Unified Configuration (`src/data/unifiedConfig.ts`)**
   - Combines static configuration with dynamic CMS content
   - Provides fallback mechanisms if CMS content fails to load
   - Includes metadata about data loading status

4. **Configuration Manager (`src/data/config.ts`)**
   - Maintains backward compatibility with existing components
   - Provides both synchronous and asynchronous access patterns
   - Includes utility functions for checking CMS data status

5. **React Hook (`src/hooks/useConfig.ts`)**
   - React hook for consuming configuration data in components
   - Handles loading states and error conditions
   - Provides both unified config and static-only options

## Content Structure

The system loads content from these directories:

### Services (`/content/services/`)
```markdown
---
id: panel-beating
title: Custom Panel Fabrication
description: Our master panel beaters hand-craft custom panels...
icon: Wrench
---

# Service content here
```

### Portfolio (`/content/portfolio/`)
```markdown
---
id: project-1
title: 1967 Mustang Fastback
category: Classic Restoration
description: Complete frame-off restoration...
beforeImage: https://example.com/before.jpg
afterImage: https://example.com/after.jpg
---

# Project details here
```

### Testimonials (`/content/testimonials/`)
```markdown
---
id: 1
name: "James Anderson"
position: "Vintage Car Collector"
rating: 5
---

Their attention to detail is unmatched...
```

### Process Steps (`/content/process/`)
```markdown
---
id: 1
title: "Initial Assessment"
description: "We begin with a comprehensive evaluation..."
order: 1
---

# Process step details
```

### Business Hours (`/content/business-hours/`)
```markdown
---
title: "Monday - Friday"
hours: "8:00 AM - 5:00 PM"
order: 1
active: true
---

# Business hours details
```

## Usage Examples

### Using the React Hook
```tsx
import { useConfig } from '../hooks/useConfig';

function MyComponent() {
  const { config, loading, error, cmsDataLoaded } = useConfig();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{config.sections.services.title}</h1>
      {config.services.map(service => (
        <div key={service.id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using Async Configuration Access
```tsx
import { getConfig } from '../data/config';

async function loadData() {
  const config = await getConfig();
  console.log('Services:', config.services.length);
}
```

### Using Static Configuration (Synchronous)
```tsx
import config from '../data/config';

function StaticComponent() {
  // Uses fallback configuration immediately
  return <div>{config.branding.name}</div>;
}
```

## Data Loading Flow

1. **Initial Load**: Components start with fallback static configuration
2. **CMS Loading**: System attempts to fetch and parse markdown files
3. **Validation**: Loaded content is validated for completeness
4. **Update**: Components receive updated configuration with CMS data
5. **Fallback**: If CMS loading fails, components continue with static data

## Error Handling

The system provides multiple layers of error handling:

- **File Loading Errors**: If markdown files can't be fetched, empty arrays are used
- **Parsing Errors**: Malformed frontmatter is handled gracefully
- **Validation Errors**: Missing required fields are logged as warnings
- **Network Errors**: Fetch failures fall back to static configuration

## Development Tools

### ConfigStatus Component
A development-only component that displays:
- Loading status of CMS data
- Number of items loaded from each content type
- Error messages and warnings
- Last update timestamp

### Data Source Indicators
Components can show whether they're using CMS or fallback data in development mode.

## Backward Compatibility

The system maintains full backward compatibility:
- Existing components continue to work without changes
- Static configuration remains available as fallback
- Component APIs remain unchanged

## File Structure

```
src/
├── data/
│   ├── config.ts              # Main configuration file (backward compatible)
│   └── unifiedConfig.ts       # Unified configuration system
├── utils/
│   ├── markdown.ts            # Markdown parsing utilities
│   └── dataLoader.ts          # CMS content loading
├── hooks/
│   └── useConfig.ts           # React hook for configuration
└── components/
    ├── ConfigStatus.tsx       # Development status component
    └── ...

content/                       # CMS content files
├── services/
├── portfolio/
├── testimonials/
├── process/
└── business-hours/

public/
└── content/                   # Content files served statically
    ├── services/
    ├── portfolio/
    ├── testimonials/
    ├── process/
    └── business-hours/
```

## Configuration Options

### Static Configuration (Always Available)
- Branding information
- Navigation structure
- Labels and text strings
- Site metadata
- Section titles and descriptions
- Hero content
- About section
- Contact information
- Footer content
- Accessibility settings

### Dynamic Content (From CMS)
- Services list with descriptions and icons
- Portfolio projects with before/after images
- Customer testimonials with ratings
- Process steps with ordering
- Business hours with scheduling

## Best Practices

1. **Always use the `useConfig` hook** in React components for automatic loading state handling
2. **Test both CMS and fallback scenarios** to ensure components work in all states
3. **Use TypeScript interfaces** to maintain type safety across the system
4. **Keep static configuration** for critical content that must always be available
5. **Validate CMS content** to catch issues early in development

## Troubleshooting

### Common Issues

1. **CMS Content Not Loading**
   - Check that content files are in `public/content/` directory
   - Verify file paths match those defined in `dataLoader.ts`
   - Check browser network tab for 404 errors

2. **TypeScript Errors**
   - Ensure frontmatter interfaces match actual markdown file structure
   - Update type definitions when adding new content fields

3. **Build Failures**
   - Verify that no Node.js modules are imported in browser code
   - Check that all async operations are properly handled

4. **Content Not Updating**
   - Clear browser cache during development
   - Ensure content files are being served from correct directory

This system provides a robust foundation for managing content while maintaining the performance and reliability of a static configuration system.