# A Timer to Write - AI Coding Instructions

## Project Overview
This is A Timer to Write application designed to help writers track their writing sessions and productivity. The project is currently in initial setup phase.

## Architecture & Patterns

### Project Structure 
- **Frontend**: React
    - **Reasoning**: 
       - **State Management**:  With tracking sessions, managing different modes, and calculating statistics, you'll have moderate state complexity. React's hooks (useState, useEffect, useReducer) or Context API handle this elegantly
       -**Component Reusability**: Different timer modes can be separate components that share logic
       - **Rich Ecosystem**: Easy integration with charting libraries (Recharts, Chart.js) for statistics visualization
       - **Local Storage/Data Persistence**: Straightforward to implement session tracking
       - **Scalability**: If you later want to add features like cloud sync, user accounts, or a mobile app (React Native), you're set up well
- **Timer Logic**: Core timing functionality with start/stop/reset/pause capabilities
- **Data Persistence**: Local storage or database for session tracking
- **Settings Management**: User preferences and timer configurations

### Recommended Development Patterns
- **Component-based architecture** for UI elements (Timer Display, Controls, Statistics, Task Lists, Writing Goals)
- **State management** for timer states (idle, running, paused, completed, reset)
- **Event-driven design** for timer events and user interactions
- **Modular configuration** for timer settings and user preferences

### UI Patterns & Components

#### Core Timer Interface
- **Circular Progress Indicator**: Visual representation of time remaining with animated progress ring with customizable colors
- **Digital Time Display**: Large, readable countdown with hour, minutes, seconds format
- **Control Panel**: Start/Pause/Stop/Reset buttons with distinct visual states and keyboard shortcuts
- **Session Status Badge**: Current session type (writing, researching, creative thinking, spiraling) with color coding.
- **Session Task To-Do List**: Display current tasks or goals for the session. Include circular checkbox to the left of each task for easy tracking. Allow for reordering of tasks via drag-and-drop.

#### Productivity Dashboard
- **Session Cards**: Individual writing session summaries with duration, word count, and timestamps
- **Statistics Widgets**: Daily/weekly/monthly productivity metrics with charts
- **Goal Progress Bars**: Visual tracking of writing goals (time, word count, streak)
- **Calendar Heat Map**: GitHub-style contribution calendar for writing activity

#### Settings & Configuration
- **Timer Presets**: Quick-select common durations (25min Pomodoro, 45min focus, custom)
- **Theme Switcher**: Light/dark mode with timer-friendly color schemes
- **Notification Settings**: Sound alerts, desktop notifications, visual cues
- **Export Options**: CSV/JSON data export with date range selection

### Data Persistence Strategies

#### Local Storage Architecture
```
writingTimer/
├── sessions/           # Individual writing sessions
│   ├── 2025-10-21-001.json
│   └── 2025-10-21-002.json
├── settings.json       # User preferences and configuration
├── goals.json         # Writing goals and targets
└── statistics.json    # Aggregated productivity metrics
```

#### Session Data Structure
- **Core Fields**: startTime, endTime, duration, sessionType, completed
- **Writing Metrics**: wordCount, charactersTyped, pauseCount, actualFocusTime
- **Context Data**: projectName, tags, notes, interruptions
- **Performance**: averageWPM, productivityScore, distractionEvents

#### Data Synchronization
- **Auto-save**: Persist session data every 30 seconds during active writing
- **Backup Strategy**: Daily local backups with 30-day retention
- **Export Formats**: JSON for raw data, CSV for spreadsheet analysis
- **Migration Support**: Version schema for data structure updates

#### Storage Patterns
- **IndexedDB**: For large datasets and offline-first functionality
- **localStorage**: For user preferences and lightweight settings
- **File System API**: For desktop apps with direct file access
- **Cloud Sync**: Optional integration with Google Drive/Dropbox for cross-device access

## Development Workflow

### Getting Started
Since this is a new project, consider these initial steps:
1. Target Platform: Desktop application that can run on Windows, macOS, and Linux
2. Packmanage: NPM 
3. Implement core timer functionality first
4. Add data persistence and statistics features
5. Create user interface components

### Key Components to Implement
- **Timer Engine**: Main timing logic with precision handling
- **Session Manager**: Track writing sessions, word counts, goals
- **Statistics Dashboard**: Display productivity metrics and trends
- **Settings Panel**: Configurable timer durations, break intervals
- **Data Export**: Allow users to export their writing statistics

### Testing Strategy
- **Unit tests** for timer logic and calculations
- **Integration tests** for data persistence
- **User interface tests** for critical user flows
- **Performance tests** for timer accuracy and responsiveness

## Project-Specific Considerations

### Timer Accuracy
- Use high-precision timing mechanisms to ensure accuracy
- Handle browser tab switching and system sleep scenarios
- Implement proper cleanup for timer intervals/timeouts

### Data Management
- **Offline-first approach** with automatic sync when online
- **Incremental backups** to prevent data loss during long sessions
- **Timezone handling** for accurate session tracking across time changes
- **Data integrity checks** to validate session completeness and timing accuracy
- **Performance optimization** using data indexing for fast statistics queries

### User Experience
- Provide clear visual feedback for timer states
- Include audio/visual notifications for timer events
- Support keyboard shortcuts for common actions
- Ensure accessibility compliance

## Future Architecture Notes
As the project develops, update this file with:
- Specific file structure and naming conventions
- Database schema and data models
- API endpoints and service boundaries
- Build and deployment procedures
- Third-party integrations and dependencies

## Development Commands
*To be added once build tools and package managers are configured*