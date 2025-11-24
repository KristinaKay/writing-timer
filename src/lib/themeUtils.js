export const themes = {
  // Lightest backgrounds first
  dustyFloralLight: {
    name: 'Light Elegance',
    description: 'Soft warm white with dusty mauve accents',
    primary: '#847577',
    secondary: '#A6A2A2',
    background: '#FBFBF2',
    textColor: '#4A3B3C'
  },
  dustyFloralMist: {
    name: 'Soft Mist',
    description: 'Soft gray base with warm highlights',
    primary: '#847577',
    secondary: '#FBFBF2',
    background: '#E5E6E4',
    textColor: '#3A2F30'
  },
  dustyRose: {
    name: 'Dusty Rose',
    description: 'Warm neutrals with dusty rose highlights',
    primary: '#7D4F50',
    secondary: '#F9EAE1',
    background: '#BFB29C',
    textColor: '#5A3B3C'
  },
  dustyFloralNeutral: {
    name: 'Balanced Neutral',
    description: 'Balanced sage-gray with warm accents',
    primary: '#7A6B6D',
    secondary: '#FBFBF2',
    background: '#CFD2CD',
    textColor: '#2F2426'
  },
  blackberryCream: {
    name: 'Blackberry Cream',
    description: 'Elegant cream base with rich blackberry accents',
    primary: '#69385C',
    secondary: '#89937C',
    background: '#D3BDB0',
    textColor: '#3C1F25'
  },
  sageGreen: {
    name: 'Sage & Green',
    description: 'Warm sage and cream with natural green highlights',
    primary: '#5A2E4B',
    secondary: '#D3BDB0',
    background: '#89937C',
    textColor: '#1F241C'
  },
  // Medium backgrounds
  dustyFloralMauve: {
    name: 'Midnight Mauve',
    description: 'Sophisticated dark burgundy with mauve accents',
    primary: '#847577',
    secondary: '#b2b8b7',
    background: '#26191b',
    textColor: '#FFFFFF'
  },
  darkDustyRose: {
    name: 'Dark Dusty Rose',
    description: 'High contrast with bold dusty rose',
    primary: '#DCA9A4',
    secondary: '#D1BE9C',
    background: '#7D4F50',
    textColor: '#F9EAE1'
  },
  // Advanced color palette themes - darkest backgrounds last
  silverMist: {
    name: 'Silver Mist',
    description: 'Elegant silver-gray with professional blue accents',
    primary: '#0D1520',
    secondary: '#6A687A',
    background: '#6B6977',
    textColor: '#FFFFFF'
  },
  nebulaBlue: {
    name: 'Nebula Blue',
    description: 'Sophisticated mid-tone with cosmic feel',
    primary: '#B5B3C0',
    secondary: '#6A687A',
    background: '#536271',
    textColor: '#F0F0F2'
  },
  moonlightSilver: {
    name: 'Moonlight Silver',
    description: 'Clean light theme with ink-inspired contrast',
    primary: '#1B2A41',
    secondary: '#324A5F',
    background: '#CCC9DC',
    textColor: '#0C1821'
  },
  softLavender: {
    name: 'Soft Lavender',
    description: 'Gentle pastels perfect for creative writing',
    primary: '#6B7489',
    secondary: '#CBC0D3',
    background: '#FEEAFA',
    textColor: '#3E3548'
  },
  coralDawn: {
    name: 'Coral Dawn',
    description: 'Warm coral background with dark accents',
    primary: '#000000',
    secondary: '#403F4C',
    background: '#8A4E49',
    textColor: '#FFFFFF'
  },
  purpleSlate: {
    name: 'Purple Slate',
    description: 'Rich purple-gray for sophisticated sessions',
    primary: '#B8BFFF',
    secondary: '#A8A6B3',
    background: '#6B6977',
    textColor: '#FFFFFF'
  },
  gunmetalGray: {
    name: 'Gunmetal Gray',
    description: 'Industrial aesthetic with coral highlights',
    primary: '#E08B86',
    secondary: '#F5F5F5',
    background: '#403F4C',
    textColor: '#F5F5F5'
  },
  inkBlack: {
    name: 'Ink Black',
    description: 'Pure writer\'s aesthetic with deep blacks',
    primary: '#4A6B85',
    secondary: '#1B2A41',
    background: '#0C1821',
    textColor: '#F0F0F5'
  },
  midnightDepths: {
    name: 'Midnight Depths',
    description: 'Rich deep blue perfect for nighttime writing',
    primary: '#A9A7AD',
    secondary: '#536271',
    background: '#2C3D55',
    textColor: '#E8E8EA'
  },
  midnightSteel: {
    name: 'Midnight Steel',
    description: 'Deep metallic theme with coral energy',
    primary: '#E08B86',
    secondary: '#403F4C',
    background: '#121420',
    textColor: '#F0F0F0'
  }
};

export const getCurrentTheme = () => {
  try {
    return localStorage.getItem('mercurial-theme') || 'midnightSteel';
  } catch {
    return 'midnightSteel';
  }
};

export const initializeTheme = () => {
  const currentTheme = getCurrentTheme();
  const theme = themes[currentTheme] || themes.midnightSteel;

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
  } catch (error) {
    console.error('Failed to apply theme to app element:', error);
  }
  // Mark the document with a data-theme attribute for CSS targeting
  try {
    document.documentElement.setAttribute('data-theme', currentTheme);
  } catch (error) {
    console.error('Failed to set data-theme attribute:', error);
  }
};