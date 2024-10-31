from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS  # Import CORS for Cross-Origin support
from flask_mail import Mail  # Import Mail from flask_mail
from config import Config  # Adjust the import as necessary
from flask_migrate import Migrate


db = SQLAlchemy()  # Initialize SQLAlchemy for database
migrate = Migrate()

bcrypt = Bcrypt()  # Initialize Bcrypt for password hashing
login_manager = LoginManager()  # Initialize Flask-Login for user session management
login_manager.login_view = 'main.login'  # Define default login route
login_manager.login_message_category = 'info'  # Flash message style
mail = Mail()  # Initialize the Mail instance

def create_app():
    app = Flask(__name__)
    
    
    app.config.from_object(Config)  # Load app configuration
    CORS(app)  # Enable CORS for the app to handle cross-origin requests

    db.init_app(app)  # Initialize database with app
    migrate.init_app(app, db)
    bcrypt.init_app(app)  # Initialize Bcrypt with app
    login_manager.init_app(app)  # Initialize LoginManager with app
    mail.init_app(app)  # Initialize Mail with app
    

    # Import and register the main blueprint
    from app.routes import main  # Import your routes
    app.register_blueprint(main)  # Register the blueprint for routes

    return app  # Return the Flask app
