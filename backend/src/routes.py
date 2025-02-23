from flask import Blueprint, request, jsonify
from models import db, Task
from datetime import datetime

task_routes = Blueprint("task_routes", __name__)

# Get latest uncompleted tasks
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.filter_by(completed=False).all()
    return jsonify([
        {
            "id": t.id, 
            "title": t.title, 
            "description": t.description, 
            "category": t.category, 
            "dueDate": t.due_date.strftime("%Y-%m-%d") if t.due_date else None,  
            "dueTime": t.due_time.strftime("%H:%M") if t.due_time else None  
        }
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
        due_date=data.get("dueDate"),
        due_time=data.get("dueTime")
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
    task.finished_date = datetime.today().date()  # Store finished date
    task.finished_time = datetime.now().time()  # Store finished time
    
    db.session.commit()
    return jsonify({"message": "Task marked as completed", "finishedDate": str(task.finished_date), "finishedTime": str(task.finished_time)})

@task_routes.route("/tasks/completed", methods=["GET"])
def get_completed_tasks():
    tasks = Task.query.filter_by(completed=True).all()
    return jsonify([
        {
            "id": t.id, 
            "title": t.title, 
            "description": t.description, 
            "category": t.category, 
            "completedDate": t.finished_date.strftime("%Y-%m-%d") if t.finished_date else None,
            "completedTime": t.finished_time.strftime("%H:%M") if t.finished_time else None
        }
        for t in tasks
    ])
