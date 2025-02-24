from flask import Blueprint, request, jsonify
from models import db, Task
from datetime import datetime

# Create a Blueprint for task-related routes
task_routes = Blueprint("task_routes", __name__)

# Get latest uncompleted tasks
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    # Fetch all tasks that are not completed
    tasks = Task.query.filter_by(completed=False).all()
    
    # Return the task details as a JSON response
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
    # Extract the task data from the request body
    data = request.json
    new_task = Task(
        title=data["title"],  # Required field
        description=data.get("description", ""),  # Optional field
        category=data.get("category", ""),  # Optional field
        due_date=data.get("dueDate"),  # Optional field
        due_time=data.get("dueTime")  # Optional field
    )
    
    # Add the new task to the database and commit
    db.session.add(new_task)
    db.session.commit()
    
    # Return a success message
    return jsonify({"message": "Task added successfully"}), 201

# Update an existing task
@task_routes.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    # Fetch the task by its ID
    task = Task.query.get(task_id)
    
    # Return an error if the task is not found
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    # Extract the updated data from the request
    data = request.json
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.category = data.get("category", task.category)
    task.due_date = data.get("dueDate", task.due_date)
    task.due_time = data.get("dueTime", task.due_time)

    # Commit the changes to the database
    db.session.commit()
    
    # Return a success message
    return jsonify({"message": "Task updated successfully"}), 200

# Delete a task
@task_routes.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    # Fetch the task by its ID
    task = Task.query.get(task_id)
    
    # Return an error if the task is not found
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    # Delete the task from the database and commit the change
    db.session.delete(task)
    db.session.commit()
    
    # Return a success message
    return jsonify({"message": "Task deleted successfully"}), 200

# Mark a task as completed
@task_routes.route("/tasks/<int:task_id>/done", methods=["PATCH"])
def mark_task_done(task_id):
    # Fetch the task by its ID
    task = Task.query.get(task_id)
    
    # Return an error if the task is not found
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    # Mark the task as completed and record the finished date and time
    task.completed = True
    task.finished_date = datetime.today().date()  # Store finished date
    task.finished_time = datetime.now().time()  # Store finished time
    
    # Commit the changes to the database
    db.session.commit()
    
    # Return a success message along with the finished date and time
    return jsonify({"message": "Task marked as completed", "finishedDate": str(task.finished_date), "finishedTime": str(task.finished_time)})

# Get all completed tasks
@task_routes.route("/tasks/completed", methods=["GET"])
def get_completed_tasks():
    # Fetch all tasks that are completed
    tasks = Task.query.filter_by(completed=True).all()
    
    # Return the task details as a JSON response
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
