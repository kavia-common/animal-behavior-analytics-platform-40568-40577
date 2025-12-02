module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VizAI application palette (single source of truth)
        primary: '#2C5F9A',
        secondary: '#20B2AA',
        accent: '#FF6B35',
        neutral: {
          50: '#F5F5F5',
          900: '#333333',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        soft: '0 1px 4px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
