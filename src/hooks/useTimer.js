import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing a countdown timer
 * @param {number} initialMinutes - Starting minutes for the timer
 * @param {function} onComplete - Callback function when timer reaches 0
 * @returns {object} Timer state and control functions
 */
export const useTimer = (initialMinutes = 25, onComplete = () => {}) => {
  // Timer state
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Store initial time for reset functionality
  const [initialTime, setInitialTime] = useState(initialMinutes);
  
  // Track total elapsed time for statistics
  const [totalElapsed, setTotalElapsed] = useState(0);
  
  // Use ref to store interval ID for cleanup
  const intervalRef = useRef(null);
  
  // Use ref to track if timer has completed (prevent multiple onComplete calls)
  const hasCompletedRef = useRef(false);
  
  // Use ref to store the start time for accurate timing
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);

  // Main countdown logic with accurate timing
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Record start time if not already set
      if (!startTimeRef.current) {
        const currentTimeInSeconds = minutes * 60 + seconds;
        startTimeRef.current = Date.now() - (totalElapsed * 1000);
      }
      
      // If resuming from pause, adjust start time
      if (pauseTimeRef.current) {
        const pauseDuration = Date.now() - pauseTimeRef.current;
        startTimeRef.current += pauseDuration;
        pauseTimeRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        // Calculate actual elapsed time
        const now = Date.now();
        const actualElapsed = Math.floor((now - startTimeRef.current) / 1000);
        
        // Calculate time remaining
        const totalInitialSeconds = initialTime * 60;
        const remainingSeconds = totalInitialSeconds - actualElapsed;
        
        if (remainingSeconds > 0) {
          const newMinutes = Math.floor(remainingSeconds / 60);
          const newSeconds = remainingSeconds % 60;
          
          setMinutes(newMinutes);
          setSeconds(newSeconds);
          setTotalElapsed(actualElapsed);
        } else {
          // Timer completed
          setMinutes(0);
          setSeconds(0);
          setTotalElapsed(totalInitialSeconds);
          
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setIsRunning(false);
            onComplete();
          }
        }
      }, 100); // Check every 100ms for smoother updates
    } else {
      // Record pause time when pausing
      if (isPaused && !pauseTimeRef.current) {
        pauseTimeRef.current = Date.now();
      }
      
      // Clear interval when paused or stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, onComplete, initialTime]);

  // Start the timer
  const start = () => {
    if (minutes === 0 && seconds === 0) {
      // Don't start if timer is at 0
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    hasCompletedRef.current = false;
    startTimeRef.current = null; // Reset to recalculate on next interval
  };

  // Pause the timer
  const pause = () => {
    setIsPaused(true);
  };

  // Resume the timer
  const resume = () => {
    setIsPaused(false);
  };

  // Toggle between start/pause
  const toggle = () => {
    if (!isRunning) {
      start();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  // Stop the timer (pause and reset to initial time)
  const stop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setMinutes(initialTime);
    setSeconds(0);
    setTotalElapsed(0);
    hasCompletedRef.current = false;
    startTimeRef.current = null;
    pauseTimeRef.current = null;
  };

  // Reset to initial time
  const reset = () => {
    stop();
  };

  // Set a new duration (useful for presets)
  const setDuration = (newMinutes) => {
    setInitialTime(newMinutes);
    setMinutes(newMinutes);
    setSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    setTotalElapsed(0);
    hasCompletedRef.current = false;
    startTimeRef.current = null;
    pauseTimeRef.current = null;
  };

  // Add time during a session (for extensions)
  const addTime = (additionalMinutes) => {
    setMinutes(prev => prev + additionalMinutes);
    setInitialTime(prev => prev + additionalMinutes);
  };

  // Calculate progress percentage (for circular progress indicator)
  const getProgress = () => {
    const totalSeconds = initialTime * 60;
    const remainingSeconds = minutes * 60 + seconds;
    return ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  };

  // Format time for display
  const getFormattedTime = () => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return {
    // State
    minutes,
    seconds,
    isRunning,
    isPaused,
    totalElapsed,
    
    // Control functions
    start,
    pause,
    resume,
    toggle,
    stop,
    reset,
    setDuration,
    addTime,
    
    // Utility functions
    getProgress,
    getFormattedTime,
    
    // Computed values
    isComplete: minutes === 0 && seconds === 0 && hasCompletedRef.current,
    timeRemaining: minutes * 60 + seconds,
  };
};
