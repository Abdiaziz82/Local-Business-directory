import os

class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'  # Path to your SQLite database
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER = os.path.join('static', 'profile_pics')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Limit upload size to 16MB

