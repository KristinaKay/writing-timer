import React, { useState, useEffect } from 'react';
import './ThemeSelector.css';
import { themes } from '../lib/themeUtils';

/**
 * Theme Selector Component
 * Allows switching between different color themes
 */
const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [compactMode, setCompactMode] = useState(() => {
    try {
      return localStorage.getItem('mercurial-compact') === 'true';
    } catch {
      return false;
    }
  });

  // use `themes` imported from lib/themeUtils

  // Apply theme
  useEffect(() => {
    const theme = themes[currentTheme];
    if (!theme) return;

    // Save to localStorage
    localStorage.setItem('mercurial-theme', currentTheme);

    // Apply CSS variables
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-background', theme.background);

    // Only set core theme variables here. Visual defaults (overlays/controls) are managed by CSS
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--text-color-inverse', theme.textColor === '#ffffff' ? '#000000' : '#ffffff');

    // Apply background
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.style.background = theme.background;
      appElement.style.color = theme.textColor || '#ffffff';
    }

    // Mark the document with a data-theme attribute so CSS selectors react immediately
    try {
      document.documentElement.setAttribute('data-theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  // Apply compact mode class to the document element
  useEffect(() => {
    try {
      localStorage.setItem('mercurial-compact', compactMode ? 'true' : 'false');
    } catch {}
    if (compactMode) document.documentElement.classList.add('compact');
    else document.documentElement.classList.remove('compact');
    // Notify other parts of the app (toast / listeners)
    try {
      window.dispatchEvent(new CustomEvent('compact-mode-changed', { detail: { enabled: compactMode } }));
    } catch {}
  }, [compactMode]);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
  };

  return (
    <div className="theme-selector-container">
      <div className="compact-toggle-row">
        <label className="compact-toggle">
          <input
            type="checkbox"
            checked={compactMode}
            onChange={(e) => setCompactMode(e.target.checked)}
          />
          <span className="compact-label">Compact Mode</span>
        </label>
      </div>
      <p className="theme-description">
        Choose your visual theme
      </p>

      <div className="theme-grid">
        {Object.keys(themes).map(themeKey => {
          const theme = themes[themeKey];
          return (
            <button
              key={themeKey}
              className={`theme-card ${currentTheme === themeKey ? 'active' : ''}`}
              onClick={() => handleThemeChange(themeKey)}
            >
              <div 
                className="theme-preview"
                style={{ background: theme.background }}
              >
                <div 
                  className="theme-circle"
                  style={{ borderColor: theme.primary }}
                >
                  <div 
                    className="theme-dot"
                    style={{ background: theme.secondary }}
                  ></div>
                </div>
              </div>
              <div className="theme-info">
                <div className="theme-name">{theme.name}</div>
                <div className="theme-desc">{theme.description}</div>
              </div>
              {currentTheme === themeKey && (
                <div className="theme-check">✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
