import React, { useState, useEffect } from 'react';
import './ThemeSelector.css';
import { themes } from '../lib/themeUtils';

/**
 * Theme Selector Component
 * Allows switching between different color themes organized by brightness
 */
const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-theme') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  });

  const [compactMode, setCompactMode] = useState(() => {
    try {
      return localStorage.getItem('mercurial-compact') === 'true';
    } catch {
      return false;
    }
  });

  // Collapsible states for categories
  const [collapsedCategories, setCollapsedCategories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('theme-categories-collapsed')) || {};
    } catch {
      return {};
    }
  });

  // Organize themes by actual brightness (background color lightness)
  const themeCategories = {
    light: {
      name: '☀️ Light Themes',
      themes: ['softLavender', 'dustyFloralLight', 'dustyFloralMist', 'blackberryCream', 'dustyFloralNeutral', 'moonlightSilver', 'dustyRose', 'sageGreen', 'dustyFloralMauve']
    },
    dark: {
      name: '🌙 Dark Themes',
      themes: ['coralDawn', 'darkDustyRose', 'silverMist', 'purpleSlate', 'nebulaBlue', 'gunmetalGray', 'midnightDepths', 'midnightSteel', 'inkBlack']
    }
  };

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

  // Save collapsed states
  useEffect(() => {
    try {
      localStorage.setItem('theme-categories-collapsed', JSON.stringify(collapsedCategories));
    } catch {}
  }, [collapsedCategories]);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
  };

  const toggleCategory = (categoryKey) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
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

      <div className="theme-categories">
        {Object.entries(themeCategories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="theme-category">
            <button 
              className="category-header"
              onClick={() => toggleCategory(categoryKey)}
              aria-expanded={!collapsedCategories[categoryKey]}
            >
              <span className="category-name">{category.name}</span>
              <span className={`category-arrow ${collapsedCategories[categoryKey] ? 'collapsed' : ''}`}>
                ▼
              </span>
            </button>
            
            <div className={`category-content ${collapsedCategories[categoryKey] ? 'collapsed' : ''}`}>
              <div className="theme-grid">
                {category.themes.map(themeKey => {
                  const theme = themes[themeKey];
                  if (!theme) return null;
                  
                  return (
                    <button
                      key={themeKey}
                      className={`theme-card ${currentTheme === themeKey ? 'active' : ''}`}
                      onClick={() => handleThemeChange(themeKey)}
                    >
                      <div 
                        className="theme-color-palette"
                        style={{ background: theme.background }}
                      >
                        <div className="palette-swatches">
                          <div className="swatch primary" style={{ background: theme.primary }}></div>
                          <div className="swatch secondary" style={{ background: theme.secondary }}></div>
                          <div className="swatch background" style={{ background: theme.background }}></div>
                          <div className="swatch text" style={{ background: theme.textColor }}></div>
                        </div>
                        {currentTheme === themeKey && (
                          <div className="theme-check" style={{ background: theme.primary }}>✓</div>
                        )}
                      </div>
                      <div className="theme-info">
                        <div className="theme-name">{theme.name}</div>
                        <div className="theme-desc">{theme.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
