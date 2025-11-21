fix(themes): clean up obsolete theme CSS and fix dropdown styling issues

## Summary
- Remove all obsolete theme CSS references (sunset, ocean, forest, old midnight)
- Fix theme selector dropdown contrast and styling issues  
- Restore proper button styling for all current 18 themes
- Update documentation to reflect current theme system

## Detailed Changes

### Theme System Cleanup
- **App.css**: Removed CSS variable definitions and styling rules for obsolete themes
- **ProgressiveThemeManager.css**: Cleaned up dropdown styles, removed legacy theme references
- **README.md**: Updated theme count from 10 to 18, replaced obsolete examples with current themes
- **Button styling**: Removed old "midnight" references, added missing theme overrides

### Dropdown Menu Fixes  
- **Light themes**: Added proper white background with dark text styling
- **Theme categorization**: Moved moonlightSilver and softLavender to correct light theme category
- **Missing theme**: Added midnightDepths to all dropdown styling sections
- **Contrast**: Ensured WCAG 2.1 AA compliance across all dropdown states

### CSS Variable Restoration
- **Dark themes**: Added proper contrast variables for 9 dark themes missing overrides
- **Component styling**: Restored section header, preset button, and sidebar styling
- **Control styling**: Added background, border, and text color variables for consistency

### Code Quality Improvements
- **Maintainability**: Eliminated CSS pollution from 4 removed themes
- **Organization**: Streamlined CSS with only current theme definitions
- **Documentation**: Accurate theme lists and examples in README
- **File size**: Reduced CSS bundle size by removing unused rules

## Files Modified
- `src/App.css` - Removed obsolete themes, added missing dark theme overrides
- `src/components/ProgressiveThemeManager.css` - Fixed dropdown styling, added midnightDepths
- `README.md` - Updated theme documentation 
- `docs/CHANGELOG.md` - Added v1.0.1 entry
- `docs/FUTURE_CHANGES.md` - Marked theme cleanup as completed
- `project_manager/.gitignore` - Added to ignore internal project files

## Testing
- ✅ All 18 themes display correctly with proper contrast
- ✅ Dropdown menus readable on both light and dark themes  
- ✅ Button styling consistent across all themes
- ✅ No obsolete theme references remain in CSS
- ✅ WCAG 2.1 AA compliance maintained

## Breaking Changes
None - All existing theme functionality preserved

## Migration Notes  
No migration required - existing user theme preferences will continue to work