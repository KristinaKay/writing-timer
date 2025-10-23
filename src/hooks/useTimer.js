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

  // Main countdown logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            // Decrement seconds
            setTotalElapsed(prev => prev + 1);
            return prevSeconds - 1;
          } else {
            // Seconds reached 0, check minutes
            setMinutes((prevMinutes) => {
              if (prevMinutes > 0) {
                // Decrement minutes and reset seconds to 59
                setTotalElapsed(prev => prev + 1);
                setSeconds(59);
                return prevMinutes - 1;
              } else {
                // Timer completed
                if (!hasCompletedRef.current) {
                  hasCompletedRef.current = true;
                  setIsRunning(false);
                  onComplete();
                }
                return 0;
              }
            });
            return 0;
          }
        });
      }, 1000);
    } else {
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
  }, [isRunning, isPaused, onComplete]);

  // Start the timer
  const start = () => {
    if (minutes === 0 && seconds === 0) {
      // Don't start if timer is at 0
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    hasCompletedRef.current = false;
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
