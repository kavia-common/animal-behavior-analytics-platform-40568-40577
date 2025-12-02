module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Application palette
        primary: '#2C5F9A',     // main highlights, key interface elements
        secondary: '#20B2AA',   // supportive/nature accents
        accent: '#FF6B35',      // alerts, highlights, important actions
        neutral: {
          50: '#F5F5F5',        // Neutral Light (backgrounds)
          900: '#333333'        // Neutral Dark (text/dividers)
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        soft: '0 1px 4px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};
