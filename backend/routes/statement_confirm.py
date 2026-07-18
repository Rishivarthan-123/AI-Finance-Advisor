from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.statement_confirm_service import StatementConfirmService

confirm_bp = Blueprint(
    "statement_confirm",
    __name__
)


@confirm_bp.route("/confirm", methods=["POST"])
@jwt_required()
def confirm():

    data = request.get_json()

    transactions = data.get("transactions", [])

    if not transactions:

        return jsonify({
            "success": False,
            "message": "No transactions received."
        }), 400

    user_id = int(get_jwt_identity())

    result = StatementConfirmService.confirm(
        user_id,
        transactions
    )

    return jsonify(result)