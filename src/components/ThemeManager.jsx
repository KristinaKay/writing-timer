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
      return localStorage.getItem('mercurial-default-dark') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  });

  // Organize themes by brightness - corrected to match actual themes
  const lightThemes = [
    'dustyFloralLight', 'dustyFloralMist', 'dustyFloralNeutral', 'blackberryCream', 
    'moonlightSilver', 'dustyRose', 'sageGreen', 'softLavender'
  ];
  
  const darkThemes = [
    'dustyFloralMauve', 'darkDustyRose', 'silverMist', 'nebulaBlue', 'coralDawn', 
    'purpleSlate', 'gunmetalGray', 'inkBlack', 'midnightDepths', 'midnightSteel'
  ];

  // Save default theme preferences
  useEffect(() => {
    try {
      localStorage.setItem('mercurial-default-light', defaultLightTheme);
      localStorage.setItem('mercurial-default-dark', defaultDarkTheme);
    } catch (error) {
      console.error('Failed to save default themes:', error);
    }
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