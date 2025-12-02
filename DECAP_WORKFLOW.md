# AutoCare Decap CMS Workflow

Complete guide for editing site content with Decap CMS, local-first approach with automatic GitHub deployment.

## Quick Start (30 seconds)

```bash
npm run cms
# Opens: http://localhost:5173/admin
# Start editing!
```

## The Complete Workflow

### 1. **Local Development Setup**

```bash
# Start the Decap CMS development server
npm run cms

# This runs TWO services:
# - Vite dev server (http://localhost:5173)
# - Decap server on port 8081 (Git backend)
```

**What it does:**
- Serves your site at http://localhost:5173
- Serves Decap CMS admin at http://localhost:5173/admin
- Watches for file changes
- Auto-commits changes to Git

### 2. **Edit Content in Decap CMS**

Visit **http://localhost:5173/admin** and you can:
- **Services**: Add/edit restoration services
- **Process**: Define restoration steps
- **Portfolio**: Showcase completed projects with before/after images
- **Testimonials**: Add client reviews
- **Business Hours**: Set working hours
- **Site Configuration**: Edit site-wide settings

### 3. **Automatic Git Integration**

When you save changes in Decap CMS:
1. Files are updated locally (markdown in `content/` directory)
2. **Auto-committed** to Git with message: "Decap CMS commit"
3. Ready to push to GitHub

### 4. **Push to GitHub**

```bash
git push
# Or use your Git client
```

Your changes are now in the repository.

### 5. **Automatic Deployment**

GitHub Actions automatically:
1. ✅ Runs linting
2. ✅ Checks TypeScript types
3. ✅ Builds production site
4. ✅ Deploys to GitHub Pages

Live site updates: **https://lanmower.github.io/autocare**

## File Structure

```
content/
├── services/          # Service offerings
├── process/           # Restoration process steps
├── portfolio/         # Completed projects
├── testimonials/      # Client testimonials
├── business-hours/    # Operating hours
└── (markdown files)   # Each collection is YAML frontmatter + markdown
```

## Complete Edit → Deploy Cycle

```
1. npm run cms                    (Start local development)
   ↓
2. http://localhost:5173/admin    (Edit in browser)
   ↓
3. Save changes                   (Auto-commits via Decap)
   ↓
4. git push                       (Push changes)
   ↓
5. GitHub Actions runs            (Auto build & deploy)
   ↓
6. Live site updates              (GitHub Pages)
```

## Example: Add a New Service

1. Run: `npm run cms`
2. Go to: http://localhost:5173/admin
3. Click **Services** collection
4. Click **New Service**
5. Fill in fields:
   - Service ID (e.g., `panel-fabrication`)
   - Title (e.g., `Custom Panel Fabrication`)
   - Description (what you offer)
   - Icon (select from dropdown)
6. Click **Save**
7. Changes auto-commit
8. Run: `git push`
9. Wait for GitHub Actions → Live! ✅

## Editing Content Files Directly

You can also edit markdown files directly:

```bash
# Example service file
content/services/custom-panels.md

---
id: custom-panels
title: Custom Panel Fabrication
description: Hand-craft custom panels...
icon: Wrench
---

(rest of content in markdown)
```

Changes are automatically picked up by both:
- Local dev server (hot reload)
- Decap CMS (shows in editor)

## Troubleshooting

### Port Already in Use

```bash
# Kill any lingering processes
pkill -f "npm run cms"
pkill -f "decap-server"

# Try again
npm run cms
```

### Changes Not Showing

1. Check Git status: `git status`
2. Should show auto-committed Decap changes
3. If stuck, manually commit: `git add . && git commit -m "Update content"`

### GitHub Actions Failed

Check workflow run at: https://github.com/lanmower/autocare/actions
- Click the failed workflow
- See error details
- Common issues: TypeScript errors, missing files

## Architecture

**No External Services Required:**
- ✅ GitHub Pages (free static hosting)
- ✅ GitHub Actions (free CI/CD)
- ✅ Decap CMS (free, open-source)
- ✅ decap-server (local git backend)

**Zero Dependencies on:**
- ❌ Netlify
- ❌ Vercel
- ❌ External APIs
- ❌ Third-party auth services

## Advanced: Custom Content Structure

To add new content collections, edit `public/admin/config-local.yml`:

```yaml
collections:
  - name: "my-collection"
    label: "My Collection"
    folder: "content/my-collection"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Content", name: "content", widget: "markdown" }
```

Then restart: `npm run cms`

## Live Site (GitHub Pages)

- **URL**: https://lanmower.github.io/autocare
- **Builds from**: `main` branch
- **Built by**: GitHub Actions
- **Hosted by**: GitHub Pages

Edit locally, push to main, site auto-updates!

## Summary

- **Edit locally** with Decap CMS + decap-server ✅
- **No server needed** on live site ✅
- **Client-side only** ✅
- **GitHub-native** workflow ✅
- **Zero external services** ✅
- **Fully automated deployment** ✅
