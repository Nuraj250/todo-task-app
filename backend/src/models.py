from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance for database interaction
db = SQLAlchemy()

# Define the Task model representing the 'tasks' table in the database
class Task(db.Model):
    """Represents a Task entity in the database."""

    # Unique identifier for each task (Primary Key)
    id = db.Column(db.Integer, primary_key=True)

    # Title of the task (Required field)
    title = db.Column(db.String(255), nullable=False)

    # Detailed description of the task (Optional)
    description = db.Column(db.Text, nullable=True)

    # Category of the task (e.g., Work, Personal, Urgent) (Optional)
    category = db.Column(db.String(50), nullable=True)

    # Due date of the task (Optional)
    due_date = db.Column(db.Date, nullable=True)

    # Due time of the task (Optional)
    due_time = db.Column(db.Time, nullable=True)

    # Task completion status (Defaults to False)
    completed = db.Column(db.Boolean, default=False)

    # Date when the task was completed (Optional)
    finished_date = db.Column(db.Date, nullable=True)

    # Time when the task was completed (Optional)
    finished_time = db.Column(db.Time, nullable=True)
