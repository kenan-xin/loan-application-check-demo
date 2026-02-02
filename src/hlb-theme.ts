import { MantineThemeOverride } from '@mantine/core';

export const hlbTheme: MantineThemeOverride = {
  /** =========================
   *  COLOR SYSTEM
   *  ========================= */
  colors: {
    // Primary corporate navy (#002D62)
    hlbNavy: [
      '#eef3f8',
      '#d5e0ee',
      '#a9c0dd',
      '#7da0cc',
      '#5180bb',
      '#2f5f9a',
      '#1a467f',
      '#0d356b',
      '#002d62', // ← PRIMARY
      '#001f45',
    ],

    // Neutral greys for tables, backgrounds, dividers
    bankGray: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529',
    ],
  },

  primaryColor: 'hlbNavy',
  primaryShade: 8,

  /** =========================
   *  TYPOGRAPHY
   *  ========================= */
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '22px' },
      h2: { fontSize: '18px' },
      h3: { fontSize: '16px' },
    },
  },

  /** =========================
   *  LAYOUT FEEL
   *  ========================= */
  spacing: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '28px',
  },

  radius: {
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '10px',
  },

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.04)',
    sm: '0 1px 4px rgba(0,0,0,0.06)',
    md: '0 2px 8px rgba(0,0,0,0.08)',
    lg: '0 4px 12px rgba(0,0,0,0.10)',
    xl: '0 8px 24px rgba(0,0,0,0.12)',
  },

  /** =========================
   *  COMPONENT OVERRIDES
   *  ========================= */
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
        size: 'sm',
      },
      styles: () => ({
        root: {
          fontWeight: 500,
        },
      }),
    },

    Card: {
      defaultProps: {
        radius: 'sm',
        shadow: 'xs',
        withBorder: true,
      },
      styles: () => ({
        root: {
          borderColor: 'light-dark(var(--mantine-color-bankGray-2), var(--mantine-color-bankGray-7))',
          backgroundColor: 'light-dark(#ffffff, var(--mantine-color-bankGray-9))',
        },
      }),
    },

    Table: {
      styles: () => ({
        th: {
          backgroundColor: 'light-dark(var(--mantine-color-bankGray-1), var(--mantine-color-bankGray-9))',
          fontWeight: 600,
          fontSize: 12,
          color: 'light-dark(var(--mantine-color-bankGray-8), var(--mantine-color-bankGray-2))',
        },
        td: {
          fontSize: 13,
        },
        tr: {
          '&:not(:last-of-type)': {
            borderBottomColor: 'light-dark(var(--mantine-color-bankGray-2), var(--mantine-color-bankGray-8))',
          },
        },
      }),
    },

    Input: {
      defaultProps: {
        radius: 'sm',
      },
    },

    Badge: {
      styles: () => ({
        root: {
          fontWeight: 500,
        },
      }),
    },
  },
};
