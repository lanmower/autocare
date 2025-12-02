# GitHub OAuth Setup for Decap CMS on GitHub Pages

## Overview

This guide enables Decap CMS editing directly on your **live GitHub Pages site** (https://lanmower.github.io/autocare/admin) with automatic GitHub commits and rebuilds.

## How It Works

```
Live Site: Edit in /admin
        ↓
Decap CMS saves to GitHub
        ↓
GitHub Actions auto-builds
        ↓
Site redeploys automatically
```

## Step 1: Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the form:
   - **Application name**: `AutoCare CMS`
   - **Homepage URL**: `https://lanmower.github.io/autocare`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Click "Register application"
5. Note your **Client ID** and **Client Secret**

## Step 2: Set Up Netlify OAuth (Free)

Netlify provides free GitHub OAuth authentication for Decap CMS, even if you don't host on Netlify.

### Option A: Using Netlify's OAuth Service (Recommended)

1. Go to: https://www.netlify.com
2. Sign up (free account)
3. Go to: https://app.netlify.com/user/settings/applications#oauth-applications
4. Create a new OAuth application:
   - Enter your **GitHub Client ID**
   - Enter your **GitHub Client Secret**
   - Set **Authorized Redirect URL**: `https://api.netlify.com/auth/done`

5. Your Decap CMS is now ready to use!

### Access Your CMS

Visit: **https://lanmower.github.io/autocare/admin**

1. Click "Login with GitHub"
2. Authorize the OAuth application
3. You now have full access to edit all content

## Step 3: Create Content

Edit collections in Decap CMS:
- **Services**
- **Process Steps**
- **Portfolio**
- **Testimonials**
- **Business Hours**
- **Site Configuration**

## Step 4: Save and Deploy

When you save changes in Decap CMS:

1. ✅ Changes auto-commit to GitHub repository
2. ✅ GitHub Actions workflow triggers
3. ✅ Site rebuilds (~2-3 minutes)
4. ✅ Live site updates automatically

## What Happens Behind the Scenes

```
1. You edit in Decap CMS /admin
   ↓
2. Click "Publish" or "Save"
   ↓
3. Decap commits to main branch via GitHub API
   ↓
4. GitHub Actions detects push
   ↓
5. Runs: npm run lint → npm run build
   ↓
6. Deploys to GitHub Pages
   ↓
7. Site updates live (2-3 minutes later)
```

## Verify Setup is Working

### Check Live CMS Access

```bash
# Try these in your browser:
https://lanmower.github.io/autocare/admin
```

Should see login screen with "Login with GitHub" button.

### Check GitHub Commits

```bash
gh repo view lanmower/autocare --web
# Look at recent commits - you should see Decap CMS changes
```

### Check Deployments

```bash
# See recent deployments
gh deployment list --repo lanmower/autocare
```

## Troubleshooting

### "Authorization failed" or login loop?

1. Verify OAuth App Client ID and Secret are correct
2. Check Netlify OAuth settings have correct redirect URL
3. Ensure GitHub account has write access to repo

### Changes not showing on live site?

1. Check GitHub Actions: https://github.com/lanmower/autocare/actions
2. Look for build errors in workflow logs
3. Verify commits are being made to main branch

### Can't access /admin?

1. Rebuild site locally: `npm run build`
2. Check that `public/admin/` files are in build output
3. Verify GitHub Pages is deploying from `gh-pages` branch

## Local Development

For local development with decap-server:

```bash
./start-cms.sh
# or
start-cms.bat
```

This uses local backend and doesn't require OAuth setup.

## Switching Between Local and Production Configs

The system automatically switches based on hostname:

- **localhost** → Uses `config-local.yml` (local backend)
- **GitHub Pages** → Uses `config.yml` (GitHub OAuth)

## Security Notes

- Your **Client Secret** should never be exposed in code
- Netlify handles OAuth securely
- Users need GitHub account to access admin
- Repository should have branch protection on main

## For Team Members

Share the CMS URL with team:

**Live CMS Admin**: https://lanmower.github.io/autocare/admin

Each team member needs:
- GitHub account
- Access to the repository (push permission)

## Advanced: Custom OAuth Provider

If you prefer not to use Netlify, you can set up a custom OAuth provider:

- [netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
- Requires hosting the OAuth provider (Heroku, Vercel, etc.)

## Support

- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub OAuth Docs**: https://docs.github.com/en/apps/oauth-apps
- **Netlify CMS Auth**: https://decapcms.org/docs/authentication-backends/

## Next Steps

1. ✅ Create GitHub OAuth App (above)
2. ✅ Set up Netlify OAuth (free account)
3. ✅ Test at: https://lanmower.github.io/autocare/admin
4. ✅ Make edits and push to GitHub
5. ✅ Watch automatic rebuild

## Status Checklist

- [ ] GitHub OAuth App created
- [ ] OAuth App credentials noted
- [ ] Netlify OAuth configured
- [ ] Decap CMS accessible at /admin
- [ ] Can login with GitHub
- [ ] Can edit and save content
- [ ] Changes appear in GitHub commits
- [ ] GitHub Actions rebuild triggers
- [ ] Live site updates after changes
