from flask import Blueprint, request, jsonify
from models import db, Task
from datetime import datetime

# Create a Blueprint for task-related routes
task_routes = Blueprint("task_routes", __name__)

# ------------------------------ GET ALL UNCOMPLETED TASKS ------------------------------ #
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    """
    Fetch all tasks that are not completed and return them as JSON.
    """
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

# ------------------------------ CREATE A NEW TASK ------------------------------ #
@task_routes.route("/tasks", methods=["POST"])
def add_task():
    """
    Create a new task and add it to the database.
    """
    data = request.json

    new_task = Task(
        title=data["title"],  # Required field
        description=data.get("description", ""),  # Optional field
        category=data.get("category", ""),  # Optional field
        due_date=data.get("dueDate"),  # Optional field
        due_time=data.get("dueTime")  # Optional field
    )
    
    db.session.add(new_task)
    db.session.commit()
    
    return jsonify({"message": "Task added successfully"}), 201

# ------------------------------ UPDATE AN EXISTING TASK ------------------------------ #
@task_routes.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    """
    Update an existing task based on the provided task ID.
    """
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

# ------------------------------ DELETE A TASK ------------------------------ #
@task_routes.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    """
    Delete a task from the database.
    """
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200

# ------------------------------ MARK A TASK AS COMPLETED ------------------------------ #
@task_routes.route("/tasks/<int:task_id>/done", methods=["PATCH"])
def mark_task_done(task_id):
    """
    Mark a task as completed and store the completion date and time.
    """
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.completed = True
    task.finished_date = datetime.today().date()  # Store finished date
    task.finished_time = datetime.now().time()  # Store finished time

    db.session.commit()

    return jsonify({
        "message": "Task marked as completed",
        "finishedDate": str(task.finished_date),
        "finishedTime": str(task.finished_time)
    })

# ------------------------------ GET ALL COMPLETED TASKS ------------------------------ #
@task_routes.route("/tasks/completed", methods=["GET"])
def get_completed_tasks():
    """
    Fetch all completed tasks and return them as JSON.
    """
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
