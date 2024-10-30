from flask import Blueprint, request, jsonify, session, make_response, url_for, current_app 
from app import db, bcrypt, mail  # Ensure `mail` instance is available here
from app.models import User
from flask_cors import CORS  # Import CORS
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_login import login_user, current_user, logout_user
from flask_cors import cross_origin
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
import random

import os


# Define where to save the uploaded avatar files
UPLOAD_FOLDER = 'static/uploads/avatars'  # Update this path as per your project structure
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check if file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_serializer():
    return URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

main = Blueprint('main', __name__)
CORS(main)  # Enable CORS for this blueprint

@main.route("/api/signup/business-owner", methods=['POST', 'OPTIONS'])
@cross_origin()
def business_owner_signup():
    # Handle preflight request for CORS
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    # Check if the user is already logged in
    if current_user.is_authenticated:
        return jsonify({'error': 'Already logged in'}), 400

    # Retrieve form fields directly from `request.form` without file handling
    full_name = request.form.get('fullName')
    email = request.form.get('email')
    business_name = request.form.get('businessName')
    password = request.form.get('password')
    confirm_password = request.form.get('confirmPassword')

    # Check if all required fields are provided
    if not full_name or not email or not business_name or not password or not confirm_password:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if username already exists
    existing_user_by_username = User.query.filter_by(username=full_name).first()
    if existing_user_by_username:
        return jsonify({'error': 'Username already exists'}), 400

    # Check if email already exists
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({'error': 'This email address is already registered. Please use a different email.'}), 400

    # Validate password matching
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new business owner user
    new_user = User(
        username=full_name,
        email=email,
        password=hashed_password,
        role='business_owner'
    )

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Business owner account created successfully'}), 201




@main.route("/api/signup/customer", methods=['POST', 'OPTIONS'])
@cross_origin()
def customer_signup():
    # Handle preflight request for CORS
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    # Check if the user is already logged in
    if current_user.is_authenticated:
        return jsonify({'error': 'Already logged in'}), 400

    # Retrieve form fields from JSON data
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Check if all required fields are provided
    if not full_name or not email or not password or not confirm_password:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if username already exists
    existing_user_by_username = User.query.filter_by(username=full_name).first()
    if existing_user_by_username:
        return jsonify({'error': 'Username already exists'}), 400

    # Check if email already exists
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({'error': 'This email address is already registered. Please use a different email.'}), 400

    # Validate password matching
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new customer user
    new_user = User(
        username=full_name,
        email=email,
        password=hashed_password,
        role='customer'
    )

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Customer account created successfully'}), 201

@main.route("/api/login", methods=['POST'])
@cross_origin()  # Allow CORS for this route
def login():
    if current_user.is_authenticated:
        return jsonify({'message': 'Already logged in'}), 400

    data = request.get_json()  # Get JSON data from the React frontend

    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)  # Log the user in using Flask-Login
        
        response = make_response(jsonify({
            'message': 'Login successful',
            'role': user.role,
            'imageFile': user.image_file  # Assuming `image_file` is the field storing avatar URL
        }), 200)

        # Set cookies
        response.set_cookie('userRole', user.role, httponly=True)  # Set the role cookie
        response.set_cookie('userAvatar', user.image_file, httponly=True)  # Set the avatar cookie

        return response
    else:
        return jsonify({'error': 'Invalid email or password'}), 400

@main.route("/api/logout", methods=['POST'])
@cross_origin()  # Allow CORS for this route
def logout():
    if current_user.is_authenticated:
        logout_user()  # Log the user out
        response = make_response(jsonify({'message': 'Logout successful'}), 200)
        response.delete_cookie('userRole')  # Clear the role cookie
        response.delete_cookie('userAvatar')  # Clear the avatar cookie
        return response
    else:
        return jsonify({'error': 'No user logged in'}), 400

@main.route("/api/session_status", methods=['GET'])
@cross_origin()  # Allow CORS for this route
def session_status():
    if current_user.is_authenticated:
        return jsonify({
            'isLoggedIn': True,
            'role': current_user.role,
            'imageFile': current_user.image_file
        }), 200
    else:
        return jsonify({'isLoggedIn': False}), 200

# app.py (continued)

@main.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Generate a 6-digit reset code and set expiration time
    reset_code = str(random.randint(100000, 999999))
    expiration_time = datetime.utcnow() + timedelta(minutes=15)

    # Store the code and expiration in the database (modify your User model or create a new ResetCode model)
    user.reset_code = reset_code
    user.reset_code_expiration = expiration_time
    db.session.commit()

    # Send the email with the reset code
    msg = Message('Password Reset Code',
                  sender=current_app.config['MAIL_USERNAME'],
                  recipients=[email])
    msg.body = f'Hi {user.username},\n\nYour password reset code is: {reset_code}\n\nPlease enter this code on the reset password page.'

    try:
        mail.send(msg)
        return jsonify({"message": "Password reset code sent to your email"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to send email"}), 500
    
    
@main.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    code = data.get('code')
    new_password = data.get('newPassword')

    user = User.query.filter_by(reset_code=code).first()

    if not user:
        return jsonify({"error": "Invalid reset code"}), 400

    if datetime.utcnow() > user.reset_code_expiration:
        return jsonify({"error": "Reset code has expired"}), 400

    # Correctly hash the new password before saving
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    user.reset_code = None
    user.reset_code_expiration = None
    db.session.commit()

    return jsonify({"message": "Password has been updated successfully"}), 200
