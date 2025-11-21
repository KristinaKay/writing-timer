import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './CompactThemeSelector.css';
import { themes } from '../lib/themeUtils';

/**
 * Compact Theme Selector Component
 * Tabbed interface with compact grid of color swatches
 */
const CompactThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-theme') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  });

  const [activeTab, setActiveTab] = useState('light'); // Default to light tab

  // Organize themes by brightness categories
  const themeCategories = {
    light: {
      name: 'Light',
      icon: <Sun size={16} />,
      themes: ['softLavender', 'dustyFloralLight', 'dustyFloralMist', 'blackberryCream', 'dustyFloralNeutral', 'moonlightSilver', 'dustyRose', 'sageGreen', 'dustyFloralMauve']
    },
    dark: {
      name: 'Dark', 
      icon: <Moon size={16} />,
      themes: ['coralDawn', 'darkDustyRose', 'silverMist', 'purpleSlate', 'nebulaBlue', 'gunmetalGray', 'midnightDepths', 'midnightSteel', 'inkBlack']
    }
  };

  // Listen for theme changes from other components (like QuickThemeToggle)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('mercurial-theme') || 'midnightSteel';
      if (stored !== currentTheme) {
        setCurrentTheme(stored);
      }
    };

    // Listen for storage events (theme changes from other components)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleThemeChange = (event) => {
      if (event.detail && event.detail.theme && event.detail.theme !== currentTheme) {
        setCurrentTheme(event.detail.theme);
      }
    };
    
    window.addEventListener('theme-changed', handleThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [currentTheme]);

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
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--text-color-inverse', theme.textColor === '#ffffff' ? '#000000' : '#ffffff');

    // Apply background
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.style.background = theme.background;
      appElement.style.color = theme.textColor || '#ffffff';
    }

    // Mark the document with a data-theme attribute
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: themeKey }
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="compact-theme-selector">
      {/* Tab Headers */}
      <div className="theme-tabs">
        {Object.entries(themeCategories).map(([categoryKey, category]) => (
          <button
            key={categoryKey}
            className={`theme-tab ${activeTab === categoryKey ? 'active' : ''}`}
            onClick={() => handleTabChange(categoryKey)}
            aria-pressed={activeTab === categoryKey}
          >
            <span className="tab-icon" aria-hidden="true">{category.icon}</span>
            <span className="tab-label">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Current Theme Display */}
      <div className="current-theme-display">
        <span className="current-label">Current:</span>
        <span className="current-name">{themes[currentTheme]?.name}</span>
      </div>

      {/* Theme Grid */}
      <div className="theme-swatch-grid">
        {themeCategories[activeTab]?.themes.map(themeKey => {
          const theme = themes[themeKey];
          if (!theme) return null;
          
          return (
            <button
              key={themeKey}
              className={`theme-swatch ${currentTheme === themeKey ? 'active' : ''}`}
              onClick={() => handleThemeChange(themeKey)}
              title={theme.name}
              aria-label={`Select ${theme.name} theme`}
              style={{
                background: theme.background
              }}
            >
              <div className="swatch-colors">
                <div 
                  className="color-primary" 
                  style={{ background: theme.primary }}
                  aria-hidden="true"
                ></div>
                <div 
                  className="color-secondary" 
                  style={{ background: theme.secondary }}
                  aria-hidden="true"
                ></div>
              </div>
              {currentTheme === themeKey && (
                <div className="swatch-check" aria-hidden="true">✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompactThemeSelector;