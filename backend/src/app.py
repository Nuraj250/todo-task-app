from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models import *
from routes import task_routes
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Ensure frontend requests are allowed

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin@localhost/todo_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
CORS(app)

# Register Blueprints
app.register_blueprint(task_routes)

# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
