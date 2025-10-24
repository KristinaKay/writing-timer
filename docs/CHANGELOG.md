# Changelog

All notable changes to A Timer to Write will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with React and Vite
- Timer functionality with start, pause, stop, and reset controls
- Circular progress indicator with visual countdown
- Task list with drag-and-drop reordering
- Multiple session modes (Writing, Researching, Creative Thinking, Spiraling)
- Pomodoro timer with cycle tracking (25min work / 5min break)
- Custom duration input for flexible timer settings
- Six theme options (Dark, Light, Ocean, Sunset, Forest, Midnight)
- Theme persistence using localStorage
- Session statistics tracking
- Export/Import functionality for session data
- Sound notifications with customizable alerts
- Compact mode toggle for streamlined interface
- Sidebar organization with collapsible sections
- Full WCAG AA accessibility compliance
- Keyboard navigation support throughout the app
- Focus indicators on all interactive elements
- Touch target sizes meeting 44×44px minimum
- Reduced motion support for animations
- Comprehensive documentation in notes/ directory

### Changed
- Renamed project from "Writing Timer" to "A Timer to Write"
- Improved text contrast ratios to meet WCAG AA standards
- Updated README with complete feature documentation

### Fixed
- Theme persistence on page reload
- Input field visibility when not focused
- Progress ring visibility across all themes
- Task input background contrast

### Accessibility
- Increased text-secondary alpha from 0.38 to 0.5-0.6 for better contrast
- Added prefers-reduced-motion media queries
- Expanded touch targets to 44×44px minimum
- Added comprehensive focus-visible states
- Increased line-height from 1.5 to 1.6 for better readability
- Widened scrollbar from 6px to 12px
- Improved hover state feedback
- Enhanced keyboard navigation support

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
