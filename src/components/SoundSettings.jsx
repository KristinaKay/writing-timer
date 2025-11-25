import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, Bell, Music, Radio, Waves } from 'lucide-react';
import './SoundSettings.css';
import { playSound, initializeAudio, isAudioAvailable } from '../lib/soundUtils';

/**
 * Sound Settings Component
 * Allows configuration of audio notifications for timer completion
 */
const SoundSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-sound-enabled');
      return saved === 'true';
    } catch {
      return true;
    }
  });

  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-sound-volume');
      return saved ? parseFloat(saved) : 0.5;
    } catch {
      return 0.5;
    }
  });

  const [soundType, setSoundType] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-sound-type');
      return saved || 'bell';
    } catch {
      return 'bell';
    }
  });

  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    };
    setIsMobile(checkMobile());
  }, []);

  // Check audio initialization status
  useEffect(() => {
    const checkAudio = () => {
      setAudioInitialized(isAudioAvailable());
    };
    checkAudio();
    const interval = setInterval(checkAudio, 1000);
    return () => clearInterval(interval);
  }, []);


  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('mercurial-sound-enabled', soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('mercurial-sound-volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('mercurial-sound-type', soundType);
  }, [soundType]);

  // Sound types with frequencies
  const sounds = {
    bell: { name: 'Bell', freq: 800, icon: Bell },
    chime: { name: 'Chime', freq: 1200, icon: Music },
    beep: { name: 'Beep', freq: 440, icon: Radio },
    gentle: { name: 'Gentle', freq: 600, icon: Waves }
  };

  // Play test sound with mobile support
  const playTestSound = async () => {
    if (!soundEnabled) return;
    
    try {
      // Initialize audio on user interaction (required for mobile)
      const initialized = await initializeAudio();
      if (!initialized) {
        alert('Audio initialization failed. Please ensure your device supports Web Audio API.');
        return;
      }
      
      await playSound(soundType, volume);
      setAudioInitialized(true);
    } catch (error) {
      console.warn('Test sound failed:', error);
      alert('Sound test failed. This may be due to browser restrictions on mobile devices.');
    }
  };

  return (
    <div className="sound-settings-container">
      {/* Audio Status Notice */}
      {soundEnabled && (
        <div className={`audio-status-notice ${audioInitialized ? 'ready' : 'pending'}`}>
          <Smartphone size={16} style={{ marginRight: '0.5rem' }} />
          {audioInitialized ? (
            <span>✓ Audio ready</span>
          ) : isMobile ? (
            <span>⚠️ Tap any button or "Test Sound" to unlock audio on mobile</span>
          ) : (
            <span>Click "Test Sound" to initialize audio</span>
          )}
        </div>
      )}
      
      {/* Enable/Disable Toggle */}
      <div className="sound-toggle-section">
        <label className="sound-toggle">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">
            {soundEnabled ? (
              <Volume2 size={16} style={{ marginRight: '0.5rem' }} />
            ) : (
              <VolumeX size={16} style={{ marginRight: '0.5rem' }} />
            )}
            Sound Notifications
            {soundEnabled && (
              <span className={`enabled-badge ${audioInitialized ? 'initialized' : 'pending'}`}>
                {audioInitialized ? 'Ready' : 'Tap Test'}
              </span>
            )}
          </span>
        </label>
      </div>

      {soundEnabled && (
        <>
          {/* Sound Type Selection */}
          <div className="sound-type-section">
            <label className="section-label">Sound Type</label>
            <div className="sound-type-buttons">
              {Object.keys(sounds).map(type => {
                const IconComponent = sounds[type].icon;
                return (
                  <button
                    key={type}
                    className={`sound-type-btn ${soundType === type ? 'active' : ''}`}
                    onClick={() => setSoundType(type)}
                  >
                    <IconComponent size={16} />
                    {sounds[type].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Control */}
          <div className="volume-section">
            <div className="volume-header">
              <label className="section-label">Volume</label>
              <span className="volume-value">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
          </div>

          {/* Test Button */}
          <button 
            className={`test-sound-btn ${!audioInitialized ? 'mobile-init' : ''}`}
            onClick={playTestSound}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {audioInitialized ? (
              <>
                <Music size={16} />
                Test Sound
              </>
            ) : (
              <>
                <Smartphone size={16} />
                {isMobile ? 'Tap to Enable Audio' : 'Click to Enable Audio'}
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default SoundSettings;
