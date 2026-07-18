from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from services.auth_service import AuthService
from models.user import User

auth_bp = Blueprint("auth", __name__)


# =====================================
# Register User
# =====================================
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    result = AuthService.register_user(data)

    if result["success"]:
        return jsonify({
            "success": True,
            "message": result["message"]
        }), 201

    return jsonify({
        "success": False,
        "message": result["message"]
    }), 400


# =====================================
# Login User
# =====================================
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    result = AuthService.login_user(data)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 401


# =====================================
# Current Logged User
# =====================================
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def current_user():

    user_id = get_jwt_identity()

    user = db.session.get(User, int(user_id))

    if user is None:

        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({

        "success": True,

        "user": user.to_dict()

    }), 200


# =====================================
# Logout
# =====================================
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():

    return jsonify({

        "success": True,

        "message": "Logout Successful"

    }), 200