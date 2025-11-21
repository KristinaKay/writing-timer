// Current Themes WCAG AA Accessibility Analysis
// This script tests all current themes from themeUtils.js

// Function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Function to calculate relative luminance
function getLuminance(rgb) {
    const { r, g, b } = rgb;
    
    // Convert to 0-1 range
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;
    
    // Apply gamma correction
    const rLin = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const gLin = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const bLin = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

// Function to calculate contrast ratio
function getContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return null;
    
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

// Current theme definitions (from themeUtils.js)
const currentThemes = [
    // Light themes
    { name: "Light Elegance", background: "#FBFBF2", text: "#4A3B3C", primary: "#847577", secondary: "#A6A2A2" },
    { name: "Soft Mist", background: "#E5E6E4", text: "#3A2F30", primary: "#847577", secondary: "#FBFBF2" },
    { name: "Dusty Rose", background: "#D1BE9C", text: "#5A3B3C", primary: "#7D4F50", secondary: "#F9EAE1" }, // Using mid-point of gradient
    { name: "Balanced Neutral", background: "#CFD2CD", text: "#2F2426", primary: "#847577", secondary: "#FBFBF2" },
    { name: "Blackberry Cream", background: "#D3BDB0", text: "#3C1F25", primary: "#69385C", secondary: "#89937C" },
    { name: "Sage & Green", background: "#89937C", text: "#2A2F26", primary: "#69385C", secondary: "#D3BDB0" },
    { name: "Moonlight Silver", background: "#CCC9DC", text: "#0C1821", primary: "#1B2A41", secondary: "#324A5F" },
    { name: "Soft Lavender", background: "#FEEAFA", text: "#3E3548", primary: "#6B7489", secondary: "#CBC0D3" },
    { name: "Dusty Floral Mauve", background: "#B2A4B7", text: "#2C2329", primary: "#4A1B3F", secondary: "#FFFEFB" },
    
    // Dark themes
    { name: "Coral Dawn", background: "#8A4E49", text: "#FFFFFF", primary: "#121420", secondary: "#403F4C" },
    { name: "Dark Dusty Rose", background: "#7D4F50", text: "#FFFFFF", primary: "#F9EAE1", secondary: "#D1BE9C" },
    { name: "Silver Mist", background: "#536271", text: "#F0F0F2", primary: "#B5B3C0", secondary: "#6A687A" },
    { name: "Purple Slate", background: "#6B6977", text: "#FFFFFF", primary: "#B4BBFF", secondary: "#A8A6B3" },
    { name: "Nebula Blue", background: "#536271", text: "#F0F0F2", primary: "#B5B3C0", secondary: "#6A687A" },
    { name: "Gunmetal Gray", background: "#403F4C", text: "#F5F5F5", primary: "#E08B86", secondary: "#F5F5F5" },
    { name: "Midnight Depths", background: "#2C3D55", text: "#E8E8EA", primary: "#84828F", secondary: "#B5B3C0" },
    { name: "Midnight Steel", background: "#121420", text: "#F0F0F0", primary: "#4A6B85", secondary: "#1B2A41" },
    { name: "Ink Black", background: "#0C1821", text: "#F0F0F5", primary: "#4A6B85", secondary: "#1B2A41" },
];

// Analyze all themes
console.log("=".repeat(60));
console.log("WRITING TIMER - CURRENT THEMES ACCESSIBILITY ANALYSIS");
console.log("WCAG 2.1 AA COMPLIANCE CHECK");
console.log("=".repeat(60));
console.log("");

let passCount = 0;
let lightThemePass = 0;
let darkThemePass = 0;
let lightThemeTotal = 9;
let darkThemeTotal = 9;

currentThemes.forEach((theme, index) => {
    const bgToTextRatio = getContrastRatio(theme.background, theme.text);
    const bgToPrimaryRatio = getContrastRatio(theme.background, theme.primary);
    const textToPrimaryRatio = getContrastRatio(theme.text, theme.primary);
    
    if (!bgToTextRatio) {
        console.log(`${index + 1}. ${theme.name.toUpperCase()} - SKIPPED (gradient background)`);
        console.log("");
        return;
    }
    
    const textCompliant = bgToTextRatio >= 4.5;
    const primaryCompliant = bgToPrimaryRatio >= 3.0;
    const overallCompliant = textCompliant && primaryCompliant;
    
    const isLightTheme = index < 9;
    
    if (overallCompliant) {
        passCount++;
        if (isLightTheme) lightThemePass++;
        else darkThemePass++;
    }
    
    console.log(`${index + 1}. ${theme.name.toUpperCase()} ${isLightTheme ? '(LIGHT)' : '(DARK)'}`);
    console.log(`   Background: ${theme.background} | Text: ${theme.text}`);
    console.log(`   Primary: ${theme.primary} | Secondary: ${theme.secondary}`);
    console.log(`   
   CONTRAST RATIOS:`);
    console.log(`   • Background → Text: ${bgToTextRatio.toFixed(2)}:1 ${textCompliant ? '✅ PASS' : '❌ FAIL'} (need ≥4.5:1)`);
    console.log(`   • Background → Primary: ${bgToPrimaryRatio.toFixed(2)}:1 ${primaryCompliant ? '✅ PASS' : '❌ FAIL'} (need ≥3.0:1)`);
    console.log(`   • Text → Primary: ${textToPrimaryRatio.toFixed(2)}:1`);
    console.log(`   
   WCAG AA STATUS: ${overallCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`);
    
    if (!overallCompliant) {
        console.log(`   
   ⚠️  ACCESSIBILITY ISSUES:`);
        if (!textCompliant) {
            console.log(`      • Text readability insufficient`);
            console.log(`        Current: ${bgToTextRatio.toFixed(2)}:1 | Required: ≥4.5:1 | Gap: ${(4.5 - bgToTextRatio).toFixed(2)}`);
        }
        if (!primaryCompliant) {
            console.log(`      • UI element contrast insufficient`);
            console.log(`        Current: ${bgToPrimaryRatio.toFixed(2)}:1 | Required: ≥3.0:1 | Gap: ${(3.0 - bgToPrimaryRatio).toFixed(2)}`);
        }
    }
    
    console.log("");
});

// Summary Report
console.log("=".repeat(60));
console.log("ACCESSIBILITY COMPLIANCE SUMMARY");
console.log("=".repeat(60));
console.log("");

console.log("📊 OVERALL RESULTS:");
console.log(`   Total Themes: ${currentThemes.length - 1} (excluding gradient theme)`);
console.log(`   ✅ WCAG AA Compliant: ${passCount}`);
console.log(`   ❌ Non-Compliant: ${currentThemes.length - 1 - passCount}`);
console.log(`   📈 Compliance Rate: ${((passCount / (currentThemes.length - 1)) * 100).toFixed(1)}%`);
console.log("");

console.log("🎨 THEME CATEGORY BREAKDOWN:");
console.log(`   Light Themes: ${lightThemePass}/${lightThemeTotal} compliant (${((lightThemePass/lightThemeTotal)*100).toFixed(1)}%)`);
console.log(`   Dark Themes: ${darkThemePass}/${darkThemeTotal} compliant (${((darkThemePass/darkThemeTotal)*100).toFixed(1)}%)`);
console.log("");

console.log("📋 RECOMMENDATIONS:");
if (passCount < currentThemes.length - 1) {
    console.log("   • Review and adjust color contrasts for failing themes");
    console.log("   • Consider darker text colors for light backgrounds");
    console.log("   • Consider lighter primary colors for better contrast");
    console.log("   • Test with actual users who have visual impairments");
} else {
    console.log("   🎉 All themes pass WCAG AA! Excellent accessibility coverage.");
}

console.log("");
console.log("ℹ️  WCAG 2.1 AA Requirements:");
console.log("   • Normal text: ≥4.5:1 contrast ratio");
console.log("   • Large text: ≥3.0:1 contrast ratio");
console.log("   • UI components: ≥3.0:1 contrast ratio");
console.log("");
console.log("=".repeat(60));