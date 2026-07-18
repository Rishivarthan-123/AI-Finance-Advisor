import uuid
from datetime import datetime

from database import db


class Budget(db.Model):

    __tablename__ = "budgets"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    category = db.Column(
        db.String(50),
        nullable=False
    )

    budget_amount = db.Column(
        db.Float,
        nullable=False
    )

    month = db.Column(
        db.Integer,
        nullable=False
    )

    year = db.Column(
        db.Integer,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):

        return {

            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "budget_amount": self.budget_amount,
            "month": self.month,
            "year": self.year,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")

        }