from flask import Flask, jsonify, redirect ,request ,url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_mail import Mail
from config import Config
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager 
from datetime import timedelta

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'main.login'
login_manager.login_message_category = 'info'
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] = "your_secret_key"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)
    
    # Cookie and session security configurations
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # or 'None' if cross-origin required
    app.config['SESSION_COOKIE_SECURE'] = False   # Set to True if using HTTPS in production

    # Enable CORS for the app to handle cross-origin requests
    CORS(app, supports_credentials=True, origins=["https://bizhive-business-directory.vercel.app"])

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    # Import and register the main blueprint
    from app.routes import main
    app.register_blueprint(main)

    return app
 
 # User loader function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    from app.models import User  # Import User model here if not already imported
    return User.query.get(int(user_id))  # Load user by their ID
@login_manager.unauthorized_handler
def handle_unauthorized():
    # Return JSON for API routes instead of redirecting
    if request.path.startswith('/api/'):
        return jsonify({"error": "Unauthorized access"}), 401
    # Default redirect for non-API routes
    return redirect(url_for(login_manager.login_view))
