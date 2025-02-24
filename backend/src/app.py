from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models import *
from routes import task_routes
import os

# Load environment variables from a .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) to allow frontend requests
CORS(app)

# Database Configuration (Using MySQL)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin@localhost/todo_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking for better performance

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Register Blueprints (Task Routes)
app.register_blueprint(task_routes)

# Create database tables if they don't exist
with app.app_context():
    db.create_all()

# Run the Flask application
if __name__ == "__main__":
    # Debug mode enabled for development, accessible on all IP addresses of the host machine
    app.run(debug=True, host="0.0.0.0")
