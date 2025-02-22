import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './pages/Home';
import TaskHistory from './pages/TaskHistory';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>To-Do App</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/history">Task History</Button>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Toolbar>
      </AppBar>
      <Container><Routes><Route path="/" element={<Home />} /><Route path="/history" element={<TaskHistory />} /></Routes></Container>
    </div>
  );
}

export default App;
