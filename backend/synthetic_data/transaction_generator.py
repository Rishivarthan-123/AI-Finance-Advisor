import random
from datetime import date, timedelta

from synthetic_data.merchant_data import MERCHANTS


class TransactionGenerator:

    @staticmethod
    def generate(customer, days=30):

        transactions = []

        monthly_income = customer["monthly_income"]

        # Start with a realistic opening balance (3 months of income)
        opening_balance = monthly_income * 3

        # Salary credit at start of month
        transactions.append({

            "date": date.today().replace(day=1),

            "description": "Salary Credit",

            "category": "Salary",

            "credit": monthly_income,

            "debit": 0,

            "balance": None  # will be computed after sorting

        })

        for _ in range(days * 3):

            category = random.choice(
                list(MERCHANTS.keys())
            )

            if category == "Salary":
                continue

            merchant = random.choice(
                MERCHANTS[category]
            )

            amount = random.randint(
                100,
                5000
            )

            transactions.append({

                "date":
                    date.today() -
                    timedelta(
                        days=random.randint(
                            0,
                            days
                        )
                    ),

                "description":
                    merchant,

                "category":
                    category,

                "debit":
                    amount,

                "credit":
                    0,

                "balance": None  # will be computed after sorting

            })

        # Sort first, then compute running balance sequentially
        transactions.sort(
            key=lambda x: x["date"]
        )

        balance = opening_balance
        for tx in transactions:
            balance += tx["credit"]
            balance -= tx["debit"]
            tx["balance"] = balance

        return transactions