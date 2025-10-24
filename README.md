# ⏱️ A Timer to Write

![dev](https://img.shields.io/badge/dev-vite-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Accessibility](https://img.shields.io/badge/WCAG-AA-green)

> *A focused writing timer application designed to help writers track sessions, manage tasks, and boost productivity.*

## 🌟 Highlights

- **Flexible Timer Modes**: Pomodoro technique, custom durations, and multiple session modes (Writing, Researching, Creative Thinking, Spiraling)
- **Task Management**: Drag-and-drop task list with circular checkboxes for easy session tracking
- **Beautiful Themes**: Six stunning themes (Dark, Light, Ocean, Sunset, Forest, Midnight)
- **Session Statistics**: Track your writing sessions with detailed productivity metrics
- **WCAG AA Compliant**: Full accessibility support with keyboard navigation and reduced motion options
- **Export/Import**: Save and restore your session data
- **Compact Mode**: Toggle for a streamlined interface

## ℹ️ Overview

A Timer to Write is a productivity application built specifically for writers who want to track their writing sessions and maintain focus. Whether you're working on a novel, blog posts, or academic papers, this timer helps you stay accountable with visual feedback, task lists, and comprehensive statistics.

The app uses the Pomodoro technique by default but is fully customizable to fit your workflow. All data is stored locally in your browser, ensuring privacy and offline functionality.

### ✍️ Author

Created by **KristinaKay**  
GitHub: [@KristinaKay](https://github.com/KristinaKay)

## 🚀 Quick Start

### View the app in action

1. Start the timer with preset durations (25min, 45min, 1hr) or set a custom duration
2. Add tasks to track what you're working on during each session
3. Choose a session mode (Writing, Researching, Creative Thinking, or Spiraling)
4. Select a theme that suits your mood
5. View your productivity statistics and session history

### Features at a glance

```markdown
✓ Start/Pause/Stop/Reset controls with keyboard shortcuts
✓ Circular progress indicator with real-time countdown
✓ Task list with drag-and-drop reordering
✓ Session statistics and productivity tracking
✓ Multiple timer modes including Pomodoro cycles
✓ Sound notifications with customizable alerts
✓ Export/Import data for backup
```

## ⬇️ Installation

### Prerequisites

- Node.js 16+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/KristinaKay/writing-timer.git
cd writing-timer
npm install
```

### Run Development Server

```bash
npm run dev
```

Open <http://localhost:5173/> to view the app.

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

## 🎨 Features

### Timer Modes

- **Pomodoro**: 25-minute focused work sessions with 5-minute breaks
- **Custom Duration**: Set any duration in hours and minutes
- **Session Modes**: Writing, Researching, Creative Thinking, Spiraling

### Task Management

- Add tasks for each writing session
- Drag-and-drop to reorder priorities
- Check off completed tasks
- Clear completed tasks with one click
- Task stats show progress

### Themes

Six carefully crafted themes for different moods and lighting conditions:

- **Dark**: Easy on the eyes for long writing sessions
- **Light**: Clean and bright for daytime writing
- **Ocean**: Calming blue gradients
- **Sunset**: Warm orange and pink tones
- **Forest**: Natural green hues
- **Midnight**: Deep purple with accent colors

### Statistics

Track your writing productivity:

- Total sessions completed
- Total time spent writing
- Average session duration
- Session history with timestamps
- Productivity trends

### Accessibility

WCAG AA compliant with:

- 4.5:1 minimum contrast ratios
- Keyboard navigation support
- Focus indicators on all interactive elements
- Reduced motion support for animations
- 44×44px minimum touch targets
- Screen reader friendly

## 💭 Feedback and Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/KristinaKay/writing-timer/issues) on GitHub.

Want to contribute? Pull requests are welcome! Please read the contribution guidelines in the [notes/](notes/) directory for development patterns and architecture decisions.

## 📝 License

This project is private and not currently licensed for public use.

---

## 🛠️ Development

From the project root run the development server with a single command:

```powershell
npm install
npm run dev
```

Open <http://localhost:5173/> to view the app.

## Developer checklist

Quick steps for local development:

- Install dependencies: `npm install`
- Run dev server (hot reload): `npm run dev`
- Build for production: `npm run build`
- Preview production build locally: `npm run preview`
- Run the linter: `npm run lint`

Quick tips:

- The app entry is `src/main.jsx` and the primary component is `src/App.jsx`.
- Styles are in `src/App.css`; use the `.container` helper to constrain content while keeping background full-width.
- Sidebar accordion state persists to localStorage under the key `openSidebarSection`.
- For accessibility: use ArrowUp/ArrowDown, Tab/Shift+Tab to move between sidebar headers and Enter/Space to toggle a section.

### Quick Reference

From the project root, run these commands:

```powershell
npm install          # Install dependencies
npm run dev         # Start dev server (hot reload)
npm run build       # Build for production
npm run preview     # Preview production build locally
npm run lint        # Run ESLint
```

### Project Structure

- **Entry point**: `src/main.jsx`
- **Main component**: `src/App.jsx`
- **Components**: `src/components/` (Timer, TaskList, Statistics, etc.)
- **Hooks**: `src/hooks/` (useTimer.js for timer logic)
- **Utilities**: `src/lib/` (theme, sound, statistics utilities)
- **Styles**: Component-specific CSS files + `src/App.css`

### Key Technologies

- **React 18**: Functional components with hooks
- **Vite**: Fast build tool and dev server
- **CSS Variables**: Theme system with data attributes
- **localStorage**: Client-side data persistence

### VS Code Integration

Start the dev server directly from VS Code:

1. Open Command Palette (Ctrl+Shift+P)
2. Run `Tasks: Run Task`
3. Select **Start Dev Server**

### Accessibility Tips

- Sidebar uses keyboard navigation: Arrow keys to move, Enter/Space to toggle
- All interactive elements have focus indicators
- Themes respect system color preferences
- Animations respect `prefers-reduced-motion`

## 🧪 Testing

### Visual Smoke Test

The project includes an automated visual smoke test that captures a screenshot of the running app.

#### Option 1: Full automated test

```powershell
npm run smoke
```

This starts the dev server, captures a screenshot, and shuts down automatically.

#### Option 2: Manual screenshot

Start the dev server first:

```powershell
npm run dev
```

Then in another terminal:

```powershell
npm run smoke:screenshot
```

##### Configuration

Environment variables:

- `CHROME_PATH`: Path to Chrome/Chromium executable (auto-detected if not set)
- `SMOKE_URL`: Override target URL (default: <http://localhost:5173/>)
- `SMOKE_WAIT_MS`: Wait time for server startup (milliseconds)

##### Output

- Screenshot: `test/smoke/screenshot.png`
- Console logs: `test/smoke/console.log`

## 📚 Documentation

Additional guides and documentation are available in the `notes/` directory:

- **POMODORO_GUIDE.md**: How the Pomodoro feature works
- **TASK_LIST_GUIDE.md**: Task management implementation
- **SESSION_MODES_GUIDE.md**: Different session types
- **CIRCULAR_PROGRESS_GUIDE.md**: Timer visualization
- **BRAND_COLORS_GUIDE.md**: Theme color system

For development patterns and architecture decisions, see `.github/copilot-instructions.md`.
