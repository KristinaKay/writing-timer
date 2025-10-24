export const themes = {
  dark: {
    name: '🌙 Dark',
    description: 'Original dark purple theme',
    primary: '#E91E63',
    secondary: '#00D4FF',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a2d 100%)',
    textColor: '#ffffff'
  },
  light: {
    name: '☀️ Light',
    description: 'Clean light theme',
    primary: '#E91E63',
    secondary: '#00D4FF',
    // Use a clean solid light gradient (avoid 8-digit hex with alpha which can be inconsistent)
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
    textColor: '#000000'
  },
  ocean: {
    name: '🌊 Ocean',
    description: 'Aurora - Cyan and violet like northern lights',
    primary: '#22D3EE',
    secondary: '#8B5CF6',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    textColor: '#ffffff'
  },
  sunset: {
    name: '🌅 Sunset',
    description: 'Desert Sunset - Golden amber with red accents',
    primary: '#F59E0B',
    secondary: '#EF4444',
    background: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
    textColor: '#ffffff'
  },
  forest: {
    name: '🌲 Forest',
    description: 'Pine & Mint - Bright green with minty freshness',
    primary: '#22C55E',
    secondary: '#6EE7B7',
    background: 'linear-gradient(135deg, #052e16 0%, #064e27 100%)',
    textColor: '#ffffff'
  },
  midnight: {
    name: '🌃 Midnight',
    description: 'Cosmic Violet - Vibrant violet and fuchsia',
    primary: '#8B5CF6',
    secondary: '#D946EF',
    background: 'linear-gradient(135deg, #18122b 0%, #2d1b4e 100%)',
    textColor: '#ffffff'
  }
};

export const getCurrentTheme = () => {
  try {
    return localStorage.getItem('mercurial-theme') || 'dark';
  } catch {
    return 'dark';
  }
};

export const initializeTheme = () => {
  const currentTheme = getCurrentTheme();
  const theme = themes[currentTheme] || themes.dark;

  document.documentElement.style.setProperty('--theme-primary', theme.primary);
  document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
  document.documentElement.style.setProperty('--theme-background', theme.background);
  document.documentElement.style.setProperty('--text-color', theme.textColor);
  document.documentElement.style.setProperty('--text-color-inverse', theme.textColor === '#ffffff' ? '#000000' : '#ffffff');
  // Also apply background and text color directly to the main app element so the theme takes effect immediately
  try {
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.style.background = theme.background;
      appElement.style.color = theme.textColor || (theme.textColor === '#ffffff' ? '#ffffff' : '#000000');
    }
  } catch {}
  // Mark the document with a data-theme attribute for CSS targeting
  try {
    document.documentElement.setAttribute('data-theme', currentTheme);
  } catch {}
};