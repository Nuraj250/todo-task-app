import React, { useState, useEffect } from 'react';
import { getTasks, addTask, markTaskDone, updateTask, deleteTask } from '../api';
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const categoryColors = {
  Work: '#FFD700',  // Gold
  Personal: '#FF69B4',  // Pink
  Urgent: '#FF4500'  // Orange Red
};

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", category: "", dueDate: "", dueTime: "" });
  const [editTask, setEditTask] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewTask, setViewTask] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setTasks(await getTasks());
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await addTask(newTask);
    fetchTasks();
    toast.success("Task added successfully!");
    setNewTask({ title: "", description: "", category: "", dueDate: "", dueTime: "" });
  };

  const handleCompleteTask = async (taskId) => {
    await markTaskDone(taskId);
    fetchTasks();
    toast.info("Task marked as completed!");
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setEditOpen(true);
  };

  const handleUpdateTask = async () => {
    await updateTask(editTask);
    setEditOpen(false);
    fetchTasks();
    toast.success("Task updated!");
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
    toast.error("Task deleted!");
  };

  const handleViewTask = (task) => {
    setViewTask(task);
    setViewOpen(true);
  };

  return (
    <Container sx={{ display: "flex", gap: "20px" }}>
      {/* Task Form */}
      <div style={{ flex: 1 }}>
        <h2>Add Task</h2>
        <form onSubmit={handleAddTask}>
          <TextField label="Title" variant="outlined" fullWidth margin="normal"
            value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
          <TextField label="Description" variant="outlined" fullWidth margin="normal"
            value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          <TextField type="date" label="Due Date" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
            value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
          <TextField type="time" label="Due Time (Optional)" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
            value={newTask.dueTime} onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })} />
          <TextField select label="Category" variant="outlined" fullWidth margin="normal"
            value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
            {Object.keys(categoryColors).map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
          </TextField>
          <Button variant="contained" color="primary" type="submit" fullWidth>Add Task</Button>
        </form>
      </div>

      {/* Task List */}
      <div style={{ flex: 2 }}>
        <h2>Task List</h2>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ backgroundColor: categoryColors[task.category] || '#fff', marginBottom: '10px', borderRadius: '5px' }}>
              <ListItemText
                primary={task.title}
                secondary={`Due: ${task.dueDate} ${task.dueTime ? '| Time: ' + task.dueTime : ''} | Category: ${task.category}`}
              />
              <IconButton color="primary" onClick={() => handleViewTask(task)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton color="success" onClick={() => handleCompleteTask(task.id)}>
                <CheckCircleIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => handleEditTask(task)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>

      {/* View Task Modal */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6"><strong>Title:</strong> {viewTask?.title}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {viewTask?.description || "No Description"}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {viewTask?.category || "Not Specified"}</Typography>
          <Typography variant="body1"><strong>Due Date:</strong> {viewTask?.dueDate || "Not Set"}</Typography>
          {viewTask?.dueTime && <Typography variant="body1"><strong>Due Time:</strong> {viewTask.dueTime}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)} variant="contained" color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField label="Title" variant="outlined" fullWidth margin="normal"
            value={editTask?.title || ""}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            required />

          <TextField label="Description" variant="outlined" fullWidth margin="normal"
            value={editTask?.description || ""}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} />

          <TextField type="date" label="Due Date" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
            value={editTask?.dueDate || ""}
            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })} />

          <TextField type="time" label="Due Time (Optional)" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
            value={editTask?.dueTime || ""}
            onChange={(e) => setEditTask({ ...editTask, dueTime: e.target.value })} />

          <TextField select label="Category" variant="outlined" fullWidth margin="normal"
            value={editTask?.category || ""}
            onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}>
            {["Work", "Personal", "Urgent"].map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateTask} variant="contained" color="success">Update</Button>
          <Button onClick={() => setEditOpen(false)} variant="contained" color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Home;
