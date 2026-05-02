import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed', // vibrant purple
      light: '#8b5cf6',
      dark: '#5b21b6',
    },
    secondary: {
      main: '#ec4899', // pink
    },
    background: {
      default: '#0f172a', // slate 900
      paper: '#1e293b',   // slate 800
    },
    success: {
      main: '#10b981', // emerald
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    }
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h4: {
      fontWeight: 700,
      background: '-webkit-linear-gradient(45deg, #7c3aed 30%, #ec4899 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        }
      }
    }
  }
});

// Inject Google font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
