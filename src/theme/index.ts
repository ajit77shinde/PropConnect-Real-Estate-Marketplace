import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0B3D5C',
      light: '#1A5F85',
      dark: '#072A40',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C45C26',
      light: '#E07A45',
      dark: '#9A4318',
      contrastText: '#FFFFFF',
    },
    success: { main: '#1B7A4E' },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#12263A',
      secondary: '#5A6B7B',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: 'none' },
        contained: {
          '&:hover': { boxShadow: '0 4px 14px rgba(11, 61, 92, 0.25)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(18, 38, 58, 0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 1px 0 #E2E8F0' },
      },
    },
  },
});
