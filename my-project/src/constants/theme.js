// Design System Constants based on html_simen theme

export const colors = {
  // Primary Colors
  primary: '#e34444',
  primaryDark: '#a81919',
  primaryHover: '#a81919',

  // Background Colors
  white: '#ffffff',
  lightGray: '#ededed',
  borderGray: '#eaeaea',
  borderLight: '#e9e9e9',

  // Text Colors
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#dfdfdf',
  textMuted: '#cacaca',

  // Icon Colors
  iconGray: '#cccccc',

  // Accent Colors
  blueAccent: '#5492db',
  darkBg: '#2f2f2f',
  darkSeparator: '#393939',
  brightRed: '#ff1616',
};

export const typography = {
  fontFamily: "'Poppins', sans-serif",
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  fontSizes: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
  },
  lineHeights: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },
};

export const spacing = {
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '30px',
  xxl: '55px',
};

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};

export const transitions = {
  default: 'all 0.3s ease-out',
  fast: 'all 0.2s ease-out',
  opacity: 'opacity 0.3s ease-out',
};

export const borders = {
  default: `1px solid ${colors.borderGray}`,
  light: `1px solid ${colors.borderLight}`,
  strong: `1px solid ${colors.darkSeparator}`,
};
