from database import db

from models.user import User
from models.financial_prediction import FinancialPrediction

from ml.prediction.predictor import (
    FinancialHealthPredictor
)

from ai.chatbot import FinanceChatbot


class PredictionService:

    chatbot = FinanceChatbot()

    @staticmethod
    def calculate_score(data, prediction):

        score = 50

        income = float(data["monthly_income"])
        expense = float(data["monthly_expense"])
        savings = float(data["savings"])
        debt = float(data["debt"])
        investment = float(data["investment_amount"])

        # Savings Ratio
        if income > 0:

            savings_ratio = (
                savings / income
            ) * 100

            if savings_ratio >= 30:

                score += 20

            elif savings_ratio >= 20:

                score += 15

            elif savings_ratio >= 10:

                score += 10

        # Expense Ratio
        if income > 0:

            expense_ratio = (
                expense / income
            ) * 100

            if expense_ratio < 50:

                score += 15

            elif expense_ratio < 70:

                score += 10

            elif expense_ratio < 90:

                score += 5

        # Debt

        if debt == 0:

            score += 10

        elif debt < income * 0.3:

            score += 5

        else:

            score -= 10

        # Investment

        if investment > income * 0.2:

            score += 10

        elif investment > income * 0.1:

            score += 5

        # ML Prediction Adjustment

        if prediction == "Excellent":

            score += 10

        elif prediction == "Good":

            score += 5

        elif prediction == "Poor":

            score -= 10

        score = max(0, min(100, round(score)))

        return score

    @staticmethod
    def financial_health(user_id, data):

        user = db.session.get(
            User,
            user_id
        )

        if user is None:

            return {

                "success": False,

                "message": "User not found."

            }

        prediction, confidence = (

            FinancialHealthPredictor.predict(
                data
            )

        )

        financial_score = (

            PredictionService.calculate_score(

                data,

                prediction

            )

        )

        prompt = f"""
You are a certified financial advisor.

Financial Health:
{prediction}

Confidence:
{confidence}%

Financial Score:
{financial_score}/100

Monthly Income:
₹{data["monthly_income"]}

Monthly Expense:
₹{data["monthly_expense"]}

Savings:
₹{data["savings"]}

Debt:
₹{data["debt"]}

Investment:
₹{data["investment_amount"]}

Give:

1. Summary

2. Recommendations

3. Areas to improve

Keep it concise.
"""

        explanation = PredictionService.chatbot.ask(
            prompt
        )
        # ----------------------------------------
        # Recommendation Extraction
        # ----------------------------------------

        recommendation = explanation

        # ----------------------------------------
        # Save Prediction
        # ----------------------------------------

        prediction_record = FinancialPrediction(

            user_id=user.id,

            financial_health=prediction,

            confidence=confidence,

            financial_score=financial_score,

            monthly_income=data["monthly_income"],

            monthly_expense=data["monthly_expense"],

            savings=data["savings"],

            debt=data["debt"],

            investment_amount=data["investment_amount"],

            gemini_summary=explanation,

            recommendation=recommendation

        )

        db.session.add(
            prediction_record
        )

        db.session.commit()

        return {

            "success": True,

            "prediction": {

                "financial_health": prediction,

                "confidence": confidence,

                "financial_score": financial_score

            },

            "financial_data": {

                "monthly_income":
                    data["monthly_income"],

                "monthly_expense":
                    data["monthly_expense"],

                "savings":
                    data["savings"],

                "debt":
                    data["debt"],

                "investment":
                    data["investment_amount"]

            },

            "gemini_summary":

                explanation,

            "recommendation":

                recommendation

        }

    @staticmethod
    def history(user_id):

        predictions = (

            FinancialPrediction.query

            .filter_by(
                user_id=user_id
            )

            .order_by(
                FinancialPrediction.prediction_date.desc()
            )

            .all()

        )

        return {

            "success": True,

            "count": len(
                predictions
            ),

            "history": [

                prediction.to_dict()

                for prediction in predictions

            ]

        }