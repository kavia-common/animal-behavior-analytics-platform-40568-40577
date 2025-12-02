module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Centralized palette mapped to CSS variables
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        primaryLight: 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        secondaryText: 'var(--color-secondary-text)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        neutralDark: 'var(--color-neutral-dark)',
        neutralMid: 'var(--color-neutral-mid)',
        neutralBorder: 'var(--color-neutral-border)',
        neutralLightBg: 'var(--color-neutral-light-bg)',
        surface: 'var(--color-surface-bg)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        sidebarActiveBg: 'var(--color-sidebar-active-bg)',
        sidebarIcon: 'var(--color-sidebar-icon)',
        cardBg: 'var(--color-card-bg)',
        progressBar: 'var(--color-progress-bar)',
        highlightMint: 'var(--color-highlight-mint)',
        tableHeaderBg: 'var(--color-table-header-bg)',
        tableRowHover: 'var(--color-table-row-hover)',
        // keep neutral scale for existing utility usage
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: 'var(--color-neutral-border)',
          300: '#CBD5E1',
          500: 'var(--color-neutral-mid)',
          700: '#334155',
          900: 'var(--color-neutral-dark)',
        },
      },
      boxShadow: {
        card: 'var(--elevation-1)',
        soft: 'var(--elevation-2)',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
