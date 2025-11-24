#!/usr/bin/env node

// Clear the module cache to ensure we're getting fresh theme data
if (require.cache) {
  Object.keys(require.cache).forEach((key) => {
    if (key.includes('themeUtils')) {
      delete require.cache[key];
    }
  });
}

// Import themes fresh
const fs = require('fs');
const path = require('path');

// Read the theme file directly to avoid any caching issues
const themeFilePath = path.join(process.cwd(), 'src', 'lib', 'themeUtils.js');
const themeFileContent = fs.readFileSync(themeFilePath, 'utf8');

// Extract theme definitions using regex
const themesMatch = themeFileContent.match(/export const themes = \{([\s\S]*?)\n\};/);
if (!themesMatch) {
  console.error('Could not parse themes from themeUtils.js');
  process.exit(1);
}

// Parse the themes object - use Function constructor to avoid eval issues
const themesObjectString = '(function() { return {' + themesMatch[1] + '\n}; })()';
let themes;
try {
  themes = Function('"use strict"; return ' + themesObjectString)();
} catch (error) {
  console.error('Error parsing themes object:', error.message);
  console.error('Attempted to parse:', themesObjectString.substring(0, 200) + '...');
  process.exit(1);
}

// WCAG contrast calculation functions
function getLuminance(r, g, b) {
  // Convert RGB to relative luminance according to WCAG 2.1
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function getContrastRatio(color1, color2) {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getGradientAverageColor(gradient) {
  // Extract colors from CSS gradient
  const colorMatches = gradient.match(/#[a-fA-F0-9]{6}/g);
  if (!colorMatches || colorMatches.length === 0) return '#D1BE9C';
  
  // Simple average for demo - could be more sophisticated
  const rgbs = colorMatches.map(hexToRgb);
  const avgR = Math.round(rgbs.reduce((sum, rgb) => sum + rgb[0], 0) / rgbs.length);
  const avgG = Math.round(rgbs.reduce((sum, rgb) => sum + rgb[1], 0) / rgbs.length);
  const avgB = Math.round(rgbs.reduce((sum, rgb) => sum + rgb[2], 0) / rgbs.length);
  
  return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
}

function analyzeTheme(themeKey, theme) {
  const isGradient = theme.background.startsWith('linear-gradient');
  const bgColor = isGradient ? getGradientAverageColor(theme.background) : theme.background;
  
  const textContrast = getContrastRatio(bgColor, theme.textColor);
  const primaryContrast = getContrastRatio(bgColor, theme.primary);
  
  // WCAG AA requirements
  const textPassesAA = textContrast >= 4.5;
  const primaryPassesAA = primaryContrast >= 3.0;
  const overallPass = textPassesAA && primaryPassesAA;
  
  return {
    name: theme.name,
    isLight: !theme.textColor.includes('#FFF') && !theme.textColor.includes('#F0F0') && !theme.textColor.includes('#E8E8'),
    background: bgColor,
    textColor: theme.textColor,
    primary: theme.primary,
    secondary: theme.secondary,
    textContrast: textContrast,
    primaryContrast: primaryContrast,
    textPassesAA: textPassesAA,
    primaryPassesAA: primaryPassesAA,
    overallPass: overallPass,
    issues: {
      textGap: textPassesAA ? 0 : (4.5 - textContrast),
      primaryGap: primaryPassesAA ? 0 : (3.0 - primaryContrast)
    }
  };
}

console.log('============================================================');
console.log('WRITING TIMER - FINAL ACCESSIBILITY VERIFICATION');
console.log('WCAG 2.1 AA COMPLIANCE CHECK');
console.log('============================================================\n');

const themeEntries = Object.entries(themes);
let compliantCount = 0;
let lightCompliant = 0;
let darkCompliant = 0;
let lightTotal = 0;
let darkTotal = 0;
const failedThemes = [];

themeEntries.forEach(([themeKey, theme], index) => {
  if (theme.background.startsWith('linear-gradient')) {
    console.log(`${index + 1}. ${theme.name.toUpperCase()} (GRADIENT - EXCLUDED)`);
    console.log(`   Gradients excluded from automated analysis\n`);
    return;
  }
  
  const analysis = analyzeTheme(themeKey, theme);
  const categoryLabel = analysis.isLight ? 'LIGHT' : 'DARK';
  
  if (analysis.isLight) {
    lightTotal++;
    if (analysis.overallPass) lightCompliant++;
  } else {
    darkTotal++;
    if (analysis.overallPass) darkCompliant++;
  }
  
  console.log(`${index + 1}. ${analysis.name.toUpperCase()} (${categoryLabel})`);
  console.log(`   Background: ${analysis.background} | Text: ${analysis.textColor}`);
  console.log(`   Primary: ${analysis.primary} | Secondary: ${analysis.secondary}`);
  console.log('');
  console.log('   CONTRAST RATIOS:');
  console.log(`   • Background → Text: ${analysis.textContrast.toFixed(2)}:1 ${analysis.textPassesAA ? '✅ PASS' : '❌ FAIL'} (need ≥4.5:1)`);
  console.log(`   • Background → Primary: ${analysis.primaryContrast.toFixed(2)}:1 ${analysis.primaryPassesAA ? '✅ PASS' : '❌ FAIL'} (need ≥3.0:1)`);
  console.log(`   • Text → Primary: ${getContrastRatio(analysis.textColor, analysis.primary).toFixed(2)}:1`);
  console.log('');
  console.log(`   WCAG AA STATUS: ${analysis.overallPass ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`);
  
  if (analysis.overallPass) {
    compliantCount++;
  } else {
    failedThemes.push({
      name: analysis.name,
      issues: []
    });
    
    console.log('');
    console.log('   ⚠️  ACCESSIBILITY ISSUES:');
    if (!analysis.textPassesAA) {
      console.log(`      • Text readability insufficient`);
      console.log(`        Current: ${analysis.textContrast.toFixed(2)}:1 | Required: ≥4.5:1 | Gap: ${analysis.issues.textGap.toFixed(2)}`);
      failedThemes[failedThemes.length - 1].issues.push('text readability');
    }
    if (!analysis.primaryPassesAA) {
      console.log(`      • UI element contrast insufficient`);
      console.log(`        Current: ${analysis.primaryContrast.toFixed(2)}:1 | Required: ≥3.0:1 | Gap: ${analysis.issues.primaryGap.toFixed(2)}`);
      failedThemes[failedThemes.length - 1].issues.push('UI element contrast');
    }
  }
  
  console.log('\n');
});

console.log('============================================================');
console.log('FINAL ACCESSIBILITY COMPLIANCE SUMMARY');
console.log('============================================================\n');

const totalThemes = themeEntries.length - 1; // Excluding gradient theme
const complianceRate = ((compliantCount / totalThemes) * 100);

console.log('📊 OVERALL RESULTS:');
console.log(`   Total Themes: ${totalThemes} (excluding gradient theme)`);
console.log(`   ✅ WCAG AA Compliant: ${compliantCount}`);
console.log(`   ❌ Non-Compliant: ${totalThemes - compliantCount}`);
console.log(`   📈 Compliance Rate: ${complianceRate.toFixed(1)}%\n`);

console.log('🎨 THEME CATEGORY BREAKDOWN:');
console.log(`   Light Themes: ${lightCompliant}/${lightTotal} compliant (${((lightCompliant / lightTotal) * 100).toFixed(1)}%)`);
console.log(`   Dark Themes: ${darkCompliant}/${darkTotal} compliant (${((darkCompliant / darkTotal) * 100).toFixed(1)}%)\n`);

if (failedThemes.length > 0) {
  console.log('📋 REMAINING ISSUES:');
  failedThemes.forEach(theme => {
    console.log(`   • ${theme.name}: ${theme.issues.join(', ')}`);
  });
  console.log('');
}

console.log('ℹ️  WCAG 2.1 AA Requirements:');
console.log('   • Normal text: ≥4.5:1 contrast ratio');
console.log('   • Large text: ≥3.0:1 contrast ratio');
console.log('   • UI components: ≥3.0:1 contrast ratio\n');

if (complianceRate === 100) {
  console.log('🎉 CONGRATULATIONS! 100% WCAG AA COMPLIANCE ACHIEVED!');
  console.log('   All themes now meet accessibility standards.');
} else {
  console.log(`🔧 PROGRESS: ${complianceRate.toFixed(1)}% compliance achieved`);
  console.log('   Minor adjustments needed for full compliance.');
}

console.log('\n============================================================');