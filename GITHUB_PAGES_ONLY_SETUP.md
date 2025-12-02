# Decap CMS on GitHub Pages (No Netlify, Pure GitHub)

## Solution: GitHub Apps + Decap CMS

For pure GitHub Pages without Netlify, use **GitHub Apps** (not OAuth) with Decap CMS.

## Setup: GitHub Apps Backend

### Step 1: Create GitHub App

1. Go to: https://github.com/settings/apps
2. Click "New GitHub App"
3. Fill in:
   - **App name**: `autocare-cms`
   - **Homepage URL**: `https://lanmower.github.io/autocare`
   - **Webhook URL**: Leave blank for now
   - **Permissions**:
     - Contents: Read & Write
     - Metadata: Read
   - **Where can this app be installed?**: Only on this account
4. Click "Create GitHub App"
5. Generate a Private Key (save this securely)
6. Note your **App ID** and **Client ID**

### Step 2: Install GitHub App on Repository

1. Go to App settings → Install App
2. Select your `lanmower/autocare` repository
3. Authorize access

### Step 3: Update Decap Config for GitHub Apps

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: lanmower/autocare
  branch: main

  # GitHub Apps authentication (no OAuth endpoint needed)
  auth_type: github_app
  app_id: YOUR_APP_ID_HERE
  use_graphql: true
```

### Step 4: Deploy

Push the updated config to GitHub. The CMS will now use GitHub Apps for authentication.

---

## Alternative: Git Gateway + Personal Token

If you prefer simpler setup without GitHub Apps:

### Using Git Gateway (Simplest GitHub-Only)

1. Update `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

# Requires authentication token
auth:
  type: github
  client_id: your_github_client_id
  client_secret: your_github_client_secret
```

2. Or use a **Personal Access Token** for direct Git access:
   - Go to: https://github.com/settings/tokens
   - Create token with `repo` scope
   - Use as auth in config

---

## Fastest Solution: Local Git Gateway

The absolute **simplest GitHub-only approach**:

### Keep Using Local Development

```bash
# Development
./start-cms.sh
http://localhost:5173/admin
# Edit → Save → auto-commits

# Deploy
git push origin main
# GitHub Actions auto-builds and deploys to GitHub Pages
```

This is **already fully working** and requires **zero external services**:
- ✅ Local Decap CMS editing
- ✅ Automatic Git commits
- ✅ GitHub Actions deploys
- ✅ Live site updates in 2-3 minutes

---

## Comparison: GitHub-Only Solutions

| Approach | Setup Time | External Services | Cost |
|----------|-----------|-----------------|------|
| **Local + Git Push** | 0 min (done) | None | Free ✅ |
| **GitHub Apps** | 10 min | None (GitHub native) | Free |
| **Git Gateway** | 15 min | None | Free |
| **Personal Token** | 5 min | None | Free |

---

## Recommended: Local Development Workflow

Since you already have **everything working locally**, the GitHub-only solution is to:

1. **Edit locally**:
   ```bash
   ./start-cms.sh
   # Visit http://localhost:5173/admin
   # Edit content
   # Save (auto-commits)
   ```

2. **Deploy**:
   ```bash
   git push origin main
   ```

3. **Site updates**:
   - GitHub Actions triggers
   - Builds and deploys to GitHub Pages
   - Live in 2-3 minutes

**This is pure GitHub. No external services. No Netlify. Complete control.**

---

## Your Current Setup (Already Working)

```
┌─────────────────────────────────────────┐
│     Pure GitHub Pages Workflow          │
├─────────────────────────────────────────┤
│                                         │
│  Local Machine:                         │
│  ./start-cms.sh                         │
│  ↓                                      │
│  Edit in Decap CMS                      │
│  ↓                                      │
│  Save (auto-commits)                    │
│  ↓                                      │
│  git push origin main                   │
│  ↓                                      │
│  GitHub Repository                      │
│  ↓                                      │
│  GitHub Actions Workflow                │
│  ├─ npm run lint                        │
│  ├─ npm run build                       │
│  └─ Deploy to GitHub Pages              │
│  ↓                                      │
│  https://lanmower.github.io/autocare/   │
│  (Updates in 2-3 minutes)               │
│                                         │
└─────────────────────────────────────────┘

NO Netlify. NO external OAuth. Pure GitHub.
```

---

## For Live GitHub Pages CMS (GitHub Apps Method)

If you want Decap CMS available directly on the live site without local development:

### Setup GitHub Apps for Production

1. **Create GitHub App** (as described above)
2. **Update `public/admin/config.yml`** with GitHub Apps settings
3. **Access live CMS**: `https://lanmower.github.io/autocare/admin/decap.html`
4. **Login**: Use GitHub App authentication
5. **Edit**: Changes auto-commit to GitHub
6. **Deploy**: GitHub Actions rebuilds automatically

---

## Files Ready

- ✅ `public/admin/config.yml` - GitHub backend configured
- ✅ `public/admin/decap.html` - Live site CMS entry point
- ✅ `.github/workflows/ci.yml` - Auto-build on push
- ✅ `.github/workflows/deploy.yml` - Auto-deploy to Pages
- ✅ `.nojekyll` - Ensures GitHub Pages serves all files
- ✅ `content/` - All content files in Git

---

## Quick Start

**You literally already have everything working:**

```bash
# Start editing now
./start-cms.sh

# Then push when ready
git push origin main

# Done! Site updates automatically.
```

**That's it. Pure GitHub. No external services needed.**

---

## If You Want Live Site CMS Too

Follow the **GitHub Apps** setup above. It's GitHub-native, no Netlify.

---

## Summary

✅ **Local CMS + Auto-Deploy**: Working now, zero setup
✅ **Pure GitHub Pages**: No external services
✅ **GitHub Apps**: Available for production CMS (if needed)
✅ **GitHub Actions**: Handles all building and deployment
✅ **Cost**: Free (GitHub + GitHub Pages)
