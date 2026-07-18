from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.user import User

profile_bp = Blueprint("profile", __name__)


# ==========================
# Get Profile
# ==========================
@profile_bp.route("/me", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = get_jwt_identity()

    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "profile": user.to_dict()
    }), 200


# ==========================
# Update Profile
# ==========================
@profile_bp.route("/update", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    data = request.get_json()

    user.age = data.get("age", user.age)
    user.occupation = data.get("occupation", user.occupation)
    user.monthly_income = data.get("monthly_income", user.monthly_income)
    user.savings_goal = data.get("savings_goal", user.savings_goal)
    user.risk_level = data.get("risk_level", user.risk_level)
    user.investment_experience = data.get(
        "investment_experience",
        user.investment_experience
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Profile Updated Successfully",
        "profile": user.to_dict()
    }), 200