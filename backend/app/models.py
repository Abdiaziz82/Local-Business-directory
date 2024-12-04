from datetime import datetime
from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # Either 'customer' or 'business_owner'
    
    # Fields for password reset functionality
    reset_code = db.Column(db.String(6), nullable=True)  # Store hashed 6-digit reset code
    reset_code_expiration = db.Column(db.DateTime, nullable=True)  # Store code expiration timestamp

    # Link each user to a single business info
    business_info = db.relationship('BusinessInfo', uselist=False, backref='user')
   
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.role}')"

class BusinessInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)  # Name of the business
    logo = db.Column(db.String(200), nullable=True, default="default_logo.jpg")
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(150), nullable=True, default="Not provided")
    products = db.Column(db.Text, nullable=True)
    website = db.Column(db.String(120), nullable=True)
    categories = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(15), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
 
    def __repr__(self):
        return f"BusinessInfo('{self.name}', '{self.user.username}')"
    
    
    # Relationship with messages and reviews
    messages = db.relationship('Message', backref='business', lazy=True)
    reviews = db.relationship('Review', backref='business', lazy=True)



class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business_info.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Optional if not logged in
    name = db.Column(db.String(100), nullable=False)  # Name of the sender
    email = db.Column(db.String(120), nullable=False)  # Email of the sender
    content = db.Column(db.Text, nullable=False)  # The message
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Message('{self.name}', '{self.email}', '{self.business.name}', '{self.timestamp}')"

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business_info.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Optional if not logged in
    name = db.Column(db.String(100), nullable=False)  # Name of the reviewer
    content = db.Column(db.Text, nullable=False)  # The review
    rating = db.Column(db.Integer, nullable=True)  # Optional rating (if required)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Review('{self.name}', '{self.business.name}', '{self.timestamp}')"
