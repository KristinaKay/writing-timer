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
    description: 'Cool blue tones',
    primary: '#00D4FF',
    secondary: '#9C27B0',
    background: 'linear-gradient(135deg, #0a1929 0%, #1a2f3f 100%)',
    textColor: '#ffffff'
  },
  sunset: {
    name: '🌅 Sunset',
    description: 'Warm orange and pink',
    primary: '#FF6B35',
    secondary: '#F7931E',
    background: 'linear-gradient(135deg, #2d1b1f 0%, #3d2a1f 100%)',
    textColor: '#ffffff'
  },
  forest: {
    name: '🌲 Forest',
    description: 'Natural green tones',
    primary: '#4CAF50',
    secondary: '#8BC34A',
    background: 'linear-gradient(135deg, #1a2f1a 0%, #2a3f2a 100%)',
    textColor: '#ffffff'
  },
  midnight: {
    name: '🌃 Midnight',
    description: 'Deep blue night',
    primary: '#9C27B0',
    secondary: '#00D4FF',
    background: 'linear-gradient(135deg, #0d1117 0%, #1a1d29 100%)',
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