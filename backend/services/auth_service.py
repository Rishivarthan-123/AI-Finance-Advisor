from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

from database import db
from models.user import User
from validators.auth_validator import AuthValidator

bcrypt = Bcrypt()


class AuthService:

    @staticmethod
    def register_user(data):

        # ----------------------------
        # Normalize Input
        # ----------------------------

        data = AuthValidator.normalize(data)

        # ----------------------------
        # Validate Input
        # ----------------------------

        errors = AuthValidator.validate_register(data)

        if errors:

            return {
                "success": False,
                "message": "Validation failed.",
                "errors": errors
            }

        fullname = data["fullname"]
        email = data["email"]
        phone = data["phone"]
        password = data["password"]

        # ----------------------------
        # Duplicate Email
        # ----------------------------

        existing_email = User.query.filter_by(
            email=email
        ).first()

        if existing_email:

            return {
                "success": False,
                "message": "Email already exists."
            }

        # ----------------------------
        # Duplicate Phone
        # ----------------------------

        existing_phone = User.query.filter_by(
            phone=phone
        ).first()

        if existing_phone:

            return {
                "success": False,
                "message": "Phone number already exists."
            }

        # ----------------------------
        # Hash Password
        # ----------------------------

        hashed_password = (

            bcrypt.generate_password_hash(
                password
            ).decode("utf-8")

        )

        # ----------------------------
        # Create User
        # ----------------------------

        user = User()

        user.fullname = fullname
        user.email = email
        user.phone = phone
        user.password = hashed_password

        db.session.add(user)
        db.session.commit()

        return {

            "success": True,

            "message":
                "Registration successful.",

            "user":
                user.to_dict()

        }

    @staticmethod
    def login_user(data):

        # ----------------------------
        # Normalize Input
        # ----------------------------

        data = AuthValidator.normalize(data)

        # ----------------------------
        # Validate Input
        # ----------------------------

        errors = AuthValidator.validate_login(data)

        if errors:

            return {

                "success": False,

                "message":
                    "Validation failed.",

                "errors":
                    errors

            }

        email = data["email"]
        password = data["password"]

        # ----------------------------
        # Find User
        # ----------------------------

        user = User.query.filter_by(
            email=email
        ).first()

        if user is None:

            return {

                "success": False,

                "message":
                    "User not found."

            }

        # ----------------------------
        # Verify Password
        # ----------------------------

        password_valid = (

            bcrypt.check_password_hash(

                user.password,

                password

            )

        )

        if not password_valid:

            return {

                "success": False,

                "message":
                    "Incorrect password."

            }

        # ----------------------------
        # Generate JWT
        # ----------------------------

        token = create_access_token(

            identity=str(user.id)

        )

        return {

            "success": True,

            "message":
                "Login successful.",

            "token":
                token,

            "user":
                user.to_dict()

        }