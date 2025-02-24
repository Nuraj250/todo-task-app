import axios from 'axios';

// API base URL (Uses environment variable or defaults to localhost)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Fetch all tasks from the API.
 * @returns {Promise<Array>} An array of tasks with formatted due dates and times.
 */
export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data.map(task => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "Not Set", // Format due date
    dueTime: task.dueTime || "Not Set" // Default if due time is missing
  }));
};

/**
 * Fetch all completed tasks from the API.
 * @returns {Promise<Array>} An array of completed tasks with formatted completion dates and times.
 */
export const getCompletedTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/completed`);
  return response.data.map(task => ({
    ...task,
    completedDate: task.completedDate || "Not Set", // Default if completion date is missing
    completedTime: task.completedTime || "Not Set" // Default if completion time is missing
  }));
};

/**
 * Add a new task to the database.
 * @param {Object} task - The task object containing title, description, due date, and category.
 * @returns {Promise<Object>} The newly added task.
 */
export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

/**
 * Mark a task as completed.
 * @param {string} taskId - The ID of the task to mark as done.
 * @returns {Promise<Object>} The updated task.
 */
export const markTaskDone = async (taskId) => {
  const response = await axios.patch(`${API_URL}/tasks/${taskId}/done`);
  return response.data;
};

/**
 * Update an existing task.
 * @param {Object} task - The updated task object.
 * @returns {Promise<Object>} The updated task from the database.
 */
export const updateTask = async (task) => {
  const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
  return response.data;
};

/**
 * Delete a task from the database.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<Object>} The response from the server.
 */
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};
