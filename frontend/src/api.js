import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const getCompletedTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/completed`);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const markTaskDone = async (taskId) => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}/done`);
  return response.data;
};
