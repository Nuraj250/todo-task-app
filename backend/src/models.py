from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance for database interaction
db = SQLAlchemy()

# Define a Task model (table) that represents the 'tasks' table in the database
class Task(db.Model):
    # Column to store a unique identifier for each task (primary key)
    id = db.Column(db.Integer, primary_key=True)
    
    # Column to store the task title, cannot be null
    title = db.Column(db.String(255), nullable=False)
    
    # Column to store a detailed description of the task, can be null
    description = db.Column(db.Text, nullable=True)
    
    # Column to store the task's category, can be null
    category = db.Column(db.String(50), nullable=True)
    
    # Column to store the task's due date, can be null
    due_date = db.Column(db.Date, nullable=True)
    
    # Column to store the task's due time, can be null
    due_time = db.Column(db.Time, nullable=True)
    
    # Column to indicate whether the task is completed, defaults to False
    completed = db.Column(db.Boolean, default=False)
    
    # Column to store the date when the task was finished, can be null
    finished_date = db.Column(db.Date, nullable=True)
    
    # Column to store the time when the task was finished, can be null
    finished_time = db.Column(db.Time, nullable=True)
