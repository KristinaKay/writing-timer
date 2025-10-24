# Pomodoro Mode - Complete Installation Guide

## 🍅 What is Pomodoro Mode?

The Pomodoro Technique is a time management method that breaks work into intervals (traditionally 25 minutes) separated by short breaks. After a set number of work sessions, you take a longer break.

**Your Mercurial Timer now includes:**
- ✅ Automatic work/break cycles
- ✅ Customizable durations for work, short breaks, and long breaks
- ✅ Visual progress tracker showing your cycle position
- ✅ Auto-transitions between sessions
- ✅ Smart notifications for each phase
- ✅ Flexible configuration (1-10 sessions before long break)

## 📦 Files to Install

You have 5 new files:
1. **PomodoroSettings.jsx** - Configuration component (NEW)
2. **PomodoroSettings-COMPLETE.css** - Settings styling (NEW)
3. **PomodoroCycleTracker.jsx** - Visual progress tracker (NEW)
4. **PomodoroCycleTracker.css** - Tracker styling (NEW)
5. **App-with-Pomodoro.jsx** - Updated App with full integration (REPLACE)

## 🚀 Installation Steps

### Step 1: Add new components
```
PomodoroSettings.jsx → src\components\PomodoroSettings.jsx
PomodoroSettings-COMPLETE.css → src\components\PomodoroSettings.css (rename it!)
PomodoroCycleTracker.jsx → src\components\PomodoroCycleTracker.jsx
PomodoroCycleTracker.css → src\components\PomodoroCycleTracker.css
```

### Step 2: Replace App.jsx
```
App-with-Pomodoro.jsx → Rename to App.jsx and replace src\App.jsx
```

### Step 3: Watch the magic! ✨
Your browser will auto-refresh with full Pomodoro functionality!

## 🎯 How to Use

### Enabling Pomodoro Mode

1. **Toggle the switch**: Click the "🍅 Pomodoro Mode" toggle
2. **See the badge**: "Active" badge appears when enabled
3. **Click Settings**: Expand to customize your cycles

### Default Configuration

| Setting | Default Value |
|---------|--------------|
| Work Duration | 25 minutes |
| Short Break | 5 minutes |
| Long Break | 15 minutes |
| Sessions Before Long Break | 4 sessions |

### The Cycle Flow

```
Work (25min) → Short Break (5min) → 
Work (25min) → Short Break (5min) → 
Work (25min) → Short Break (5min) → 
Work (25min) → Long Break (15min) → REPEAT
```

### Visual Progress Tracker

When Pomodoro is enabled, you'll see:
- **Current phase icon**: 🍅 Work, ☕ Short Break, 🌟 Long Break
- **Progress dots**: Shows which session you're on
  - Gray dots = Pending sessions
  - Cyan pulsing dot = Current session
  - Pink dots = Completed sessions
- **Session counter**: "Session 2 of 4"

### Ring Colors by Phase

| Phase | Color | Meaning |
|-------|-------|---------|
| Work Session | Hot Pink #E91E63 | Active writing |
| Short Break | Orange #FFA726 | Quick rest |
| Long Break | Purple #9C27B0 | Extended rest |
| Paused | Cyan #00D4FF | Temporarily stopped |
| Complete | Green #66bb6a | Session finished |

## ⚙️ Customizing Your Pomodoro

### Changing Durations

1. Click the "▶ Settings" button
2. Modify any value:
   - **Work Duration**: 1-999 minutes
   - **Short Break**: 1-999 minutes
   - **Long Break**: 1-999 minutes
   - **Sessions Before Long Break**: 1-10 sessions
3. Changes apply to the next cycle

### Example Configurations

**Classic Pomodoro:**
- Work: 25min | Short: 5min | Long: 15min | Sessions: 4

**Extended Focus:**
- Work: 50min | Short: 10min | Long: 30min | Sessions: 4

**Quick Sprints:**
- Work: 15min | Short: 3min | Long: 10min | Sessions: 6

**Writer's Deep Work:**
- Work: 45min | Short: 10min | Long: 20min | Sessions: 3

**Marathon Sessions:**
- Work: 90min | Short: 15min | Long: 45min | Sessions: 2

## 🎮 Using Pomodoro Mode

### Starting a Pomodoro Cycle

1. Enable Pomodoro Mode (toggle switch)
2. Your timer resets to work duration (default 25min)
3. Click "▶️ Start" to begin first work session
4. Work until the timer completes

### Auto-Transitions

**After Work Session:**
- Alert: "Work session 1 complete! Time for a short break! ☕"
- Timer automatically sets to short break duration
- You can start the break timer when ready

**After Short Break:**
- Alert: "Short break complete! Ready for another session? 🍅"
- Timer resets to work duration
- Next work session is ready

**After completing all sessions:**
- Alert: "Work session 4 complete! Time for a long break! 🌟"
- Timer sets to long break duration
- Take your well-deserved rest!

**After Long Break:**
- Alert: "Long break complete! Great work! Starting new cycle. 🎉"
- Cycle resets to session 1
- Ready for a fresh set of sessions

### Manual Controls Still Work

- **Pause**: Temporarily stop the timer
- **Stop**: End current session and reset
- **Reset**: Start current phase over
- **Changing presets**: Resets the Pomodoro cycle

## 🔒 Settings Lock

**Important**: You cannot change Pomodoro settings or session mode while a timer is running!

**To change settings:**
1. Stop or let the timer complete
2. Modify your settings
3. Start the new cycle

This prevents accidental changes mid-session.

## 💡 Pro Tips

### Maximize Productivity

1. **Plan your tasks** before starting a Pomodoro
2. **Eliminate distractions** during work sessions
3. **Actually take breaks** - they're part of the technique!
4. **Track different work** using Session Modes + Pomodoro
5. **Experiment with durations** - find what works for YOU

### Combining Features

**Pomodoro + Session Modes:**
- Set to "Writing" mode for drafting sessions
- Switch to "Researching" for information gathering
- Use "Creative Thinking" for brainstorming Pomodoros

**Custom Durations + Pomodoro:**
- Set custom work duration for special projects
- Pomodoro cycle will use your custom setting

## 🎨 Visual Indicators

### Progress Dots Explained

```
○ ○ ○ ○  = 4 sessions pending (gray)
● ○ ○ ○  = Session 1 complete, on session 2 (pink + cyan pulsing)
● ● ○ ○  = 2 complete, on session 3
● ● ● ○  = 3 complete, on session 4
● ● ● ●  = All 4 complete, long break time!
```

### What Each Icon Means

- 🍅 = Work session (focus time!)
- ☕ = Short break (quick rest)
- 🌟 = Long break (extended rest)
- ⏱️ = Ready to start

## 📱 Responsive Design

Pomodoro components adapt to screen size:
- **Desktop**: Settings in 2-column grid
- **Tablet**: Single column for settings
- **Mobile**: Full-width buttons and inputs

## 🐛 Troubleshooting

**Pomodoro won't enable:**
- Make sure timer isn't running
- Stop any active session first

**Settings won't change:**
- Check if timer is active (must be stopped)
- Look for the lock warning message

**Cycle doesn't auto-advance:**
- Timer must complete naturally (not stopped manually)
- Check that Pomodoro is still enabled

**Visual progress not showing:**
- Confirm Pomodoro mode is enabled (toggle on)
- Check that components are properly imported

## 🔮 What's Next?

With Pomodoro Mode working, you can:
1. **Task List** - Add specific tasks for each Pomodoro
2. **Statistics** - Track completed Pomodoros over time
3. **Session History** - Review past cycles and breaks
4. **Keyboard Shortcuts** - Quick controls (saved for last!)

## ✅ You're Done!

Your timer now has professional Pomodoro functionality! 

The technique helps you:
- Maintain focus with timed intervals
- Take regular breaks to prevent burnout
- Track productivity in measurable units
- Build consistent work habits

Perfect for writers who need structured focus time! 🚀

## 🍅 Pomodoro Best Practices

1. **One task per Pomodoro** - Focus on a single thing
2. **No mid-Pomodoro switches** - Commit to the 25 minutes
3. **Track interruptions** - Note what breaks your flow
4. **Respect the breaks** - They're essential, not optional
5. **Review and adjust** - Find your optimal work/break ratio

Happy Pomodoro-ing! 🍅✨
