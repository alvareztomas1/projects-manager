import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

type ThemeProp = {
  children: JSX.Element;
};

export enum themePalette {
  BG = '#0F1C2E',
  BG_2 = '#1f2b3e',
  PRIMARY = '#acc2ef',
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
