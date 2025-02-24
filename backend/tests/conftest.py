import pytest
from src.app import app, db

@pytest.fixture
def client():
    """
    Pytest fixture to set up a test client for the Flask application.
    
    - Enables TESTING mode.
    - Uses an in-memory SQLite database for isolated testing.
    - Creates all tables before tests and drops them afterward.
    """
    
    # Enable Flask's testing mode
    app.config['TESTING'] = True

    # Use an in-memory SQLite database for testing
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///:memory:"

    # Create a test client
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Create all tables for testing
        yield client  # Provide the test client to the tests
        with app.app_context():
            db.drop_all()  # Clean up the database after tests
