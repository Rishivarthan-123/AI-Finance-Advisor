from sqlalchemy import func, extract

from database import db
from models.transaction import Transaction


class AnalyticsService:

    # ======================================
    # Dashboard Summary
    # ======================================
    @staticmethod
    def dashboard_summary(user_id):

        income = db.session.query(
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Income"
        ).scalar() or 0

        expense = db.session.query(
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Expense"
        ).scalar() or 0

        balance = income - expense

        savings_rate = 0

        if income > 0:
            savings_rate = round(
                (balance / income) * 100,
                2
            )

        return {
            "total_income": income,
            "total_expense": expense,
            "balance": balance,
            "savings_rate": savings_rate
        }

    # ======================================
    # Income vs Expense
    # ======================================
    @staticmethod
    def income_vs_expense(user_id):

        income = db.session.query(
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Income"
        ).scalar() or 0

        expense = db.session.query(
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Expense"
        ).scalar() or 0

        return {
            "income": income,
            "expense": expense
        }

    # ======================================
    # Monthly Expense
    # ======================================
    @staticmethod
    def monthly_expense(user_id):

        rows = db.session.query(
            extract("month", Transaction.transaction_date),
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Expense"
        ).group_by(
            extract("month", Transaction.transaction_date)
        ).all()

        result = []

        for month, amount in rows:

            result.append({
                "month": int(month),
                "expense": amount
            })

        return result

    # ======================================
    # Top Categories
    # ======================================
    @staticmethod
    def top_categories(user_id):

        rows = db.session.query(
            Transaction.category,
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Expense"
        ).group_by(
            Transaction.category
        ).order_by(
            func.sum(Transaction.amount).desc()
        ).limit(5).all()

        result = []

        for category, amount in rows:

            result.append({
                "category": category,
                "amount": amount
            })

        return result

    # ======================================
    # Daily Spending
    # ======================================
    @staticmethod
    def daily_spending(user_id):

        rows = db.session.query(
            Transaction.transaction_date,
            func.sum(Transaction.amount)
        ).filter_by(
            user_id=user_id,
            type="Expense"
        ).group_by(
            Transaction.transaction_date
        ).all()

        result = []

        for date, amount in rows:

            result.append({
                "date": date.strftime("%Y-%m-%d"),
                "amount": amount
            })

        return result