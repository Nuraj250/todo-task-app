import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './pages/Home';
import TaskHistory from './pages/TaskHistory';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            To-Do App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/history">Task History</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<TaskHistory />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
