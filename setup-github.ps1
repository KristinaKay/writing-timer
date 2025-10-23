# GitHub Repository Setup Script for Writing Timer
# This script will create a private repository and push your code

Write-Host "=== Writing Timer - GitHub Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghInstalled) {
    Write-Host "GitHub CLI (gh) is not installed." -ForegroundColor Yellow
    Write-Host "Please install it from: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or use manual setup - see instructions below." -ForegroundColor Yellow
    Write-Host ""
    exit
}

# Stage all files
Write-Host "Staging all files..." -ForegroundColor Green
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: Writing Timer with accessibility improvements

- React-based writing timer application
- Multiple timer modes (Pomodoro, custom durations)
- Task list with drag-and-drop
- Session statistics tracking
- Theme support (Dark, Light, Ocean, Sunset, Forest, Midnight)
- Full WCAG AA accessibility compliance
- Export/Import functionality"

# Create private GitHub repository
Write-Host ""
Write-Host "Creating private GitHub repository..." -ForegroundColor Green
gh repo create writing-timer --private --source=. --remote=origin --push

Write-Host ""
Write-Host "✅ Done! Your repository is now on GitHub (private)" -ForegroundColor Green
Write-Host ""
Write-Host "View it at: " -NoNewline
gh repo view --web
