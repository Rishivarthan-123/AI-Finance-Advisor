from database import db

from ai.chatbot import FinanceChatbot
from ai.budget_prompt import BUDGET_PROMPT

from services.finance_context_service import FinanceContextService

from models.user import User
from models.ai_budget_plan import AIBudgetPlan


class AIBudgetService:

    chatbot = FinanceChatbot()

    @staticmethod
    def generate_budget(user_id):

        user = db.session.get(User, user_id)

        if user is None:

            return {
                "success": False,
                "message": "User not found."
            }

        context = FinanceContextService.get_context(user_id)

        profile = context["profile"]
        financial = context["financial"]
        prediction = context["prediction"]

        monthly_income = profile["monthly_income"]
        total_expense = financial["total_expense"]
        current_savings = financial["current_savings"]

        if prediction["financial_health"] == "Excellent":

            saving_percent = 30

        elif prediction["financial_health"] == "Good":

            saving_percent = 25

        elif prediction["financial_health"] == "Average":

            saving_percent = 20

        else:

            saving_percent = 10

        recommended_savings = (
            monthly_income * saving_percent
        ) / 100

        recommended_budget = (
            monthly_income -
            recommended_savings
        )

        prompt = f"""
{BUDGET_PROMPT}

User Profile

Name:
{profile["name"]}

Occupation:
{profile["occupation"]}

Monthly Income:
₹{monthly_income}

Risk Level:
{profile["risk_level"]}

Investment Experience:
{profile["investment_experience"]}

Financial Summary

Total Expense:
₹{total_expense}

Current Savings:
₹{current_savings}

Expense Ratio:
{financial["expense_ratio"]}%

Saving Ratio:
{financial["saving_ratio"]}%

Financial Health:
{prediction["financial_health"]}

Financial Score:
{prediction["financial_score"]}

Current Budgets

{context["budgets"]}

Category Expenses

{context["category_expenses"]}

Overspending Categories

{context["overspending"]}

Recommended Budget:
₹{recommended_budget}

Recommended Savings:
₹{recommended_savings}

Explain everything clearly.

Do not change the calculated values.
"""

        explanation = AIBudgetService.chatbot.ask(
            prompt
        )

        plan = AIBudgetPlan()

        plan.user_id = user.id
        plan.monthly_income = monthly_income
        plan.total_expense = total_expense
        plan.current_savings = current_savings
        plan.financial_health = prediction["financial_health"]
        plan.financial_score = prediction["financial_score"]
        plan.expense_ratio = financial["expense_ratio"]
        plan.saving_ratio = financial["saving_ratio"]
        plan.risk_level = profile["risk_level"]
        plan.recommended_budget = recommended_budget
        plan.recommended_savings = recommended_savings
        plan.ai_explanation = explanation

        db.session.add(plan)
        db.session.commit()

        return {

            "success": True,

            "budget_snapshot": {

                "monthly_income": monthly_income,

                "total_expense": total_expense,

                "current_savings": current_savings,

                "financial_health":
                    prediction["financial_health"],

                "financial_score":
                    prediction["financial_score"]

            },

            "recommendation": {

                "recommended_budget":
                    round(recommended_budget, 2),

                "recommended_savings":
                    round(recommended_savings, 2),

                "saving_percentage":
                    saving_percent

            },

            "ai_explanation":

                explanation

        }

    @staticmethod
    def history(user_id):

        plans = (

            AIBudgetPlan.query

            .filter_by(user_id=user_id)

            .order_by(
                AIBudgetPlan.created_at.desc()
            )

            .all()

        )

        return {

            "success": True,

            "count": len(plans),

            "history": [

                plan.to_dict()

                for plan in plans

            ]

        }