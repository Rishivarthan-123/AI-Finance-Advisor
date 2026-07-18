from database import db


class BillReminder(db.Model):

    __tablename__ = "bill_reminders"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    bill_name = db.Column(
        db.String(100),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    due_date = db.Column(
        db.Date,
        nullable=False
    )

    reminder_days = db.Column(
        db.Integer,
        default=3
    )

    is_paid = db.Column(
        db.Boolean,
        default=False
    )

    reminder_sent = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):

        return {

            "id": self.id,

            "bill_name": self.bill_name,

            "amount": self.amount,

            "due_date": self.due_date,

            "is_paid": self.is_paid
        }