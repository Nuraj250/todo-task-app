import React, { useState, useEffect } from 'react';
import { getTasks, addTask, markTaskDone } from '../api';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

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
    <Container className="mt-4">
      <h1 className="text-center">To-Do App</h1>

      {/* Task Form */}
      <Form onSubmit={handleAddTask} className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 w-100">
          Add Task
        </Button>
      </Form>

      {/* Task List */}
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <Button variant="success" size="sm" onClick={() => handleCompleteTask(task.id)}>
              Done
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Home;
