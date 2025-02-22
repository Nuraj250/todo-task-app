def test_create_task(client):
    response = client.post("/tasks", json={"title": "Test Task", "description": "Test Description"})
    assert response.status_code == 201
    assert response.get_json()["message"] == "Task added successfully"

def test_get_tasks(client):
    client.post("/tasks", json={"title": "Task 1", "description": "Desc 1"})
    client.post("/tasks", json={"title": "Task 2", "description": "Desc 2"})
    
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) > 0

def test_mark_task_done(client):
    client.post("/tasks", json={"title": "Task to Complete", "description": "Test"})
    response = client.get("/tasks")
    task_id = response.get_json()[0]["id"]

    done_response = client.patch(f"/tasks/{task_id}/done")
    assert done_response.status_code == 200
    assert done_response.get_json()["message"] == "Task marked as completed"

    # Check if task is removed from GET /tasks
    response_after = client.get("/tasks")
    assert task_id not in [task["id"] for task in response_after.get_json()]
