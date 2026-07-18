import uuid
from datetime import datetime

from database import db


class Transaction(db.Model):
    __tablename__ = "transactions"

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

    title = db.Column(
        db.String(100),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    type = db.Column(
        db.String(20),
        nullable=False
    )  # Income / Expense

    category = db.Column(
        db.String(50),
        nullable=False
    )

    payment_method = db.Column(
        db.String(50),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    source = db.Column(
        db.String(50),
        nullable=True
    )

    transaction_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __init__(
        self,
        user_id,
        title,
        amount,
        type,
        category,
        payment_method,
        description,
        transaction_date,
        source=None,
        created_at=None,
        **kwargs
    ):
        self.user_id = user_id
        self.title = title
        self.amount = amount
        self.type = type
        self.category = category
        self.payment_method = payment_method
        self.description = description
        self.transaction_date = transaction_date
        self.source = source
        if created_at is not None:
            self.created_at = created_at
        for key, value in kwargs.items():
            setattr(self, key, value)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "amount": self.amount,
            "type": self.type,
            "category": self.category,
            "payment_method": self.payment_method,
            "description": self.description,
            "transaction_date": self.transaction_date.strftime("%Y-%m-%d"),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }