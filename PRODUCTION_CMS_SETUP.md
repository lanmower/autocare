# Production Decap CMS Setup for GitHub Pages

## Status Summary

✅ **Working**: Local Decap CMS + Auto-deploy to GitHub Pages
❌ **Requires Setup**: Production GitHub Pages with Decap CMS editor

## What's Already Working

### Local Development → GitHub → Live Deploy

```
1. Edit locally:  ./start-cms.sh
                  http://localhost:5173/admin

2. Save changes:  Auto-committed by Decap local backend

3. Push:          git push origin main

4. Auto-deploy:   GitHub Actions builds & deploys

5. Live updates:  https://lanmower.github.io/autocare/
                  (live in 2-3 minutes)
```

**This workflow is 100% functional now.**

## The Challenge: Production Live CMS

For the **live GitHub Pages site** to have a working Decap CMS that saves back to GitHub, you need **GitHub OAuth authentication**. This requires one of:

### Option 1: Netlify OAuth (Easiest, Recommended)

**Cost**: Free
**Setup time**: ~5 minutes

1. Create free Netlify account: https://netlify.com
2. Go to: https://app.netlify.com/user/settings/applications
3. Create GitHub OAuth app via Netlify:
   - Get your GitHub OAuth credentials
   - Netlify handles authentication
4. Live CMS works at: https://lanmower.github.io/autocare/admin/decap.html

**Why this works**: Netlify provides free OAuth relay service even if you don't host on Netlify.

### Option 2: Self-hosted OAuth Provider

**Cost**: ~$5-10/month (hosting)
**Setup time**: 30-60 minutes

Use an open-source provider:
- [netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
- Deploy to Vercel (free) or Heroku

Configure in `config.yml`:
```yaml
backend:
  name: github
  repo: lanmower/autocare
  branch: main
  base_url: https://your-oauth-provider.com
  auth_endpoint: auth
```

### Option 3: Git Gateway (Advanced)

For private repos with direct Git access.
Requires custom authentication layer.

## Current File Structure

```
Decap CMS on live site is at:
https://lanmower.github.io/autocare/admin/decap.html

Local CMS (with decap-server):
./start-cms.sh
http://localhost:5173/admin
```

## Next Steps to Enable Live CMS

### Step 1: Create GitHub OAuth App

Go to: https://github.com/settings/developers

1. Click "New OAuth App"
2. Fill in:
   - **Name**: AutoCare CMS
   - **Homepage**: https://lanmower.github.io/autocare
   - **Authorization callback**: https://api.netlify.com/auth/done
3. Note your **Client ID** and **Client Secret**

### Step 2: Register with Netlify OAuth

1. Sign up at: https://netlify.com
2. Go to: https://app.netlify.com/user/settings/applications
3. Create new OAuth app
4. Paste Client ID and Secret from GitHub
5. Done!

### Step 3: Test Live CMS

Visit: https://lanmower.github.io/autocare/admin/decap.html

You should see "Login with GitHub" button.

## How the Workflow Works

```
┌─────────────────────────────────────────────────────┐
│        Local Development (Complete ✅)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Run: ./start-cms.sh                            │
│     ↓                                              │
│  2. Edit at: http://localhost:5173/admin           │
│     ↓                                              │
│  3. Click Save → Auto-commits via decap-server     │
│     ↓                                              │
│  4. Run: git push origin main                      │
│     ↓                                              │
│  5. GitHub Actions triggers build                  │
│     ↓                                              │
│  6. npm run lint → npm run build → Deploy          │
│     ↓                                              │
│  7. Live site updates: https://...github.io/...    │
│     (within 2-3 minutes)                           │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│    Production (After OAuth Setup ✅)                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Visit: .../autocare/admin/decap.html           │
│     ↓                                              │
│  2. Click "Login with GitHub"                      │
│     ↓                                              │
│  3. Authorize via Netlify OAuth                    │
│     ↓                                              │
│  4. Edit content in live CMS                       │
│     ↓                                              │
│  5. Click Save → Commits to GitHub main branch     │
│     ↓                                              │
│  6. GitHub Actions auto-rebuilds and redeploys     │
│     ↓                                              │
│  7. Live site updates immediately                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Configuration Files

### Local Development (works now)
- `public/admin/config-local.yml` - Uses `local_backend: true` with decap-server
- `public/admin/index.html` - Auto-loads config-local.yml on localhost

### Production (ready for OAuth)
- `public/admin/config.yml` - Points to GitHub backend
- `public/admin/decap.html` - Entry point for live site

## File Locations on Live Site

```
https://lanmower.github.io/autocare/
  ├── /admin/decap.html          (CMS entry point - use this!)
  ├── /admin/config.yml          (GitHub backend config)
  ├── /admin/config-local.yml    (local dev config)
  └── /                          (main site)
```

## Quick Reference

| Task | Command/URL | Status |
|------|------------|--------|
| Local CMS | `./start-cms.sh` | ✅ Working |
| Local edit | `http://localhost:5173/admin` | ✅ Working |
| Push to GitHub | `git push origin main` | ✅ Working |
| Auto-deploy | GitHub Actions | ✅ Working |
| Live site | https://lanmower.github.io/autocare/ | ✅ Working |
| Live CMS | https://.../admin/decap.html | ⚠️ Needs OAuth |
| OAuth setup | Netlify + GitHub OAuth | 📋 Documented above |

## Troubleshooting

### "Cannot read properties of null" error on live CMS
- **Cause**: GitHub OAuth not configured
- **Fix**: Complete "Step 1 & 2" above to set up Netlify OAuth

### Live CMS login doesn't work
- **Cause**: OAuth provider not linked to repo
- **Fix**: Verify config.yml points to correct GitHub repo

### Changes in live CMS don't appear on site
- **Check 1**: GitHub Actions workflow succeeded
- **Check 2**: Commit was made to main branch
- **Check 3**: Wait 2-3 minutes for rebuild/deploy

## Support

- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub OAuth**: https://docs.github.com/en/apps/oauth-apps
- **Netlify OAuth Setup**: https://decapcms.org/docs/authentication-backends/

## Summary

You have **TWO working workflows**:

1. **Local**: Works perfectly now
   - Edit in Decap → Push → Auto-deploy ✅

2. **Production**: Requires 5-minute OAuth setup
   - Edit on live site → Auto-commits → Auto-deploy

Both achieve the same end result: **Edit in Decap → Push straight from there to GitHub so that it updates**

The local workflow is ready to use now. The live site workflow just needs OAuth configuration (recommended: Netlify, 5 minutes).
