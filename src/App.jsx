import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square, RotateCcw, Timer, Volume2, Settings, BarChart3, ChevronDown, ChevronRight, HardDrive, PenTool, Clock, Zap, Palette, Check } from 'lucide-react'
import { useTimer } from './hooks/useTimer'
import CircularProgress from './components/CircularProgress'
import SessionModeSelector from './components/SessionModeSelector'
import PomodoroSettings from './components/PomodoroSettings'
import PomodoroCycleTracker from './components/PomodoroCycleTracker'
import TaskList from './components/TaskList'
import Statistics from './components/Statistics'
import WordTracker from '../addons/WordTracker'
import { updateStatistics } from './lib/statisticsUtils'
import SoundSettings from './components/SoundSettings'
import ExportImport from './components/ExportImport'
import ThemeSelector from './components/ThemeSelector'
import ProgressiveThemeManager from './components/ProgressiveThemeManager'
import GettingStarted from './components/GettingStarted'
import CompactToast from './components/CompactToast'
import { playSound, initializeAudio } from './lib/soundUtils'
import { initializeTheme } from './lib/themeUtils'
import './App.css'

function App() {
  // Session mode state
  const [sessionMode, setSessionMode] = useState('writing');
  const [projectName, setProjectName] = useState('');
  
  // Custom duration state
  const [customMinutes, setCustomMinutes] = useState('');

  // Pomodoro state
  const [pomodoroEnabled, setPomodoroEnabled] = useState(false);
  const [pomodoroConfig, setPomodoroConfig] = useState({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  });
  const [currentCycle, setCurrentCycle] = useState(1);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [cycleType, setCycleType] = useState('work');
  

  // Sidebar collapse state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Accordion: track which section is open
  const [openSidebarSection, setOpenSidebarSection] = useState(null);
  const [openSidebarGroups, setOpenSidebarGroups] = useState({
    sessionSetup: false,
    timerDuration: false,
    trackingTasks: false,
    appSettings: false
  });

  // Getting Started guide state
  const [showGettingStarted, setShowGettingStarted] = useState(() => {
    try {
      return !localStorage.getItem('mercurial-guide-completed');
    } catch {
      return true;
    }
  });

  // Refs and keyboard navigation for accordion
  const headerRefs = useRef({ 
    sessionMode: null, 
    wordTracker: null,
    pomodoro: null, 
    presets: null, 
    custom: null, 
    statistics: null,
    sound: null,
    export: null,
    themes: null
  });
  const handleCloseGettingStarted = () => {
    setShowGettingStarted(false);
    try {
      localStorage.setItem('mercurial-guide-completed', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const handleHeaderKeyDown = (e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenSidebarSection(openSidebarSection === sectionId ? null : sectionId);
    }
  };

  const toggleSidebarGroup = (groupId) => {
    setOpenSidebarGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
    // Close any open section when collapsing a group
    if (openSidebarGroups[groupId]) {
      setOpenSidebarSection(null);
    }
  };  // Initialize theme on app load
  useEffect(() => {
    initializeTheme();
  }, []);

  // Persist accordion state to localStorage
  useEffect(() => {
    try {
      if (openSidebarSection) localStorage.setItem('openSidebarSection', openSidebarSection);
      else localStorage.removeItem('openSidebarSection');
    } catch {
      // ignore
    }
  }, [openSidebarSection]);

  // Helper function to track session if enough time has elapsed
  const trackSessionIfValid = () => {
    const sessionDuration = Math.round((timer.totalElapsed || 0) / 60); // minutes
    if (sessionDuration >= 1) {
      updateStatistics(sessionMode, sessionDuration, pomodoroEnabled && cycleType === 'work', projectName);
      return true; // Session was tracked
    }
    return false; // Session too short to track
  };

  // Handle timer completion with Pomodoro logic
  const handleTimerComplete = async () => {
    // Play sound notification (mobile-compatible)
    try {
      // Force audio re-initialization before playing (critical for mobile)
      const audioReady = await initializeAudio();
      if (audioReady) {
        await playSound();
      } else {
        console.warn('Audio initialization failed before timer completion sound');
      }
    } catch (error) {
      console.warn('Sound notification failed:', error);
    }

    // Track the completed session
    trackSessionIfValid();
    
    if (pomodoroEnabled) {
      if (cycleType === 'work') {
        // For Pomodoro work sessions, we already tracked above
        const newCompletedSessions = completedSessions + 1;
        setCompletedSessions(newCompletedSessions);
        
        if (newCompletedSessions % pomodoroConfig.sessionsBeforeLongBreak === 0) {
              alert('Work session ' + currentCycle + ' complete! Time for a long break!');
          setCycleType('longBreak');
          timer.setDuration(pomodoroConfig.longBreak);
        } else {
              alert('Work session ' + currentCycle + ' complete! Time for a short break!');
          setCycleType('shortBreak');
          timer.setDuration(pomodoroConfig.shortBreak);
        }
        setCurrentCycle(currentCycle + 1);
      } else if (cycleType === 'shortBreak') {
        alert('Short break complete! Ready for another session?');
        setCycleType('work');
        timer.setDuration(pomodoroConfig.workDuration);
      } else if (cycleType === 'longBreak') {
        alert('Long break complete! Great work! Starting new cycle.');
        setCycleType('work');
        setCurrentCycle(1);
        setCompletedSessions(0);
        timer.setDuration(pomodoroConfig.workDuration);
      }
    } else {
      // Regular session - statistics already tracked above
      alert((sessionMode.charAt(0).toUpperCase() + sessionMode.slice(1)) + ' session complete! Great work!');
    }

    // Trigger WordTracker save (if user has tracking enabled) by dispatching a CustomEvent.
    try {
      // Attempt to read any tracked counts from localStorage (the WordTracker UI stores user-entered fields there)
      const start = localStorage.getItem('mercurial-word-start');
      const end = localStorage.getItem('mercurial-word-end');
      const target = localStorage.getItem('mercurial-word-target');
      const detail = {};
      if (start !== null) detail.wordsAtStart = parseInt(start, 10);
      if (end !== null) detail.wordsAtEnd = parseInt(end, 10);
      if (target !== null) detail.targetWords = parseInt(target, 10);

      window.dispatchEvent(new CustomEvent('save-word-session', { detail }));
    } catch {
      // non-fatal, WordTracker will save manually if user clicks
      console.warn('Could not dispatch save-word-session event');
    }
  };

  const timer = useTimer(25, handleTimerComplete);

  // Mobile-compatible timer toggle with audio initialization
  const handleTimerToggle = async () => {
    try {
      // Initialize audio on user interaction for mobile compatibility
      await initializeAudio();
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
    timer.toggle();
  };

  // Mobile-compatible timer stop with audio initialization
  const handleTimerStop = async () => {
    try {
      await initializeAudio();
      trackSessionIfValid();
      timer.stop();
    } catch (error) {
      console.warn('Timer stop failed:', error);
      trackSessionIfValid();
      timer.stop();
    }
  };

  // Mobile-compatible timer reset with audio initialization
  const handleTimerReset = async () => {
    try {
      await initializeAudio();
      trackSessionIfValid();
      timer.reset();
    } catch (error) {
      console.warn('Timer reset failed:', error);
      trackSessionIfValid();
      timer.reset();
    }
  };

  // Dispatch an event when the timer starts so components (like WordTracker) can react
  useEffect(() => {
    try {
      if (timer.isRunning && !timer.isPaused) {
        window.dispatchEvent(new CustomEvent('timer-start', { detail: { timestamp: Date.now() } }));
      }
    } catch {
      // ignore
    }
  }, [timer.isRunning, timer.isPaused]);

  // Re-initialize audio when page becomes visible (critical for mobile)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        try {
          await initializeAudio();
        } catch (error) {
          console.warn('Audio re-initialization on visibility change failed:', error);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const getProgressColor = () => {
    if (timer.isComplete) return '#66bb6a';
    if (timer.isPaused) return '#00D4FF';
    if (pomodoroEnabled && cycleType === 'shortBreak') return '#FFA726';
    if (pomodoroEnabled && cycleType === 'longBreak') return '#9C27B0';
    
    // Use session mode colors when timer is running
    if (timer.isRunning) {
      const sessionModeColors = {
        'writing': '#E91E63',       // Hot Pink - Creative writing
        'researching': '#00D4FF',   // Cyan - Research and info gathering 
        'creative': '#9C27B0',      // Purple - Brainstorming and ideation
        'roaming': '#FF9800'        // Orange - Exploration and rabbit holes
      };
      return sessionModeColors[sessionMode] || '#E91E63';
    }
    
    return '#E91E63';
  };

  const handlePresetChange = (minutes) => {
    timer.setDuration(minutes);
    setCustomMinutes('');
    if (pomodoroEnabled) {
      setCycleType('work');
      setCurrentCycle(1);
      setCompletedSessions(0);
    }
  };

  // Session mode default durations
  const getModeDefaultDuration = (mode) => {
    const durations = {
      'writing': 25,      // Writing Sprint - Standard Pomodoro
      'researching': 45,  // Deep Research - Extended Focus
      'creative': 15,     // Creative Thinking - Quick Bursts
      'roaming': 60       // Roaming/Exploration - Long Session
    };
    return durations[mode] || 25;
  };

  const handleModeChange = (newMode) => {
    setSessionMode(newMode);
    
    // Auto-set duration based on session mode (only if timer is not running)
    if (!timer.isRunning && !timer.isPaused && !pomodoroEnabled) {
      const defaultDuration = getModeDefaultDuration(newMode);
      timer.setDuration(defaultDuration);
      setCustomMinutes(''); // Clear custom input
    }
  };

  const handleProjectNameChange = (newProjectName) => {
    setProjectName(newProjectName);
  };

  const handleCustomDuration = () => {
    const minutes = parseInt(customMinutes, 10);
    if (minutes > 0 && minutes <= 999) {
      timer.setDuration(minutes);
      setCustomMinutes('');
      if (pomodoroEnabled) {
        setCycleType('work');
        setCurrentCycle(1);
        setCompletedSessions(0);
      }
    } else if (customMinutes !== '') {
      alert('Please enter a valid duration between 1 and 999 minutes');
    }
  };

  const handleCustomKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomDuration();
    }
  };

  const handleTogglePomodoro = (enabled) => {
    setPomodoroEnabled(enabled);
    if (enabled) {
      setCycleType('work');
      setCurrentCycle(1);
      setCompletedSessions(0);
      timer.setDuration(pomodoroConfig.workDuration);
    }
  };

  const handlePomodoroConfigChange = (newConfig) => {
    setPomodoroConfig(newConfig);
    if (cycleType === 'work' && !timer.isRunning) {
      timer.setDuration(newConfig.workDuration);
    }
  };

  return (
    <div className="App">
      <h1>A Timer to Write</h1>
      
      <div className="app-layout">
        {/* Main Timer Section */}
        <div className="main-content">          
          {/* Pomodoro Cycle Tracker */}
          {pomodoroEnabled && (
            <PomodoroCycleTracker
              currentCycle={currentCycle}
              totalCycles={pomodoroConfig.sessionsBeforeLongBreak}
              completedSessions={completedSessions}
              cycleType={cycleType}
              sessionMode={sessionMode}
            />
          )}
          
          {/* Circular Progress with Timer Display */}
          <div className={`timer-section ${timer.isRunning && !timer.isPaused ? 'running' : ''} ${timer.isComplete ? 'complete' : ''}`}>
            <CircularProgress 
              progress={timer.getProgress()} 
              size={400}
              strokeWidth={12}
              color={getProgressColor()}
            >
              <div className="timer-display">
                <div className="time">
                  {timer.getFormattedTime()}
                </div>
                <div className="progress-info">
                  {timer.isRunning && !timer.isPaused && '⏳ Running...'}
                  {timer.isPaused && (
                    <>
                      <Pause size={16} />Paused
                    </>
                  )}
                  {!timer.isRunning && !timer.isComplete && (
                    <>
                      <Timer size={16} />Ready to start
                    </>
                  )}
                  {timer.isComplete && <><Check size={16} style={{marginRight: '4px'}} />Complete!</>}
                </div>
              </div>
            </CircularProgress>
          </div>

          {/* Control Buttons */}
          <div className="controls">
            <button 
              onClick={handleTimerToggle}
              className="btn-primary"
            >
              {!timer.isRunning ? (
                <><Play size={16} style={{ marginRight: '0.5rem' }} />Start</>
              ) : timer.isPaused ? (
                <><Play size={16} style={{ marginRight: '0.5rem' }} />Resume</>
              ) : (
                <><Pause size={16} style={{ marginRight: '0.5rem' }} />Pause</>
              )}
            </button>
            
            <button 
              onClick={handleTimerStop}
              className="btn-secondary"
              disabled={!timer.isRunning && !timer.isPaused}
            >
              <Square size={16} style={{ marginRight: '0.5rem' }} />Stop
            </button>
            
            <button 
              onClick={handleTimerReset}
              className="btn-secondary"
            >
              <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />Reset
            </button>
          </div>

          {/* Debug Info */}
          <div className="debug-info">
            <small>
              Progress: {timer.getProgress().toFixed(1)}% | 
              Elapsed: {Math.floor(timer.totalElapsed / 60)}m {timer.totalElapsed % 60}s
              {pomodoroEnabled && ` | Cycle: ${cycleType} | Session: ${currentCycle}`}
            </small>
          </div>
          {/* Task List (moved below timer as per mockup) */}
          <div className="tasklist-section">
            <TaskList 
              sessionMode={sessionMode}
              isTimerRunning={timer.isRunning}
            />
          </div>

          {/* Word Tracker was moved to the sidebar per organization guide */}
        </div>

        {/* Collapsible Sidebar */}
  <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <button 
            className="sidebar-toggle gear-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Close settings' : 'Open settings'}
            aria-label={sidebarOpen ? 'Close settings panel' : 'Open settings panel'}
            aria-expanded={sidebarOpen}
          >
            <span className="gear-icon" aria-hidden="true">
              <Settings size={14} />
            </span>
            <span className="sr-only">{sidebarOpen ? 'Close' : 'Open'} Settings</span>
          </button>

          {sidebarOpen && (
            <div className="sidebar-content">
            {/* GROUP 1: APP SETTINGS (moved above session setup) */}
            <button 
              className="sidebar-group-header clickable"
              onClick={() => toggleSidebarGroup('appSettings')}
              aria-expanded={openSidebarGroups.appSettings}
            >
              <span>APP SETTINGS</span>
              <span className="group-collapse-icon">
                {openSidebarGroups.appSettings ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>

            {openSidebarGroups.appSettings && (<>
            {/* Sound Settings Section */}
            <div className="sidebar-section">
              <button 
                ref={(el) => (headerRefs.current['sound'] = el)}
                className="section-header"
                onClick={() => setOpenSidebarSection(openSidebarSection === 'sound' ? null : 'sound')}
                onKeyDown={(e) => handleHeaderKeyDown(e, 'sound')}
                aria-expanded={openSidebarSection === 'sound'}
                tabIndex={0}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Volume2 size={16} />Sound
                </span>
                <span className="collapse-icon">
                  {openSidebarSection === 'sound' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>
              <div className={`section-content ${openSidebarSection === 'sound' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'sound'}>
                <SoundSettings />
              </div>
            </div>

            {/* Export/Import Section */}
            <div className="sidebar-section">
              <button 
                ref={(el) => (headerRefs.current['export'] = el)}
                className="section-header"
                onClick={() => setOpenSidebarSection(openSidebarSection === 'export' ? null : 'export')}
                onKeyDown={(e) => handleHeaderKeyDown(e, 'export')}
                aria-expanded={openSidebarSection === 'export'}
                tabIndex={0}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HardDrive size={16} />Backup
                </span>
                <span className="collapse-icon">
                  {openSidebarSection === 'export' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>
              <div className={`section-content ${openSidebarSection === 'export' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'export'}>
                <ExportImport />
              </div>
            </div>

            {/* Theme Selector Section with Toggle Switch */}
            <div className="sidebar-section">
              <button 
                ref={(el) => (headerRefs.current['themes'] = el)}
                className="section-header"
                onClick={() => setOpenSidebarSection(openSidebarSection === 'themes' ? null : 'themes')}
                onKeyDown={(e) => handleHeaderKeyDown(e, 'themes')}
                aria-expanded={openSidebarSection === 'themes'}
                tabIndex={0}
              >
                <span><Palette size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Themes</span>
                <span className="collapse-icon">
                  {openSidebarSection === 'themes' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>
              <div className={`section-content ${openSidebarSection === 'themes' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'themes'}>
                <ProgressiveThemeManager />
              </div>
            </div>
            <div className="sidebar-group-separator" />
            </>
            )}

            {/* GROUP 2: SESSION SETUP (before you start) */}
            <button 
              className="sidebar-group-header clickable"
              onClick={() => toggleSidebarGroup('sessionSetup')}
              aria-expanded={openSidebarGroups.sessionSetup}
            >
              <span>SESSION SETUP</span>
              <span className="group-collapse-icon">
                {openSidebarGroups.sessionSetup ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>

            {openSidebarGroups.sessionSetup && (<>
            {/* Session Mode Section */}
            <div className="sidebar-section">
                <button 
                  ref={(el) => (headerRefs.current['sessionMode'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'sessionMode' ? null : 'sessionMode')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'sessionMode')}
                  aria-expanded={openSidebarSection === 'sessionMode'}
                  tabIndex={0}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PenTool size={16} />Session Mode
                  </span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'sessionMode' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'sessionMode' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'sessionMode'}>
                  <SessionModeSelector 
                    currentMode={sessionMode}
                    onModeChange={handleModeChange}
                    isTimerRunning={timer.isRunning || timer.isPaused}
                    projectName={projectName}
                    onProjectNameChange={handleProjectNameChange}
                  />
                </div>
              </div>

              {/* Word Tracker Section (moved from main area) */}
              <div className="sidebar-section">
                <button
                  ref={(el) => (headerRefs.current['wordTracker'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'wordTracker' ? null : 'wordTracker')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'wordTracker')}
                  aria-expanded={openSidebarSection === 'wordTracker'}
                  tabIndex={0}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PenTool size={16} />
                    Track Word Count
                  </span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'wordTracker' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'wordTracker' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'wordTracker'}>
                  <div className="wordtracker-sidebar-wrap">
                    <WordTracker isTimerRunning={timer.isRunning} sessionMode={sessionMode} />
                  </div>
                </div>
              </div>

              {/* Pomodoro Mode Section */}
              <div className="sidebar-section">
                <button 
                  ref={(el) => (headerRefs.current['pomodoro'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'pomodoro' ? null : 'pomodoro')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'pomodoro')}
                  aria-expanded={openSidebarSection === 'pomodoro'}
                  tabIndex={0}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} />Pomodoro Mode
                  </span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'pomodoro' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'pomodoro' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'pomodoro'}>
                  <PomodoroSettings
                    pomodoroEnabled={pomodoroEnabled}
                    onTogglePomodoro={handleTogglePomodoro}
                    pomodoroConfig={pomodoroConfig}
                    onConfigChange={handlePomodoroConfigChange}
                    isTimerActive={timer.isRunning || timer.isPaused}
                  />
                </div>
              </div>

              <div className="sidebar-group-separator" />
              </>)}

            {/* GROUP 3: TIMER DURATION (choose your time) */}
            <button 
              className="sidebar-group-header clickable"
              onClick={() => toggleSidebarGroup('timerDuration')}
              aria-expanded={openSidebarGroups.timerDuration}
            >
              <span>TIMER DURATION</span>
              <span className="group-collapse-icon">
                {openSidebarGroups.timerDuration ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>

            {openSidebarGroups.timerDuration && (
              <>
              {/* Quick Presets Section */}
              <div className="sidebar-section">
                <button 
                  ref={(el) => (headerRefs.current['presets'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'presets' ? null : 'presets')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'presets')}
                  aria-expanded={openSidebarSection === 'presets'}
                  tabIndex={0}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={16} />Quick Presets
                  </span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'presets' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'presets' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'presets'}>
                  <div className="presets">
                    <button onClick={() => handlePresetChange(25)} className="preset-btn">
                      25 min (Pomodoro)
                    </button>
                    <button onClick={() => handlePresetChange(45)} className="preset-btn">
                      45 min (Deep Focus)
                    </button>
                    <button onClick={() => handlePresetChange(60)} className="preset-btn">
                      60 min (Long Session)
                    </button>
                    <button onClick={() => handlePresetChange(15)} className="preset-btn">
                      15 min (Quick Sprint)
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Timer Settings Section */}
              <div className="sidebar-section">
                <button 
                  ref={(el) => (headerRefs.current['custom'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'custom' ? null : 'custom')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'custom')}
                  aria-expanded={openSidebarSection === 'custom'}
                  tabIndex={0}
                >
                  <span><Clock size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Custom Timer</span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'custom' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'custom' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'custom'}>
                  <div className="custom-duration">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      placeholder="Custom minutes"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(e.target.value)}
                      onKeyPress={handleCustomKeyPress}
                      className="custom-input"
                    />
                    <button 
                      onClick={handleCustomDuration}
                      className="preset-btn custom-btn"
                      disabled={!customMinutes}
                    >
                      Set Duration
                    </button>
                  </div>
                </div>
              </div>

              <div className="sidebar-group-separator" />
              </>
            )}

            {/* GROUP 4: TRACKING & TASKS (during session) */}
            <button 
              className="sidebar-group-header clickable"
              onClick={() => toggleSidebarGroup('trackingTasks')}
              aria-expanded={openSidebarGroups.trackingTasks}
            >
              <span>TRACKING & TASKS</span>
              <span className="group-collapse-icon">
                {openSidebarGroups.trackingTasks ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>

            {openSidebarGroups.trackingTasks && (
              <>
              {/* Statistics Section */}
              <div className="sidebar-section">
                <button 
                  ref={(el) => (headerRefs.current['statistics'] = el)}
                  className="section-header"
                  onClick={() => setOpenSidebarSection(openSidebarSection === 'statistics' ? null : 'statistics')}
                  onKeyDown={(e) => handleHeaderKeyDown(e, 'statistics')}
                  aria-expanded={openSidebarSection === 'statistics'}
                  tabIndex={0}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BarChart3 size={16} />Statistics
                  </span>
                  <span className="collapse-icon">
                    {openSidebarSection === 'statistics' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                <div className={`section-content ${openSidebarSection === 'statistics' ? 'open' : ''}`} aria-hidden={openSidebarSection !== 'statistics'}>
                  <Statistics />
                </div>
              </div>

              <div className="sidebar-group-separator" />
              </>
            )}

            </div>
          )}
        </div>
      </div>
      <CompactToast />
      {showGettingStarted && (
        <GettingStarted onClose={handleCloseGettingStarted} />
      )}
    </div>
  )
}

export default App
