from datetime import datetime

from database import db
from models.budget import Budget
from models.transaction import Transaction


class BudgetService:

    @staticmethod
    def add_budget(user_id, data):

        category = data.get("category")
        budget_amount = data.get("budget_amount")
        month = data.get("month")
        year = data.get("year")

        if not all([category, budget_amount, month, year]):

            return {
                "success": False,
                "message": "All fields are required."
            }

        budget = Budget()

        budget.user_id = user_id
        budget.category = category
        budget.budget_amount = float(budget_amount)
        budget.month = int(month)
        budget.year = int(year)

        db.session.add(budget)
        db.session.commit()

        return {

            "success": True,

            "message": "Budget added successfully.",

            "budget": budget.to_dict()

        }

    @staticmethod
    def get_budgets(user_id):

        budgets = (

            Budget.query

            .filter_by(user_id=user_id)

            .order_by(
                Budget.created_at.desc()
            )

            .all()

        )

        return {

            "success": True,

            "count": len(budgets),

            "budgets": [

                budget.to_dict()

                for budget in budgets

            ]

        }

    @staticmethod
    def update_budget(
        budget_id,
        user_id,
        data
    ):

        budget = Budget.query.filter_by(

            id=budget_id,

            user_id=user_id

        ).first()

        if budget is None:

            return {

                "success": False,

                "message": "Budget not found."

            }

        budget.category = data.get(
            "category",
            budget.category
        )

        budget.budget_amount = data.get(
            "budget_amount",
            budget.budget_amount
        )

        budget.month = data.get(
            "month",
            budget.month
        )

        budget.year = data.get(
            "year",
            budget.year
        )

        db.session.commit()

        return {

            "success": True,

            "message": "Budget updated successfully."

        }

    @staticmethod
    def delete_budget(
        budget_id,
        user_id
    ):

        budget = Budget.query.filter_by(

            id=budget_id,

            user_id=user_id

        ).first()

        if budget is None:

            return {

                "success": False,

                "message": "Budget not found."

            }

        db.session.delete(budget)

        db.session.commit()

        return {

            "success": True,

            "message": "Budget deleted successfully."

        }

    @staticmethod
    def budget_status(user_id):

        budgets = Budget.query.filter_by(

            user_id=user_id

        ).all()

        result = []

        for budget in budgets:

            spent = db.session.query(

                db.func.sum(
                    Transaction.amount
                )

            ).filter(

                Transaction.user_id == user_id,

                Transaction.type == "Expense",

                Transaction.category == budget.category,

                db.extract(
                    "month",
                    Transaction.transaction_date
                ) == budget.month,

                db.extract(
                    "year",
                    Transaction.transaction_date
                ) == budget.year

            ).scalar()

            spent = spent or 0

            remaining = budget.budget_amount - spent

            utilization = 0

            if budget.budget_amount > 0:

                utilization = round(

                    (spent / budget.budget_amount) * 100,

                    2

                )

            result.append({

                "category": budget.category,

                "budget": budget.budget_amount,

                "spent": spent,

                "remaining": remaining,

                "utilization": utilization

            })

        return {

            "success": True,

            "status": result

        }

    @staticmethod
    def budget_alerts(user_id):

        status = BudgetService.budget_status(
            user_id
        )["status"]

        alerts = []

        for item in status:

            if item["utilization"] >= 100:

                alerts.append({

                    "category":
                        item["category"],

                    "message":
                        "Budget exceeded."

                })

            elif item["utilization"] >= 80:

                alerts.append({

                    "category":
                        item["category"],

                    "message":
                        "Budget almost reached."

                })

        return {

            "success": True,

            "alerts": alerts

        }