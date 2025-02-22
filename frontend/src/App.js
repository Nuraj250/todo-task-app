import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Home from './pages/Home';
import TaskHistory from './pages/TaskHistory';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>To-Do App</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/history">Task History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<TaskHistory />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
