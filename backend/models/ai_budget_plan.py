from datetime import datetime

from database import db


class AIBudgetPlan(db.Model):
    __tablename__ = "ai_budget_plans"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # User Financial Snapshot

    monthly_income = db.Column(
        db.Float,
        nullable=False
    )

    total_expense = db.Column(
        db.Float,
        nullable=False
    )

    current_savings = db.Column(
        db.Float,
        nullable=False
    )

    # Financial Health

    financial_health = db.Column(
        db.String(30),
        nullable=False
    )

    financial_score = db.Column(
        db.Float,
        nullable=False
    )

    # Financial Ratios

    expense_ratio = db.Column(
        db.Float,
        nullable=False
    )

    saving_ratio = db.Column(
        db.Float,
        nullable=False
    )

    # User Risk Profile

    risk_level = db.Column(
        db.String(30),
        nullable=False
    )

    # AI Recommendation

    recommended_budget = db.Column(
        db.Float,
        nullable=False
    )

    recommended_savings = db.Column(
        db.Float,
        nullable=False
    )

    ai_explanation = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):

        return {

            "id": self.id,

            "monthly_income": self.monthly_income,

            "total_expense": self.total_expense,

            "current_savings": self.current_savings,

            "financial_health": self.financial_health,

            "financial_score": self.financial_score,

            "expense_ratio": round(
                self.expense_ratio,
                2
            ),

            "saving_ratio": round(
                self.saving_ratio,
                2
            ),

            "risk_level": self.risk_level,

            "recommended_budget":
                round(
                    self.recommended_budget,
                    2
                ),

            "recommended_savings":
                round(
                    self.recommended_savings,
                    2
                ),

            "ai_explanation":
                self.ai_explanation,

            "created_at":
                self.created_at.strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

        }