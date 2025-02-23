from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    due_time = db.Column(db.Time, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    finished_date = db.Column(db.Date, nullable=True)
    finished_time = db.Column(db.Time, nullable=True)

