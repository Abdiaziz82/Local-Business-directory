from datetime import datetime
from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # Either 'customer' or 'business_owner'
    
    # Add these fields for password reset functionality
    reset_code = db.Column(db.String(6), nullable=True)  # Store 6-digit reset code
    reset_code_expiration = db.Column(db.DateTime, nullable=True)  # Store code expiration timestamp
   
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.role}')"
    
 

