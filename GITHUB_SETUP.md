# Manual GitHub Setup Instructions

If you don't have GitHub CLI installed, follow these steps:

## Option 1: Using GitHub CLI (Easiest)

1. Install GitHub CLI from: https://cli.github.com/
2. Run in terminal: `gh auth login`
3. Run the setup script: `.\setup-github.ps1`

## Option 2: Manual Setup

1. Go to https://github.com/new
2. Repository name: `writing-timer`
3. **Select "Private"** ✓
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

6. Then run these commands:

```powershell
# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Writing Timer with accessibility improvements"

# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/writing-timer.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

7. When prompted, use a Personal Access Token (not password):
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Select scopes: `repo` (all)
   - Use the token as your password

## Option 3: Using GitHub Desktop (GUI)

1. Install GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository → Select this folder
3. Commit all files with a message
4. Publish Repository → **Make sure "Keep this code private" is checked** ✓
5. Click "Publish Repository"

Done! Your code is now safely backed up in a private GitHub repository.
