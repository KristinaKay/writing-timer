export const themes = {
  // Lightest backgrounds first
  dustyFloralLight: {
    name: '🌸 Light Elegance',
    description: 'Soft warm white with dusty mauve accents',
    primary: '#847577',
    secondary: '#A6A2A2',
    background: '#FBFBF2',
    textColor: '#4A3B3C'
  },
  dustyFloralMist: {
    name: '🌸 Soft Mist',
    description: 'Soft gray base with warm highlights',
    primary: '#847577',
    secondary: '#FBFBF2',
    background: '#E5E6E4',
    textColor: '#3A2F30'
  },
  dustyRose: {
    name: '🌹 Dusty Rose',
    description: 'Warm neutrals with dusty rose highlights',
    primary: '#7D4F50',
    secondary: '#F9EAE1',
    background: 'linear-gradient(135deg, #D1BE9C 0%, #AA998F 100%)',
    textColor: '#5A3B3C'
  },
  dustyFloralNeutral: {
    name: '🌸 Balanced Neutral',
    description: 'Balanced sage-gray with warm accents',
    primary: '#847577',
    secondary: '#FBFBF2',
    background: '#CFD2CD',
    textColor: '#2F2426'
  },
  blackberryCream: {
    name: '🫐 Blackberry Cream',
    description: 'Elegant cream base with rich blackberry accents',
    primary: '#69385C',
    secondary: '#89937C',
    background: '#D3BDB0',
    textColor: '#3C1F25'
  },
  sageGreen: {
    name: '🌿 Sage & Green',
    description: 'Warm sage and cream with natural green highlights',
    primary: '#69385C',
    secondary: '#D3BDB0',
    background: '#89937C',
    textColor: '#2A2F26'
  },
  // Medium backgrounds
  dustyFloralMauve: {
    name: '🌸 Mauve Elegance',
    description: 'Rich dusty mauve with light accents',
    primary: '#E5E6E4',
    secondary: '#A6A2A2',
    background: '#847577',
    textColor: '#FBFBF2'
  },
  darkDustyRose: {
    name: '🌹 Dark Dusty Rose',
    description: 'High contrast with bold dusty rose',
    primary: '#CC8B86',
    secondary: '#D1BE9C',
    background: '#7D4F50',
    textColor: '#F9EAE1'
  },
  // Advanced color palette themes - darkest backgrounds last
  silverMist: {
    name: '🌌 Silver Mist',
    description: 'Elegant silver-gray with professional blue accents',
    primary: '#1F2B3E',
    secondary: '#6A687A',
    background: '#6B6977',
    textColor: '#FFFFFF'
  },
  nebulaBlue: {
    name: '🌌 Nebula Blue',
    description: 'Sophisticated mid-tone with cosmic feel',
    primary: '#B5B3C0',
    secondary: '#6A687A',
    background: '#536271',
    textColor: '#F0F0F2'
  },
  moonlightSilver: {
    name: '🖋️ Moonlight Silver',
    description: 'Clean light theme with ink-inspired contrast',
    primary: '#1B2A41',
    secondary: '#324A5F',
    background: '#CCC9DC',
    textColor: '#0C1821'
  },
  softLavender: {
    name: '💜 Soft Lavender',
    description: 'Gentle pastels perfect for creative writing',
    primary: '#6B7489',
    secondary: '#CBC0D3',
    background: '#FEEAFA',
    textColor: '#3E3548'
  },
  coralDawn: {
    name: '🦞 Coral Dawn',
    description: 'Warm coral background with dark accents',
    primary: '#121420',
    secondary: '#403F4C',
    background: '#8A4E49',
    textColor: '#FFFFFF'
  },
  purpleSlate: {
    name: '💜 Purple Slate',
    description: 'Rich purple-gray for sophisticated sessions',
    primary: '#B4BBFF',
    secondary: '#A8A6B3',
    background: '#6B6977',
    textColor: '#FFFFFF'
  },
  gunmetalGray: {
    name: '🦞 Gunmetal Gray',
    description: 'Industrial aesthetic with coral highlights',
    primary: '#E08B86',
    secondary: '#F5F5F5',
    background: '#403F4C',
    textColor: '#F5F5F5'
  },
  inkBlack: {
    name: '🖋️ Ink Black',
    description: 'Pure writer\'s aesthetic with deep blacks',
    primary: '#4A6B85',
    secondary: '#1B2A41',
    background: '#0C1821',
    textColor: '#F0F0F5'
  },
  midnightDepths: {
    name: '🌌 Midnight Depths',
    description: 'Rich deep blue perfect for nighttime writing',
    primary: '#A5A3A9',
    secondary: '#536271',
    background: '#2C3D55',
    textColor: '#E8E8EA'
  },
  midnightSteel: {
    name: '🦞 Midnight Steel',
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
  } catch {}
  // Mark the document with a data-theme attribute for CSS targeting
  try {
    document.documentElement.setAttribute('data-theme', currentTheme);
  } catch {}
};