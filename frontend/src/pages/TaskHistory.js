import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function TaskHistory() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed`);
    setCompletedTasks(response.data);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Task History</h1>
      <ListGroup>
        {completedTasks.length === 0 ? (
          <p className="text-center mt-3">No completed tasks yet.</p>
        ) : (
          completedTasks.map((task) => (
            <ListGroup.Item key={task.id}>
              <strong>{task.title}</strong> - {task.description}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
}

export default TaskHistory;
