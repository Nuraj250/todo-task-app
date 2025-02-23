from flask import Blueprint, request, jsonify
from models import db, Task

task_routes = Blueprint("task_routes", __name__)

# Get latest 5 uncompleted tasks
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.filter_by(completed=False).all()
    return jsonify([
        {"id": t.id, "title": t.title, "description": t.description, "category": t.category, "due_date": str(t.due_date), "due_time": str(t.due_time)}
        for t in tasks
    ])

# Create a new task
@task_routes.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    new_task = Task(
        title=data["title"],
        description=data.get("description", ""),
        category=data.get("category", ""),
        due_date=data.get("dueDate", None),
        due_time=data.get("dueTime", None)
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added successfully"}), 201

# Update a Task
@task_routes.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.json
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.category = data.get("category", task.category)
    task.due_date = data.get("dueDate", task.due_date)
    task.due_time = data.get("dueTime", task.due_time)

    db.session.commit()
    return jsonify({"message": "Task updated successfully"}), 200

#Delete Task
@task_routes.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200

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
    tasks = Task.query.filter_by(completed=True).all()
    return jsonify([
        {"id": t.id, "title": t.title, "description": t.description, "category": t.category, "completed_date": str(t.due_date)}
        for t in tasks
    ])
