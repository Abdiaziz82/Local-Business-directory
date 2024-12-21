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
    
    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business_info.id'), nullable=False)  # Reviewed business
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Business owner (via user model)
    name = db.Column(db.String(100), nullable=False)  # Reviewer's name
    email = db.Column(db.String(120), nullable=False)  # Reviewer's email
    review_text = db.Column(db.Text, nullable=False)  # Review content
    rating = db.Column(db.Integer, nullable=False)  # Rating out of 5
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Review timestamp

    business = db.relationship('BusinessInfo', backref='reviews')  # Link to the business
    user = db.relationship('User', backref='reviews')  # Link to the business owner

    def __repr__(self):
        return f"Review(name='{self.name}', business='{self.business.name}', rating='{self.rating}')"
    
    
# class Message(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     business_info_id = db.Column(db.Integer, db.ForeignKey('business_info.id'), nullable=False)
#     name = db.Column(db.String(100))
#     message = db.Column(db.String(500))
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

#     def __repr__(self):
#         return f"Message('{self.name}')"