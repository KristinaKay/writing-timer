# Task List - Installation Guide

## 📋 What You're Getting

A fully-featured Task List with:

- ✅ Add/check/delete tasks
- ✅ Drag-and-drop reordering
- ✅ Circular checkboxes (brand themed)
- ✅ Auto-save to localStorage (persists across sessions)
- ✅ Task completion stats
- ✅ "Clear completed" button
- ✅ Focus reminder when timer is running
- ✅ Smooth animations

---

## 🎯 What's in the New Section

### Task List Header

- **Icon:** 📋 Task List
- **Location:** 5th section in sidebar (below Custom Timer)
- **Default state:** Collapsed

### Features

**Add Tasks:**

- Type in the input box
- Press Enter or click the + button
- Tasks save automatically

**Check Off Tasks:**

- Click the circular checkbox
- Completed tasks get a strikethrough and fade
- Checkboxes turn pink when checked

**Reorder Tasks:**

- Drag the ⋮⋮ handle on the left
- Drop anywhere in the list
- Order persists

**Delete Tasks:**

- Hover over a task
- Click the × button that appears
- Task is removed

**Clear Completed:**

- Click "Clear ✓" button (top right)
- Removes all completed tasks at once

**Task Stats:**

- Shows "X of Y completed"
- Updates automatically

**Focus Reminder:**

- When timer is running
- Reminds you to focus on tasks
- "💡 Focus on your tasks during this session!"

## 💾 Data Persistence

Tasks save automatically to your browser's localStorage:

- Survive page refreshes
- Stay across browser sessions
- Cleared only if you clear browser data

**Storage key:** `mercurial-tasks`

## 🎨 Visual Design

### Checkboxes

- **Empty:** Circular, white border
- **Hover:** Pink border with pink background tint
- **Checked:** Pink filled circle with white checkmark ✓

### Task Items

- **Normal:** Light background, white text
- **Hover:** Slightly brighter background
- **Completed:** Faded, strikethrough text
- **Dragging:** 50% opacity, grabbing cursor

### Drag Handle

- **Icon:** ⋮⋮ (vertical dots)
- **Color:** Gray
- **Cursor:** Grab (becomes grabbing when dragging)

### Delete Button

- **Hidden by default**
- **Visible on hover**
- **Color:** Red on hover
- **Position:** Right side of task

### Stats & Buttons

- Clean typography
- Subtle backgrounds
- Brand-consistent pink accents

## 🎮 How to Use

### Adding Tasks

1. **Click** the input box (or it's already focused)
2. **Type** your task
3. **Press Enter** or **click +**
4. Task appears in the list below

**Examples:**

- "Write chapter 3 opening"
- "Research medieval armor"
- "Edit dialogue in scene 2"
- "Brainstorm plot twist"

### Managing Tasks

**Check off a task:**

- Click the circle checkbox
- Task gets strikethrough
- Moves to completed state

**Uncheck a task:**

- Click the checked checkbox again
- Task returns to active state

**Reorder tasks:**

- Click and hold the ⋮⋮ handle
- Drag task up or down
- Release to drop in new position

**Delete a task:**

- Hover over the task
- Click the × button (appears on hover)
- Task is removed permanently

**Clear all completed:**

- Click "Clear ✓" button (top right)
- All checked tasks removed at once

### During a Timer Session

When your timer is running:

- Tasks remain editable
- Reminder message appears at bottom
- Great for tracking session goals!

## 🔄 Drag & Drop Details

### How It Works

- Grab the ⋮⋮ handle (left side)
- Cursor changes to "grabbing"
- Task becomes semi-transparent
- Drag to desired position
- Drop to reorder

### Visual Feedback

- Dragged task: 50% opacity
- Cursor: grab → grabbing
- Smooth animations
- Order saves immediately

### Notes

- Drag handle only (not the whole task)
- Works with mouse or trackpad
- Touch devices: may vary by browser

## 💡 Pro Tips

### Workflow Ideas

**Before Starting Timer:**

1. Open Task List
2. Add 2-4 specific goals
3. Start timer
4. Check off as you complete

**Session Types by Task:**

- ✍️ Writing: "Write 500 words", "Finish scene"
- 🔍 Researching: "Find 3 sources", "Read chapter 5"
- 💡 Creative: "Brainstorm 10 plot ideas", "Character sketch"
- 🌀 Roaming: "Explore theme", "Research rabbit hole"

### Task Management

**Keep it simple:**

- 3-5 tasks per session
- Specific, actionable items
- Clear completion criteria

**Clear completed regularly:**

- End of each session
- End of each day
- Keeps list focused

**Use drag-and-drop:**

- Priority order (top = urgent)
- Sequence order (steps in process)
- Energy level order (hard → easy)

## 📱 Responsive Behavior

### Desktop

- Full-width in sidebar
- Max height: 400px (scrollable)
- Smooth drag-and-drop
- Hover effects work perfectly

### Tablet/Mobile

- Adapts to sidebar width
- Max height: 300px
- Touch-friendly tap targets
- Larger buttons and checkboxes

## ⚙️ Customization Options

### Change Max Tasks Shown

In `TaskList.css`, find `.tasks-list` and adjust:

```css
.tasks-list {
  max-height: 400px; /* Change this value */
}
```

### Change Checkbox Size

In `TaskList.css`, find `.task-checkbox`:

```css
.task-checkbox {
  width: 20px;  /* Increase for larger */
  height: 20px; /* Keep width = height */
}
```

### Change Task Font Size

In `TaskList.css`, find `.task-text`:

```css
.task-text {
  font-size: 0.9rem; /* Increase to 1rem for larger */
}
```

## 🐛 Troubleshooting

**Tasks don't save:**

- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache

**Drag-and-drop not working:**

- Make sure you're grabbing the ⋮⋮ handle
- Check browser compatibility
- Try refreshing the page

**Checkboxes look wrong:**

- Verify TaskList.css is loaded
- Check browser DevTools for CSS conflicts
- Clear browser cache

**× delete button doesn't appear:**

- Hover directly over the task item
- Check if CSS hover styles are applied
- Try on different browser

**Task List section not showing:**

- Verify App-with-TaskList.jsx replaced App.jsx
- Check console for import errors
- Ensure TaskList.jsx is in components folder

**What's next?**

- Add keyboard shortcuts (coming soon)
- Add statistics/analytics (optional)
- Add task categories (advanced)

Enjoy managing your writing tasks! 📝✨
