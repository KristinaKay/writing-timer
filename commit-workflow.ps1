#!/usr/bin/env pwsh
# Commit Workflow Script
# Performs error checking, changelog update, commit message generation, and git commit

param(
    [switch]$SkipBuild,
    [switch]$SkipLint,
    [string]$Type = "",
    [string]$Scope = "",
    [string]$Message = ""
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "COMMIT WORKFLOW" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Check for errors
Write-Host "Step 1: Checking code for errors..." -ForegroundColor Yellow

if (-not $SkipLint) {
    Write-Host "  Running ESLint..." -ForegroundColor Gray
    npm run lint
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Lint errors found. Please fix before committing." -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✅ Lint passed" -ForegroundColor Green
}

if (-not $SkipBuild) {
    Write-Host "  Running build..." -ForegroundColor Gray
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Build failed. Please fix before committing." -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✅ Build passed" -ForegroundColor Green
}

Write-Host "`n✅ Step 1 Complete: No errors found`n" -ForegroundColor Green

# Step 2: Generate commit message
Write-Host "Step 2: Generating commit message..." -ForegroundColor Yellow

$gitStatus = git status --porcelain
if ([string]::IsNullOrWhiteSpace($gitStatus)) {
    Write-Host "`n❌ No changes to commit." -ForegroundColor Red
    exit 0
}

# Get list of modified files for context (prioritize staged files)
$stagedFiles = git diff --cached --name-only
$modifiedFiles = if ($stagedFiles) { $stagedFiles } else { git diff --name-only }

# If no message provided, generate one based on changes
if ([string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "  Analyzing file changes..." -ForegroundColor Gray
    
    # Detect type based on files changed
    if ([string]::IsNullOrWhiteSpace($Type)) {
        if ($modifiedFiles -match "\.css$") {
            $Type = "style"
        }
        elseif ($modifiedFiles -match "\.jsx?$" -and $modifiedFiles -match "component") {
            $Type = "feat"
        }
        elseif ($modifiedFiles -match "\.jsx?$") {
            $Type = "fix"
        }
        elseif ($modifiedFiles -match "README|\.md$") {
            $Type = "docs"
        }
        elseif ($modifiedFiles -match "package\.json") {
            $Type = "chore"
        }
        elseif ($modifiedFiles -match "test|spec") {
            $Type = "test"
        }
        else {
            $Type = "chore"
        }
    }
    
    # Detect scope
    if ([string]::IsNullOrWhiteSpace($Scope)) {
        if ($modifiedFiles -match "theme|Theme") {
            $Scope = "themes"
        }
        elseif ($modifiedFiles -match "sound|Sound|audio") {
            $Scope = "audio"
        }
        elseif ($modifiedFiles -match "accessibility") {
            $Scope = "a11y"
        }
        elseif ($modifiedFiles -match "Timer|timer") {
            $Scope = "timer"
        }
        elseif ($modifiedFiles -match "Statistics|stats") {
            $Scope = "stats"
        }
        elseif ($modifiedFiles -match "pomodoro|Pomodoro") {
            $Scope = "pomodoro"
        }
    }
    
    # Prompt for commit message
    Write-Host "`n  Detected type: $Type" -ForegroundColor Cyan
    if (-not [string]::IsNullOrWhiteSpace($Scope)) {
        Write-Host "  Detected scope: $Scope" -ForegroundColor Cyan
    }
    Write-Host ""
    
    $userMessage = Read-Host "  Enter commit message description"
    
    if ([string]::IsNullOrWhiteSpace($Scope)) {
        $Message = "${Type}: ${userMessage}"
    }
    else {
        $Message = "${Type}(${Scope}): ${userMessage}"
    }
}

Write-Host "`n  Commit message: $Message" -ForegroundColor Cyan

# Step 3: Analyze changes
Write-Host "`nStep 3: Analyzing changes..." -ForegroundColor Yellow

Write-Host "  Changed files:" -ForegroundColor Gray
git status --short
Write-Host ""

# Step 4: Update CHANGELOG
Write-Host "Step 4: Updating CHANGELOG..." -ForegroundColor Yellow

$changelogPath = "docs/CHANGELOG.md"
$changelogExists = Test-Path $changelogPath

if ($changelogExists) {
    $changelog = Get-Content $changelogPath -Raw
    $date = Get-Date -Format "yyyy-MM-dd"
    
    # Create new entry
    $newEntry = "`n### $date`n- $Message`n"
    
    # Insert after the first header (usually ## [Unreleased] or similar)
    $headerPattern = "(?m)^## "
    if ($changelog -match $headerPattern) {
        $insertPosition = $changelog.IndexOf("`n", $changelog.IndexOf("## ")) + 1
        $changelog = $changelog.Insert($insertPosition, $newEntry)
        Set-Content $changelogPath -Value $changelog -NoNewline
        Write-Host "  ✅ CHANGELOG updated" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠️  Could not find insertion point in CHANGELOG" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  ⚠️  CHANGELOG not found at $changelogPath" -ForegroundColor Yellow
}

# Step 5: Stage and commit
Write-Host "`nStep 5: Committing changes..." -ForegroundColor Yellow

# Stage all changes
git add -A

Write-Host "  Staged all changes" -ForegroundColor Gray

# Check if COMMIT_MESSAGE.md exists for detailed commit
$commitMessageFile = "COMMIT_MESSAGE.md"
if (Test-Path $commitMessageFile) {
    Write-Host "  Using detailed commit message from COMMIT_MESSAGE.md" -ForegroundColor Gray
    git commit -F $commitMessageFile
}
else {
    Write-Host "  Using generated commit message" -ForegroundColor Gray
    git commit -m "$Message"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Step 5 Complete: Changes committed successfully`n" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "WORKFLOW COMPLETE" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    if (Test-Path $commitMessageFile) {
        Write-Host "Commit: Used detailed message from COMMIT_MESSAGE.md" -ForegroundColor Cyan
    }
    else {
        Write-Host "Commit: $Message" -ForegroundColor Cyan
    }
    Write-Host "`nTo push to remote, run: git push`n" -ForegroundColor Gray
}
else {
    Write-Host "`n❌ Commit failed" -ForegroundColor Red
    exit 1
}
