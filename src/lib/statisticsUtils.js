export const updateStatistics = (sessionMode, minutes, isPomodoro) => {
  try {
    const saved = localStorage.getItem('mercurial-statistics');
    const stats = saved ? JSON.parse(saved) : {
      totalSessions: 0,
      totalMinutes: 0,
      sessionsByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
      minutesByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
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
    try {
      // Notify listeners that statistics changed
      window.dispatchEvent(new CustomEvent('statistics-updated', { detail: stats }));
    } catch {
      // ignore
    }
  } catch {
    // ignore
  }
};

export const updateTaskCompletion = (increment = true) => {
  try {
    const saved = localStorage.getItem('mercurial-statistics');
    
    let stats;
    if (!saved) {
      // Initialize statistics if they don't exist
      stats = {
        totalSessions: 0,
        totalMinutes: 0,
        sessionsByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
        minutesByMode: { writing: 0, researching: 0, creative: 0, roaming: 0 },
        completedPomodoros: 0,
        tasksCompleted: 0,
        lastReset: new Date().toISOString(),
        sessionHistory: []
      };
    } else {
      stats = JSON.parse(saved);
    }
    
    const oldTaskCount = stats.tasksCompleted || 0;
    
    if (increment) {
      stats.tasksCompleted = oldTaskCount + 1;
    } else {
      stats.tasksCompleted = Math.max(oldTaskCount - 1, 0);
    }
    
    localStorage.setItem('mercurial-statistics', JSON.stringify(stats));
    
    try {
      window.dispatchEvent(new CustomEvent('statistics-updated', { detail: stats }));
    } catch {
      // ignore event dispatch errors
    }
  } catch {
    // ignore all errors
  }
};