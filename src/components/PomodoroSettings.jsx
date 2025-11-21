import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import './PomodoroSettings.css';

/**
 * Pomodoro Settings Component
 * Allows configuration of Pomodoro technique cycles with work sessions and breaks
 */
const PomodoroSettings = ({ 
  pomodoroEnabled, 
  onTogglePomodoro, 
  pomodoroConfig, 
  onConfigChange,
  isTimerActive 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleConfigChange = (key, value) => {
    const numValue = parseInt(value, 10);
    if (numValue > 0 && numValue <= 999) {
      onConfigChange({ ...pomodoroConfig, [key]: numValue });
    }
  };

  return (
    <div className="pomodoro-container">
      {/* Pomodoro Toggle */}
      <div className="pomodoro-header">
        <label className="pomodoro-toggle">
          <input
            type="checkbox"
            checked={pomodoroEnabled}
            onChange={(e) => onTogglePomodoro(e.target.checked)}
            disabled={isTimerActive}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">
            Pomodoro Mode
            {pomodoroEnabled && <span className="enabled-badge">Active</span>}
          </span>
        </label>
        
        {pomodoroEnabled && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown size={14} style={{marginRight: '4px'}} /> : <ChevronRight size={14} style={{marginRight: '4px'}} />} Settings
          </button>
        )}
      </div>

      {/* Pomodoro Configuration */}
      {pomodoroEnabled && isExpanded && (
        <div className="pomodoro-settings">
          <div className="settings-grid">
            {/* Work Duration */}
            <div className="setting-item">
              <label>Work Duration</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={pomodoroConfig.workDuration}
                  onChange={(e) => handleConfigChange('workDuration', e.target.value)}
                  disabled={isTimerActive}
                />
                <span className="unit">min</span>
              </div>
            </div>

            {/* Short Break */}
            <div className="setting-item">
              <label>Short Break</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={pomodoroConfig.shortBreak}
                  onChange={(e) => handleConfigChange('shortBreak', e.target.value)}
                  disabled={isTimerActive}
                />
                <span className="unit">min</span>
              </div>
            </div>

            {/* Long Break */}
            <div className="setting-item">
              <label>Long Break</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={pomodoroConfig.longBreak}
                  onChange={(e) => handleConfigChange('longBreak', e.target.value)}
                  disabled={isTimerActive}
                />
                <span className="unit">min</span>
              </div>
            </div>

            {/* Sessions Before Long Break */}
            <div className="setting-item">
              <label>Sessions Before Long Break</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={pomodoroConfig.sessionsBeforeLongBreak}
                  onChange={(e) => handleConfigChange('sessionsBeforeLongBreak', e.target.value)}
                  disabled={isTimerActive}
                />
                <span className="unit">sessions</span>
              </div>
            </div>
          </div>

          {isTimerActive && (
            <p className="settings-locked">
              <small><AlertTriangle size={14} style={{verticalAlign: 'middle', marginRight: '4px'}} /> Stop timer to change Pomodoro settings</small>
            </p>
          )}
        </div>
      )}

      {/* Pomodoro Explanation */}
      {pomodoroEnabled && (
        <div className="pomodoro-explanation">
          <p>
            {pomodoroConfig.workDuration}min work → {pomodoroConfig.shortBreak}min break (repeat {pomodoroConfig.sessionsBeforeLongBreak}x) → {pomodoroConfig.longBreak}min long break
          </p>
        </div>
      )}
    </div>
  );
};

export default PomodoroSettings;
