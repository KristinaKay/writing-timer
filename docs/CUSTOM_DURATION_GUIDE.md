# Custom Duration - Feature Guide

## ✨ Additions

A custom duration input that lets you set any timer length you want, from 1 to 999 minutes!

## 🎯 Features

✅ **Text input field** for entering custom minutes  
✅ **Validation** - Only accepts numbers between 1-999  
✅ **Enter key support** - Press Enter to set duration quickly  
✅ **Auto-clear** - Input clears after setting or using a preset  
✅ **Disabled state** - Button grays out when input is empty  
✅ **Brand styling** - Matches your hot pink theme  
✅ **Responsive** - Stacks vertically on mobile  


## 🎮 How to Use

### Method 1: Click Button
1. Type a number in the "Custom minutes" field (e.g., `30`)
2. Click the "Set Duration" button
3. Timer updates to your custom duration!

### Method 2: Press Enter
1. Type a number in the "Custom minutes" field
2. Press **Enter** on your keyboard
3. Timer updates instantly!

### After Setting
- Input field automatically clears
- Timer resets to your custom duration
- You can start the timer as normal

## 🎨 Visual Layout

```
┌────────────────────────────────────┐
│ QUICK PRESETS                      │
│                                    │
│ [25 min] [45 min] [60 min] [15 min]│
│                                    │
│ ──────────────────────────────────│
│                                    │
│ [Custom minutes___] [Set Duration] │
└────────────────────────────────────┘
```

On mobile, the input and button stack vertically for easier use.

## ✅ Input Validation

| Input | Result |
|-------|--------|
| `30` | ✅ Sets 30 minutes |
| `1` | ✅ Sets 1 minute (minimum) |
| `999` | ✅ Sets 999 minutes (maximum) |
| `0` | ❌ Shows error: "Please enter a valid duration between 1 and 999 minutes" |
| `1000` | ❌ Shows error: "Please enter a valid duration between 1 and 999 minutes" |
| `-5` | ❌ Shows error |
| `abc` | ❌ Input prevents non-numeric characters |
| Empty | ⚠️ Button is disabled |

## 🎨 Styling Features

### Input Field
- Transparent background with subtle glow
- Pink border on focus (matches brand)
- Placeholder text: "Custom minutes"
- No spinner arrows (cleaner look)

### Button
- Matches preset button style
- Disabled when input is empty (grayed out)
- Same hover effects as other buttons

### Responsive Behavior
- **Desktop**: Input and button side-by-side
- **Mobile (<768px)**: Stacks vertically, full width

## 💡 Pro Tips

### Quick Custom Durations
- **Short break**: `5` minutes
- **Standard Pomodoro**: `25` minutes (but use preset button!)
- **Extended focus**: `90` minutes
- **Half day**: `240` minutes (4 hours)
- **Full workday**: `480` minutes (8 hours)

### Keyboard Workflow
1. Type duration number
2. Press **Enter** (no mouse needed!)
3. Press **Space** to start timer (once we add keyboard shortcuts!)

### Smart Clearing
- Input clears when you click a preset button
- Input clears after setting custom duration
- Prevents confusion about what duration is active

## 🔧 Technical Details

### State Management
```jsx
const [customMinutes, setCustomMinutes] = useState('');
```

### Validation Logic
```jsx
const minutes = parseInt(customMinutes, 10);
if (minutes > 0 && minutes <= 999) {
  timer.setDuration(minutes);
} else {
  alert('Please enter a valid duration between 1 and 999 minutes');
}
```

### Enter Key Handler
```jsx
const handleCustomKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleCustomDuration();
  }
};
```

## 📱 Mobile Experience

On mobile devices:
- Input field is full width for easier typing
- Button is full width for easier tapping
- Larger touch targets
- Vertical layout prevents crowding

## 🎯 Use Cases

Perfect for:
- **Writing sprints** - Set exact durations for writing challenges
- **Meeting timers** - Match your calendar schedule
- **Study sessions** - Create custom Pomodoro variations
- **Breaks** - Set short 5-10 minute breaks between sessions
- **Long projects** - Track 2-4 hour deep work blocks

## 🐛 Troubleshooting

**Input doesn't accept text:**
- That's correct! It only accepts numbers (type="number")

**Button stays disabled:**
- Make sure you've typed a number in the input field
- Empty input = disabled button (by design)

**Alert keeps popping up:**
- You're entering a number outside 1-999 range
- Check that your number is positive and under 1000

**Input doesn't clear:**
- This happens after setting a duration or using a preset
- It's working correctly!
