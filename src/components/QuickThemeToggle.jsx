import React, { useState, useEffect } from 'react';
import './QuickThemeToggle.css';
import { themes } from '../lib/themeUtils';

/**
 * Quick Dark/Light Theme Toggle Component
 * Simple toggle switch between light and dark themes
 */
const QuickThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-theme') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  });

  const [defaultLightTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-default-light') || 'dustyFloralLight';
    } catch {
      return 'dustyFloralLight';
    }
  });
  
  const [defaultDarkTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-default-dark') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  });

  // Organize themes by brightness - must match ProgressiveThemeManager
  const lightThemes = [
    'dustyFloralLight', 'dustyFloralMist', 'dustyFloralNeutral', 'blackberryCream', 
    'moonlightSilver', 'dustyRose', 'sageGreen', 'softLavender'
  ];
  
  // Determine if we're currently in light mode
  const isLightMode = lightThemes.includes(currentTheme);

  const handleToggle = () => {
    const newTheme = isLightMode ? defaultDarkTheme : defaultLightTheme;
    setCurrentTheme(newTheme);
    
    // Apply theme immediately
    const theme = themes[newTheme];
    if (theme) {
      // Save to localStorage
      localStorage.setItem('mercurial-theme', newTheme);

      // Apply CSS variables
      document.documentElement.style.setProperty('--theme-primary', theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
      document.documentElement.style.setProperty('--theme-accent', theme.accent);
      document.documentElement.style.setProperty('--theme-text', theme.textColor);
      document.documentElement.style.setProperty('--theme-bg', theme.background);
      document.documentElement.style.setProperty('--theme-surface', theme.surface);
      document.documentElement.style.setProperty('--theme-border', theme.border);

      // Apply background
      const appElement = document.querySelector('.App');
      if (appElement) {
        appElement.style.background = theme.background;
        appElement.style.color = theme.textColor || '#ffffff';
      }

      // Mark the document with data-theme attribute
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { theme: newTheme }
      }));
    }
  };

  // Listen for theme changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('mercurial-theme') || 'midnightSteel';
      setCurrentTheme(stored);
    };

    const handleThemeChange = (event) => {
      if (event.detail && event.detail.theme) {
        setCurrentTheme(event.detail.theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('theme-changed', handleThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, []);

  return (
    <div className="quick-theme-toggle">
      <div className="toggle-container">
        <span className="mode-label left-label">LIGHT MODE</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!isLightMode}
            onChange={handleToggle}
            aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          />
          <span className="slider"></span>
        </label>
        <span className="mode-label right-label">DARK MODE</span>
      </div>
    </div>
  );
};

export default QuickThemeToggle;