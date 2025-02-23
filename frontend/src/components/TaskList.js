import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const categoryColors = {
  Work: '#FFD700',
  Personal: '#FF69B4',
  Urgent: '#FF4500'
};

function TaskList({ tasks, onComplete, onEdit, onDelete }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{ backgroundColor: categoryColors[task.category] || '#fff', marginBottom: '10px', borderRadius: '5px' }}
        >
          <ListItemText primary={task.title} secondary={`Due: ${task.due_date} ${task.due_time ? '| Time: ' + task.due_time : ''} | Category: ${task.category}`}
          />
          <IconButton color="success" onClick={() => onComplete(task.id)}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
