import React from 'react';
import './CircularProgress.css';

/**
 * Circular Progress Indicator Component
 * Displays an animated progress ring around the timer
 * @param {number} progress - Progress percentage (0-100)
 * @param {number} size - Diameter of the circle in pixels
 * @param {number} strokeWidth - Width of the progress ring
 * @param {string} color - Color of the progress ring
 * @param {React.ReactNode} children - Content to display inside the circle
 */
const CircularProgress = ({ 
  progress = 0, 
  size = 400, 
  strokeWidth = 12,
  color = 'rgba(5, 165, 190, 1)',
  children 
}) => {
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container" style={{ width: size, height: size }}>
      <svg 
        className="circular-progress-svg"
        width={size} 
        height={size}
      >
        {/* Background circle (track) */}
        <circle
          className="circular-progress-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle (animated) */}
        <circle
          className="circular-progress-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={color}
          style={{
            transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease'
          }}
        />
      </svg>
      
      {/* Content in the center */}
      <div className="circular-progress-content">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
