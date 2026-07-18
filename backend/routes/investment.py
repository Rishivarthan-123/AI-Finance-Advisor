from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.investment_service import InvestmentService

investment_bp = Blueprint(
    "investment",
    __name__
)


@investment_bp.route(
    "/recommend",
    methods=["GET"]
)
@jwt_required()
def recommend():

    user_id = int(get_jwt_identity())

    result = InvestmentService.generate_plan(
        user_id
    )

    return jsonify(result), 200
@investment_bp.route(
    "/history",
    methods=["GET"]
)
@jwt_required()
def history():

    user_id = int(get_jwt_identity())

    result = InvestmentService.history(
        user_id
    )

    return jsonify(result)