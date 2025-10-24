# Brand Colors Applied - Reference Guide

## 🎨 Your Mercurial Brand Colors

Based on your logo at mercurialkay.carrd.co

### Color Palette
- **Hot Pink**: `#E91E63` (Primary brand color)
- **Cyan**: `#00D4FF` (Secondary brand color)
- **Soft Green**: `#66bb6a` (Success/completion)
- **Dark Purple-Black**: `#1a1a1a` to `#2d1a2d` (Background gradient)

---

## 📊 Timer State Colors

| Timer State | Color | Hex Code | Usage |
|-------------|-------|----------|-------|
| **Running** | Hot Pink | `#E91E63` | Active writing session |
| **Paused** | Cyan | `#00D4FF` | Temporarily paused |
| **Complete** | Soft Green | `#66bb6a` | Session finished |
| **Ready** | Hot Pink | `#E91E63` | Ready to start |

---

## 🎯 What Changed

### App.jsx
```jsx
const getProgressColor = () => {
  if (timer.isComplete) return '#66bb6a';  // Soft green
  if (timer.isPaused) return '#00D4FF';    // Your cyan
  if (timer.isRunning) return '#E91E63';   // Your hot pink
  return '#E91E63';                         // Default pink
};
```

### App.css
- **Background gradient**: Dark purple-black theme (`#1a1a1a` → `#2d1a2d`)
- **Primary button**: Hot pink gradient (`#E91E63` → `#C2185B`)
- **Button hover glow**: Pink glow effect

### CircularProgress.css
- **Default glow**: Hot pink (`rgba(233, 30, 99, 0.3)`)
- **Pulse animation**: Intensified pink glow when running
- **Complete glow**: Soft green (`rgba(102, 187, 106, 0.8)`)

---

## 🔥 Visual Effects

### When Timer is Running:
- Hot pink circular progress ring
- Pulsing pink glow effect
- Pink gradient buttons

### When Timer is Paused:
- Cyan circular progress ring
- Static (no pulse)
- Paused state indicator

### When Timer Completes:
- Soft green circular progress ring
- Bright green success glow
- Completion message

---

## 🎨 Future Customization

Want to tweak the colors? Here's where to look:

**Change timer ring colors**: `App.jsx` → `getProgressColor()` function
**Change button colors**: `App.css` → `.btn-primary` styles
**Change glow effects**: `CircularProgress.css` → `filter: drop-shadow` values
**Change background**: `App.css` → `.App` background gradient

