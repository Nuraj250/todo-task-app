import React, { useState, useEffect } from 'react';
import { getTasks, addTask, markTaskDone } from '../api';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await addTask(newTask);
    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  const handleCompleteTask = async (taskId) => {
    await markTaskDone(taskId);
    fetchTasks();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>To-Do App</h1>

      {/* Task Form */}
      <form onSubmit={handleAddTask}>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Task
        </Button>
      </form>

      {/* Task List */}
      <List sx={{ mt: 4 }}>
        {tasks.map((task) => (
          <ListItem key={task.id} secondaryAction={
            <IconButton color="success" onClick={() => handleCompleteTask(task.id)}>
              <CheckCircleIcon />
            </IconButton>
          }>
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Home;
