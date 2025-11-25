# Changelog

All notable changes to A Timer to Write will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-20

### 2025-11-24
- style(audio): removed gradients, adjusted layout consistency

### 2025-11-24
- style(audio): fixed mobile sound feature and added visual indicators for function

### 2025-11-24
- feat: fix smoketest time out, complete icon migration, acheive 100% accessibility, add workflow automation

### 2025-11-24
- style(themes): complete icon migration, achieve 100 accessibility, add workflow automation

### Fixed

- **Theme System Cleanup**: Removed all obsolete theme CSS references
  - Cleaned up legacy CSS rules for "sunset", "ocean", "forest", and old "midnight" themes
  - Removed obsolete theme references from App.css and ProgressiveThemeManager.css
  - Updated README.md to reflect current 18-theme system instead of outdated 10-theme list
- **Dropdown Menu Styling**: Fixed theme selector dropdown contrast issues
  - Added proper light theme dropdown styling (white background, dark text)
  - Corrected theme categorization (moved moonlightSilver and softLavender to light themes)
  - Fixed missing midnightDepths theme in dropdown styling rules
  - Ensured all 18 themes have appropriate dropdown contrast and accessibility
- **Button Styling**: Restored proper button styling for all current themes
  - Added CSS variable overrides for dark themes needing better contrast
  - Fixed missing theme styling that was accidentally removed during cleanup
  - Maintained WCAG 2.1 AA compliance across all button states

### Improved

- **Code Maintainability**: Eliminated CSS pollution from removed themes
  - Codebase now contains only styling for current 18 themes
  - Improved CSS organization and reduced file sizes
  - Enhanced theme consistency across all components
- **Documentation**: Updated theme documentation to match current implementation
  - README now lists accurate theme count and examples
  - Removed references to discontinued themes

## [1.0.0] - 2025-11-19

### Added

- **Getting Started Guide**: Interactive 5-step walkthrough for new users on first site load
  - Step-by-step tour of App Settings, Session Setup, Timer Duration, Tasks, and Getting Started
  - Progress tracking with localStorage persistence
  - Responsive design with smooth animations and professional styling
- **Enhanced Theme Management**: Unified theme configuration in App Settings sidebar
  - Combined theme selection, quick light/dark toggle, and default theme configuration
  - Streamlined theme switcher with settings panel integration
  - Improved theme organization and user experience
- **Session Mode Dropdown**: Converted session mode selection to compact dropdown menu
  - Reduced UI footprint while maintaining full functionality
  - Professional dropdown styling with proper accessibility
  - Responsive design for all screen sizes
- **Enhanced Toggle Styling**: Green/red color scheme for feature toggles
  - Green (#28a745) for active/enabled states
  - Red (#dc3545) for disabled/off states  
  - Consistent styling across Pomodoro and Word Count toggles
- **UI Improvements**: Multiple interface enhancements and refinements
  - Removed duplicate App Settings sections
  - Cleaned up Pomodoro mode labeling (removed emoji)
  - Improved toggle switch design matching modern UI patterns
  - Enhanced dropdown legibility with hardcoded dark backgrounds

### Changed

- **Sidebar Organization**: Moved theme configuration to centralized App Settings
  - Quick light/dark toggle now located in sidebar App Settings > Themes
  - Default theme preferences integrated into main theme management
  - Removed standalone theme toggle from main timer area
- **Session Mode Interface**: Streamlined session selection experience
  - Changed from vertical button list to compact dropdown menu
  - Maintained all functionality while reducing space usage
  - Improved visual hierarchy and user experience
- **Toggle Indicators**: Enhanced visual feedback for feature states
  - Pomodoro and Word Count toggles use clear green/red indicators
  - Active badges styled with green backgrounds and white text
  - Consistent color language across all toggle interfaces

### Technical Improvements

- **Component Architecture**: Refactored theme management into unified component
- **State Management**: Improved toggle state handling and persistence
- **Accessibility**: Enhanced dropdown styling for better contrast in dark themes
- **Code Organization**: Streamlined component structure and reduced duplication

## [Unreleased]

### 2025-11-24

### New Features

- **Commit Workflow Script**: Added automated commit workflow with error checking, changelog updates, and commit message generation
  - PowerShell script for standardized git commits
  - Auto-detects commit type and scope based on changed files
  - Runs ESLint and build checks before committing
  - Automatically updates CHANGELOG with commit messages
  - Prioritizes staged files when analyzing changes

### Theme Updates

- **Midnight Mauve Theme**: Renamed from "Mauve Elegance" to "Midnight Mauve" with updated dark color palette
  - Changed from medium-tone (#7A6B6D) to very dark burgundy (#26191b) background
  - Updated primary color to dusty mauve (#847577)
  - Now properly categorized as a dark theme with dark sidebar styling
  - Improved WCAG AA compliance with white text on dark background

- **Icon System**: Completed migration to Lucide React icons (100% emoji-free)
  - Replaced all emoji icons with professional stroke-based Lucide React components
  - Updated Sound Settings, Backup section, Theme selectors, Status indicators
  - Added FileText icon to Word Tracker toggle
  - Improved icon consistency and accessibility across all themes
  - Fixed missing icon imports (Bell, Music, Radio, Waves)

- **Theme Accessibility**: All 18 themes now achieve 100% WCAG 2.1 AA compliance
  - Fixed Dusty Rose by removing gradient background
  - Adjusted Dark Dusty Rose, Silver Mist, and Coral Dawn contrast ratios
  - All themes now meet text readability (≥4.5:1) and UI element contrast (≥3.0:1) requirements

### Bug Fixes

- **Mobile Audio**: Implemented comprehensive mobile audio initialization fixes
  - Added visibility change listener to re-initialize audio when page regains focus
  - Force audio re-initialization before timer completion sounds
  - Improved AudioContext state checking and recovery
  - Better handling of suspended/closed AudioContext states on mobile browsers

- **Theme System**: Fixed theme toggle and selection functionality
  - Corrected QuickThemeToggle theme arrays to match current 18-theme system
  - Changed default dark theme from 'inkBlack' to 'midnightSteel'
  - Fixed broken theme switching caused by outdated theme categorization

- **Section Description Text**: Fixed readability issues in sidebar sections
  - Changed from theme-inherited text color to readable semi-transparent black
  - Improved contrast on light section backgrounds across all themes
  - Fixed white text appearing on light backgrounds in dark themes

- **Accessibility Checker**: Updated to properly parse and test current theme definitions
  - Fixed theme parsing from ES6 modules
  - Now correctly tests all 18 themes including updated Midnight Mauve

### Previously Added

- Initial project setup with React and Vite
- Initial project setup with React and Vite
- Timer functionality with start, pause, stop, and reset controls
- Circular progress indicator with visual countdown
- Task list with drag-and-drop reordering and completion tracking
- Multiple session modes (Writing, Researching, Creative Thinking, Roaming)
- Pomodoro timer with cycle tracking (25min work / 5min break)
- Custom duration input for flexible timer settings
- Ten theme options (Dark, Light Elegance, Soft Mist, Ocean, Dusty Rose, Dark Dusty Rose, Sage & Green, Mauve Elegance, Balanced Neutral, Midnight, Blackberry Cream)
- Theme persistence using localStorage
- Session statistics tracking with task completion metrics
- Export/Import functionality for session data
- Sound notifications with customizable alerts
- Compact mode toggle for streamlined interface
- Two-level collapsible sidebar organization (group and section level)
- Gear icon sidebar toggle with rotation animation
- Session tracking for partial sessions (1+ minute threshold)
- Task completion statistics with proper increment/decrement logic
- Full WCAG AA accessibility compliance
- Keyboard navigation support throughout the app
- Focus indicators on all interactive elements
- Touch target sizes meeting 44×44px minimum
- Reduced motion support for animations
- Comprehensive documentation in docs/ directory
- **New Theme**: Added Blackberry Cream theme with elegant cream backgrounds and rich blackberry accents
  - Colors: Cream (#D3BDB0, #C1AE9F), Sage (#89937C), Blackberry (#715B64, #69385C)
  - WCAG AA compliant with high contrast text (#2A1B1F, #3C1F25)
  - Features sophisticated gradient backgrounds and accessible button styling
- **Theme Enhancement**: Added Dark Dusty Rose theme using high contrast colors from the dusty rose palette
  - Dusty Rose: Warm neutrals with dusty rose highlights (#CC8B86, #F9EAE1, #D1BE9C, #AA998F, #7D4F50)
  - Dark Dusty Rose: High contrast dark theme using smoky rose background with linen text

### Previously Fixed

- Theme persistence on page reload
- Input field visibility when not focused
- Progress ring visibility across all themes
- Task input background contrast
- Task completion counter bug preventing duplicate statistics counting
- Replaced always-visible sidebar with collapsible gear icon interface
- Session statistics now track any 1+ minute session regardless of completion method

### Accessibility

- Theme persistence on page reload
- Input field visibility when not focused
- Progress ring visibility across all themes
- Task input background contrast
- Task completion counter bug preventing duplicate statistics counting
- Task checkbox contrast issues across all themes
- React render cycle conflicts causing statistics update failures
- Task completion state synchronization with visual feedback
- Task completion increment/decrement logic for accurate statistics
- JSX syntax errors in sidebar component structure
- Increased text-secondary alpha from 0.38 to 0.5-0.6 for better contrast
- Added prefers-reduced-motion media queries
- Expanded touch targets to 44×44px minimum
- Added comprehensive focus-visible states
- Enhanced task checkbox visibility with theme integration
- Increased line-height from 1.5 to 1.6 for better readability
- Widened scrollbar from 6px to 12px
- Improved hover state feedback
- Enhanced keyboard navigation support
- Added ARIA labels and screen reader support for sidebar toggle
- Implemented proper semantic markup for collapsible sections

---

## How to Use This Changelog

### Version Format

Versions follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible new features
- **PATCH** version for backwards-compatible bug fixes

### Categories

Changes are grouped into these categories:

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be-removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
- **Accessibility**: Accessibility improvements

### Example Entry Format

```markdown
## [1.0.0] - 2025-10-23

### Added
- New feature description (#123)
- Another feature with reference to issue

### Fixed
- Bug fix description (#456)
- Another bug fix

### Changed
- Breaking change description (BREAKING CHANGE)

[1.0.0]: https://github.com/KristinaKay/writing-timer/compare/v0.9.0...v1.0.0
```

---

## Template for New Releases

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- List new features here

### Changed
- List changes to existing functionality here

### Deprecated
- List soon-to-be removed features here

### Removed
- List removed features here

### Fixed
- List bug fixes here

### Security
- List security improvements here

### Accessibility
- List accessibility improvements here

[X.Y.Z]: https://github.com/KristinaKay/writing-timer/compare/vX.Y.Z-1...vX.Y.Z
```

---

## Notes

- Keep entries in reverse chronological order (newest first)
- Reference issues and pull requests when applicable
- Use present tense ("Add feature" not "Added feature")
- Be concise but descriptive
- Group similar changes together
- Mark breaking changes clearly with (BREAKING CHANGE)
- Link to the comparison view for each version

[Unreleased]: https://github.com/KristinaKay/writing-timer/compare/master...HEAD
