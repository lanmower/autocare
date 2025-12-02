# Decap CMS Workflow Guide

## Overview

This guide explains how to edit content in Decap CMS locally and automatically deploy changes to the live website via GitHub.

## Architecture

```
Local Development:
  Edit in Decap CMS → Local Git → GitHub → GitHub Actions Build → GitHub Pages Deploy

Production:
  Edit in Decap CMS (GitHub Auth) → Auto-commit → GitHub Actions → Deploy
```

## Quick Start (Local Development)

### Option 1: Using the convenience script

**Linux/Mac:**
```bash
./start-cms.sh
```

**Windows (PowerShell):**
```powershell
.\start-cms.ps1
```

**Windows (Command Prompt):**
```cmd
start-cms.bat
```

### Option 2: Manual startup

```bash
# Terminal 1: Start the CMS backend and Vite dev server
npm run cms

# The servers will start on:
# - Decap CMS Proxy: http://localhost:8081
# - Vite Dev Server: http://localhost:5173
# - CMS Admin: http://localhost:5173/admin
```

## Workflow: Edit → Commit → Deploy

### Step 1: Access the CMS locally

1. Run the startup script or `npm run cms`
2. Navigate to: `http://localhost:5173/admin`
3. Click "Login with GitHub" (uses your GitHub account)
4. You'll be authenticated and can access the CMS

### Step 2: Edit content

The CMS allows you to edit:

- **Site Configuration**: Branding, hero section, about, contact info, etc.
- **Services**: Service offerings with icons
- **Process Steps**: Step-by-step process descriptions
- **Portfolio**: Before/after project showcase
- **Testimonials**: Customer reviews and ratings
- **Business Hours**: Operating hours by day

All changes are saved to markdown files in the `content/` directory.

### Step 3: Commit to GitHub

When you save changes in Decap CMS locally:

1. The files are written to the `content/` directory
2. These changes are automatically committed to your local Git repository
3. Push the changes to GitHub:
   ```bash
   git push origin main
   ```

### Step 4: Automatic Deployment

Once you push to GitHub:

1. **GitHub Actions** automatically triggers
2. The workflow:
   - Checks out your code
   - Runs `npm install` to get dependencies
   - Runs `npm run lint` (code quality check)
   - Runs `npm run typecheck` (type safety check)
   - Builds the site with `npm run build`
   - Deploys to **GitHub Pages**

3. Your live website updates automatically!
   - Live site: https://autocare.co.za (or your GitHub Pages URL)
   - Status: View in GitHub repo → Actions tab

## Content Structure

```
content/
├── services/
│   ├── service-1.md
│   └── service-2.md
├── process/
│   ├── 1-step-one.md
│   └── 2-step-two.md
├── portfolio/
│   ├── project-1.md
│   └── project-2.md
├── testimonials/
│   ├── 1-testimonial-one.md
│   └── 2-testimonial-two.md
└── business-hours/
    ├── monday.md
    ├── tuesday.md
    └── ...
```

## File Format

All content files are markdown with YAML front matter:

```markdown
---
id: service-1
title: Service Title
description: Service description
icon: Wrench
---

Optional markdown content here
```

## Media Files

- Upload images through the CMS admin interface
- Images are stored in: `public/images/`
- Accessible on the site as: `/images/filename.jpg`

## Common Tasks

### Add a new service

1. In Decap CMS: Collections → Services → Create
2. Fill in: ID, Title, Description, Icon
3. Save
4. Push to GitHub

### Edit testimonials

1. In Decap CMS: Collections → Testimonials → Select existing
2. Edit name, position, content, rating
3. Save
4. Push to GitHub

### Update business hours

1. In Decap CMS: Collections → Business Hours
2. Edit day and hours
3. Save
4. Push to GitHub

### Change site branding

1. In Decap CMS: Collections → Site Configuration → Site Settings
2. Edit branding, metadata, hero section, etc.
3. Save
4. Push to GitHub

## Troubleshooting

### CMS Admin Not Loading

```bash
# Make sure both servers are running:
npm run cms

# Check:
# - http://localhost:5173 (Vite dev server)
# - http://localhost:8081 (Decap server)
```

### Changes Not Appearing on Live Site

1. Check if changes were pushed to GitHub
2. Verify GitHub Actions workflow completed:
   - Go to repo → Actions tab
   - Check the latest workflow run status
   - Look for any build errors in the logs

### GitHub Authentication Issues

- Make sure you're logged in with `gh` and `git`
- Run: `gh auth status` to verify
- Run: `gh auth login` if needed

### Files Not Showing in CMS

- Ensure files are in correct directories: `content/{collection-name}/`
- Check file naming convention matches CMS configuration
- Refresh the CMS admin page

## Advanced: Production Setup (GitHub OAuth)

For production deployment without Netlify:

1. Create GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set authorization callback URL to: `https://api.netlify.com/auth/done`

2. The site will then support Decap CMS login directly from the live site

## CI/CD Pipeline

The GitHub Actions workflow (`/.github/workflows/ci.yml`) runs on every push:

1. **Lint**: Check code quality with ESLint
2. **Type Check**: Verify TypeScript types
3. **Build**: Create optimized production build
4. **Deploy**: Upload to GitHub Pages

Total build time: ~2-3 minutes

## Environment Variables

No environment variables are needed for local development.

For production on custom domains, ensure:
- DNS points to GitHub Pages
- GitHub Actions are enabled in repository settings
- Pages are set to deploy from `gh-pages` branch

## Support

- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Local Issues**: Check server logs in terminal

## Next Steps

1. Run the CMS: `npm run cms`
2. Visit: http://localhost:5173/admin
3. Create or edit content
4. Commit and push to GitHub
5. Watch it deploy automatically!
