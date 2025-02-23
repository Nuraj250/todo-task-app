import React, { useState, useEffect } from 'react';
import { getCompletedTasks } from '../api';
import { Container, List, ListItem, ListItemText } from '@mui/material';

function TaskHistory() {
  const [completedTasks, setCompletedTasks] = useState([]);

  const categoryColors = {
    Work: '#FFD700',  // Gold
    Personal: '#FF69B4',  // Pink
    Urgent: '#FF4500'  // Orange Red
  };
  useEffect(() => { fetchCompletedTasks(); }, []);

  const fetchCompletedTasks = async () => { setCompletedTasks(await getCompletedTasks()); };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Task History</h1>
      <List>{completedTasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{ backgroundColor: categoryColors[task.category] || '#fff', marginBottom: '10px', borderRadius: '5px' }}
        >
          <ListItemText
            primary={task.title}
            secondary={`Category: ${task.category} | Completed on: ${task.completed_date}`}
          />
        </ListItem>))}</List>
    </Container>
  );
}

export default TaskHistory;
