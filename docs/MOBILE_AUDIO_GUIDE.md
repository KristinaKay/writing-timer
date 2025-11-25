# Mobile Audio Implementation Guide

## Overview

Mobile browsers (especially iOS Safari and Chrome) have strict audio policies that require user interaction before any audio can play. This guide explains how the Writing Timer handles mobile audio and what users need to know.

## Technical Background

### Browser Restrictions

**iOS Safari & Chrome:**

- AudioContext starts in `suspended` state
- Requires direct user interaction (tap/click) to resume
- Cannot be initialized on page load or automatically
- Loses initialization when app loses focus/visibility

**Android Chrome:**

- Similar restrictions but slightly more lenient
- May allow audio after any user interaction
- Better handling of visibility changes

## Implementation Strategy

### 1. **Aggressive Early Unlock**

The app attempts to initialize audio on the FIRST user interaction:

```javascript
// Listen for ANY user interaction
const events = ['click', 'touchstart', 'keydown'];
events.forEach(event => {
  document.addEventListener(event, unlockAudio, { once: true, passive: true });
});
```

This means as soon as the user clicks anywhere on the page, audio is unlocked.

### 2. **Button-Level Initialization**

Every user action that might trigger audio also attempts initialization:

- Play/Pause timer button
- Stop button
- Reset button
- Test Sound button
- Any settings change

### 3. **Visibility Recovery**

When the app regains visibility (user returns to tab), audio is re-initialized:

```javascript
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible') {
    await initializeAudio();
  }
});
```

### 4. **Visual Feedback**

The SoundSettings component provides clear status indicators:

- **"Audio ready"** (green) - Audio is unlocked and working
- **"Tap any button to unlock"** (orange) - Needs user interaction
- **Pulsing "Tap to Enable Audio" button** - Prominent call-to-action

## User Instructions

### For iOS Users

1. **Initial Setup:**
   - Navigate to Settings → Sound
   - Ensure "Sound Notifications" is enabled
   - Tap the orange "Tap to Enable Audio" button
   - You should see the indicator change to green "Audio ready"

2. **Testing:**
   - Use the "Test Sound" button to verify
   - If no sound plays, try tapping any button first, then test again

3. **After Returning to App:**
   - If you switched apps or tabs, audio may need re-initialization
   - Simply interact with the timer (play/pause) to unlock again
   - Or revisit Sound settings and tap the button

### For Android Users

1. **Initial Setup:**
   - Same as iOS, but audio typically unlocks more easily
   - Any button press should unlock audio

2. **Browser Permissions:**
   - Ensure Chrome has permission to play audio
   - Check site settings: Settings → Site Settings → Sound

## Troubleshooting

### "Audio not working on mobile"

**Symptoms:** Timer completes but no sound plays

**Solutions:**

1. Open Sound Settings and verify the status indicator
2. If it says "pending" or shows orange warning, tap "Tap to Enable Audio"
3. Try using Silent Mode toggle - some iOS versions block audio in silent mode
4. Check browser permissions for the site

### "Audio works once, then stops"

**Symptoms:** First timer works, subsequent ones don't

**Cause:** iOS may suspend AudioContext when app loses focus

**Solution:**

1. This should be handled automatically by visibility listener
2. If issue persists, tap Play button twice (pause then resume)
3. Or revisit Sound Settings and tap the enable button

### "Test Sound button does nothing"

**Symptoms:** Button clicked but no sound/feedback

**Possible Causes:**

1. Sound notifications disabled in settings
2. Device volume at zero
3. Device in silent/vibrate mode (iOS)
4. Browser blocking audio (rare)

**Solution:**

1. Enable sound notifications toggle
2. Check device volume
3. Disable silent mode on iPhone
4. Try different browser as last resort

## Technical Details

### AudioContext Lifecycle

```javascript
// States:
// - 'suspended' (default on mobile, needs user interaction)
// - 'running' (audio ready to play)
// - 'closed' (context destroyed)

// Our approach:
1. Create context on first load
2. Attempt resume on every user interaction
3. Mark as "unlocked" only when state === 'running'
4. Re-initialize on visibility change
```

### Debug Information

Developers can check audio status in console:

```javascript
import { getAudioDebugInfo } from './lib/soundUtils';

console.log(getAudioDebugInfo());
// Output:
// {
//   contextExists: true,
//   contextState: 'running',
//   audioUnlocked: true,
//   isAvailable: true
// }
```

## Best Practices

### For Users

1. **Enable audio early** - Visit Sound Settings when you first load the app
2. **Use the test button** - Verify audio works before starting a long session
3. **Keep app in focus** - Switching apps may suspend audio
4. **Check device settings** - Ensure volume up and silent mode off

### For Developers

1. **Always wrap audio calls** - Never assume AudioContext is ready
2. **Provide visual feedback** - Users need to know what's happening
3. **Log everything** - Mobile audio debugging is hard; logs help
4. **Test on real devices** - Simulators don't accurately represent audio restrictions
5. **Multiple unlock strategies** - Don't rely on a single initialization point

## Known Limitations

1. **iOS Silent Mode** - Cannot play audio when hardware switch is on silent
2. **Background Tabs** - Audio may not play if tab is backgrounded (iOS Safari)
3. **Low Power Mode** - Some devices may restrict audio in low power mode
4. **First Interaction** - At least ONE user tap required before any audio can work

## Future Improvements

### Potential Enhancements

1. **Vibration Fallback** - Use Vibration API when audio fails
2. **Visual Alert** - Flash screen or show modal when timer completes
3. **Persistent Unlock** - Store unlock state across sessions (limited by browser)
4. **Audio Preload** - Load and test audio during user interaction
5. **Better Error Messages** - More specific guidance based on failure type

### Under Consideration

1. **Audio Files** - Use `<audio>` element instead of Web Audio API
   - Pros: Better mobile support, simpler
   - Cons: Less control over sound generation

2. **Service Worker** - Background audio handling
   - Pros: May work in background
   - Cons: Complex, not supported everywhere

3. **Native App Wrapper** - Use Capacitor/Cordova
   - Pros: Full audio control
   - Cons: Requires app stores, more complexity

## Resources

- [MDN: AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
- [Apple: Web Audio Best Practices](https://developer.apple.com/documentation/webkit/wkwebview)
- [Chrome: Autoplay Policy](https://developer.chrome.com/blog/autoplay/)

## Support

If audio still doesn't work after following this guide:

1. Report issue with device model, OS version, and browser
2. Include console logs if possible
3. Describe exact steps that don't work
4. Mention if audio works in other web apps

Last Updated: November 24, 2025
