import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Define colors for different task categories
const categoryColors = {
  Work: '#FFD700',      // Gold color for Work tasks
  Personal: '#FF69B4',  // Pink color for Personal tasks
  Urgent: '#FF4500'     // Red-orange color for Urgent tasks
};

// TaskList component that displays a list of tasks
function TaskList({ tasks, onComplete, onEdit, onDelete }) {
  return (
    <List>
      {/* Loop through the tasks and render each one */}
      {tasks.map((task) => (
        <ListItem
          key={task.id} // Unique key for React list rendering
          sx={{ 
            backgroundColor: categoryColors[task.category] || '#fff', // Apply category-based background color
            marginBottom: '10px', 
            borderRadius: '5px' 
          }}
        >
          {/* Display task title and additional details */}
          <ListItemText 
            primary={task.title} 
            secondary={`Due: ${task.due_date} ${task.due_time ? '| Time: ' + task.due_time : ''} | Category: ${task.category}`}
          />

          {/* Button to mark task as completed */}
          <IconButton color="success" onClick={() => onComplete(task.id)}>
            <CheckCircleIcon />
          </IconButton>

          {/* Button to edit task details */}
          <IconButton color="primary" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>

          {/* Button to delete the task */}
          <IconButton color="error" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
