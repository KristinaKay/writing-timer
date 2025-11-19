import React from 'react';
import './SessionModeSelector.css';

/**
 * Session Mode Selector Component
 * Allows users to select between different writing session types
 */

const SESSION_MODES = [
  { 
    id: 'writing', 
    label: '✍️ Writing', 
    color: '#E91E63',
    description: 'Creative writing, blogging, drafting, journaling, and freeform writing.'
  },
  { 
    id: 'researching', 
    label: '🔍 Researching', 
    color: '#00D4FF',
    description: 'Gathering information and sources, fact-checking, note-taking, and data collection.'
  },
  { 
    id: 'creative', 
    label: '💡 Creative Thinking', 
    color: '#9C27B0',
    description: 'Brainstorming and ideation, mind mapping, and conceptual development.'
  },
  { 
    id: 'roaming', 
    label: '🌀 Roaming and Rabbit Holing', 
    color: '#FF9800',
    description: 'Deep exploration and rabbit holes; idea generation; inspiration gathering.'
  }
];

const SessionModeSelector = ({ currentMode, onModeChange, isTimerRunning }) => {
  const getCurrentModeData = () => {
    return SESSION_MODES.find(mode => mode.id === currentMode) || SESSION_MODES[0];
  };

  const currentModeData = getCurrentModeData();

  return (
    <div className="session-mode-container">
      {/* Current Mode Badge */}
      <div className="current-mode-badge" style={{ borderColor: currentModeData.color }}>
        <span className="mode-icon" style={{ color: currentModeData.color }}>
          {currentModeData.label.split(' ')[0]}
        </span>
        <span className="mode-label">{currentModeData.label.split(' ').slice(1).join(' ')}</span>
        {isTimerRunning && (
          <span className="mode-status" style={{ color: currentModeData.color }}>●</span>
        )}
      </div>

      {/* Mode Description */}
      <p className="mode-description">{currentModeData.description}</p>

      {/* Mode Selection Buttons */}
      <div className="mode-selector">
        <h3>Session Mode</h3>
        <div className="mode-buttons">
          {SESSION_MODES.map(mode => (
            <button
              key={mode.id}
              className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
              onClick={() => onModeChange(mode.id)}
              style={{
                '--mode-color': mode.color,
                borderColor: currentMode === mode.id ? mode.color : 'var(--background-light)'
              }}
              disabled={isTimerRunning}
              title={isTimerRunning ? 'Stop timer to change mode' : mode.description}
            >
              <span className="mode-btn-icon">{mode.label.split(' ')[0]}</span>
              <span className="mode-btn-label">{mode.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
        {isTimerRunning && (
          <p className="mode-lock-message">
            <small>⚠️ Stop the timer to change session mode</small>
          </p>
        )}
      </div>
    </div>
  );
};

export default SessionModeSelector;
