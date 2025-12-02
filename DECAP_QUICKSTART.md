# 🚀 Decap CMS Quick Start Guide

## Start Editing in 30 Seconds

### 1. Start the CMS

**Linux/Mac:**
```bash
./start-cms.sh
```

**Windows:**
```cmd
start-cms.bat
```

### 2. Open the Editor

Visit: **http://localhost:5173/admin**

Click "Login with GitHub" (uses your GitHub account)

### 3. Edit Content

- **Services**: Add/edit service offerings
- **Process**: Add/edit step-by-step process
- **Portfolio**: Add/edit before/after projects
- **Testimonials**: Add/edit customer reviews
- **Business Hours**: Update operating hours
- **Site Config**: Change branding, hero, about sections

### 4. Save & Deploy

```bash
# Option 1: Let CMS handle it
# (Changes auto-commit in the background)

# Option 2: Manual push
git push origin main
```

**Done!** GitHub Actions automatically builds and deploys your changes.

Live site updates in 2-3 minutes: https://autocare.co.za

## Workflow Diagram

```
You Edit in Decap
        ↓
    Decap Commits to GitHub
        ↓
    GitHub Actions Build Triggers
        ↓
    npm run build
        ↓
    Deploy to GitHub Pages
        ↓
    🌍 Live Site Updates
```

## Troubleshooting

### CMS Won't Load?
```bash
# Make sure dependencies are installed
npm install --legacy-peer-deps

# Start the servers
npm run cms
```

### Changes Not Showing?
1. Check GitHub Actions: https://github.com/lanmower/autocare/actions
2. Look for the latest workflow run
3. If failed, click on it to see error details

### Need Help?
See the full guide: [DECAP_CMS_WORKFLOW.md](./DECAP_CMS_WORKFLOW.md)

## Key Files

- `content/` - All your content files
- `public/admin/config.yml` - CMS configuration
- `.github/workflows/` - Deployment automation

## Next Steps

1. Run: `./start-cms.sh` (or `start-cms.bat` on Windows)
2. Visit: http://localhost:5173/admin
3. Create your first content item
4. Push to GitHub and watch it deploy!
