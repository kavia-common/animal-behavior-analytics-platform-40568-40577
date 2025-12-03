module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primary600: 'var(--color-primary-600)',
        secondary: 'var(--color-secondary)',
        error: 'var(--color-error)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        textMuted: 'var(--color-text-muted)',
        border: 'var(--color-border)',
        sidebarActiveBg: 'var(--color-sidebar-active-bg)',
        tableHeaderBg: 'var(--color-table-header-bg)',
        tableRowHover: 'var(--color-table-row-hover)',
        logoutHoverBg: 'var(--color-logout-hover-bg)',
        logoutText: 'var(--color-logout-text)',
        exportGreen: 'var(--color-export-green)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-soft)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};
