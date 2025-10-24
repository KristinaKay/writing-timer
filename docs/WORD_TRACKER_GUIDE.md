# Word Tracker Feature - Complete Guide

## 📝 What Is It?

A dedicated word count tracker for writers that:

- Tracks words written per session
- Sets optional word count goals
- Calculates progress automatically
- Saves word statistics
- Shows achievements

Perfect for tracking your writing productivity!

---

## 📦 Files to Install

### New Component

- `WordTracker.jsx` → src/components/WordTracker.jsx
- `WordTracker.css` → src/components/WordTracker.css

### Enhanced Statistics (replaces existing)

- `Statistics-WITH-WORDS.jsx` → Rename to `Statistics.jsx` → Replace existing
- `Statistics-ENHANCED.css` → Rename to `Statistics.css` → Replace existing

---

## ✨ Features

### Toggle On/Off

- **Enable/Disable** word tracking per session
- Toggle persists across sessions
- When off, no word inputs shown

### Track Words

- **Words at Start** - Your starting word count
- **Target Goal** - Optional goal (e.g., 500 words)
- **Words at End** - Your ending word count
- **Words Written** - Auto-calculated (End - Start)

### Quick Goals

- **One-click goal setting**
- Preset buttons: 250, 500, 1000, 2000 words
- Or enter custom target

### Progress Display

- **Words Written** - Real-time calculation
- **Progress %** - If goal is set
- **Visual Progress Bar** - Shows completion
- **Goal Status** - "🎉 Goal Achieved!" or "X words to go"

### Auto-Save Sessions

- Saves when timer completes
- Saves when you click "Save Session"
- Stores last 20 sessions
- Integrates with Statistics

---

## 🎯 How to Use

### Basic Workflow

**1. Before Starting Timer:**

```markdown
1. Enable "📝 Track Word Count" toggle
2. Check your current word count in your editor
3. Enter that number in "Words at Start"
4. (Optional) Set a target goal or use quick goal button
5. Start your timer
```

**2. During Session:**

```markdown
1. Write!
2. Periodically check your word count
3. Update "Words at End" as you progress
4. Watch progress bar fill up
```

**3. After Session:**

```markdown
1. Timer completes
2. Enter final word count in "Words at End"
3. Session auto-saves with statistics
4. Get completion message with your achievement
```

---

## 📊 What Gets Tracked

### Session Data

- Timestamp
- Session mode (Writing, Research, etc.)
- Words at start
- Words at end
- Words written
- Target goal (if set)
- Goal achieved (yes/no)

### Statistics (in Statistics section)

- 📝 **Total Words Written** - All time total
- 📊 **Average/Session** - Words per session average
- 🏆 **Best Session** - Your personal record
- 🎯 **Goals Hit %** - % of goals achieved

---

## 💡 Usage Examples

### Example 1: Novel Writing

```markdown
Session Mode: ✍️ Writing
Timer: 60 minutes
Words at Start: 45,320
Target Goal: 2000 words
Words at End: 47,450
Result: 2,130 words written - Goal achieved! 🎉
```

### Example 2: Short Story

```markdown
Session Mode: ✍️ Writing
Timer: 25 minutes (Pomodoro)
Words at Start: 0
Target Goal: 500 words
Words at End: 532
Result: 532 words - Goal achieved! 🎉
```

### Example 3: Editing Session

```markdown
Session Mode: ✍️ Writing
Timer: 45 minutes
Words at Start: 12,500
Target Goal: (none)
Words at End: 12,350
Result: -150 words (editing reduced count)
Note: Negative counts won't save to statistics
```

### Example 4: Blog Post

```markdown
Session Mode: 💡 Creative Thinking
Timer: 30 minutes
Words at Start: 0
Target Goal: 1000 words
Words at End: 847
Result: 847 words (85% of target)
```

---

## 🎨 UI Components

### Toggle Switch

- **Off:** Gray slider, left position
- **On:** Pink slider, right position, "On" badge
- **State:** Persists across sessions

### Input Fields

- **Words at Start:** Locked once session starts
- **Target Goal:** Always editable
- **Words at End:** Update anytime during/after session

### Quick Goal Buttons

- **250** - Short sprint goal
- **500** - Classic Pomodoro goal
- **1000** - Standard session goal
- **2000** - Ambitious session goal

### Progress Display (shows when start count entered)

- **Stats Grid:** Words Written, Progress %
- **Progress Bar:** Visual fill from 0-100%
- **Target Status:**
  - 🎉 Green "Goal Achieved!" when complete
  - 🟠 Orange "X words to go" when in progress

### Buttons

- **💾 Save Session** - Manually save (if timer already stopped)

---

## 🔄 Integration with Statistics

Word statistics appear in the Statistics section when tracking is enabled:

### New Stats Cards

```text
┌─────────────────┐ ┌─────────────────┐
│  📝 Total Words │ │ 📊 Avg/Session  │
│     45,320      │ │       892       │
└─────────────────┘ └─────────────────┘

┌─────────────────┐ ┌─────────────────┐
│ 🏆 Best Session │ │  🎯 Goals Hit   │
│      2,450      │ │       78%       │
└─────────────────┘ └─────────────────┘
```

### Session History

- Last 20 word tracking sessions saved
- Includes all session details
- Used for statistics calculations

---

## 📍 Recommended Sidebar Placement

### Option 1: With Session Setup (Recommended)**

```markdown
1. 📝 Session Mode
2. 📝 Track Word Count  ← NEW
3. 🍅 Pomodoro Mode
4. ⚡ Quick Presets
5. 🎨 Custom Timer
```

## Option 2: After Duration Settings

```markdown
1. 📝 Session Mode
2. 🍅 Pomodoro Mode
3. ⚡ Quick Presets
4. 🎨 Custom Timer
5. 📝 Track Word Count  ← NEW
```

## Option 3: With Statistics

```markdown
1. 📝 Session Mode
2. 🍅 Pomodoro Mode
3. ⚡ Quick Presets
4. 🎨 Custom Timer
5. 📊 Statistics
6. 📝 Track Word Count  ← NEW (right after stats)
```

Recommened: **Option 1** - placing it right after Session Mode, since you select your mode, then configure word tracking before starting.

---

## 💾 Data Storage

### localStorage Keys

- `mercurial-word-tracking-enabled` - Toggle on/off state
- `mercurial-word-statistics` - All word statistics and history

### Data Structure

```json
{
  "totalWordsWritten": 45320,
  "totalSessions": 51,
  "sessionsWithGoal": 45,
  "goalsAchieved": 35,
  "bestSession": 2450,
  "sessionHistory": [
    {
      "timestamp": "2025-01-15T14:30:00Z",
      "sessionMode": "writing",
      "wordsAtStart": 45170,
      "wordsAtEnd": 45320,
      "wordsWritten": 150,
      "targetWords": 500,
      "goalAchieved": false
    }
  ]
}
```

---

## 🎯 Tips & Best Practices

### Setting Goals

**For Sprints (15-25 min):**

- 250-500 words is realistic
- Focus on consistency

**For Pomodoros (25 min):**

- 500 words is a good target
- Adjust based on your writing speed

**For Deep Focus (45-60 min):**

- 1000-1500 words
- Allow for deeper work

**For Extended Sessions (60+ min):**

- 2000+ words
- Take breaks!

### Tracking Strategies

## Option 1: Exact Tracking

- Check word count before starting
- Update during session
- Final count at end
- Most accurate

## Option 2: Estimation

- Note starting count
- Write without checking
- Final count at end
- Less distraction during writing

## Option 3: Goal-Focused

- Set ambitious goal
- Don't track during session
- Check at end
- Focus on flow, not numbers

### When NOT to Track

- **Editing sessions** (word count may go down)
- **Outlining** (not prose writing)
- **Research sessions** (not creating words)
- **Brainstorming** (free-form thinking)

Better for these: Use Session Mode without word tracking

---

## ⚙️ Customization

### Change Quick Goal Buttons

In `WordTracker.jsx`, find this section:

```jsx
<button onClick={() => setQuickGoal(250)}>250</button>
<button onClick={() => setQuickGoal(500)}>500</button>
<button onClick={() => setQuickGoal(1000)}>1000</button>
<button onClick={() => setQuickGoal(2000)}>2000</button>
```

Change to your preferred goals:

```jsx
<button onClick={() => setQuickGoal(300)}>300</button>
<button onClick={() => setQuickGoal(750)}>750</button>
<button onClick={() => setQuickGoal(1500)}>1500</button>
<button onClick={() => setQuickGoal(3000)}>3000</button>
```

### Change Progress Bar Color

In `WordTracker.css`, find:

```css
.progress-bar-fill {
  background: linear-gradient(90deg, #E91E63 0%, #C2185B 100%);
}
```

Change to your preferred color.

---

## 🐛 Troubleshooting

**Words not saving:**

- Ensure both start AND end counts are entered
- Words written must be positive (end > start)
- Check browser console for errors

**Statistics not showing word stats:**

- Complete at least one session with tracking enabled
- Refresh Statistics section
- Check localStorage for 'mercurial-word-statistics'

**Negative word count:**

- This happens during editing
- Sessions with negative counts won't save
- This is by design (editing vs. writing)

**Quick goals not setting:**

- Click the button again
- Manually enter in Target Goal field
- Refresh page if buttons aren't responding

**Progress bar stuck at 0%:**

- Enter a target goal
- Enter words at end
- Progress calculates: (written / target) * 100

---

## 📊 Statistics Examples

### After 50 Writing Sessions

```markdown
Total Words Written: 47,890 words
Total Sessions: 50
Average per Session: 958 words
Best Session: 2,341 words
Sessions with Goals: 42
Goals Achieved: 34 (81%)
```

### Monthly Progress

```markdown
Week 1: 10 sessions, 8,942 words
Week 2: 12 sessions, 11,234 words
Week 3: 14 sessions, 13,891 words
Week 4: 15 sessions, 16,243 words
Total: 51 sessions, 50,310 words
```

---

## ✅ Installation Checklist

Component files:

- [ ] WordTracker.jsx in components/
- [ ] WordTracker.css in components/

Enhanced Statistics:

- [ ] Statistics-WITH-WORDS.jsx renamed to Statistics.jsx
- [ ] Replaced existing Statistics.jsx
- [ ] Statistics-ENHANCED.css renamed to Statistics.css
- [ ] Replaced existing Statistics.css

App integration:

- [ ] Added WordTracker import to App.jsx
- [ ] Added WordTracker section to sidebar
- [ ] Passed isTimerRunning prop
- [ ] Passed sessionMode prop

Testing:

- [ ] Toggle turns on/off
- [ ] Can enter word counts
- [ ] Quick goal buttons work
- [ ] Progress bar displays
- [ ] Session saves on completion
- [ ] Statistics show word stats
- [ ] Data persists after refresh

---

## 🎉 You're Ready

Your timer now tracks word count progress like a dedicated writing app!

**Perfect for:**

- ✅ Novel writing
- ✅ Blog posts
- ✅ Academic writing
- ✅ Creative writing
- ✅ Content creation
- ✅ Any prose writing!

**Track your progress, hit your goals, and watch your word count grow!** 📝✨

---

## 🔮 Future Enhancements

Possible additions:

- Daily/weekly word count goals
- Writing streaks (consecutive days)
- Word count graphs
- Export word statistics
- Writing speed (WPM)
- Session notes/tags
- Goal templates
