from utils.constants import EXPENSE_CATEGORIES


class BudgetValidator:

    @staticmethod
    def validate(data):

        errors = {}

        # ----------------------------
        # Category
        # ----------------------------

        category = str(
            data.get("category", "")
        ).strip().title()

        if not category:

            errors["category"] = (
                "Category is required."
            )

        elif category not in EXPENSE_CATEGORIES:

            errors["category"] = (
                "Invalid expense category."
            )

        # ----------------------------
        # Budget Amount
        # ----------------------------

        budget_amount = data.get(
            "budget_amount"
        )

        if budget_amount is None:

            errors["budget_amount"] = (
                "Budget amount is required."
            )

        else:

            try:

                budget_amount = float(
                    budget_amount
                )

                if budget_amount <= 0:

                    errors["budget_amount"] = (
                        "Budget amount must be greater than zero."
                    )

            except (ValueError, TypeError):

                errors["budget_amount"] = (
                    "Budget amount must be numeric."
                )

        # ----------------------------
        # Month
        # ----------------------------

        month = data.get("month")

        if month is None:

            errors["month"] = (
                "Month is required."
            )

        else:

            try:

                month = int(month)

                if month < 1 or month > 12:

                    errors["month"] = (
                        "Month must be between 1 and 12."
                    )

            except (ValueError, TypeError):

                errors["month"] = (
                    "Month must be an integer."
                )

        # ----------------------------
        # Year
        # ----------------------------

        year = data.get("year")

        if year is None:

            errors["year"] = (
                "Year is required."
            )

        else:

            try:

                year = int(year)

                if year < 2020 or year > 2100:

                    errors["year"] = (
                        "Invalid year."
                    )

            except (ValueError, TypeError):

                errors["year"] = (
                    "Year must be an integer."
                )

        return errors

    @staticmethod
    def is_valid(data):

        return len(
            BudgetValidator.validate(data)
        ) == 0

    @staticmethod
    def normalize(data):

        if "category" in data:

            data["category"] = (

                str(
                    data["category"]
                )

                .strip()

                .title()

            )

        return data