import React, { useState, useEffect } from 'react';
import { Save, X, RotateCcw, Palette, FolderOpen, ChevronDown, ChevronRight, Sun, Moon, Zap } from 'lucide-react';
import './ProgressiveThemeManager.css';
import QuickThemeToggle from './QuickThemeToggle';
import { themes } from '../lib/themeUtils';

/**
 * Progressive Disclosure Theme Manager Component
 * Basic → Advanced → Expert levels for different user needs
 */
const ProgressiveThemeManager = () => {
  // Current saved defaults
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

  // Pending changes (for preview before save)
  const [pendingLightTheme, setPendingLightTheme] = useState(defaultLightTheme);
  const [pendingDarkTheme, setPendingDarkTheme] = useState(defaultDarkTheme);
  
  // Progressive disclosure state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExpert, setShowExpert] = useState(false);

  // Organize themes by brightness - corrected to match actual themes
  const lightThemes = [
    'dustyFloralLight', 'dustyFloralMist', 'dustyFloralNeutral', 'blackberryCream', 
    'moonlightSilver', 'dustyRose', 'sageGreen', 'softLavender'
  ];
  
  const darkThemes = [
    'dustyFloralMauve', 'darkDustyRose', 'silverMist', 'nebulaBlue', 'coralDawn', 
    'purpleSlate', 'gunmetalGray', 'inkBlack', 'midnightDepths', 'midnightSteel'
  ];

  // Check if there are unsaved changes
  const hasUnsavedChanges = pendingLightTheme !== defaultLightTheme || pendingDarkTheme !== defaultDarkTheme;
  
  // Get current theme to determine smart apply behavior
  const getCurrentTheme = () => {
    try {
      return localStorage.getItem('mercurial-theme') || 'midnightSteel';
    } catch {
      return 'midnightSteel';
    }
  };

  const isLightMode = () => lightThemes.includes(getCurrentTheme());
  const isDarkMode = () => darkThemes.includes(getCurrentTheme());

  // Handle save and apply changes
  const handleSaveDefaults = () => {
    try {
      // Save to localStorage
      localStorage.setItem('mercurial-default-light', pendingLightTheme);
      localStorage.setItem('mercurial-default-dark', pendingDarkTheme);
      
      // Update state
      setDefaultLightTheme(pendingLightTheme);
      setDefaultDarkTheme(pendingDarkTheme);
      
      // Smart apply: only apply if currently in that mode
      let appliedTheme = null;
      if (isLightMode() && pendingLightTheme !== defaultLightTheme) {
        appliedTheme = pendingLightTheme;
      } else if (isDarkMode() && pendingDarkTheme !== defaultDarkTheme) {
        appliedTheme = pendingDarkTheme;
      }
      
      if (appliedTheme) {
        // Apply the theme immediately
        localStorage.setItem('mercurial-theme', appliedTheme);
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('theme-changed', {
          detail: { theme: appliedTheme }
        }));
        
        // Apply theme styles
        const theme = themes[appliedTheme];
        if (theme) {
          document.documentElement.style.setProperty('--theme-primary', theme.primary);
          document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
          document.documentElement.style.setProperty('--theme-background', theme.background);
          document.documentElement.style.setProperty('--text-color', theme.textColor);
          document.documentElement.setAttribute('data-theme', appliedTheme);
          
          const appElement = document.querySelector('.App');
          if (appElement) {
            appElement.style.background = theme.background;
            appElement.style.color = theme.textColor;
          }
        }
      }
      
      // Show success feedback (could be enhanced with toast notification)
      console.log('Default themes saved successfully', appliedTheme ? ` and ${appliedTheme} applied` : '');
      
    } catch (error) {
      console.error('Failed to save default themes:', error);
    }
  };

  // Handle cancel changes
  const handleCancelChanges = () => {
    setPendingLightTheme(defaultLightTheme);
    setPendingDarkTheme(defaultDarkTheme);
  };

  // Reset to system defaults
  const handleResetDefaults = () => {
    setPendingLightTheme('dustyFloralLight');
    setPendingDarkTheme('midnightSteel');
  };

  // Initialize pending values when saved values change
  useEffect(() => {
    setPendingLightTheme(defaultLightTheme);
    setPendingDarkTheme(defaultDarkTheme);
  }, [defaultLightTheme, defaultDarkTheme]);

  return (
    <div className="theme-manager progressive">
      {/* BASIC LEVEL - Simple sections like main sidebar */}
      <div className="sidebar-section">
        <div className="section-content open">
          <QuickThemeToggle />
        </div>
      </div>

      {/* ADVANCED LEVEL - Collapsible like main sidebar */}
      <div className="sidebar-section">
        <button 
          className="section-header"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-label="Toggle default theme settings"
        >
          <span>Default Theme Settings</span>
          <span className="collapse-icon">{showAdvanced ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
        </button>
        
        <div className={`section-content ${showAdvanced ? 'open' : ''}`} aria-hidden={!showAdvanced}>
          <div className="advanced-content">
              <p className="section-description">
                Set which themes the quick toggle switches between. Changes apply immediately if you're in that mode.
              </p>
              
              <div className="default-theme-settings">
                <div className="setting-group">
                  <label className="setting-label">
                    <span className="label-icon"><Sun size={14} /></span>
                    Default Light Theme:
                  </label>
                  <div className="setting-control">
                    <select 
                      value={pendingLightTheme}
                      onChange={(e) => setPendingLightTheme(e.target.value)}
                      className="theme-select"
                    >
                      {lightThemes.map(themeKey => {
                        const theme = themes[themeKey];
                        if (!theme) return null;
                        return (
                          <option key={themeKey} value={themeKey}>
                            {theme.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="theme-preview-swatch">
                      <div className="swatch-color" style={{
                        background: themes[pendingLightTheme]?.background
                      }}></div>
                      <div className="swatch-color" style={{
                        background: themes[pendingLightTheme]?.primary
                      }}></div>
                      <div className="swatch-color" style={{
                        background: themes[pendingLightTheme]?.secondary
                      }}></div>
                    </div>
                  </div>
                  {isLightMode() && pendingLightTheme !== defaultLightTheme && (
                    <div className="apply-note">Will apply immediately when saved</div>
                  )}
                </div>
                
                <div className="setting-group">
                  <label className="setting-label">
                    <span className="label-icon"><Moon size={14} /></span>
                    Default Dark Theme:
                  </label>
                  <div className="setting-control">
                    <select 
                      value={pendingDarkTheme}
                      onChange={(e) => setPendingDarkTheme(e.target.value)}
                      className="theme-select"
                    >
                      {darkThemes.map(themeKey => {
                        const theme = themes[themeKey];
                        if (!theme) return null;
                        return (
                          <option key={themeKey} value={themeKey}>
                            {theme.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="theme-preview-swatch">
                      <div className="swatch-color" style={{
                        background: themes[pendingDarkTheme]?.background
                      }}></div>
                      <div className="swatch-color" style={{
                        background: themes[pendingDarkTheme]?.primary
                      }}></div>
                      <div className="swatch-color" style={{
                        background: themes[pendingDarkTheme]?.secondary
                      }}></div>
                    </div>
                  </div>
                  {isDarkMode() && pendingDarkTheme !== defaultDarkTheme && (
                    <div className="apply-note">Will apply immediately when saved</div>
                  )}
                </div>
              </div>
              
              {/* Save Controls */}
              <div className="save-controls">
                <button 
                  className="save-button primary"
                  onClick={handleSaveDefaults}
                  disabled={!hasUnsavedChanges}
                >
                  <Save size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Save Changes
                </button>
                <button 
                  className="cancel-button secondary"
                  onClick={handleCancelChanges}
                  disabled={!hasUnsavedChanges}
                >
                  <X size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Cancel
                </button>
                <button 
                  className="reset-button tertiary"
                  onClick={handleResetDefaults}
                >
                  <RotateCcw size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Reset to Defaults
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* EXPERT LEVEL - Collapsible like main sidebar */}
      <div className="sidebar-section">
        <button 
          className="section-header"
          onClick={() => setShowExpert(!showExpert)}
          aria-expanded={showExpert}
          aria-label="Toggle expert theme settings"
        >
          <span>Expert Customization</span>
          <span className="collapse-icon">{showExpert ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
        </button>
        
        <div className={`section-content ${showExpert ? 'open' : ''}`} aria-hidden={!showExpert}>
          <div className="expert-content">
              <p className="section-description">
                Power user features for advanced theme customization.
              </p>
              
              <div className="expert-features">
                <div className="feature-placeholder">
                  <h5><Palette size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Custom Theme Creator</h5>
                  <p>Create and save your own custom color themes</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>
                
                <div className="feature-placeholder">
                  <h5><FolderOpen size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Import/Export Themes</h5>
                  <p>Share theme configurations with other users</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>
                
                <div className="feature-placeholder">
                  <h5><Zap size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} /> Advanced Behaviors</h5>
                  <p>Customize theme transition effects and auto-apply settings</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveThemeManager;