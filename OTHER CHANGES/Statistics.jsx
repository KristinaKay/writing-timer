import React, { useState, useEffect } from 'react';
import { getWordStatistics } from './WordTracker';
import './Statistics.css';

/**
 * Statistics Component
 * Tracks and displays productivity analytics including word count
 */
const Statistics = () => {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-statistics');
      return saved ? JSON.parse(saved) : {
        totalSessions: 0,
        totalMinutes: 0,
        sessionsByMode: {
          writing: 0,
          researching: 0,
          creative: 0,
          spiraling: 0
        },
        minutesByMode: {
          writing: 0,
          researching: 0,
          creative: 0,
          spiraling: 0
        },
        completedPomodoros: 0,
        tasksCompleted: 0,
        lastReset: new Date().toISOString(),
        sessionHistory: []
      };
    } catch (err) {
      return {
        totalSessions: 0,
        totalMinutes: 0,
        sessionsByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
        minutesByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
        completedPomodoros: 0,
        tasksCompleted: 0,
        lastReset: new Date().toISOString(),
        sessionHistory: []
      };
    }
  });

  const [wordStats, setWordStats] = useState(getWordStatistics());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Refresh stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('mercurial-statistics');
      if (saved) {
        setStats(JSON.parse(saved));
      }
      setWordStats(getWordStatistics());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Format time in hours and minutes
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Calculate days since last reset
  const daysSinceReset = () => {
    const lastReset = new Date(stats.lastReset);
    const now = new Date();
    const diffTime = Math.abs(now - lastReset);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Reset statistics
  const handleReset = () => {
    const newStats = {
      totalSessions: 0,
      totalMinutes: 0,
      sessionsByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
      minutesByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
      completedPomodoros: 0,
      tasksCompleted: 0,
      lastReset: new Date().toISOString(),
      sessionHistory: []
    };
    setStats(newStats);
    localStorage.setItem('mercurial-statistics', JSON.stringify(newStats));
    
    // Also reset word statistics
    localStorage.removeItem('mercurial-word-statistics');
    setWordStats({
      totalWordsWritten: 0,
      totalSessions: 0,
      sessionsWithGoal: 0,
      goalsAchieved: 0,
      bestSession: 0,
      sessionHistory: []
    });
    
    setShowResetConfirm(false);
  };

  // Get mode icon
  const getModeIcon = (mode) => {
    const icons = {
      writing: '✍️',
      researching: '🔍',
      creative: '💡',
      spiraling: '🌀'
    };
    return icons[mode] || '📝';
  };

  // Get mode label
  const getModeLabel = (mode) => {
    const labels = {
      writing: 'Writing',
      researching: 'Researching',
      creative: 'Creative Thinking',
      spiraling: 'Spiraling'
    };
    return labels[mode] || mode;
  };

  // Calculate percentages for mode breakdown
  const getModePercentage = (mode) => {
    if (stats.totalMinutes === 0) return 0;
    return Math.round((stats.minutesByMode[mode] / stats.totalMinutes) * 100);
  };

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="statistics-container">
      {/* Overview Stats */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{formatTime(stats.totalMinutes)}</div>
            <div className="stat-label">Time</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedPomodoros}</div>
            <div className="stat-label">Pomodoros</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.tasksCompleted}</div>
            <div className="stat-label">Tasks</div>
          </div>
        </div>
      </div>

      {/* Word Count Stats (if tracking enabled) */}
      {wordStats.totalSessions > 0 && (
        <div className="word-stats-section">
          <h4>📝 Word Count Progress</h4>
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <div className="stat-value">{formatNumber(wordStats.totalWordsWritten)}</div>
                <div className="stat-label">Total Words</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">
                  {wordStats.totalSessions > 0 
                    ? Math.round(wordStats.totalWordsWritten / wordStats.totalSessions)
                    : 0}
                </div>
                <div className="stat-label">Avg/Session</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-value">{formatNumber(wordStats.bestSession)}</div>
                <div className="stat-label">Best Session</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">
                  {wordStats.sessionsWithGoal > 0
                    ? Math.round((wordStats.goalsAchieved / wordStats.sessionsWithGoal) * 100)
                    : 0}%
                </div>
                <div className="stat-label">Goals Hit</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Mode Breakdown */}
      <div className="mode-breakdown">
        <h4>Session Breakdown</h4>
        {Object.keys(stats.sessionsByMode).map(mode => (
          <div key={mode} className="mode-stat">
            <div className="mode-info">
              <span className="mode-stat-icon">{getModeIcon(mode)}</span>
              <span className="mode-stat-label">{getModeLabel(mode)}</span>
            </div>
            <div className="mode-details">
              <span className="mode-count">{stats.sessionsByMode[mode]} sessions</span>
              <span className="mode-time">{formatTime(stats.minutesByMode[mode])}</span>
              <span className="mode-percent">{getModePercentage(mode)}%</span>
            </div>
            <div className="mode-bar">
              <div 
                className="mode-bar-fill" 
                style={{ width: `${getModePercentage(mode)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Period */}
      <div className="stats-footer">
        <p className="tracking-period">
          Tracking for {daysSinceReset()} {daysSinceReset() === 1 ? 'day' : 'days'}
        </p>
        
        {!showResetConfirm ? (
          <button 
            className="reset-stats-btn"
            onClick={() => setShowResetConfirm(true)}
          >
            Reset All Statistics
          </button>
        ) : (
          <div className="reset-confirm">
            <p>Reset ALL statistics including word counts? This cannot be undone.</p>
            <div className="reset-actions">
              <button 
                className="reset-confirm-btn"
                onClick={handleReset}
              >
                Yes, Reset All
              </button>
              <button 
                className="reset-cancel-btn"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;

// Export function to update statistics (to be called from App.jsx)
export const updateStatistics = (sessionMode, minutes, isPomodoro) => {
  try {
    const saved = localStorage.getItem('mercurial-statistics');
    const stats = saved ? JSON.parse(saved) : {
      totalSessions: 0,
      totalMinutes: 0,
      sessionsByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
      minutesByMode: { writing: 0, researching: 0, creative: 0, spiraling: 0 },
      completedPomodoros: 0,
      tasksCompleted: 0,
      lastReset: new Date().toISOString(),
      sessionHistory: []
    };

    stats.totalSessions += 1;
    stats.totalMinutes += minutes;
    stats.sessionsByMode[sessionMode] = (stats.sessionsByMode[sessionMode] || 0) + 1;
    stats.minutesByMode[sessionMode] = (stats.minutesByMode[sessionMode] || 0) + minutes;
    
    if (isPomodoro) {
      stats.completedPomodoros += 1;
    }

    // Add to session history (keep last 10)
    stats.sessionHistory.unshift({
      mode: sessionMode,
      minutes: minutes,
      timestamp: new Date().toISOString(),
      isPomodoro: isPomodoro
    });
    if (stats.sessionHistory.length > 10) {
      stats.sessionHistory = stats.sessionHistory.slice(0, 10);
    }

    localStorage.setItem('mercurial-statistics', JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to update statistics:', err);
  }
};

// Export function to update task completion count
export const updateTaskCompletion = () => {
  try {
    const saved = localStorage.getItem('mercurial-statistics');
    if (!saved) return;
    
    const stats = JSON.parse(saved);
    stats.tasksCompleted = (stats.tasksCompleted || 0) + 1;
    localStorage.setItem('mercurial-statistics', JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to update task completion:', err);
  }
};
