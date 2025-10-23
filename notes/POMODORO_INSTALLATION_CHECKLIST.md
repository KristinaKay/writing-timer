# Pomodoro Mode - Quick Installation Checklist

## 📦 Files You Need to Install

### New Components (Add These)
```
✅ PomodoroSettings.jsx → src\components\PomodoroSettings.jsx
✅ PomodoroSettings-COMPLETE.css → src\components\PomodoroSettings.css
✅ PomodoroCycleTracker.jsx → src\components\PomodoroCycleTracker.jsx
✅ PomodoroCycleTracker.css → src\components\PomodoroCycleTracker.css
```

### Replace This File
```
✅ App-with-Pomodoro.jsx → Rename to App.jsx, replace src\App.jsx
```

## 🚀 Installation in 3 Steps

### Step 1: Add Components
Copy the 4 new component files into `src\components\`

**Important:** Rename `PomodoroSettings-COMPLETE.css` to just `PomodoroSettings.css`

### Step 2: Replace App
Rename `App-with-Pomodoro.jsx` to `App.jsx` and replace your current `src\App.jsx`

### Step 3: Done!
Save and watch your browser refresh! 🎉

## ✨ What You'll Get

### Pomodoro Toggle
- 🍅 Enable/disable Pomodoro mode with a switch
- Pink toggle when active
- "Active" badge when enabled

### Pomodoro Settings (Expandable)
- Work Duration (default: 25 min)
- Short Break (default: 5 min)  
- Long Break (default: 15 min)
- Sessions Before Long Break (default: 4)

### Visual Cycle Tracker
- Shows current phase (🍅 Work, ☕ Short Break, 🌟 Long Break)
- Progress dots showing session position
- "Session X of Y" counter

### Auto-Transitions
- Work complete → Auto-set short break
- Short break complete → Auto-set work
- After N sessions → Auto-set long break
- Long break complete → Reset cycle

### Smart Alerts
- Custom messages for each phase
- Notifications between transitions
- Completion celebrations

## 🎯 Quick Test

1. **Enable Pomodoro** - Toggle the switch
2. **Start Timer** - Click ▶️ Start
3. **Wait 25 minutes** - Or change work duration to 1 min for testing!
4. **Watch auto-transition** - Timer switches to break automatically
5. **See progress dots** - Track your position in the cycle

## 💡 Pro Tip for Testing

Change work duration to **1 minute** for quick testing:
1. Enable Pomodoro
2. Click "▶ Settings"
3. Change "Work Duration" to 1
4. Start timer and watch it cycle through!

## 📖 Full Documentation

See **POMODORO_GUIDE.md** for:
- Detailed usage instructions
- Customization options
- Best practices
- Troubleshooting
- Examples and tips

## ✅ Checklist

Before you start:
- [ ] All 4 component files copied to `src\components\`
- [ ] PomodoroSettings-COMPLETE.css renamed to PomodoroSettings.css
- [ ] App.jsx replaced with App-with-Pomodoro.jsx (renamed)
- [ ] Browser showing no errors
- [ ] Pomodoro toggle visible and working

After installation:
- [ ] Toggle switch appears
- [ ] Settings expand/collapse works
- [ ] Cycle tracker shows when enabled
- [ ] Timer auto-transitions work
- [ ] Progress dots update correctly
- [ ] All colors match brand theme

## 🎉 You're Ready!

Your Mercurial Timer now has professional Pomodoro functionality with automatic work/break cycles, visual progress tracking, and smart notifications!

Perfect for focused writing sessions! 🍅✨
