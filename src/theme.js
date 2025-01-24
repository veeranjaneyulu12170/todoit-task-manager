import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#97F69B',
    },
    background: {
      default: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
      paper: mode === 'dark' ? '#232323' : '#F5F5F5',
      navbar: mode === 'dark' ? '#242424' : '#FFFFFF',
      sidebar: mode === 'dark' ? '#232323' : '#F5F5F5',
      card: mode === 'dark' ? '#2C2C2C' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#000000',
      secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    action: {
      hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      selected: mode === 'dark' ? 'rgba(151, 246, 155, 0.2)' : 'rgba(151, 246, 155, 0.2)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
          color: mode === 'dark' ? '#FFFFFF' : '#000000',
        },
      },
    },
  },
}); 