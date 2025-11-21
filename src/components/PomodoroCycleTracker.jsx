import React from 'react';
import { Timer, Coffee, Star, Circle } from 'lucide-react';
import './PomodoroCycleTracker.css';

const PomodoroCycleTracker = ({ 
  currentCycle, 
  totalCycles, 
  completedSessions, 
  cycleType,
  sessionMode 
}) => {
  const getCycleIcon = (type) => {
    switch (type) {
      case 'work':
        return <Circle size={16} />;
      case 'shortBreak':
        return <Coffee size={16} />;
      case 'longBreak':
        return <Star size={16} />;
      default:
        return <Timer size={16} />;
    }
  };

  const getSessionModeLabel = (mode) => {
    switch (mode) {
      case 'writing':
        return 'Writing Session';
      case 'researching':
        return 'Research Session';
      case 'creative':
        return 'Creative Session';
      case 'roaming':
        return 'Rabbit-Holing';
      default:
        return 'Work Session';
    }
  };

  const getCycleLabel = (type) => {
    switch (type) {
      case 'work':
        return getSessionModeLabel(sessionMode);
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
