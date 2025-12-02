module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VizAI application palette (single source of truth)
        primary: '#2C5F9A',      // Primary
        secondary: '#20B2AA',    // Secondary
        accent: '#FF6B35',       // Accent
        neutral: {
          50: '#F5F5F5',         // Neutral Light
          900: '#333333',        // Neutral Dark
        },
        success: '#4CAF50',      // Success
        warning: '#FFC107',      // Warning
        error: '#F44336',        // Error
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
