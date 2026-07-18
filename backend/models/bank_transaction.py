from database import db


class StatementTransaction(db.Model):
    __tablename__ = "statement_transactions"

    id = db.Column(db.Integer, primary_key=True)

    statement_id = db.Column(
        db.Integer,
        db.ForeignKey("bank_statements.id"),
        nullable=False
    )

    transaction_date = db.Column(db.Date)

    description = db.Column(db.String(300))

    debit = db.Column(db.Float, default=0)

    credit = db.Column(db.Float, default=0)

    balance = db.Column(db.Float)

    category = db.Column(db.String(100))

    merchant = db.Column(db.String(150))

    transaction_type = db.Column(db.String(50))

    ai_summary = db.Column(db.Text)