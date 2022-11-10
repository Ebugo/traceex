import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { StylesProvider, ThemeProvider } from '@mui/styles';

import { ReactNode, CSSProperties, FC } from 'react';

// ALLOW CUSTOM THEME VARIABLES
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      borderRadius: CSSProperties['borderRadius'];
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      borderRadius?: string;
    };
  }

  interface TypographyVariants {
    details: CSSProperties;
    title: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    details?: CSSProperties;
    title?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    details: true;
    title: true;
  }
}

const defaultBgColor = '#F9FAFB';
const primaryColor = '#4E903C';

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Basier Circle',
      'Oxygen',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
          shadow: 'none',
        },
        sizeMedium: {
          paddingBlock: '12px',
          paddingInline: '32px',
          gap: '10px',
          borderRadius: '6px',
          fontSize: '1rem',
          lineHeight: '30px',
        },
        sizeSmall: {
          borderRadius: '6px',
          fontSize: '0.875rem',
          lineHeight: '30px',
          paddingInline: '10px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: primaryColor,
            color: '#FFFFFF',
          },
        },
        containedSecondary: {
          color: '#636366',
          '&:hover': {
            backgroundColor: '#F0F0F0',
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          height: '42px',
          padding: '5px',
          borderRadius: '7px',
        },
        grouped: {
          '&:not(:last-of-type)': {
            border: 'unset',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#636366',
          borderRadius: '8px',
          border: '1px solid #D9DBE1',
          outline: 'none',
          fontWeight: 400,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 'unset',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'unset',
          backgroundColor: defaultBgColor,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          td: {
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          td: {
            backgroundColor: defaultBgColor,
          },
          tr: { backgroundColor: 'white' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(196, 196, 196, 0.2)',
          fontSize: '0.875rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          display: 'inline-flex',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '24px',
          marginBottom: '0.5rem',
          color: '#111111',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          width: '32px',
          height: '32px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: '24px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: 'inherit',
        },
        root: {
          maxWidth: 'inherit',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
  custom: {
    borderRadius: '8px',
  },
});

// PALETTES
theme.palette.mode = 'light';

theme.palette.primary.main = primaryColor;
theme.palette.primary.light = '#F9FAFB';

theme.palette.error.main = '#F34040';
theme.palette.error.light = 'rgba(243, 64, 64, 0.2)';

theme.palette.secondary.main = '#908F8F';
theme.palette.secondary.light = '#F0F0F0';

theme.palette.success.main = '#38CB89';

theme.palette.warning.main = '#F9A31B';

theme.palette.text.primary = '#111111';
theme.palette.text.secondary = '#636366';

theme.palette.background.default = defaultBgColor;

// TYPOGRAPHY

theme.typography.h4 = {
  ...theme.typography.h4,
  fontSize: '1.5rem',
  fontWeight: 500,
  lineHeight: '32px',
};

theme.typography.h5 = {
  ...theme.typography.h4,
  fontSize: '1.125rem',
  fontWeight: 500,
  lineHeight: '30px',
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontSize: '1.125rem',
  lineHeight: '30px',
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontSize: '1rem',
  lineHeight: '30px',
  letterSpacing: '2%',
};

theme.typography.caption = {
  ...theme.typography.caption,
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '30px',
  color: theme.palette.text.secondary,
};

theme.typography.details = {
  ...theme.typography.caption,
  fontWeight: 400,
  fontSize: '0.875rem',
  lineHeight: '24px',
};

theme.typography.title = {
  ...theme.typography.h4,
  fontSize: '1.75rem',
  lineHeight: '40px',
};

const ThemeConfiguration: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default ThemeConfiguration;
