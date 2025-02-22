import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function TaskHistory() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed`);
    setCompletedTasks(response.data);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Task History</h1>
      <List>
        {completedTasks.length === 0 ? (
          <p>No completed tasks yet.</p>
        ) : (
          completedTasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText primary={task.title} secondary={task.description} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

export default TaskHistory;
