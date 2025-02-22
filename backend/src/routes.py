from flask import Blueprint, request, jsonify
from src.models import db, Task

task_routes = Blueprint("task_routes", __name__)

# Get latest 5 uncompleted tasks
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.filter_by(completed=False).order_by(Task.id.desc()).limit(5).all()
    return jsonify([{"id": t.id, "title": t.title, "description": t.description} for t in tasks])

# Create a new task
@task_routes.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    new_task = Task(title=data["title"], description=data.get("description", ""))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added successfully"}), 201

# Mark task as completed
@task_routes.route("/tasks/<int:task_id>/done", methods=["PATCH"])
def mark_task_done(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.completed = True
    db.session.commit()
    return jsonify({"message": "Task marked as completed"}), 200

@task_routes.route("/tasks/completed", methods=["GET"])
def get_completed_tasks():
    tasks = Task.query.filter_by(completed=True).order_by(Task.id.desc()).all()
    return jsonify([{"id": t.id, "title": t.title, "description": t.description} for t in tasks])
