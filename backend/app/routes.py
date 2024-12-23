from flask import Blueprint, request, jsonify, session, make_response, url_for, current_app
from app import db, bcrypt, mail  # Ensure `mail` instance is available here
from app.models import User, BusinessInfo,Review
from flask_cors import CORS ,cross_origin
from flask_mail import Message
from flask_login import login_user, current_user, logout_user ,login_required
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import random
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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


@main.route("/api/login", methods=['POST'])

def login():
    # Validate JSON payload
    if not request.is_json:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    data = request.get_json()

    # Check if email and password are provided
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required.'}), 400

    # Retrieve user from the database
    user = User.query.filter_by(email=data['email']).first()

    # Validate credentials
    if user and bcrypt.check_password_hash(user.password, data['password']):
        remember = data.get('remember', False)  # Default to False if not provided

        # Generate JWT token with expiration time logic
        expires_in = timedelta(days=30) if remember else timedelta(days=30)  # Default to 1 day if not remembered
        access_token = create_access_token(
            identity={"id": user.id, "email": user.email, "role": user.role},
            expires_delta=expires_in
        )

        # Prepare the response
        response = jsonify({
            'message': 'Login successful',
            'token': access_token,
            'role': user.role,
            'imageFile': user.image_file
        })
        return response, 200
    else:
        # Invalid credentials
        return jsonify({'error': 'Invalid email or password'}), 401  # Changed to 401 for Unauthorized

@main.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


@main.route("/api/logout", methods=['POST'])
@jwt_required()
def logout():
    # JWT is stateless, so no explicit server-side logout
    # Inform the client to discard the token
    return jsonify({'message': 'Logout successful. Please discard your token.'}), 200

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



@main.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        user_name = data.get('user_name')
        user_email = data.get('user_email')
        user_message = data.get('user_message')

        # Email configuration
        sender_email = "abdiazizhared64@gmail.com"  # Replace with your email
        app_password = "zgdj edcr dtnz zugp"    # Replace with your app password
        recipient_email = "abdiazizhared64@gmail.com"  # Your Gmail to receive messages

        # Create the email
        msg = MIMEMultipart()
        msg['From'] = f"{user_name} <{sender_email}>"
        msg['To'] = recipient_email
        msg['Subject'] = f"New Contact Form Submission from {user_name}"
        msg['Reply-To'] = user_email

        
        # Email body
        body = f"""
        You have a new message from your contact form:

        Name: {user_name}
        Email: {user_email}
        Message:
        {user_message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, app_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())

        return jsonify({"message": "Message sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    # Create and send the email
    msg = Message('Subscription Confirmation',
                  sender='abdiazizhared64@gmail.com',
                  recipients=[email])
    msg.body = 'Thank you for subscribing to our newsletter! You will now receive the latest updates.  '

    try:
        mail.send(msg)
        return jsonify({'message': 'Subscription successful! Please check your email for confirmation.'}), 200
    except Exception as e:
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500


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



@main.route('/api/business-info', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def save_business_info():
    try:
        # Extract user identity from JWT
        user_identity = get_jwt_identity()
        user_id = user_identity.get("id")
        user_role = user_identity.get("role")

        if not user_id or not user_role:
            return jsonify({"error": "Invalid token. Missing user information."}), 401

        if user_role != 'business_owner':
            return jsonify({"error": "Access denied. Only business owners can submit business info."}), 403

        # Validate request data
        if not request.is_json:
            return jsonify({"error": "Invalid content type, expected JSON."}), 400

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        # Validate required fields
        name = data.get('name')
        email = data.get('email')
        if not name or not email:
            return jsonify({"error": "Name and email are required fields."}), 400

        # Save business info
        business_info = BusinessInfo(
            user_id=user_id,
            name=name,
            description=data.get('description', ""),
            location=data.get('location', ""),
            products=data.get('products', ""),
            website=data.get('website', ""),
            categories=data.get('categories', ""),
            email=email,
            phone=data.get('phone', ""),
            logo=data.get('logo', "default_logo.jpg"),
            created_at=datetime.utcnow()
        )
        db.session.add(business_info)
        db.session.commit()

        print(f"Business Info Saved: {business_info.name} for User ID: {business_info.user_id}")

        return jsonify({"message": "Business information submitted successfully."}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error. Please try again later."}), 500
    
    
    
@main.route('/api/business-info', methods=['GET'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def get_user_business_info():
    try:
        # Get the current user's ID from the JWT
        user_identity = get_jwt_identity()
        print(f"Authenticated User Identity: {user_identity}")

        if not user_identity:
            return jsonify({"error": "User not authenticated."}), 401

        # Extract user ID if `user_identity` is a dictionary
        user_id = user_identity['id'] if isinstance(user_identity, dict) else user_identity

        # Fetch the business info for the specific user
        business_info = BusinessInfo.query.filter_by(user_id=user_id).first()

        if not business_info:
            return jsonify({"error": "No business information found for this user."}), 404

        # Serialize the business information
        business_info_data = {
            "id": business_info.id,
            "name": business_info.name,
            "description": business_info.description,
            "location": business_info.location,
            "products": business_info.products,
            "website": business_info.website,
            "categories": business_info.categories,
            "email": business_info.email,
            "phone": business_info.phone,
            "logo": business_info.logo,
            "created_at": business_info.created_at.isoformat(),
        }

        return jsonify({"business_info": business_info_data}), 200

    except Exception as e:
        print(f"Error fetching business info: {e}")
        return jsonify({"error": "An error occurred while retrieving the business information."}), 500


@main.route('/api/business-info', methods=['PUT'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def update_business_info():
    try:
        # Extract user identity from JWT
        user_identity = get_jwt_identity()
        user_id = user_identity.get("id")
        user_role = user_identity.get("role")

        if not user_id or not user_role:
            return jsonify({"error": "Invalid token. Missing user information."}), 401

        if user_role != 'business_owner':
            return jsonify({"error": "Access denied. Only business owners can update business info."}), 403

        # Validate request data
        if not request.is_json:
            return jsonify({"error": "Invalid content type, expected JSON."}), 400

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        # Validate required fields
        name = data.get('name')
        email = data.get('email')
        if not name or not email:
            return jsonify({"error": "Name and email are required fields."}), 400

        # Find the existing business info for the logged-in user
        business_info = BusinessInfo.query.filter_by(user_id=user_id).first()
        if not business_info:
            return jsonify({"error": "Business information not found for this user."}), 404

        # Update business info fields
        business_info.name = name
        business_info.description = data.get('description', business_info.description)
        business_info.location = data.get('location', business_info.location)
        business_info.products = data.get('products', business_info.products)
        business_info.website = data.get('website', business_info.website)
        business_info.categories = data.get('categories', business_info.categories)
        business_info.email = email
        business_info.phone = data.get('phone', business_info.phone)
        business_info.logo = data.get('logo', business_info.logo)
        business_info.updated_at = datetime.utcnow()

        db.session.commit()

        print(f"Business Info Updated: {business_info.name} for User ID: {business_info.user_id}")

        return jsonify({"message": "Business information updated successfully."}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error. Please try again later."}), 500

@main.route('/api/businesses', methods=['GET'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def get_all_business_info():
    try:
        # Fetch all business info posted by business owners
        businesses = BusinessInfo.query.all()

        # Check if any business information is found
        if not businesses:
            return jsonify({"error": "No business information found."}), 404

        # Serialize the business information
        businesses_data = []
        for business in businesses:
            business_data = {
                "id": business.id,  # Include the business ID
                "name": business.name,
                "description": business.description,
                "location": business.location,
                "products": business.products,
                "website": business.website,
                "categories": business.categories,
                "email": business.email,
                "phone": business.phone,
                "logo": business.logo,
                "created_at": business.created_at.isoformat(),
            }
            businesses_data.append(business_data)

        return jsonify({"businesses": businesses_data}), 200

    except Exception as e:
        print(f"Error fetching all business info: {e}")
        return jsonify({"error": "An error occurred while retrieving the business information."}), 500

    
@main.route('/api/business-info/<int:business_id>', methods=['DELETE'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def delete_business_info(business_id):
    try:
        user_identity = get_jwt_identity()
        user_id = user_identity.get("id")
        user_role = user_identity.get("role")

        # Log the business_id and user_id for debugging
        print(f"Received business_id: {business_id}, user_id: {user_id}")

        if user_role != 'business_owner':
            return jsonify({"error": "Access denied. Only business owners can delete business info."}), 403

        business_info = BusinessInfo.query.filter_by(id=business_id, user_id=user_id).first()
        if not business_info:
            return jsonify({"error": "Business not found or unauthorized."}), 404

        db.session.delete(business_info)
        db.session.commit()

        return jsonify({"message": "Business information deleted successfully."}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error: {str(e)}")  # Log the error
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500


@main.route('/api/reviews', methods=['POST'])
def submit_review():
    data = request.json
    print("Received data:", data)  # Debug log to verify received data

    business_id = data.get('business_id')  # Dynamically passed from the frontend
    name = data.get('name')  # Reviewer's name
    email = data.get('email')  # Reviewer's email
    review_text = data.get('review')  # Review content
    rating = data.get('rating')  # Rating out of 5

    # Validate inputs
    if not all([business_id, name, email, review_text, rating]):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if the business exists
    business = BusinessInfo.query.get(business_id)
    if not business:
        return jsonify({"error": "Business not found"}), 404

    # Link the review to the business owner
    user_id = business.user_id

    # Create and save the review
    review = Review(
        business_id=business_id,
        user_id=user_id,  # Associate the review with the business owner
        name=name,
        email=email,
        review_text=review_text,
        rating=rating
    )

    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review submitted successfully"}), 201


@main.route('/api/reviews', methods=['GET'])
def get_reviews():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID is missing"}), 400

    # Fetch reviews for the given user_id, using the relationship between the Review and User models
    reviews = Review.query.filter_by(user_id=user_id).all()

    if not reviews:
        return jsonify({"reviews": []}), 200

    reviews_data = [
        {
            "name": review.name,
            "email": review.email,
            "text": review.review_text,
            "rating": review.rating,
        }
        for review in reviews
    ]

    return jsonify({"reviews": reviews_data}), 200