import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { AllNotifications } from './pages/AllNotifications';
import { PriorityInbox } from './pages/PriorityInbox';

const NavButtons = () => {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button 
        component={Link} 
        to="/" 
        sx={{ 
          color: location.pathname === '/' ? '#fff' : 'rgba(255,255,255,0.5)',
          borderBottom: location.pathname === '/' ? '2px solid #ec4899' : '2px solid transparent',
          borderRadius: 0,
          px: 2,
          pb: 1,
          pt: 1.5,
          transition: 'all 0.3s'
        }}
      >
        All Notifications
      </Button>
      <Button 
        component={Link} 
        to="/priority" 
        sx={{ 
          color: location.pathname === '/priority' ? '#fff' : 'rgba(255,255,255,0.5)',
          borderBottom: location.pathname === '/priority' ? '2px solid #ec4899' : '2px solid transparent',
          borderRadius: 0,
          px: 2,
          pb: 1,
          pt: 1.5,
          transition: 'all 0.3s'
        }}
      >
        Priority Inbox
      </Button>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a)',
        pt: 12,
        pb: 6
      }}>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.5, color: '#fff' }}>
                Campus<Box component="span" sx={{ color: '#ec4899' }}>Notify</Box>
              </Typography>
              <NavButtons />
            </Toolbar>
          </Container>
        </AppBar>
        
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
