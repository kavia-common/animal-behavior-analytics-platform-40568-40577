module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VizAI application palette (single source of truth) - STRICT
        // Primary #2C5F9A, Secondary #20B2AA, Accent #FF6B35,
        // Neutral Light #F5F5F5, Neutral Dark #333333,
        // Success #4CAF50, Warning #FFC107, Error #F44336
        primary: '#2C5F9A',
        secondary: '#20B2AA',
        accent: '#FF6B35',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        background: '#F5F5F5',  // Neutral Light
        surface: '#FFFFFF',
        text: '#333333',        // Neutral Dark
        border: '#E0E0E0',      // Derived neutral border to match Neutral Light
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#CCCCCC',
          500: '#777777',
          700: '#4D4D4D',
          900: '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)',
        soft: '0 3px 6px rgba(0,0,0,0.08), 0 3px 3px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
