from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.analytics_service import AnalyticsService

analytics_bp = Blueprint("analytics", __name__)


# =====================================
# Dashboard Summary
# =====================================
@analytics_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():

    user_id = int(get_jwt_identity())

    result = AnalyticsService.dashboard_summary(user_id)

    return jsonify(result), 200


# =====================================
# Income vs Expense
# =====================================
@analytics_bp.route("/income-expense", methods=["GET"])
@jwt_required()
def income_expense():

    user_id = int(get_jwt_identity())

    result = AnalyticsService.income_vs_expense(user_id)

    return jsonify(result), 200


# =====================================
# Monthly Expense
# =====================================
@analytics_bp.route("/monthly-expense", methods=["GET"])
@jwt_required()
def monthly_expense():

    user_id = int(get_jwt_identity())

    result = AnalyticsService.monthly_expense(user_id)

    return jsonify(result), 200


# =====================================
# Top Categories
# =====================================
@analytics_bp.route("/top-categories", methods=["GET"])
@jwt_required()
def top_categories():

    user_id = int(get_jwt_identity())

    result = AnalyticsService.top_categories(user_id)

    return jsonify(result), 200


# =====================================
# Daily Spending
# =====================================
@analytics_bp.route("/daily-spending", methods=["GET"])
@jwt_required()
def daily_spending():

    user_id = int(get_jwt_identity())

    result = AnalyticsService.daily_spending(user_id)

    return jsonify(result), 200