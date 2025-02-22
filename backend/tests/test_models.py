from src.models import Task

def test_task_model():
    task = Task(title="Sample Task", description="Sample Description")
    assert task.title == "Sample Task"
    assert task.completed is False
