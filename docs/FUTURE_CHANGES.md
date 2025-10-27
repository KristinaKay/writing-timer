# Future Changes

This document tracks planned improvements and features for A Timer to Write.

## UI/UX Improvements

### 1. Collapse Sidebar into a Gear Icon
- Replace always-visible sidebar with a collapsible gear/settings icon
- Opens sidebar as an overlay or slide-out panel
- Saves screen space for the main timer interface

### 2. Reconfigure Sidebar Sections to be Collapsible
- Make each sidebar section (Theme, Session Mode, Pomodoro, etc.) independently collapsible
- Use accordion-style expand/collapse for better space conservation
- Remember user's preferred collapsed/expanded state

### 3. Fix Task Completion Counter Bug
- **Bug**: Unchecking and rechecking the same task increments the completed task counter each time
- **Expected**: Should only increment once per task, or decrement when unchecked
- **Priority**: Medium - affects statistics accuracy

### 4. Simplify Button Styling
- Remove gradients from buttons
- Set buttons to use solid secondary color (`var(--theme-secondary)`)
- Adjust hover states to work with solid colors (brightness, opacity, or slight color shift)
- Maintain accessibility contrast ratios

### 5. Rework "Compact Mode" for True Compactness
Suggestions for making compact mode more space-efficient:
- Reduce padding on all controls and containers
- Decrease border-radius on buttons and inputs
- Remove or minimize text labels (use icons where possible)
- Make theme preview swatches smaller
- Tighten spacing between elements
- Consider removing non-essential UI elements entirely

---

## Notes
- Items will be prioritized and implemented based on user feedback and development time
- Each item should be tested for accessibility compliance before implementation
- Check off items as they are completed and move to CHANGELOG.md
