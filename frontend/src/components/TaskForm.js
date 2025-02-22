import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const categories = ["Work", "Personal", "Urgent"];

function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", category: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTask);
    setNewTask({ title: "", description: "", dueDate: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" variant="outlined" fullWidth margin="normal"
        value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
      <TextField label="Description" variant="outlined" fullWidth margin="normal"
        value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <TextField type="date" label="Due Date" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
        value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
      <TextField select label="Category" variant="outlined" fullWidth margin="normal"
        value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
        {categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
      </TextField>
      <Button variant="contained" color="primary" type="submit" fullWidth>Add Task</Button>
    </form>
  );
}

export default TaskForm;
