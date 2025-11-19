import React, { useState, useEffect } from 'react';
import './ThemeManager.css';
import CompactThemeSelector from './CompactThemeSelector';
import QuickThemeToggle from './QuickThemeToggle';
import { themes } from '../lib/themeUtils';

/**
 * Comprehensive Theme Manager Component
 * Combines theme selection, quick toggle, and default theme configuration
 */
const ThemeManager = () => {
  const [defaultLightTheme, setDefaultLightTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-default-light') || 'dustyFloralLight';
    } catch {
      return 'dustyFloralLight';
    }
  });
  
  const [defaultDarkTheme, setDefaultDarkTheme] = useState(() => {
    try {
      return localStorage.getItem('mercurial-default-dark') || 'inkBlack';
    } catch {
      return 'inkBlack';
    }
  });

  // Organize themes by brightness
  const lightThemes = [
    'softLavender', 'dustyFloralLight', 'dustyFloralMist', 'blackberryCream', 
    'dustyFloralNeutral', 'moonlightSilver', 'dustyRose', 'sageGreen', 'dustyFloralMauve'
  ];
  
  const darkThemes = [
    'inkBlack', 'midnightSteel', 'charcoalMist', 'darkOlive', 'deepTeal', 'slateGray'
  ];

  // Save default theme preferences
  useEffect(() => {
    try {
      localStorage.setItem('mercurial-default-light', defaultLightTheme);
      localStorage.setItem('mercurial-default-dark', defaultDarkTheme);
    } catch {}
  }, [defaultLightTheme, defaultDarkTheme]);

  return (
    <div className="theme-manager">
      {/* Theme Selection */}
      <div className="theme-section">
        <h4 className="section-title">Theme Selection</h4>
        <CompactThemeSelector />
      </div>

      {/* Quick Toggle */}
      <div className="theme-section">
        <h4 className="section-title">Quick Light/Dark Toggle</h4>
        <QuickThemeToggle />
      </div>

      {/* Default Theme Configuration */}
      <div className="theme-section">
        <h4 className="section-title">Default Toggle Themes</h4>
        <p className="section-description">
          Configure which themes the quick toggle switches between
        </p>
        
        <div className="default-theme-settings">
          <div className="setting-group">
            <label className="setting-label">Default Light Theme:</label>
            <select 
              value={defaultLightTheme}
              onChange={(e) => setDefaultLightTheme(e.target.value)}
              className="theme-select"
            >
              {lightThemes.map(themeKey => (
                <option key={themeKey} value={themeKey}>
                  {themes[themeKey]?.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">Default Dark Theme:</label>
            <select 
              value={defaultDarkTheme}
              onChange={(e) => setDefaultDarkTheme(e.target.value)}
              className="theme-select"
            >
              {darkThemes.map(themeKey => (
                <option key={themeKey} value={themeKey}>
                  {themes[themeKey]?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeManager;