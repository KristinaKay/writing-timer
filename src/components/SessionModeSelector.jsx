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
    label: '🌀 Rabbit-Holing', 
    color: '#FF9800',
    description: 'Deep exploration and rabbit holes; idea generation; inspiration gathering.'
  }
];

const SessionModeSelector = ({ currentMode, onModeChange, isTimerRunning, projectName, onProjectNameChange }) => {
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

      {/* Mode Selection Dropdown */}
      <div className="mode-selector">
        <h3>Session Mode</h3>
        <div className="mode-dropdown-container">
          <label htmlFor="mode-select" className="dropdown-label">
            Select your session type:
          </label>
          <select
            id="mode-select"
            value={currentMode}
            onChange={(e) => onModeChange(e.target.value)}
            disabled={isTimerRunning}
            className="mode-dropdown"
            title={isTimerRunning ? 'Stop timer to change mode' : 'Select session mode'}
          >
            {SESSION_MODES.map(mode => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Project Name Field */}
        <div className="project-name-field">
          <label htmlFor="project-name">
            📂 Project Name <span className="optional">(optional)</span>
          </label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="Enter project name..."
            disabled={isTimerRunning}
            maxLength={50}
            className="project-name-input"
          />
        </div>
        
        {isTimerRunning && (
          <p className="mode-lock-message">
            <small>⚠️ Stop the timer to change session mode or project name</small>
          </p>
        )}
      </div>
    </div>
  );
};

export default SessionModeSelector;
