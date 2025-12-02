# Decap CMS Setup - Quick Reference

For the complete workflow guide, see: **[DECAP_CMS_WORKFLOW.md](./DECAP_CMS_WORKFLOW.md)**

## Quick Start

### Linux/Mac:
```bash
./start-cms.sh
```

### Windows:
```cmd
start-cms.bat
```

Then navigate to: **http://localhost:5173/admin**

## Workflow

1. **Edit** content in Decap CMS locally
2. **Save** changes (automatically written to `content/` directory)
3. **Push** to GitHub: `git push origin main`
4. **Deploy** automatically via GitHub Actions

## Content Collections

- **Site Configuration**: Branding, hero, about, contact
- **Services**: Service offerings
- **Process Steps**: Step-by-step guide
- **Portfolio**: Projects with before/after
- **Testimonials**: Customer reviews
- **Business Hours**: Operating hours

## File Structure

```
content/
├── services/
├── process/
├── portfolio/
├── testimonials/
└── business-hours/
```

## CI/CD Pipeline

```
Push to GitHub
    ↓
GitHub Actions triggers
    ↓
Lint & Type Check
    ↓
Build with npm run build
    ↓
Deploy to GitHub Pages
    ↓
Live site updates!
```

## Configuration Files

- `/public/admin/config.yml` - Production config (GitHub OAuth)
- `/public/admin/config-local.yml` - Local development config
- `/public/admin/index.html` - Auto-switches based on localhost detection

## Support

See [DECAP_CMS_WORKFLOW.md](./DECAP_CMS_WORKFLOW.md) for detailed troubleshooting and advanced setup.

Visit: https://decapcms.org/docs/