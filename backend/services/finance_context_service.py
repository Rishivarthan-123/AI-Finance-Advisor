from collections import defaultdict

from database import db
from models.user import User
from models.transaction import Transaction
from models.budget import Budget
from models.financial_prediction import FinancialPrediction


class FinanceContextService:
    """
    Central Financial Engine

    Every AI module should use this service.

    Modules

    ✓ Chatbot
    ✓ AI Budget Planner
    ✓ Investment Advisor
    ✓ Goal Planner
    ✓ Dashboard
    ✓ Report Generator
    """

    @staticmethod
    def get_context(user_id):

        # -------------------------
        # User
        # -------------------------

        user = db.session.get(User, user_id)

        if user is None:

            return {

                "profile": {},

                "financial": {},

                "prediction": {},

                "budgets": [],

                "transactions": [],

                "category_expenses": {},

                "overspending": []

            }

        # -------------------------
        # Transactions
        # -------------------------

        transactions = (
            Transaction.query
            .filter_by(user_id=user_id)
            .all()
        )

        # -------------------------
        # Budgets
        # -------------------------

        budgets = (
            Budget.query
            .filter_by(user_id=user_id)
            .all()
        )

        # -------------------------
        # Latest Prediction
        # -------------------------

        prediction = (
            FinancialPrediction.query
            .filter_by(user_id=user_id)
            .order_by(
                FinancialPrediction.prediction_date.desc()
            )
            .first()
        )

        # -------------------------
        # Income
        # -------------------------

        total_income = sum(
            t.amount
            for t in transactions
            if t.type == "Income"
        )

        # -------------------------
        # Expense
        # -------------------------

        total_expense = sum(
            t.amount
            for t in transactions
            if t.type == "Expense"
        )

        # -------------------------
        # Savings
        # -------------------------

        current_savings = (
            total_income -
            total_expense
        )

        # -------------------------
        # Category Expenses
        # -------------------------

        category_expenses = defaultdict(float)

        for transaction in transactions:

            if transaction.type == "Expense":

                category_expenses[
                    transaction.category
                ] += transaction.amount

        category_expenses = dict(category_expenses)

        # Estimate monthly income from transactions if profile is 0
        unique_months = set()
        for t in transactions:
            unique_months.add((t.transaction_date.year, t.transaction_date.month))
        num_months = max(1, len(unique_months))

        estimated_monthly_income = total_income / num_months
        effective_monthly_income = user.monthly_income if (user.monthly_income and user.monthly_income > 0) else estimated_monthly_income

        # -------------------------
        # Expense Ratio
        # -------------------------

        if effective_monthly_income:

            expense_ratio = (
                (total_expense / num_months) /
                effective_monthly_income
            ) * 100

        else:

            expense_ratio = 0

        # -------------------------
        # Saving Ratio
        # -------------------------

        if total_income:

            saving_ratio = (
                current_savings /
                total_income
            ) * 100

        else:

            saving_ratio = 0

        # -------------------------
        # Overspending Detection
        # -------------------------

        overspending = []

        budget_lookup = {

            budget.category:
            budget.budget_amount

            for budget in budgets

        }

        for category, spent in category_expenses.items():

            if category in budget_lookup:

                if spent > budget_lookup[category]:

                    overspending.append({

                        "category": category,

                        "budget": budget_lookup[category],

                        "spent": spent,

                        "exceeded_by":
                            spent -
                            budget_lookup[category]

                    })

        # -------------------------
        # Recent Transactions
        # -------------------------

        recent_transactions = []

        sorted_transactions = sorted(
            transactions,
            key=lambda x: x.transaction_date,
            reverse=True
        )

        for transaction in sorted_transactions[:5]:

            recent_transactions.append({

                "id": transaction.id,

                "category": transaction.category,

                "type": transaction.type,

                "amount": transaction.amount,

                "date": str(
                    transaction.transaction_date
                )

            })

        # -------------------------
        # Prediction Information
        # -------------------------

        if prediction:

            prediction_data = {

                "financial_health":
                    prediction.financial_health,

                "financial_score":
                    prediction.financial_score,

                "confidence":
                    prediction.confidence,

                "recommendation":
                    prediction.recommendation,

                "summary":
                    prediction.gemini_summary

            }

        else:

            prediction_data = {

                "financial_health": "Unknown",

                "financial_score": 0,

                "confidence": 0,

                "recommendation": "",

                "summary": ""

            }

        # -------------------------
        # Profile
        # -------------------------

        profile = {

            "name":
                user.fullname,

            "occupation":
                user.occupation,

            "monthly_income":
                round(effective_monthly_income, 2),

            "risk_level":
                user.risk_level,

            "investment_experience":
                user.investment_experience

        }

        # -------------------------
        # Financial
        # -------------------------

        financial = {

            "total_income":
                round(total_income, 2),

            "total_expense":
                round(total_expense, 2),

            "current_savings":
                round(current_savings, 2),

            "expense_ratio":
                round(expense_ratio, 2),

            "saving_ratio":
                round(saving_ratio, 2)

        }

        # -------------------------
        # Budget Information
        # -------------------------

        budget_list = []

        for budget in budgets:

            spent = category_expenses.get(
                budget.category,
                0
            )

            remaining = budget.budget_amount - spent

            utilization = 0

            if budget.budget_amount > 0:

                utilization = (
                    spent /
                    budget.budget_amount
                ) * 100

            budget_list.append({

                "category":
                    budget.category,

                "budget":
                    round(
                        budget.budget_amount,
                        2
                    ),

                "spent":
                    round(
                        spent,
                        2
                    ),

                "remaining":
                    round(
                        remaining,
                        2
                    ),

                "utilization":
                    round(
                        utilization,
                        2
                    )

            })

        # -------------------------
        # Final Context
        # -------------------------

        return {

            "profile":
                profile,

            "financial":
                financial,

            "prediction":
                prediction_data,

            "budgets":
                budget_list,

            "transactions":
                recent_transactions,

            "category_expenses":
                category_expenses,

            "overspending":
                overspending

        }