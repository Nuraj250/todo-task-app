def test_create_task(client):
    """
    Test the creation of a new task via POST /tasks.
    
    - Sends a request to create a new task.
    - Verifies the response status code is 201 (Created).
    - Ensures the response message confirms task creation.
    """
    response = client.post("/tasks", json={"title": "Test Task", "description": "Test Description"})
    
    # Validate response
    assert response.status_code == 201  # HTTP 201 Created
    assert response.get_json()["message"] == "Task added successfully"


def test_get_tasks(client):
    """
    Test retrieving tasks via GET /tasks.
    
    - Creates two tasks.
    - Fetches all tasks and checks if the response is successful.
    - Ensures at least one task exists in the response.
    """
    client.post("/tasks", json={"title": "Task 1", "description": "Desc 1"})
    client.post("/tasks", json={"title": "Task 2", "description": "Desc 2"})
    
    response = client.get("/tasks")
    
    # Validate response
    assert response.status_code == 200  # HTTP 200 OK
    data = response.get_json()
    assert len(data) > 0  # Ensure at least one task exists


def test_mark_task_done(client):
    """
    Test marking a task as completed via PATCH /tasks/<task_id>/done.
    
    - Creates a new task.
    - Retrieves the task to get its ID.
    - Marks the task as completed.
    - Verifies the response confirms task completion.
    - Ensures the task is no longer available in GET /tasks.
    """
    # Create a new task
    client.post("/tasks", json={"title": "Task to Complete", "description": "Test"})
    
    # Retrieve the newly created task's ID
    response = client.get("/tasks")
    task_id = response.get_json()[0]["id"]

    # Mark the task as completed
    done_response = client.patch(f"/tasks/{task_id}/done")
    
    # Validate response
    assert done_response.status_code == 200  # HTTP 200 OK
    assert done_response.get_json()["message"] == "Task marked as completed"

    # Ensure the task is no longer in the list of uncompleted tasks
    response_after = client.get("/tasks")
    assert task_id not in [task["id"] for task in response_after.get_json()]
