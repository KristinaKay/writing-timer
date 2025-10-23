import React from 'react';
import './PomodoroCycleTracker.css';

const PomodoroCycleTracker = ({ 
  currentCycle, 
  totalCycles, 
  completedSessions, 
  cycleType 
}) => {
  const getCycleIcon = (type) => {
    switch (type) {
      case 'work':
        return '🍅';
      case 'shortBreak':
        return '☕';
      case 'longBreak':
        return '🌟';
      default:
        return '⏱️';
    }
  };

  const getCycleLabel = (type) => {
    switch (type) {
      case 'work':
        return 'Work Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="pomodoro-cycle-tracker">
      <div className="cycle-status">
        <span className="cycle-icon">{getCycleIcon(cycleType)}</span>
        <span className="cycle-label">{getCycleLabel(cycleType)}</span>
      </div>
      
      <div className="cycle-progress">
        <div className="progress-dots">
          {Array.from({ length: totalCycles }).map((_, index) => (
            <div
              key={index}
              className={'dot ' + (index < completedSessions ? 'completed' : index === currentCycle - 1 ? 'current' : 'pending')}
              title={'Session ' + (index + 1)}
            />
          ))}
        </div>
        <div className="progress-text">
          Session {currentCycle} of {totalCycles}
        </div>
      </div>
    </div>
  );
};

export default PomodoroCycleTracker;
