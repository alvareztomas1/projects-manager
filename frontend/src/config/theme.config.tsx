import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

type ThemeProp = {
  children: JSX.Element;
};

export enum themePalette {
  BG = '#0F1C2E',
  BG_2 = '#1f2b3e',
  PRIMARY = '#acc2ef',
  LIGHT_PRIMARY = '#cee8ff',
  FONT_GLOBAL = 'Roboto',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themePalette.BG,
    },
    primary: {
      main: themePalette.PRIMARY,
    },

    info: {
      main: themePalette.LIGHT_PRIMARY,
    },
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '5px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlinedError: {
          backgroundColor: '#1c0303',
          borderColor: '#660000',
        },
        outlinedSuccess: {
          backgroundColor: '#015201',
        },
        outlinedInfo: {
          backgroundColor: '#4d648d',
        },
        outlinedWarning: {
          backgroundColor: '#3b3b00',
        },
      },
    },
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
