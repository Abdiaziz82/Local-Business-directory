import os
from datetime import timedelta

class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'  # Path to your SQLite database
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # UPLOAD_FOLDER = os.path.join('static', 'profile_pics')
    # MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Limit upload size to 16MB
    
    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'abdiazizhared64@gmail.com'  # Set environment variable for security
    MAIL_PASSWORD = 'zgdj edcr dtnz zugp'       # Set environment variable for security

    # Remember Me cookie duration
    REMEMBER_COOKIE_DURATION = timedelta(days=30)
