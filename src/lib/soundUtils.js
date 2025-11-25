// Global AudioContext instance for mobile compatibility
let audioContext = null;
let audioUnlocked = false; // Track if user has interacted to unlock audio

// Initialize audio context on user interaction
export const initializeAudio = async () => {
  try {
    // Create context if needed
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('AudioContext created, state:', audioContext.state);
    }
    
    // Always try to resume if suspended (critical for mobile)
    if (audioContext.state === 'suspended') {
      console.log('Attempting to resume suspended AudioContext...');
      await audioContext.resume();
    }
    
    // Mark as unlocked only if running
    if (audioContext.state === 'running') {
      audioUnlocked = true;
      return true;
    }
    
    console.warn('AudioContext state after initialization:', audioContext.state);
    return false;
  } catch (error) {
    console.error('Audio initialization failed:', error);
    return false;
  }
};

// Check if audio is supported and ready
export const isAudioAvailable = () => {
  return audioUnlocked && audioContext && audioContext.state === 'running';
};

export const playSound = async (soundType, volume) => {
  try {
    const enabled = localStorage.getItem('mercurial-sound-enabled') === 'true';
    if (!enabled) {
      console.log('Sound disabled in settings');
      return;
    }

    // Ensure AudioContext exists and is running
    if (!audioContext || audioContext.state !== 'running') {
      console.log('Audio not ready, attempting initialization...');
      const audioReady = await initializeAudio();
      if (!audioReady || !audioContext || audioContext.state !== 'running') {
        console.warn('Cannot play sound: AudioContext state =', audioContext?.state || 'null');
        return;
      }
    }

    // Use passed parameters or fallback to saved settings
    const useType = soundType || localStorage.getItem('mercurial-sound-type') || 'bell';
    const useVolume = volume !== undefined ? volume : parseFloat(localStorage.getItem('mercurial-sound-volume') || '0.5');

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const sounds = {
      bell: { freq: 800, duration: 0.3 },
      chime: { freq: 1200, duration: 0.5 },
      beep: { freq: 440, duration: 0.2 },
      gentle: { freq: 600, duration: 0.4 }
    };

    const sound = sounds[useType] || sounds.bell;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(useVolume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);

    // Clean up oscillator nodes
    setTimeout(() => {
      try {
        oscillator.disconnect();
        gainNode.disconnect();
      } catch {
        // Ignore cleanup errors
      }
    }, sound.duration * 1000 + 100);
  } catch (error) {
    console.warn('Sound playback failed:', error);
  }
};

export const isSoundEnabled = () => {
  try {
    return localStorage.getItem('mercurial-sound-enabled') === 'true';
  } catch {
    return false;
  }
};

// Cleanup function for when the app unmounts
export const cleanupAudio = () => {
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close();
  }
  audioContext = null;
  audioUnlocked = false;
};

// Get current audio context state for debugging
export const getAudioDebugInfo = () => {
  return {
    contextExists: !!audioContext,
    contextState: audioContext?.state || 'null',
    audioUnlocked,
    isAvailable: isAudioAvailable()
  };
};