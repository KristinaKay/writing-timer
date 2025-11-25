# Future Changes

This document tracks planned improvements and features for A Timer to Write.

## UI/UX Improvements

### ✅ 1. Collapse Sidebar into a Gear Icon

- ✅ Replace always-visible sidebar with a collapsible gear/settings icon
- ✅ Opens sidebar as an overlay or slide-out panel
- ✅ Saves screen space for the main timer interface

### ✅ 2. Reconfigure Sidebar Sections to be Collapsible

- ✅ Make each sidebar section (Theme, Session Mode, Pomodoro, etc.) independently collapsible
- ✅ Use accordion-style expand/collapse for better space conservation
- ✅ Remember user's preferred collapsed/expanded state

### ✅ 3. Fix Task Completion Counter Bug

- ✅ **Bug**: Unchecking and rechecking the same task increments the completed task counter each time
- ✅ **Expected**: Should only increment once per task, or decrement when unchecked
- ✅ **Priority**: Medium - affects statistics accuracy

### ✅ 4. Simplify Button Styling

- ✅ Remove gradients from buttons
- ✅ Set buttons to use solid secondary color (`var(--theme-secondary)`)
- ✅ Adjust hover states to work with solid colors (brightness, opacity, or slight color shift)
- ✅ Maintain accessibility contrast ratios

### ✅ 5. Theme System Cleanup

- ✅ Remove obsolete theme CSS references (sunset, ocean, forest, old midnight)
- ✅ Fix dropdown styling issues for theme selection
- ✅ Ensure all current 18 themes have proper contrast and styling
- ✅ Clean up CSS pollution from legacy themes
- ✅ Update documentation to reflect current theme system

### ✅ 5. Getting Started Guide

- ✅ Add interactive onboarding guide for new users
- ✅ Step-by-step walkthrough of all features
- ✅ Professional modal interface with progress tracking
- ✅ LocalStorage completion tracking to avoid repeated displaysos

### 6. Rework "Compact Mode" for True Compactness

Suggestions for making compact mode more space-efficient:

- Reduce padding on all controls and containers
- Decrease border-radius on buttons and inputs
- Remove or minimize text labels (use icons where possible)
- Make theme preview swatches smaller
- Tighten spacing between elements
- Consider removing non-essential UI elements entirely

### 7. Connect Writing Modes to Preset Times

- ✅ Link Session Modes (Writing Sprint, Deep Work, Research, Creative Thinking, Roaming) to default timer durations
- ✅ Each mode could have a recommended/default time preset
- Allow customization of mode-specific durations in settings
- ✅ Automatically set timer duration when switching modes

### 8. Connect Timer Elapsed Ring Color to the Session Mode

- Change the circular progress ring color based on selected Session Mode
- Each mode could have its own distinct color palette
- Visual reinforcement of current session type
- Maintain accessibility contrast requirements

### 9. Custom Theme Creator

- Allow users to create and save custom color themes
- Color picker interface for primary, secondary, and background colors
- Preview themes before applying
- Import/export custom themes
- Save multiple custom themes

### 10. Add Music Player for Local Music Files

- Integrate music player to play local audio files during writing sessions
- Support common formats (MP3, WAV, FLAC, etc.)
- Playlist creation and management
- Volume control
- Background music to enhance focus

### 11. Notes Area

- Quick notes section for capturing thoughts during sessions
- Easy-to-access text area without disrupting timer
- Auto-save notes
- Session-specific or general notes options
- Export notes to file

### 12. Inspirational Quotes Feature

- Display motivational/writing quotes
- Rotate quotes on timer completion or session start
- Ability to add custom quotes
- Option to disable if not desired
- Quote categories (motivation, creativity, famous authors, etc.)

## Desktop & Deployment

### 13. Desktop App Version

- Package as native desktop application using Electron or Tauri
- Create Windows .exe installer
- Create Mac .app bundle
- Run outside browser as standalone application
- System tray integration for quick access
- Auto-start on login option
- Offline functionality

---

## Notes

- Items will be prioritized and implemented based on user feedback and development time
- Each item should be tested for accessibility compliance before implementation
- Check off items as they are completed and move to CHANGELOG.md
