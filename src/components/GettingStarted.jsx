import React, { useState, useEffect } from 'react';
import './GettingStarted.css';

/**
 * Getting Started Guide Component
 * Shows a 5-step walkthrough for new users on first site load
 */
const GettingStarted = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    {
      title: "Welcome to Writing Timer!",
      content: (
        <div className="welcome-step">
          <div className="welcome-icon">✍️</div>
          <p>This focused writing timer helps you stay productive with customizable sessions, task tracking, and detailed statistics.</p>
          <p><strong>Let's get you set up in 5 simple steps!</strong></p>
        </div>
      ),
      icon: "🎉"
    },
    {
      title: "Step 1: Configure App Settings",
      content: (
        <div className="step-content">
          <p><strong>📍 Location:</strong> Sidebar → App Settings</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🔊</span>
              <div>
                <strong>Sound Settings:</strong> Choose notification sounds for timer completion
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div>
                <strong>Themes:</strong> Pick your preferred color scheme and set up quick light/dark toggle
              </div>
            </div>
          </div>
          <div className="tip">
            💡 <strong>Tip:</strong> Set up your default light and dark themes for the quick toggle switch
          </div>
        </div>
      ),
      icon: "⚙️"
    },
    {
      title: "Step 2: Choose Your Session Setup",
      content: (
        <div className="step-content">
          <p><strong>📍 Location:</strong> Sidebar → Session Setup</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <strong>Session Mode:</strong> Select from Writing, Researching, Creative Thinking, or Rabbit-Holing
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🍅</span>
              <div>
                <strong>Pomodoro (Optional):</strong> Enable structured work/break cycles for better focus
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <div>
                <strong>Word Tracking (Optional):</strong> Track your word count progress during sessions
              </div>
            </div>
          </div>
        </div>
      ),
      icon: "🎯"
    },
    {
      title: "Step 3: Set Your Timer Duration",
      content: (
        <div className="step-content">
          <p><strong>📍 Location:</strong> Sidebar → Timer Duration</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Quick Presets:</strong> Choose from 25min (Pomodoro), 45min, 60min, or 90min sessions
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div>
                <strong>Custom Timer:</strong> Set any duration from 1-999 minutes for your specific needs
              </div>
            </div>
          </div>
          <div className="tip">
            💡 <strong>Tip:</strong> Start with 25-45 minute sessions if you're new to focused writing
          </div>
        </div>
      ),
      icon: "⏰"
    },
    {
      title: "Step 4: Add Tasks (Optional)",
      content: (
        <div className="step-content">
          <p><strong>📍 Location:</strong> Sidebar → Tracking & Tasks</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <strong>Task List:</strong> Add specific goals or tasks to focus on during your session
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <strong>Statistics:</strong> View your writing progress, completed sessions, and productivity trends
              </div>
            </div>
          </div>
          <div className="tip">
            💡 <strong>Tip:</strong> Tasks help maintain focus, but they're optional - you can just start a timer anytime!
          </div>
        </div>
      ),
      icon: "📝"
    },
    {
      title: "Step 5: Start Writing!",
      content: (
        <div className="step-content">
          <p><strong>📍 Location:</strong> Main Timer (center of screen)</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">▶️</span>
              <div>
                <strong>Start Timer:</strong> Click the large play button to begin your focused writing session
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⏸️</span>
              <div>
                <strong>Pause/Resume:</strong> Take breaks when needed without losing your progress
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎵</span>
              <div>
                <strong>Stay Focused:</strong> Get audio notifications when your session ends
              </div>
            </div>
          </div>
          <div className="success-message">
            🎉 <strong>You're all set!</strong> Start your first focused writing session and watch your productivity soar!
          </div>
        </div>
      ),
      icon: "🚀"
    }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipGuide = () => {
    onClose();
  };

  return (
    <div className="getting-started-overlay">
      <div className="getting-started-modal">
        <div className="modal-header">
          <div className="step-indicator">
            <span className="step-icon">{steps[currentStep - 1].icon}</span>
            <span className="step-counter">Step {currentStep} of {totalSteps}</span>
          </div>
          <button className="close-btn" onClick={onClose} title="Close guide">
            ✕
          </button>
        </div>

        <div className="modal-content">
          <h2>{steps[currentStep - 1].title}</h2>
          {steps[currentStep - 1].content}
        </div>

        <div className="modal-footer">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          
          <div className="navigation-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={skipGuide}
            >
              Skip Guide
            </button>
            
            <div className="nav-buttons">
              {currentStep > 1 && (
                <button 
                  className="btn btn-outline" 
                  onClick={prevStep}
                >
                  ← Back
                </button>
              )}
              
              <button 
                className="btn btn-primary" 
                onClick={nextStep}
              >
                {currentStep === totalSteps ? 'Get Started!' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;