// Global AudioContext instance for mobile compatibility
let audioContext = null;
let isAudioInitialized = false;

// Initialize audio context on user interaction
export const initializeAudio = async () => {
  if (isAudioInitialized) return true;
  
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume AudioContext if it's suspended (required for mobile)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    isAudioInitialized = true;
    return true;
  } catch (error) {
    console.warn('Audio initialization failed:', error);
    return false;
  }
};

// Check if audio is supported and initialized
export const isAudioAvailable = () => {
  return isAudioInitialized && audioContext && audioContext.state === 'running';
};

export const playSound = async (soundType, volume) => {
  try {
    const enabled = localStorage.getItem('mercurial-sound-enabled') === 'true';
    if (!enabled) return;

    // Initialize audio if needed
    const audioReady = await initializeAudio();
    if (!audioReady || !audioContext) {
      console.warn('Audio not available');
      return;
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
      } catch (e) {
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
  isAudioInitialized = false;
};