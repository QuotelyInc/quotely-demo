/**
 * Quotely Brand Colors System
 * Extracted from brand guidelines and visual identity
 */

export const brandColors = {
  // Primary Brand Colors
  primary: {
    white: '#ffffff',        // Pure white for backgrounds and text contrast
    deepPurple: '#413970',   // Deep Purple/Navy - hero backgrounds, nav bar
    mediumPurple: '#6b61ad', // Medium Purple - gradients, section fills
    darkIndigo: '#40386f',   // Dark Indigo - shadows, secondary dark UI
    mutedViolet: '#746bb2',  // Muted Violet - secondary gradients, accents
  },
  
  // Neutral Colors
  neutral: {
    offWhite: '#f9f9f8',     // Off-White - content backgrounds
    lightGrayLavender: '#eae9f0', // Light Gray-Lavender - dividers, subtle backgrounds
    veryLightGray: '#f7f7f7', // Very Light Gray - secondary background areas
  },
  
  // Semantic Colors (derived from brand palette)
  semantic: {
    success: '#10b981',      // Green for success states
    warning: '#f59e0b',      // Amber for warnings
    error: '#ef4444',        // Red for errors
    info: '#6b61ad',         // Using medium purple for info
  },
  
  // Text Colors
  text: {
    primary: '#1f2937',      // Dark gray for primary text
    secondary: '#4b5563',    // Medium gray for secondary text
    inverse: '#ffffff',      // White text on dark backgrounds
    muted: '#9ca3af',        // Light gray for muted text
  },
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #413970 0%, #6b61ad 50%, #746bb2 100%)',
    heroRadial: 'radial-gradient(circle at top right, #746bb2 0%, #413970 70%)',
    surface: 'linear-gradient(180deg, #ffffff 0%, #f9f9f8 100%)',
    card: 'linear-gradient(135deg, #f9f9f8 0%, #eae9f0 100%)',
    button: 'linear-gradient(135deg, #6b61ad 0%, #413970 100%)',
    buttonHover: 'linear-gradient(135deg, #746bb2 0%, #40386f 100%)',
  },
  
  // Shadows (using brand colors)
  shadows: {
    sm: '0 1px 2px 0 rgba(65, 57, 112, 0.05)',
    md: '0 4px 6px -1px rgba(65, 57, 112, 0.1), 0 2px 4px -1px rgba(65, 57, 112, 0.06)',
    lg: '0 10px 15px -3px rgba(65, 57, 112, 0.1), 0 4px 6px -2px rgba(65, 57, 112, 0.05)',
    xl: '0 20px 25px -5px rgba(65, 57, 112, 0.15), 0 10px 10px -5px rgba(65, 57, 112, 0.04)',
    '2xl': '0 25px 50px -12px rgba(65, 57, 112, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(65, 57, 112, 0.06)',
  },
  
  // Opacity variants
  opacity: {
    deepPurple: {
      5: 'rgba(65, 57, 112, 0.05)',
      10: 'rgba(65, 57, 112, 0.1)',
      20: 'rgba(65, 57, 112, 0.2)',
      30: 'rgba(65, 57, 112, 0.3)',
      40: 'rgba(65, 57, 112, 0.4)',
      50: 'rgba(65, 57, 112, 0.5)',
      60: 'rgba(65, 57, 112, 0.6)',
      70: 'rgba(65, 57, 112, 0.7)',
      80: 'rgba(65, 57, 112, 0.8)',
      90: 'rgba(65, 57, 112, 0.9)',
    },
    mediumPurple: {
      5: 'rgba(107, 97, 173, 0.05)',
      10: 'rgba(107, 97, 173, 0.1)',
      20: 'rgba(107, 97, 173, 0.2)',
      30: 'rgba(107, 97, 173, 0.3)',
      40: 'rgba(107, 97, 173, 0.4)',
      50: 'rgba(107, 97, 173, 0.5)',
      60: 'rgba(107, 97, 173, 0.6)',
      70: 'rgba(107, 97, 173, 0.7)',
      80: 'rgba(107, 97, 173, 0.8)',
      90: 'rgba(107, 97, 173, 0.9)',
    },
  },
};

// Tailwind color palette format
export const tailwindColors = {
  'brand-white': brandColors.primary.white,
  'brand-deep-purple': brandColors.primary.deepPurple,
  'brand-medium-purple': brandColors.primary.mediumPurple,
  'brand-dark-indigo': brandColors.primary.darkIndigo,
  'brand-muted-violet': brandColors.primary.mutedViolet,
  'brand-off-white': brandColors.neutral.offWhite,
  'brand-gray-lavender': brandColors.neutral.lightGrayLavender,
  'brand-light-gray': brandColors.neutral.veryLightGray,
};

// CSS custom properties
export const cssVariables = `
  :root {
    /* Primary Colors */
    --color-brand-white: ${brandColors.primary.white};
    --color-brand-deep-purple: ${brandColors.primary.deepPurple};
    --color-brand-medium-purple: ${brandColors.primary.mediumPurple};
    --color-brand-dark-indigo: ${brandColors.primary.darkIndigo};
    --color-brand-muted-violet: ${brandColors.primary.mutedViolet};
    
    /* Neutral Colors */
    --color-brand-off-white: ${brandColors.neutral.offWhite};
    --color-brand-gray-lavender: ${brandColors.neutral.lightGrayLavender};
    --color-brand-light-gray: ${brandColors.neutral.veryLightGray};
    
    /* Gradients */
    --gradient-hero: ${brandColors.gradients.hero};
    --gradient-hero-radial: ${brandColors.gradients.heroRadial};
    --gradient-surface: ${brandColors.gradients.surface};
    --gradient-card: ${brandColors.gradients.card};
    --gradient-button: ${brandColors.gradients.button};
    --gradient-button-hover: ${brandColors.gradients.buttonHover};
    
    /* Shadows */
    --shadow-sm: ${brandColors.shadows.sm};
    --shadow-md: ${brandColors.shadows.md};
    --shadow-lg: ${brandColors.shadows.lg};
    --shadow-xl: ${brandColors.shadows.xl};
    --shadow-2xl: ${brandColors.shadows['2xl']};
    --shadow-inner: ${brandColors.shadows.inner};
  }
`;

// Color utility functions
export const getContrastColor = (hexColor: string): string => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white or dark purple based on luminance
  return luminance > 0.5 ? brandColors.primary.deepPurple : brandColors.primary.white;
};

// Export color scheme for components
export default brandColors;