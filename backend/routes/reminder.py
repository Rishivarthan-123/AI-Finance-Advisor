from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.reminder_service import ReminderService

reminder_bp = Blueprint(
    "reminder",
    __name__
)


@reminder_bp.route("/add", methods=["POST"])
@jwt_required()
def add():

    reminder = ReminderService.add_reminder(
        get_jwt_identity(),
        request.json
    )

    return jsonify({
        "message": "Reminder Added",
        "id": reminder.id
    }), 201


@reminder_bp.route("/", methods=["GET"])
@jwt_required()
def get_all():

    reminders = ReminderService.get_reminders(
        get_jwt_identity()
    )

    result = []

    for r in reminders:

        result.append({
            "id": r.id,
            "title": r.title,
            "amount": r.amount,
            "category": r.category,
            "due_date": str(r.due_date),
            "status": r.status
        })

    return jsonify(result)


@reminder_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update(id):

    reminder = ReminderService.update_reminder(
        id,
        get_jwt_identity(),
        request.json
    )

    if not reminder:

        return jsonify({
            "message": "Reminder not found"
        }), 404

    return jsonify({
        "message": "Reminder Updated"
    })


@reminder_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete(id):

    success = ReminderService.delete_reminder(
        id,
        get_jwt_identity()
    )

    if not success:

        return jsonify({
            "message": "Reminder not found"
        }), 404

    return jsonify({
        "message": "Reminder Deleted"
    })


@reminder_bp.route("/paid/<int:id>", methods=["PUT"])
@jwt_required()
def paid(id):

    reminder = ReminderService.mark_paid(
        id,
        get_jwt_identity()
    )

    if not reminder:

        return jsonify({
            "message": "Reminder not found"
        }), 404

    return jsonify({
        "message": "Marked Paid"
    })


@reminder_bp.route("/upcoming", methods=["GET"])
@jwt_required()
def upcoming():

    reminders = ReminderService.upcoming(
        get_jwt_identity()
    )

    result = []

    for r in reminders:

        result.append({
            "title": r.title,
            "amount": r.amount,
            "due_date": str(r.due_date)
        })

    return jsonify(result)


@reminder_bp.route("/overdue", methods=["GET"])
@jwt_required()
def overdue():

    reminders = ReminderService.overdue(
        get_jwt_identity()
    )

    result = []

    for r in reminders:

        result.append({
            "title": r.title,
            "amount": r.amount,
            "due_date": str(r.due_date)
        })

    return jsonify(result)