from datetime import datetime

from models.reminder import Reminder
from database import db


class ReminderService:

    @staticmethod
    def add_reminder(user_id, data):

        reminder = Reminder(
            user_id=user_id,
            title=data["title"],
            amount=data["amount"],
            category=data["category"],
            due_date=datetime.strptime(
                data["due_date"],
                "%Y-%m-%d"
            ).date(),
            status="Pending"
        )

        db.session.add(reminder)
        db.session.commit()

        return reminder

    @staticmethod
    def get_reminders(user_id):

        return Reminder.query.filter_by(
            user_id=user_id
        ).all()

    @staticmethod
    def update_reminder(reminder_id, user_id, data):

        reminder = Reminder.query.filter_by(
            id=reminder_id,
            user_id=user_id
        ).first()

        if not reminder:
            return None

        reminder.title = data.get(
            "title",
            reminder.title
        )

        reminder.amount = data.get(
            "amount",
            reminder.amount
        )

        reminder.category = data.get(
            "category",
            reminder.category
        )

        if "due_date" in data:

            reminder.due_date = datetime.strptime(
                data["due_date"],
                "%Y-%m-%d"
            ).date()

        db.session.commit()

        return reminder

    @staticmethod
    def delete_reminder(reminder_id, user_id):

        reminder = Reminder.query.filter_by(
            id=reminder_id,
            user_id=user_id
        ).first()

        if not reminder:
            return False

        db.session.delete(reminder)
        db.session.commit()

        return True

    @staticmethod
    def mark_paid(reminder_id, user_id):

        reminder = Reminder.query.filter_by(
            id=reminder_id,
            user_id=user_id
        ).first()

        if not reminder:
            return None

        reminder.status = "Paid"

        db.session.commit()

        return reminder

    @staticmethod
    def upcoming(user_id):

        today = datetime.today().date()

        return Reminder.query.filter(
            Reminder.user_id == user_id,
            Reminder.due_date >= today,
            Reminder.status == "Pending"
        ).all()

    @staticmethod
    def overdue(user_id):

        today = datetime.today().date()

        reminders = Reminder.query.filter(
            Reminder.user_id == user_id,
            Reminder.due_date < today,
            Reminder.status == "Pending"
        ).all()

        for r in reminders:
            r.status = "Overdue"

        db.session.commit()

        return reminders