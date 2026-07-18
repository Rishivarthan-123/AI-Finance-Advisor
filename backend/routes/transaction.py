from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.transaction_service import TransactionService

transaction_bp = Blueprint("transactions", __name__)


# ==========================
# Add Transaction
# ==========================
@transaction_bp.route("/add", methods=["POST"])
@jwt_required()
def add_transaction():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    result = TransactionService.add_transaction(
        user_id,
        data
    )

    if result["success"]:
        return jsonify(result), 201

    return jsonify(result), 400


# ==========================
# Get All Transactions
# ==========================
@transaction_bp.route("/", methods=["GET"])
@jwt_required()
def get_transactions():

    user_id = int(get_jwt_identity())

    transactions = TransactionService.get_transactions(user_id)

    return jsonify({
        "success": True,
        "transactions": transactions
    }), 200


# ==========================
# Update Transaction
# ==========================
@transaction_bp.route("/<transaction_id>", methods=["PUT"])
@jwt_required()
def update_transaction(transaction_id):

    user_id = int(get_jwt_identity())

    data = request.get_json()

    result = TransactionService.update_transaction(
        transaction_id,
        user_id,
        data
    )

    if result["success"]:
        return jsonify(result)

    return jsonify(result), 404


# ==========================
# Delete Transaction
# ==========================
@transaction_bp.route("/<transaction_id>", methods=["DELETE"])
@jwt_required()
def delete_transaction(transaction_id):

    user_id = int(get_jwt_identity())

    result = TransactionService.delete_transaction(
        transaction_id,
        user_id
    )

    if result["success"]:
        return jsonify(result)

    return jsonify(result), 404


# ==========================
# Monthly Summary
# ==========================
@transaction_bp.route("/monthly-summary", methods=["GET"])
@jwt_required()
def monthly_summary():

    user_id = int(get_jwt_identity())

    summary = TransactionService.monthly_summary(user_id)

    return jsonify(summary)


# ==========================
# Category Summary
# ==========================
@transaction_bp.route("/category-summary", methods=["GET"])
@jwt_required()
def category_summary():

    user_id = int(get_jwt_identity())

    summary = TransactionService.category_summary(user_id)

    return jsonify(summary)