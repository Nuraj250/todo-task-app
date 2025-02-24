from src.models import Task

def test_task_model():
    """
    Unit test for the Task model.
    
    This test ensures that a Task instance can be created with a title and 
    description and that the default completed status is False.
    """
    
    # Create a sample task instance
    task = Task(title="Sample Task", description="Sample Description")

    # Assertions to verify the task attributes
    assert task.title == "Sample Task"  # Check if title is set correctly
    assert task.description == "Sample Description"  # Check description field
    assert task.completed is False  # Ensure default completed status is False
