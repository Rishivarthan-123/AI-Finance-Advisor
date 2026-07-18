from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.ai_budget_service import AIBudgetService

ai_budget_bp = Blueprint(
    "ai_budget",
    __name__
)


@ai_budget_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_budget():

    result = AIBudgetService.generate_budget(
        get_jwt_identity()
    )

    if not result["success"]:

        return jsonify(result), 404

    return jsonify(result), 200


@ai_budget_bp.route("/history", methods=["GET"])
@jwt_required()
def history():

    result = AIBudgetService.history(
        get_jwt_identity()
    )

    return jsonify(result), 200