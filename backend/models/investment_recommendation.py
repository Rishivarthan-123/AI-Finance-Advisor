from database import db


class InvestmentRecommendation(db.Model):

    __tablename__ = "investment_recommendations"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    financial_prediction_id = db.Column(
        db.Integer,
        db.ForeignKey("financial_predictions.id")
    )

    emergency_fund = db.Column(
        db.Float
    )

    monthly_sip = db.Column(
        db.Float
    )

    mutual_funds = db.Column(
        db.Float
    )

    fixed_deposit = db.Column(
        db.Float
    )

    gold_etf = db.Column(
        db.Float
    )

    stocks = db.Column(
        db.Float
    )

    bonds = db.Column(
        db.Float
    )

    explanation = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def __init__(
        self,
        user_id,
        financial_prediction_id=None,
        emergency_fund=None,
        monthly_sip=None,
        mutual_funds=None,
        fixed_deposit=None,
        gold_etf=None,
        stocks=None,
        bonds=None,
        explanation=None,
        **kwargs
    ):
        self.user_id = user_id
        self.financial_prediction_id = financial_prediction_id
        self.emergency_fund = emergency_fund
        self.monthly_sip = monthly_sip
        self.mutual_funds = mutual_funds
        self.fixed_deposit = fixed_deposit
        self.gold_etf = gold_etf
        self.stocks = stocks
        self.bonds = bonds
        self.explanation = explanation
        for k, v in kwargs.items():
            setattr(self, k, v)

    def to_dict(self):

        return {

            "id": self.id,

            "user_id": self.user_id,

            "financial_prediction_id":
                self.financial_prediction_id,

            "emergency_fund":
                self.emergency_fund,

            "monthly_sip":
                self.monthly_sip,

            "mutual_funds":
                self.mutual_funds,

            "fixed_deposit":
                self.fixed_deposit,

            "gold_etf":
                self.gold_etf,

            "stocks":
                self.stocks,

            "bonds":
                self.bonds,

            "explanation":
                self.explanation,

            "created_at":
                str(self.created_at)

        }