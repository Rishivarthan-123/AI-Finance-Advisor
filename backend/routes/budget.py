from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.budget_service import BudgetService

budget_bp = Blueprint(
    "budgets",
    __name__
)


# ====================================
# Add Budget
# ====================================

@budget_bp.route("/add", methods=["POST"])
@jwt_required()
def add_budget():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    result = BudgetService.add_budget(
        user_id,
        data
    )

    status = 201 if result["success"] else 400

    return jsonify(result), status


# ====================================
# Get All Budgets
# ====================================

@budget_bp.route("/", methods=["GET"])
@jwt_required()
def get_budgets():

    user_id = int(get_jwt_identity())

    result = BudgetService.get_budgets(
        user_id
    )

    return jsonify(result), 200


# ====================================
# Update Budget
# ====================================

@budget_bp.route("/<budget_id>", methods=["PUT"])
@jwt_required()
def update_budget(budget_id):

    user_id = int(get_jwt_identity())

    data = request.get_json()

    result = BudgetService.update_budget(
        budget_id,
        user_id,
        data
    )

    status = 200 if result["success"] else 404

    return jsonify(result), status


# ====================================
# Delete Budget
# ====================================

@budget_bp.route("/<budget_id>", methods=["DELETE"])
@jwt_required()
def delete_budget(budget_id):

    user_id = int(get_jwt_identity())

    result = BudgetService.delete_budget(
        budget_id,
        user_id
    )

    status = 200 if result["success"] else 404

    return jsonify(result), status


# ====================================
# Budget Status
# ====================================

@budget_bp.route("/status", methods=["GET"])
@jwt_required()
def budget_status():

    user_id = int(get_jwt_identity())

    result = BudgetService.budget_status(
        user_id
    )

    return jsonify(result), 200


# ====================================
# Budget Alerts
# ====================================

@budget_bp.route("/alerts", methods=["GET"])
@jwt_required()
def budget_alerts():

    user_id = int(get_jwt_identity())

    result = BudgetService.budget_alerts(
        user_id
    )

    return jsonify(result), 200