from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.prediction_service import PredictionService

prediction_bp = Blueprint(
    "prediction",
    __name__
)


# ==========================================
# Financial Health Prediction
# ==========================================

@prediction_bp.route("/financial-health", methods=["POST"])
@jwt_required()
def predict_financial_health():

    data = request.get_json() or {}

    required_fields = [
        "age",
        "occupation",
        "monthly_income",
        "monthly_expense",
        "savings",
        "debt",
        "emi",
        "investment_amount",
        "transaction_count",
        "budget_utilization",
        "savings_rate",
        "risk_level"
    ]

    missing = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing:

        return jsonify({

            "success": False,

            "message":
                f"Missing fields: {', '.join(missing)}"

        }), 400

    user_id = int(get_jwt_identity())

    result = PredictionService.financial_health(
        user_id,
        data
    )

    status = 200 if result.get("success") else 400

    return jsonify(result), status


# ==========================================
# Prediction History
# ==========================================

@prediction_bp.route("/history", methods=["GET"])
@jwt_required()
def prediction_history():

    user_id = int(get_jwt_identity())

    result = PredictionService.history(
        user_id
    )

    return jsonify(result), 200