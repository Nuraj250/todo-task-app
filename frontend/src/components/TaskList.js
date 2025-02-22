import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShareIcon from '@mui/icons-material/Share';

function TaskList({ tasks, onComplete }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ backgroundColor: new Date(task.dueDate) < new Date() ? 'red' : 'white' }}>
          <ListItemText primary={task.title} secondary={`Due: ${task.dueDate} - ${task.category}`} />
          <IconButton color="success" onClick={() => onComplete(task.id)}><CheckCircleIcon /></IconButton>
          <IconButton color="primary" onClick={() => navigator.clipboard.writeText(window.location.href)}><ShareIcon /></IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
