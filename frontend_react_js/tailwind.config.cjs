module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VizAI application palette (single source of truth) - UPDATED
        primary: '#1E3A8A',      // Deep blue
        secondary: '#F59E0B',    // Amber
        success: '#059669',      // Emerald
        error: '#DC2626',        // Red
        background: '#F3F4F6',   // Gray-100
        surface: '#FFFFFF',      // White
        text: '#111827',         // Gray-900
        border: '#E5E7EB',       // Gray-200
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          900: '#111827',
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
