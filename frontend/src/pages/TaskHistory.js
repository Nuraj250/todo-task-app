import React, { useState, useEffect } from 'react';
import { getCompletedTasks } from '../api';
import { Container, List, ListItem, ListItemText } from '@mui/material';

function TaskHistory() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => { fetchCompletedTasks(); }, []);

  const fetchCompletedTasks = async () => { setCompletedTasks(await getCompletedTasks()); };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Task History</h1>
      <List>{completedTasks.map((task) => (
        <ListItem key={task.id}><ListItemText primary={task.title} secondary={task.description} /></ListItem>
      ))}</List>
    </Container>
  );
}

export default TaskHistory;
