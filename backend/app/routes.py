from flask import Blueprint, request, jsonify, session, make_response, url_for, current_app
from app import db, bcrypt, mail  # Ensure `mail` instance is available here
from app.models import User, BusinessInfo
from flask_cors import CORS ,cross_origin
from flask_mail import Message
from flask_login import login_user, current_user, logout_user ,login_required
from datetime import datetime, timedelta
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

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True, origins="http://localhost:5173")

@main.route("/api/signup/business-owner", methods=['POST', 'OPTIONS'])
@cross_origin()
def business_owner_signup():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    if current_user.is_authenticated:
        return jsonify({'error': 'Already logged in'}), 400

    full_name = request.form.get('fullName')
    email = request.form.get('email')
    business_name = request.form.get('businessName')
    password = request.form.get('password')
    confirm_password = request.form.get('confirmPassword')

    if not full_name or not email or not business_name or not password or not confirm_password:
        return jsonify({'error': 'Missing required fields'}), 400

    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400

    existing_user_by_username = User.query.filter_by(username=full_name).first()
    if existing_user_by_username:
        return jsonify({'error': 'Username already exists'}), 400

    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({'error': 'This email address is already registered. Please use a different email.'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        username=full_name,
        email=email,
        password=hashed_password,
        role='business_owner'
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Business owner account created successfully'}), 201


@main.route("/api/signup/customer", methods=['POST', 'OPTIONS'])
@cross_origin()
def customer_signup():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    if current_user.is_authenticated:
        return jsonify({'error': 'Already logged in'}), 400

    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if not full_name or not email or not password or not confirm_password:
        return jsonify({'error': 'Missing required fields'}), 400

    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400

    existing_user_by_username = User.query.filter_by(username=full_name).first()
    if existing_user_by_username:
        return jsonify({'error': 'Username already exists'}), 400

    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({'error': 'This email address is already registered. Please use a different email.'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        username=full_name,
        email=email,
        password=hashed_password,
        role='customer'
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Customer account created successfully'}), 201


@main.route("/api/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return jsonify({'message': 'Please provide your login credentials.'}), 200

    if current_user.is_authenticated:
        return jsonify({'message': 'Already logged in'}), 400

    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        remember = data.get('remember', False)
        login_user(user, remember=remember)

        response = make_response(jsonify({
            'message': 'Login successful',
            'role': user.role,
            'imageFile': user.image_file
        }), 200)

        # Set secure cookies with SameSite and HttpOnly attributes for security
        response.set_cookie('userRole', user.role, httponly=True, samesite='Lax', secure=True)
        response.set_cookie('userAvatar', user.image_file, httponly=True, samesite='Lax', secure=True)

        return response
    else:
        return jsonify({'error': 'Invalid email or password'}), 400


@main.route("/api/logout", methods=['POST'])
@login_required
@cross_origin()
def logout():
    if current_user.is_authenticated:
        logout_user()  # Log the user out
        response = make_response(jsonify({'message': 'Logout successful'}), 200)
        
        # Delete the secure cookies
        response.delete_cookie('userRole')
        response.delete_cookie('userAvatar')
        
        return response
    else:
        return jsonify({'error': 'No user logged in'}), 400

@main.route("/api/session_status", methods=['GET'])
@cross_origin()
def session_status():
    if current_user.is_authenticated:
        return jsonify({
            'isLoggedIn': True,
            'role': current_user.role,
            'imageFile': current_user.image_file
        }), 200
    else:
        return jsonify({'isLoggedIn': False}), 200

@main.route("/api/check-auth", methods=["GET"])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({"message": "User is authenticated", "user": current_user.email}), 200
    else:
        return jsonify({"message": "User is not authenticated"}), 401


@main.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    reset_code = str(random.randint(100000, 999999))
    expiration_time = datetime.utcnow() + timedelta(minutes=15)

    user.reset_code = reset_code
    user.reset_code_expiration = expiration_time
    db.session.commit()

    subject = 'Password Reset Code'
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Code</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
                color: #333;
            }}
            .container {{
                width: 100%;
                max-width: 600px;
                margin: auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                padding: 20px;
            }}
            h1 {{
                color: #007bff;
                font-size: 24px;
            }}
            p {{
                line-height: 1.5;
            }}
            .reset-code {{
                font-weight: bold;
                font-size: 24px;
                color: #d9534f;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hi {user.username},</p>
            <p>Your password reset code is:</p>
            <p class="reset-code">{reset_code}</p>
            <p>This code will expire in 15 minutes. Please enter this code on the reset password page.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you!</p>
        </div>
    </body>
    </html>
    """

    msg = Message(subject,
                  sender=current_app.config['MAIL_USERNAME'],
                  recipients=[email])
    msg.html = html

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

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    user.reset_code = None
    user.reset_code_expiration = None
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200



@main.route('/api/business-info', methods=['GET' ,'POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@login_required
def save_business_info():
    # Debugging user authentication and session state
    print(f"Session Keys: {list(session.keys())}")
    print(f"Request Cookies: {request.cookies}")
    print(f"User Authenticated: {current_user.is_authenticated}")
    print(f"User Role: {getattr(current_user, 'role', None)}")
    print(f"Existing Business Info: {getattr(current_user, 'business_info', None)}")

    # If the user is not authenticated, return a 401 error
    if not current_user.is_authenticated:
        return jsonify({"error": "User is not authenticated."}), 401

    # Check if the user has the correct role
    if getattr(current_user, 'role', None) != 'business_owner':
        return jsonify({"error": "Access denied. Only business owners can access this endpoint."}), 403

    # Check if business info already exists
    if getattr(current_user, 'business_info', None):
        return jsonify({"error": "Business information has already been submitted."}), 400

    # Parse and validate incoming JSON data
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided."}), 400

    # Extract fields
    name = data.get('name')
    email = data.get('email')
    if not name or not email:
        return jsonify({"error": "Name and email are required fields."}), 400

    # Create a new BusinessInfo object
    business_info = BusinessInfo(
        user_id=current_user.id,
        name=name,
        description=data.get('description'),
        location=data.get('location'),
        products=data.get('products'),
        website=data.get('website'),
        categories=data.get('categories'),
        email=email,
        phone=data.get('phone'),
        logo=data.get('logo', "default_logo.jpg"),
        created_at=datetime.utcnow()
    )

    # Save the object to the database
    try:
        db.session.add(business_info)
        db.session.commit()
        print("Business information successfully saved to the database.")
    except Exception as e:
        db.session.rollback()
        print(f"Database Commit Error: {e}")
        return jsonify({"error": "Internal server error. Please try again later."}), 500

    return jsonify({"message": "Business information submitted successfully."}), 201


@main.route('/api/business-info/<int:user_id>', methods=['GET'])
@login_required
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def get_business_info_by_user(user_id):
    user = User.query.get(user_id)
    
    if not user or not user.business_info:
        return jsonify({"error": "No business information found for this user."}), 404

    business_data = {
        "name": user.business_info.name,
        "description": user.business_info.description,
        "location": user.business_info.location,
        "products": user.business_info.products,
        "website": user.business_info.website,
        "categories": user.business_info.categories,
        "email": user.business_info.email,
        "phone": user.business_info.phone,
        "logo": user.business_info.logo,
        "created_at": user.business_info.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }
    return jsonify(business_data), 200