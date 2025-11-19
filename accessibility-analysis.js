// WCAG AA Accessibility Analysis for New Themes
// This script calculates contrast ratios and compliance status

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
    
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

// Theme definitions
const themes = [
    { name: "Silver Mist", background: "#84828F", text: "#FFFFFF", primary: "#2C3D55" },
    { name: "Nebula Blue", background: "#536271", text: "#F0F0F2", primary: "#84828F" },
    { name: "Moonlight Silver", background: "#CCC9DC", text: "#0C1821", primary: "#1B2A41" },
    { name: "Soft Lavender", background: "#FEEAFA", text: "#3E3548", primary: "#8E9AAF" },
    { name: "Coral Dawn", background: "#B76D68", text: "#FFFFFF", primary: "#121420" },
    { name: "Purple Slate", background: "#8E9AAF", text: "#FEEAFA", primary: "#DEE2FF" },
    { name: "Gunmetal Gray", background: "#403F4C", text: "#F5F5F5", primary: "#B76D68" },
    { name: "Ink Black", background: "#0C1821", text: "#F0F0F5", primary: "#324A5F" },
    { name: "Midnight Depths", background: "#2C3D55", text: "#E8E8EA", primary: "#84828F" },
    { name: "Midnight Steel", background: "#121420", text: "#F0F0F0", primary: "#B76D68" }
];

// Analyze all themes
console.log("WCAG AA ACCESSIBILITY ANALYSIS RESULTS");
console.log("=====================================\n");

themes.forEach((theme, index) => {
    const bgToTextRatio = getContrastRatio(theme.background, theme.text);
    const bgToPrimaryRatio = getContrastRatio(theme.background, theme.primary);
    const textToPrimaryRatio = getContrastRatio(theme.text, theme.primary);
    
    const textCompliant = bgToTextRatio >= 4.5;
    const primaryCompliant = bgToPrimaryRatio >= 3.0;
    const overallCompliant = textCompliant && primaryCompliant;
    
    console.log(`${index + 1}. ${theme.name.toUpperCase()}`);
    console.log(`   Colors: BG ${theme.background} | Text ${theme.text} | Primary ${theme.primary}`);
    console.log(`   Background to Text: ${bgToTextRatio.toFixed(2)}:1 ${textCompliant ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`   Background to Primary: ${bgToPrimaryRatio.toFixed(2)}:1 ${primaryCompliant ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`   Text to Primary: ${textToPrimaryRatio.toFixed(2)}:1`);
    console.log(`   WCAG AA Compliance: ${overallCompliant ? '✓ PASS' : '✗ FAIL'}`);
    
    if (!overallCompliant) {
        console.log(`   Issues:`);
        if (!textCompliant) {
            console.log(`   - Text contrast insufficient (need ≥4.5:1, got ${bgToTextRatio.toFixed(2)}:1)`);
        }
        if (!primaryCompliant) {
            console.log(`   - Primary color contrast insufficient (need ≥3.0:1, got ${bgToPrimaryRatio.toFixed(2)}:1)`);
        }
    }
    
    console.log("");
});

// Summary
const passCount = themes.filter(theme => {
    const bgToTextRatio = getContrastRatio(theme.background, theme.text);
    const bgToPrimaryRatio = getContrastRatio(theme.background, theme.primary);
    return bgToTextRatio >= 4.5 && bgToPrimaryRatio >= 3.0;
}).length;

console.log("SUMMARY");
console.log("=======");
console.log(`Themes passing WCAG AA: ${passCount}/${themes.length}`);
console.log(`Pass rate: ${((passCount / themes.length) * 100).toFixed(1)}%`);