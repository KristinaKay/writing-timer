import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import './WordTracker.css';

/**
 * Word Tracker Component
 * Tracks word count progress during writing sessions
 */
const WordTracker = ({ isTimerRunning, sessionMode }) => {
  const [trackingEnabled, setTrackingEnabled] = useState(() => {
    try {
      return localStorage.getItem('mercurial-word-tracking-enabled') === 'true';
    } catch {
      return false;
    }
  });

  const [wordsAtStart, setWordsAtStart] = useState('');
  const [targetWords, setTargetWords] = useState('');
  const [wordsAtEnd, setWordsAtEnd] = useState('');
  const [sessionActive, setSessionActive] = useState(false);

  // Save tracking enabled state
  useEffect(() => {
    localStorage.setItem('mercurial-word-tracking-enabled', trackingEnabled.toString());
  }, [trackingEnabled]);

  // Initialize persisted fields from localStorage (so App can read them on timer completion)
  useEffect(() => {
    try {
      const s = localStorage.getItem('mercurial-word-start');
      const e = localStorage.getItem('mercurial-word-end');
      const t = localStorage.getItem('mercurial-word-target');
      if (s !== null) setWordsAtStart(s);
      if (e !== null) setWordsAtEnd(e);
      if (t !== null) setTargetWords(t);
    } catch {
      // ignore
    }
  }, []);

  // Reset when session starts
  useEffect(() => {
    if (isTimerRunning && !sessionActive) {
      // Session just started
      setSessionActive(true);
      setWordsAtEnd('');
    } else if (!isTimerRunning && sessionActive) {
      // Session just ended
      if (trackingEnabled && wordsAtStart && wordsAtEnd) {
        saveWordSession();
      }
      setSessionActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning]);

  // Calculate words written
  const getWordsWritten = () => {
    const start = parseInt(wordsAtStart, 10) || 0;
    const end = parseInt(wordsAtEnd, 10) || 0;
    return end - start;
  };

  // Calculate progress percentage
  const getProgressPercent = () => {
    const target = parseInt(targetWords, 10);
    if (!target || target <= 0) return 0;
    
    const written = getWordsWritten();
    return Math.min(Math.round((written / target) * 100), 100);
  };

  // Save session to statistics
  const saveWordSession = () => {
    try {
      const wordsWritten = getWordsWritten();
      if (wordsWritten <= 0) return; // Don't save if no progress

      const session = {
        timestamp: new Date().toISOString(),
        sessionMode: sessionMode,
        wordsAtStart: parseInt(wordsAtStart, 10),
        wordsAtEnd: parseInt(wordsAtEnd, 10),
        wordsWritten: wordsWritten,
        targetWords: parseInt(targetWords, 10) || null,
        goalAchieved: targetWords ? wordsWritten >= parseInt(targetWords, 10) : null
      };

      // Get existing word statistics
      const saved = localStorage.getItem('mercurial-word-statistics');
      const stats = saved ? JSON.parse(saved) : {
        totalWordsWritten: 0,
        totalSessions: 0,
        sessionsWithGoal: 0,
        goalsAchieved: 0,
        bestSession: 0,
        sessionHistory: []
      };

      // Update statistics
      stats.totalWordsWritten += wordsWritten;
      stats.totalSessions += 1;
      if (session.targetWords) {
        stats.sessionsWithGoal += 1;
        if (session.goalAchieved) {
          stats.goalsAchieved += 1;
        }
      }
      if (wordsWritten > stats.bestSession) {
        stats.bestSession = wordsWritten;
      }

      // Add to history (keep last 20)
      stats.sessionHistory.unshift(session);
      if (stats.sessionHistory.length > 20) {
        stats.sessionHistory = stats.sessionHistory.slice(0, 20);
      }

      localStorage.setItem('mercurial-word-statistics', JSON.stringify(stats));

      // Clear persisted start/end/target values to avoid duplicate saves
      try {
        localStorage.removeItem('mercurial-word-start');
        localStorage.removeItem('mercurial-word-end');
        localStorage.removeItem('mercurial-word-target');
      } catch {
        // ignore
      }

      // Show completion message
      if (session.targetWords) {
        if (session.goalAchieved) {
          alert(`🎉 Goal achieved! You wrote ${wordsWritten} words (target: ${session.targetWords})`);
        } else {
          alert(`Good session! You wrote ${wordsWritten} words (${Math.round((wordsWritten / session.targetWords) * 100)}% of target)`);
        }
      } else {
        alert(`Great work! You wrote ${wordsWritten} words this session.`);
      }

      // Notify listeners that word statistics have been updated
      try {
        window.dispatchEvent(new CustomEvent('word-statistics-updated', { detail: stats }));
      } catch {
        // ignore
      }
    } catch (err) {
      console.error('Failed to save word session:', err);
    }
  };

  // Listen for external save events so App can trigger save when timer completes
  useEffect(() => {
    const handler = (e) => {
      try {
        const detail = e.detail || {};
        // If external detail supplies start/end/target, use them
        if (detail.wordsAtStart !== undefined) setWordsAtStart(String(detail.wordsAtStart));
        if (detail.wordsAtEnd !== undefined) setWordsAtEnd(String(detail.wordsAtEnd));
        if (detail.targetWords !== undefined) setTargetWords(String(detail.targetWords));

        // Defer save slightly to allow state to update
        setTimeout(() => {
          if (trackingEnabled) saveWordSession();
        }, 50);
      } catch (err) {
        console.error('Failed to handle save-word-session event', err);
      }
    };

    window.addEventListener('save-word-session', handler);
    return () => window.removeEventListener('save-word-session', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingEnabled, wordsAtStart, wordsAtEnd, targetWords]);

  // Listen for timer-start so we can auto-fill the starting word count if available
  useEffect(() => {
    const onTimerStart = () => {
      try {
        // If an external auto-start value is present in localStorage, use it
        const autoStart = localStorage.getItem('mercurial-word-auto-start');
        if (autoStart !== null && autoStart !== undefined) {
          setWordsAtStart(String(autoStart));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('timer-start', onTimerStart);
    return () => window.removeEventListener('timer-start', onTimerStart);
  }, []);

  // Handle manual session complete (if user wants to end early)
  const handleCompleteSession = () => {
    if (!wordsAtStart || !wordsAtEnd) {
      alert('Please enter both starting and ending word counts.');
      return;
    }

    const written = getWordsWritten();
    if (written < 0) {
      alert('Ending word count cannot be less than starting word count.');
      return;
    }

    saveWordSession();
    
    // Reset for next session
    setWordsAtStart('');
    setTargetWords('');
    setWordsAtEnd('');
    setSessionActive(false);
  };

  // Quick goal presets
  const setQuickGoal = (words) => {
    setTargetWords(words.toString());
  };

  // Persist fields so App can read them when timer completes
  useEffect(() => {
    try {
      if (wordsAtStart !== undefined) localStorage.setItem('mercurial-word-start', String(wordsAtStart));
      if (wordsAtEnd !== undefined) localStorage.setItem('mercurial-word-end', String(wordsAtEnd));
      if (targetWords !== undefined) localStorage.setItem('mercurial-word-target', String(targetWords));
    } catch {
      // ignore
    }
  }, [wordsAtStart, wordsAtEnd, targetWords]);

  return (
    <div className="word-tracker-container">
      {/* Toggle */}
      <div className="word-tracker-toggle-section">
        <label className="word-tracker-toggle">
          <input
            type="checkbox"
            checked={trackingEnabled}
            onChange={(e) => setTrackingEnabled(e.target.checked)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">
            <FileText size={16} style={{marginRight: '6px'}} />
            Track Word Count
            {trackingEnabled && <span className="enabled-badge">On</span>}
          </span>
        </label>
      </div>

      {trackingEnabled && (
        <>
          {/* Input Fields */}
          <div className="word-inputs">
            {/* Words at Start */}
            <div className="word-input-group">
              <label>Words at Start</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={wordsAtStart}
                onChange={(e) => setWordsAtStart(e.target.value)}
                className="word-input"
                disabled={sessionActive && wordsAtStart}
              />
            </div>

            {/* Target/Goal */}
            <div className="word-input-group">
              <label>Target Goal (optional)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 500"
                value={targetWords}
                onChange={(e) => setTargetWords(e.target.value)}
                className="word-input"
              />
            </div>

            {/* Words at End */}
            <div className="word-input-group">
              <label>Words at End</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={wordsAtEnd}
                onChange={(e) => setWordsAtEnd(e.target.value)}
                className="word-input"
              />
            </div>
          </div>

          {/* Quick Goal Presets */}
          <div className="quick-goals">
            <label className="quick-goals-label">Quick Goals:</label>
            <div className="quick-goal-buttons">
              <button onClick={() => setQuickGoal(250)} className="quick-goal-btn">250</button>
              <button onClick={() => setQuickGoal(500)} className="quick-goal-btn">500</button>
              <button onClick={() => setQuickGoal(1000)} className="quick-goal-btn">1000</button>
              <button onClick={() => setQuickGoal(2000)} className="quick-goal-btn">2000</button>
            </div>
          </div>

          {/* Progress Display */}
          {wordsAtStart && (
            <div className="word-progress">
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Words Written</span>
                  <span className="stat-value words-written">{getWordsWritten()}</span>
                </div>
                {targetWords && (
                  <div className="stat-item">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{getProgressPercent()}%</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {targetWords && (
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${getProgressPercent()}%` }}
                  ></div>
                </div>
              )}

              {/* Target Status */}
              {targetWords && wordsAtEnd && (
                <div className={`target-status ${getWordsWritten() >= parseInt(targetWords, 10) ? 'achieved' : 'in-progress'}`}>
                  {getWordsWritten() >= parseInt(targetWords, 10) ? (
                    <>🎉 Goal Achieved!</>
                  ) : (
                    <>{parseInt(targetWords, 10) - getWordsWritten()} words to go</>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Complete Button (manual complete if timer still running) */}
          {!isTimerRunning && wordsAtStart && wordsAtEnd && !sessionActive && (
            <button 
              className="complete-session-btn"
              onClick={handleCompleteSession}
            >
              💾 Save Session
            </button>
          )}

          {/* Session Status */}
          {isTimerRunning && wordsAtStart && (
            <div className="session-status">
              <small>✍️ Session in progress - update "Words at End" as you write</small>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WordTracker;

// Export function to get word statistics (for Statistics component)
// eslint-disable-next-line react-refresh/only-export-components
export const getWordStatistics = () => {
  try {
    const saved = localStorage.getItem('mercurial-word-statistics');
    return saved ? JSON.parse(saved) : {
      totalWordsWritten: 0,
      totalSessions: 0,
      sessionsWithGoal: 0,
      goalsAchieved: 0,
      bestSession: 0,
      sessionHistory: []
    };
  } catch {
    return {
      totalWordsWritten: 0,
      totalSessions: 0,
      sessionsWithGoal: 0,
      goalsAchieved: 0,
      bestSession: 0,
      sessionHistory: []
    };
  }
};

// Export function to reset word statistics
// eslint-disable-next-line react-refresh/only-export-components
export const resetWordStatistics = () => {
  try {
    localStorage.removeItem('mercurial-word-statistics');
  } catch (err) {
    console.error('Failed to reset word statistics:', err);
  }
};
