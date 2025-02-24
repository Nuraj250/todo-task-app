import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

// Define task categories
const categories = ["Work", "Personal", "Urgent"];

function TaskForm({ onAdd }) {
  // State to manage new task details
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    dueDate: "", 
    dueTime: "", // Added dueTime field
    category: "" 
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTask); // Call the onAdd function to add the task
    // Reset form fields after submission
    setNewTask({ title: "", description: "", dueDate: "", dueTime: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Task title input field */}
      <TextField 
        label="Title" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={newTask.title} 
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
        required 
      />

      {/* Task description input field */}
      <TextField 
        label="Description" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={newTask.description} 
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
      />

      {/* Due date input field */}
      <TextField 
        type="date" 
        label="Due Date" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        InputLabelProps={{ shrink: true }}
        value={newTask.dueDate} 
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
      />

      {/* Due time input field (Optional) */}
      <TextField 
        type="time" 
        label="Due Time (Optional)" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        InputLabelProps={{ shrink: true }}
        value={newTask.dueTime} 
        onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })} 
      />

      {/* Category selection dropdown */}
      <TextField 
        select 
        label="Category" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={newTask.category} 
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
      >
        {/* Map through the categories to create dropdown options */}
        {categories.map((category) => (
          <MenuItem key={category} value={category}>{category}</MenuItem>
        ))}
      </TextField>

      {/* Submit button to add a task */}
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        fullWidth
      >
        Add Task
      </Button>
    </form>
  );
}

export default TaskForm;
