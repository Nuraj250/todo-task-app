import React, { useState, useEffect } from 'react';
import { getCompletedTasks } from '../api';
import { Container, List, ListItem, ListItemText } from '@mui/material';

function TaskHistory() {
  // State to store completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Define colors for different task categories
  const categoryColors = {
    Work: '#FFD700',  // Gold
    Personal: '#FF69B4',  // Pink
    Urgent: '#FF4500'  // Orange Red
  };

  // Fetch completed tasks when the component mounts
  useEffect(() => { 
    fetchCompletedTasks(); 
  }, []);

  // Fetch completed tasks from the API
  const fetchCompletedTasks = async () => { 
    setCompletedTasks(await getCompletedTasks()); 
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Task History</h1>

      {/* List of Completed Tasks */}
      <List>
        {completedTasks.map((task) => (
          <ListItem
            key={task.id} // Unique key for each task
            sx={{ 
              backgroundColor: categoryColors[task.category] || '#fff', // Apply category color
              marginBottom: '10px', 
              borderRadius: '5px' 
            }}
          >
            {/* Display Task Details */}
            <ListItemText
              primary={task.title}
              secondary={`Category: ${task.category} | Completed on: ${task.completedDate} at ${task.completedTime}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TaskHistory;
