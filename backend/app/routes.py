from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User
from flask_login import login_user, current_user
from flask_cors import cross_origin  # Needed for CORS
from flask_cors import CORS
from werkzeug.utils import secure_filename
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

    # # Debugging: Log the incoming form data and files
    # print("Received form data:", request.form)
    # print("Received files:", request.files)

    # Check if form-data contains both image and JSON data
    if 'avatar' not in request.files or not request.form.get('fullName'):
        return jsonify({'error': 'Missing required fields'}), 400

    avatar = request.files['avatar']
    full_name = request.form.get('fullName')
    email = request.form.get('email')
    business_name = request.form.get('businessName')
    password = request.form.get('password')
    confirm_password = request.form.get('confirmPassword')

    # Validate avatar file
    if avatar and allowed_file(avatar.filename):
        filename = secure_filename(avatar.filename)
        avatar_path = os.path.join(UPLOAD_FOLDER, filename)
        avatar.save(avatar_path)

        # Use the existing 'image_file' column to store the filename
        image_file = filename
    else:
        return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed.'}), 400

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
        role='business_owner',
        image_file=image_file  # Store the avatar filename in 'image_file'
    )

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Business owner account created successfully', 'imageFile': image_file}), 201




@main.route("/api/signup/customer", methods=['POST', 'OPTIONS'])
@cross_origin()
def customer_signup():
    # Handle preflight request for CORS
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    # Check if the user is already logged in
    if current_user.is_authenticated:
        return jsonify({'error': 'Already logged in'}), 400

    # Check if form-data contains both image and JSON data
    if 'avatar' not in request.files or not request.form.get('fullName'):
        return jsonify({'error': 'Missing required fields'}), 400

    avatar = request.files['avatar']
    full_name = request.form.get('fullName')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirmPassword')

    # Validate avatar file
    if avatar and allowed_file(avatar.filename):
        filename = secure_filename(avatar.filename)
        avatar_path = os.path.join(UPLOAD_FOLDER, filename)
        avatar.save(avatar_path)

        # Use the existing 'image_file' column to store the filename
        image_file = filename
    else:
        return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed.'}), 400

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
        role='customer',
        image_file=image_file  # Store the avatar filename in 'image_file'
    )

    # Save the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Customer account created successfully', 'imageFile': image_file}), 201


  
@main.route("/api/login", methods=['POST'])
@cross_origin()  # Allow CORS for this route
def login():
    if current_user.is_authenticated:
        return jsonify({'message': 'Already logged in'}), 400

    data = request.get_json()  # Get JSON data from the React frontend

    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)  # Log the user in using Flask-Login
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 400
