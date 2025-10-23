import React, { useState, useEffect } from 'react';
import './SoundSettings.css';
import { playSound } from '../lib/soundUtils';

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
    bell: { name: '🔔 Bell', freq: 800 },
    chime: { name: '🎵 Chime', freq: 1200 },
    beep: { name: '📢 Beep', freq: 440 },
    gentle: { name: '🌊 Gentle', freq: 600 }
  };

  // Play test sound
  const playTestSound = () => {
    if (!soundEnabled) return;
    playSound(soundType, volume);
  };

  return (
    <div className="sound-settings-container">
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
            🔊 Sound Notifications
            {soundEnabled && <span className="enabled-badge">On</span>}
          </span>
        </label>
      </div>

      {soundEnabled && (
        <>
          {/* Sound Type Selection */}
          <div className="sound-type-section">
            <label className="section-label">Sound Type</label>
            <div className="sound-type-buttons">
              {Object.keys(sounds).map(type => (
                <button
                  key={type}
                  className={`sound-type-btn ${soundType === type ? 'active' : ''}`}
                  onClick={() => setSoundType(type)}
                >
                  {sounds[type].name}
                </button>
              ))}
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
            className="test-sound-btn"
            onClick={playTestSound}
          >
            🎵 Test Sound
          </button>
        </>
      )}
    </div>
  );
};

export default SoundSettings;
