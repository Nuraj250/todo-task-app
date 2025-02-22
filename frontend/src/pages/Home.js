import React, { useState, useEffect } from 'react';
import { getTasks, addTask, markTaskDone } from '../api';
import { Container } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => { setTasks(await getTasks()); };

  const handleAddTask = async (task) => { await addTask(task); fetchTasks(); };

  const handleCompleteTask = async (taskId) => { await markTaskDone(taskId); fetchTasks(); };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>To-Do App</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onComplete={handleCompleteTask} />
    </Container>
  );
}

export default Home;
