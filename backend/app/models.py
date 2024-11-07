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
    
    business_cards = db.relationship('BusinessCard', backref='user', lazy=True)

class BusinessCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(200), nullable=True)  # New field for logo URL
    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    products = db.Column(db.String(500), nullable=True)  # New field for products
    website = db.Column(db.String(200), nullable=True)
    categories = db.Column(db.String(100), nullable=True)  # New field for categories
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def __init__(self, user_id, name, logo, description, location, products, website, categories, email, phone):
        self.user_id = user_id
        self.name = name
        self.logo = logo
        self.description = description
        self.location = location
        self.products = products
        self.website = website
        self.categories = categories
        self.email = email
        self.phone = phone

    def __repr__(self):
        return f"BusinessCard('{self.name}', '{self.location}', '{self.email}', '{self.phone}')"
