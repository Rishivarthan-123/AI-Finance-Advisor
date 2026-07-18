from database import db


class FinancialPrediction(db.Model):

    __tablename__ = "financial_predictions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    financial_health = db.Column(
        db.String(30),
        nullable=False
    )

    confidence = db.Column(
        db.Float,
        nullable=False
    )

    financial_score = db.Column(
        db.Integer,
        nullable=False
    )

    gemini_summary = db.Column(
        db.Text
    )

    recommendation = db.Column(
        db.Text
    )

    monthly_income = db.Column(
        db.Float
    )

    monthly_expense = db.Column(
        db.Float
    )

    savings = db.Column(
        db.Float
    )

    debt = db.Column(
        db.Float
    )

    investment_amount = db.Column(
        db.Float
    )

    prediction_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def __init__(
        self,
        user_id,
        financial_health,
        confidence,
        financial_score,
        monthly_income=None,
        monthly_expense=None,
        savings=None,
        debt=None,
        investment_amount=None,
        gemini_summary=None,
        recommendation=None,
        **kwargs
    ):
        self.user_id = user_id
        self.financial_health = financial_health
        self.confidence = confidence
        self.financial_score = financial_score
        self.monthly_income = monthly_income
        self.monthly_expense = monthly_expense
        self.savings = savings
        self.debt = debt
        self.investment_amount = investment_amount
        self.gemini_summary = gemini_summary
        self.recommendation = recommendation
        for k, v in kwargs.items():
            setattr(self, k, v)

    def to_dict(self):

        return {

            "id": self.id,

            "user_id": self.user_id,

            "financial_health": self.financial_health,

            "confidence": self.confidence,

            "financial_score": self.financial_score,

            "gemini_summary": self.gemini_summary,

            "recommendation": self.recommendation,

            "prediction_date": self.prediction_date
        }