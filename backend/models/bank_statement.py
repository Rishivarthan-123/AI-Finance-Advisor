from database import db
from datetime import datetime


class BankStatement(db.Model):
    __tablename__ = "bank_statements"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    file_name = db.Column(db.String(255), nullable=False)

    original_name = db.Column(db.String(255))

    bank_name = db.Column(db.String(100))

    account_number = db.Column(db.String(50))

    statement_period = db.Column(db.String(100))

    upload_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    transactions = db.relationship(
        "StatementTransaction",
        backref="statement",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __init__(
        self,
        user_id,
        file_name,
        original_name=None,
        bank_name=None,
        account_number=None,
        statement_period=None,
        upload_date=None,
        **kwargs
    ):
        self.user_id = user_id
        self.file_name = file_name
        self.original_name = original_name
        self.bank_name = bank_name
        self.account_number = account_number
        self.statement_period = statement_period
        if upload_date is not None:
            self.upload_date = upload_date
        for key, value in kwargs.items():
            setattr(self, key, value)