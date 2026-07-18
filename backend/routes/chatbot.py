from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from services.chatbot_service import ChatbotService

chatbot_bp = Blueprint("chatbot", __name__)


@chatbot_bp.route("/chat", methods=["POST"])
@jwt_required()
def chat():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    message = data.get("message")

    if not message:

        return jsonify({
            "success": False,
            "message": "Message required"
        }), 400

    result = ChatbotService.ask(
        user_id,
        message
    )

    return jsonify(result)