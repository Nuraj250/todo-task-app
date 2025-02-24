import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Switch } from '@mui/material';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import TaskHistory from './pages/TaskHistory';

function App() {
  // Dark Mode State (Controls theme mode)
  const [darkMode, setDarkMode] = useState(false);

  // Create Material-UI theme based on dark mode state
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures proper theming and resets default styles */}
      <ToastContainer position="top-right" autoClose={3000} /> {/* Notification container for toast messages */}

      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            To-Do App
          </Typography>

          {/* Navigation Links */}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/history">Task History</Button>

          {/* Dark Mode Toggle Switch */}
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Route for Task History Page */}
          <Route path="/history" element={<TaskHistory />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
