from database import db

from models.user import User
from models.financial_prediction import FinancialPrediction
from models.investment_recommendation import InvestmentRecommendation

from ai.chatbot import FinanceChatbot
from ai.investment_prompt import INVESTMENT_PROMPT


class InvestmentService:

    chatbot = FinanceChatbot()
    @staticmethod
    def history(user_id):

        recommendations = (
            InvestmentRecommendation.query
            .filter_by(user_id=user_id)
            .order_by(
                InvestmentRecommendation.created_at.desc()
            )
            .all()
        )

        return {
            "success": True,
            "history": [
                r.to_dict()
                for r in recommendations
            ]
        }
    @staticmethod
    def generate_plan(user_id):

        user = db.session.get(User, user_id)

        if user is None:
            return {
                "success": False,
                "message": "User not found."
            }

        prediction = (
            FinancialPrediction.query
            .filter_by(user_id=user_id)
            .order_by(FinancialPrediction.prediction_date.desc())
            .first()
        )

        if prediction is None:
            return {
                "success": False,
                "message": "Please generate a financial prediction first."
            }

        from services.finance_context_service import FinanceContextService
        context = FinanceContextService.get_context(user_id)
        income = context["profile"].get("monthly_income") or 0.0

        # Emergency fund (6 months income)
        emergency_fund = income * 6

        # Monthly SIP recommendation
        if prediction.financial_health == "Excellent":
            sip = income * 0.25

        elif prediction.financial_health == "Good":
            sip = income * 0.20

        elif prediction.financial_health == "Average":
            sip = income * 0.15

        else:
            sip = income * 0.10

        # Portfolio Allocation based on Risk Level

        risk = (user.risk_level or "").lower()

        if risk == "low":

            mutual_funds = 20
            stocks = 10
            fixed_deposit = 40
            gold = 20
            bonds = 10

        elif risk == "moderate":

            mutual_funds = 40
            stocks = 20
            fixed_deposit = 20
            gold = 10
            bonds = 10

        else:

            mutual_funds = 50
            stocks = 30
            fixed_deposit = 10
            gold = 5
            bonds = 5

        prompt = f"""
{INVESTMENT_PROMPT}

User Details

Monthly Income: ₹{income}

Risk Level: {user.risk_level}

Investment Experience:
{user.investment_experience}

Financial Health:
{prediction.financial_health}

Financial Score:
{prediction.financial_score}

Generate a personalized investment plan.

Rules:

- Emergency fund must be 6 months of monthly income.
- Monthly SIP should match the calculated SIP amount.
- Explain the recommendation based on the calculated values.
- Do not invent different amounts.
"""

        explanation = InvestmentService.chatbot.ask(prompt)

        # Save recommendation to database

        recommendation = InvestmentRecommendation(

            user_id=user.id,

            financial_prediction_id=prediction.id,

            emergency_fund=emergency_fund,

            monthly_sip=sip,

            mutual_funds=mutual_funds,

            fixed_deposit=fixed_deposit,

            gold_etf=gold,

            stocks=stocks,

            bonds=bonds,

            explanation=explanation

        )

        db.session.add(recommendation)
        db.session.commit()

        return {

            "success": True,

            "financial_health": prediction.financial_health,

            "financial_score": prediction.financial_score,

            "emergency_fund": round(emergency_fund, 2),

            "monthly_sip": round(sip, 2),

            "mutual_funds": mutual_funds,

            "stocks": stocks,

            "fixed_deposit": fixed_deposit,

            "gold": gold,

            "bonds": bonds,

            "ai_explanation": explanation

        }
    