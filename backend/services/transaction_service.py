from datetime import datetime
from sqlalchemy import func

from database import db
from models.transaction import Transaction


class TransactionService:

    # ==========================
    # Add Transaction
    # ==========================
    @staticmethod
    def add_transaction(user_id, data):

        try:

            transaction = Transaction(

                user_id=user_id,

                title=data["title"],

                amount=float(data["amount"]),

                type=data["type"],

                category=data["category"],

                payment_method=data["payment_method"],

                description=data.get("description", ""),

                transaction_date=datetime.strptime(
                    data["transaction_date"],
                    "%Y-%m-%d"
                ).date(),

                source="Manual"

            )

            db.session.add(transaction)
            db.session.commit()

            return {
                "success": True,
                "message": "Transaction Added Successfully",
                "transaction": transaction.to_dict()
            }

        except Exception as e:

            db.session.rollback()

            return {
                "success": False,
                "message": str(e)
            }

    # ==========================
    # Get Transactions
    # ==========================
    @staticmethod
    def get_transactions(user_id):

        transactions = (
            Transaction.query
            .filter_by(user_id=user_id)
            .order_by(Transaction.transaction_date.desc())  # type: ignore
            .all()
        )

        return [t.to_dict() for t in transactions]

    # ==========================
    # Update Transaction
    # ==========================
    @staticmethod
    def update_transaction(transaction_id, user_id, data):

        transaction = Transaction.query.filter_by(
            id=transaction_id,
            user_id=user_id
        ).first()

        if not transaction:

            return {
                "success": False,
                "message": "Transaction not found"
            }

        transaction.title = data.get(
            "title",
            transaction.title
        )

        transaction.amount = float(
            data.get(
                "amount",
                transaction.amount
            )
        )

        transaction.type = data.get(
            "type",
            transaction.type
        )

        transaction.category = data.get(
            "category",
            transaction.category
        )

        transaction.payment_method = data.get(
            "payment_method",
            transaction.payment_method
        )

        transaction.description = data.get(
            "description",
            transaction.description
        )

        if "transaction_date" in data:

            transaction.transaction_date = datetime.strptime(
                data["transaction_date"],
                "%Y-%m-%d"
            ).date()

        db.session.commit()

        return {
            "success": True,
            "message": "Transaction Updated",
            "transaction": transaction.to_dict()
        }

    # ==========================
    # Delete Transaction
    # ==========================
    @staticmethod
    def delete_transaction(transaction_id, user_id):

        transaction = Transaction.query.filter_by(
            id=transaction_id,
            user_id=user_id
        ).first()

        if not transaction:

            return {
                "success": False,
                "message": "Transaction not found"
            }

        db.session.delete(transaction)
        db.session.commit()

        return {
            "success": True,
            "message": "Transaction Deleted"
        }

    # ==========================
    # Monthly Summary
    # ==========================
    @staticmethod
    def monthly_summary(user_id):

        income = (
            db.session.query(
                func.sum(Transaction.amount)  # type: ignore
            )
            .filter_by(
                user_id=user_id,
                type="Income"
            )
            .scalar()
            or 0
        )

        expense = (
            db.session.query(
                func.sum(Transaction.amount)  # type: ignore
            )
            .filter_by(
                user_id=user_id,
                type="Expense"
            )
            .scalar()
            or 0
        )

        return {
            "total_income": income,
            "total_expense": expense,
            "balance": income - expense
        }

    # ==========================
    # Category Summary
    # ==========================
    @staticmethod
    def category_summary(user_id):

        data = (
            db.session.query(  # type: ignore
                Transaction.category,  # type: ignore
                func.sum(Transaction.amount)  # type: ignore
            )
            .filter_by(
                user_id=user_id,
                type="Expense"
            )
            .group_by(
                Transaction.category  # type: ignore
            )
            .all()
        )

        result = {}

        for category, amount in data:
            result[category] = amount

        return result