# Linear Integration Guide - Tucker Trips

## ✅ Setup Complete

Linear Connect and Linear Open Issue extensions are installed and configured for your Tucker Trips project.

## 🔐 Authentication

To connect Linear to your project:

1. **Open Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type: **"Linear: Sign In"**
3. Authorize with your Linear account
4. Select your team/workspace

## 🎯 Quick Commands

### Create an Issue

- **Keyboard**: `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
- **Command**: `Linear: Create Issue`
- Enter title and description
- Issue will be created with label: `TUCKER-XXX`

### Open Issue in Browser

- **Command**: `Linear: Open Issue`
- Select from your assigned issues
- Opens in Linear web app

### Search Issues

- **Command**: `Linear: Search Issues`
- Find issues by title, description, or ID

### View My Issues

- **Command**: `Linear: My Issues`
- See all issues assigned to you

## 📋 Project Configuration

Your project is configured with:

**Team**: Tucker Trips Development  
**Issue Prefix**: `TUCKER-`  
**Repository**: `aqeelwebbing/New-latest-Tucker-1`

## 🏷️ Available Labels

Use these labels when creating issues:

- **Bug** - Something isn't working
- **Feature** - New functionality
- **Enhancement** - Improve existing feature
- **Backend** - API/Server work
- **Frontend** - UI/UX work
- **Database** - Supabase schema changes
- **Deployment** - Netlify deployment issues
- **Documentation** - Docs updates
- **Supabase** - Supabase-specific issues
- **Netlify** - Netlify-specific issues

## 🔄 GitHub Integration

When Linear is connected to your GitHub repository:

### Auto-linking PRs

Use issue IDs in PR titles:

```
TUCKER-123: Add trip sharing feature
```

### Auto-create Branches

Linear can automatically create branches:

```
tucker-123-add-trip-sharing-feature
```

### Commit Messages

Link commits to issues:

```
TUCKER-123: Implement trip sharing API endpoint
```

### PR Status Sync

- **PR opened** → Issue moves to "In Progress"
- **PR merged** → Issue moves to "Done"
- **PR closed** → Issue moves to "Canceled"

## 📊 Suggested Issue Templates

### Bug Report

```
Title: [Component] Brief description
Labels: bug, [frontend/backend/database]
Priority: [urgent/high/medium/low]

Description:
**What happened:**
[Description]

**Expected behavior:**
[What should happen]

**Steps to reproduce:**
1. [Step 1]
2. [Step 2]

**Environment:**
- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, Mobile]
```

### Feature Request

```
Title: Add [feature name]
Labels: feature, [frontend/backend/database]
Priority: [urgent/high/medium/low]

Description:
**Problem:**
[What problem does this solve?]

**Proposed solution:**
[How should it work?]

**Acceptance criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
```

### Enhancement

```
Title: Improve [component/feature]
Labels: enhancement, [frontend/backend]
Priority: [medium/low]

Description:
**Current state:**
[How it works now]

**Proposed improvement:**
[What to change]

**Benefits:**
- Benefit 1
- Benefit 2
```

## 🚀 Workflow Statuses

Issues move through these states:

1. **Backlog** - Triaged and prioritized
2. **Todo** - Ready to start
3. **In Progress** - Currently being worked on
4. **In Review** - PR open, awaiting review
5. **Done** - Completed and merged
6. **Canceled** - Won't be implemented

## 🎨 VS Code Integration Features

### Code Comments → Issues

Select code and create an issue:

1. Highlight problematic code
2. Right-click → "Linear: Create Issue from Selection"
3. Code snippet auto-included in issue

### TODO Comments

Link TODOs to Linear:

```javascript
// TODO(TUCKER-123): Refactor this function
// FIXME(TUCKER-456): Handle edge case
```

### Status Bar

See your active issues in the VS Code status bar.

## 📱 Mobile Access

Install Linear mobile app:

- **iOS**: https://apps.apple.com/app/linear/id1545563896
- **Android**: https://play.google.com/store/apps/details?id=com.linear

## 🔗 Useful Links

- **Linear Dashboard**: https://linear.app
- **API Docs**: https://developers.linear.app
- **GitHub Integration**: https://linear.app/settings/integrations/github
- **Keyboard Shortcuts**: https://linear.app/shortcuts

## 💡 Best Practices

1. **Use descriptive titles** - Clear, actionable issue titles
2. **Add context** - Include screenshots, code snippets, error messages
3. **Link related issues** - Use "Relates to TUCKER-XXX"
4. **Update status regularly** - Keep issues current
5. **Close completed issues** - Don't leave stale issues open
6. **Use labels consistently** - Helps with filtering and reporting
7. **Set priorities** - Helps team focus on what matters

## 🛠️ Troubleshooting

### Can't authenticate

- Check you're signed into Linear in your browser
- Try: `Linear: Sign Out` then `Linear: Sign In`

### Issues not syncing

- Verify GitHub integration is enabled in Linear settings
- Check repository permissions

### Commands not working

- Reload VS Code window: `Developer: Reload Window`
- Reinstall extension if needed

## 📈 Next Steps

1. **Sign in to Linear** - Authenticate the extension
2. **Create your first issue** - Test the integration
3. **Set up GitHub sync** - Link to this repository
4. **Add team members** - Invite collaborators
5. **Create project milestones** - Plan your releases

---

**Project**: Tucker Trips  
**Team**: Tucker Trips Development  
**Issue Prefix**: TUCKER-  
**Integration**: ✅ Configured
