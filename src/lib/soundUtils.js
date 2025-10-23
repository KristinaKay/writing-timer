export const playSound = (soundType = 'bell', volume = 0.5) => {
  try {
    const enabled = localStorage.getItem('mercurial-sound-enabled') === 'true';
    if (!enabled) return;

    const savedType = localStorage.getItem('mercurial-sound-type') || soundType;
    const savedVolume = parseFloat(localStorage.getItem('mercurial-sound-volume') || volume);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const sounds = {
      bell: { freq: 800, duration: 0.3 },
      chime: { freq: 1200, duration: 0.5 },
      beep: { freq: 440, duration: 0.2 },
      gentle: { freq: 600, duration: 0.4 }
    };

    const sound = sounds[savedType] || sounds.bell;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(savedVolume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);

    setTimeout(() => {
      audioContext.close();
    }, sound.duration * 1000 + 100);
  } catch {
    // ignore
  }
};

export const isSoundEnabled = () => {
  try {
    return localStorage.getItem('mercurial-sound-enabled') === 'true';
  } catch {
    return false;
  }
};