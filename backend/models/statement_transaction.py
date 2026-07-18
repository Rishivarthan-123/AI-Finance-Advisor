from database import db


class StatementTransaction(db.Model):

    __tablename__ = "statement_transactions"

    id = db.Column(db.Integer, primary_key=True)

    statement_id = db.Column(
        db.Integer,
        db.ForeignKey("bank_statements.id"),
        nullable=False
    )

    date = db.Column(db.Date)

    description = db.Column(db.String(300))

    debit = db.Column(db.Float, default=0)

    credit = db.Column(db.Float, default=0)

    balance = db.Column(db.Float)

    category = db.Column(db.String(100))

    merchant = db.Column(db.String(150))

    def __init__(
        self,
        statement_id,
        date=None,
        description=None,
        debit: float = 0.0,
        credit: float = 0.0,
        balance: float | None = None,
        category=None,
        merchant=None,
        **kwargs
    ):
        self.statement_id = statement_id
        self.date = date
        self.description = description
        self.debit = debit
        self.credit = credit
        self.balance = balance
        self.category = category
        self.merchant = merchant
        for key, value in kwargs.items():
            setattr(self, key, value)