import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data.map(task => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "Not Set",
    dueTime: task.dueTime || "Not Set"
  }));
};


// Get completed tasks
export const getCompletedTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/completed`);
  return response.data.map(task => ({
    ...task,
    completedDate: task.completedDate || "Not Set",
    completedTime: task.completedTime || "Not Set"
  }));
};
// Add a new task
export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

// Mark a task as completed
export const markTaskDone = async (taskId) => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}/done`);
  return response.data;
};

// Update a task
export const updateTask = async (task) => {
  const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};