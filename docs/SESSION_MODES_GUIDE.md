# Session Modes - Installation Guide

## 📝 What You're Adding

A beautiful Session Mode Selector that lets you categorize your writing work into four distinct modes:

### The Four Session Modes

| Mode | Icon | Color | Purpose |
|------|------|-------|---------|
| **Writing** | ✍️ | Hot Pink `#E91E63` | Creative writing and drafting |
| **Researching** | 🔍 | Cyan `#00D4FF` | Gathering information and sources |
| **Creative Thinking** | 💡 | Purple `#9C27B0` | Brainstorming and ideation |
| **Roaming** | 🌀 | Orange `#FF9800` | Deep exploration and rabbit holes |

## ✨ Features

✅ **Color-coded session badges** - Each mode has a unique color and icon  
✅ **Active mode indicator** - Shows your current session type with pulsing dot  
✅ **Mode descriptions** - Helpful text explaining each mode  
✅ **Grid layout** - Clean 2x2 button grid for easy selection  
✅ **Lock during timer** - Prevents mode switching while timer is running  
✅ **Completion messages** - Customized alerts based on session mode  
✅ **Responsive design** - Works great on all screen sizes  

## 🎯 How to Use

### Selecting a Mode

1. Click any of the four mode buttons
2. The selected mode will highlight with its color
3. A badge at the top shows your current mode

### During a Session

- The current mode badge shows a pulsing dot (●) when timer is running
- Mode buttons are **locked** while timer is active
- You'll see a message: "⚠️ Stop the timer to change session mode"

### Changing Modes

- **Stop or reset** the timer first
- Click a different mode button
- Start your new session type!

### Completion Messages

When a timer completes, you'll get a custom message based on your mode:

- "Writing session complete! Great work! 🎉"
- "Researching session complete! Great work! 🎉"
- "Creative thinking session complete! Great work! 🎉"
- "Roaming session complete! Great work! 🎉"

## 🎨 Visual Layout

```
┌─────────────────────────────────────────┐
│ A Timer to Write      │
├─────────────────────────────────────────┤
│                                         │
│  [✍️ Writing ●]  ← Current mode badge  │
│  Creative writing and drafting          │
│                                         │
│  SESSION MODE                           │
│  ┌──────────┬──────────┐               │
│  │ ✍️       │ 🔍       │               │
│  │ Writing  │Research  │               │
│  └──────────┴──────────┘               │
│  ┌──────────┬──────────┐               │
│  │ 💡       │ 🌀       │               │
│  │ Creative │ Roaming  │               │
│  └──────────┴──────────┘               │
│                                         │
│        [Timer Display]                  │
│        [Control Buttons]                │
└─────────────────────────────────────────┘
```

## 🔧 Code Structure

### State Management

```jsx
const [sessionMode, setSessionMode] = useState('writing');
```

- Tracks current session mode
- Defaults to 'writing'
- Updates when user selects a mode

### Props Passed to Component

```jsx
<SessionModeSelector 
  currentMode={sessionMode}
  onModeChange={handleModeChange}
  isTimerRunning={timer.isRunning || timer.isPaused}
/>
```

## 🎨 Customization Options

### Add a New Mode

In `SessionModeSelector.jsx`, add to the `SESSION_MODES` array:

```jsx
{ 
  id: 'editing', 
  label: '✏️ Editing', 
  color: '#FF5722',
  description: 'Revising and polishing work'
}
```

### Change Mode Colors

Update the `color` property for any mode in the `SESSION_MODES` array.

### Change Grid Layout

In `SessionModeSelector.css`, modify:

```css
.mode-buttons {
  grid-template-columns: repeat(2, 1fr); /* Change 2 to 3 or 4 */
}
```

## 📱 Responsive Behavior

### Desktop (>768px)

- 2x2 grid layout
- Full-size buttons with large icons
- Spacious padding

### Tablet (768px)

- 2x2 grid layout
- Medium-sized buttons
- Adjusted padding

### Mobile (<480px)

- Single column layout (1x4)
- Stacked buttons for easier tapping
- Compact design

## 🧪 Testing Checklist

- [ ] All four modes display correctly
- [ ] Clicking a mode selects it (visual feedback)
- [ ] Current mode badge shows correct icon and color
- [ ] Mode buttons lock when timer starts
- [ ] Warning message appears when trying to change during session
- [ ] Mode buttons unlock when timer stops
- [ ] Completion message includes correct mode name
- [ ] Responsive on mobile (buttons stack vertically)

## 🐛 Troubleshooting

**Modes don't appear:**

- Check that SessionModeSelector.jsx is in `src/components/`
- Verify the import in App.jsx
- Check browser console for errors

**Buttons don't lock:**

- Verify `isTimerRunning` prop is correctly passed
- Check that `timer.isRunning || timer.isPaused` is working

**Colors not showing:**

- Make sure SessionModeSelector.css is imported
- Check that inline styles are being applied
- Inspect element in browser dev tools

## 🎯 What's Next?

With session modes working, you're ready to add:

1. **Task List** - To-do items for each session
2. **Statistics Dashboard** - Track time spent in each mode
3. **Session History** - See past sessions by mode
4. **Keyboard Shortcuts** - Quick mode switching (saved for later!)

## ✅ You're Done

Your timer now has professional session mode tracking! Writers can categorize their work, track different activities, and stay organized.

The color-coded system makes it easy to see at a glance what type of work you're doing. Perfect for your Mercurial Timer! 🚀
