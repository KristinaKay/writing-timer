import React, { useState, useEffect } from 'react';
import { Target, Clock, Check, PenTool, BarChart3, Trophy, Search, Lightbulb, Shuffle } from 'lucide-react';
import './Statistics.css';

/**
 * Statistics Component
 * Tracks and displays productivity analytics
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
          roaming: 0
        },
        minutesByMode: {
          writing: 0,
          researching: 0,
          creative: 0,
          roaming: 0
        },
        completedPomodoros: 0,
        tasksCompleted: 0,
        lastReset: new Date().toISOString(),
        sessionHistory: [] // Last 10 sessions
      };
    } catch {
      return {
        totalSessions: 0,
        totalMinutes: 0,
        sessionsByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
        minutesByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
        completedPomodoros: 0,
        tasksCompleted: 0,
        lastReset: new Date().toISOString(),
        sessionHistory: []
      };
    }
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [wordStats, setWordStats] = useState(() => {
    try {
      const saved = localStorage.getItem('mercurial-word-statistics');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Listen for immediate updates to word statistics
  useEffect(() => {
    const wordHandler = (e) => {
      try {
        const detail = e.detail || null;
        if (detail) setWordStats(detail);
        else {
          const saved = localStorage.getItem('mercurial-word-statistics');
          if (saved) setWordStats(JSON.parse(saved));
          else setWordStats(null);
        }
      } catch {
        // ignore
      }
    };

    const statsHandler = (event) => {
      try {
        if (event.detail) {
          setStats(event.detail);
        } else {
          // Fallback: reload from localStorage
          const saved = localStorage.getItem('mercurial-statistics');
          if (saved) {
            setStats(JSON.parse(saved));
          }
        }
      } catch {
        // ignore errors
      }
    };

    window.addEventListener('word-statistics-updated', wordHandler);
    window.addEventListener('statistics-updated', statsHandler);
    return () => {
      window.removeEventListener('word-statistics-updated', wordHandler);
      window.removeEventListener('statistics-updated', statsHandler);
    };
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
      sessionsByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
      minutesByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
      completedPomodoros: 0,
      tasksCompleted: 0,
      lastReset: new Date().toISOString(),
      sessionHistory: []
    };
    setStats(newStats);
    localStorage.setItem('mercurial-statistics', JSON.stringify(newStats));
    // Also clear word statistics so UI is consistent
    try {
      localStorage.removeItem('mercurial-word-statistics');
      window.dispatchEvent(new CustomEvent('word-statistics-updated', { detail: null }));
      window.dispatchEvent(new CustomEvent('statistics-updated', { detail: newStats }));
    } catch {
      // ignore
    }
    setShowResetConfirm(false);
  };

  // Get mode icon
  const getModeIcon = (mode) => {
    const iconMap = {
      writing: PenTool,
      researching: Search,
      creative: Lightbulb,
      roaming: Shuffle
    };
    const IconComponent = iconMap[mode] || PenTool;
    return <IconComponent size={16} />;
  };

  // Get mode label
  const getModeLabel = (mode) => {
    const modeLabels = {
      writing: 'Writing',
      researching: 'Research',
      creative: 'Creative',
      roaming: 'Roaming'
    };
    
    return modeLabels[mode] || mode;
  };

  // Calculate percentages for mode breakdown
  const getModePercentage = (mode) => {
    if (stats.totalMinutes === 0) return 0;
    return Math.round((stats.minutesByMode[mode] / stats.totalMinutes) * 100);
  };

  return (
    <div className="statistics-container">
      {/* Overview Stats */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatTime(stats.totalMinutes)}</div>
            <div className="stat-label">Total Time</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedPomodoros}</div>
            <div className="stat-label">Pomodoros</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Check size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.tasksCompleted}</div>
            <div className="stat-label">Tasks Done</div>
          </div>
        </div>
      </div>

      {/* Session Mode Breakdown */}
      {/* Word Count Stats (if present) */}
      {wordStats && (
        <div className="word-stats-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PenTool size={16} />Word Count
          </h4>
          <div className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon">
                <PenTool size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{wordStats.totalWordsWritten}</div>
                <div className="stat-label">Total Words</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <BarChart3 size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{wordStats.totalSessions > 0 ? Math.round(wordStats.totalWordsWritten / wordStats.totalSessions) : 0}</div>
                <div className="stat-label">Avg/Session</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Trophy size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{wordStats.bestSession}</div>
                <div className="stat-label">Best Session</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
            Reset Statistics
          </button>
        ) : (
          <div className="reset-confirm">
            <p>Are you sure? This cannot be undone.</p>
            <div className="reset-actions">
              <button 
                className="reset-confirm-btn"
                onClick={handleReset}
              >
                Yes, Reset
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

