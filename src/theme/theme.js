import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50', // The green color from the design
    },
    background: {
      default: '#1E1E1E',
      paper: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#4CAF50',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#4CAF50',
        },
      },
    },
  },
}); 