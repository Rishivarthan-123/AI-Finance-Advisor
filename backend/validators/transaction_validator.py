from utils.constants import (
    TRANSACTION_TYPES,
    INCOME_CATEGORIES,
    EXPENSE_CATEGORIES,
    PAYMENT_METHODS
)


class TransactionValidator:

    @staticmethod
    def validate(data):

        errors = {}

        # ----------------------------
        # Title
        # ----------------------------

        title = str(
            data.get("title", "")
        ).strip()

        if not title:

            errors["title"] = (
                "Title is required."
            )

        elif len(title) > 100:

            errors["title"] = (
                "Title cannot exceed 100 characters."
            )

        # ----------------------------
        # Amount
        # ----------------------------

        amount = data.get("amount")

        if amount is None:

            errors["amount"] = (
                "Amount is required."
            )

        else:

            try:

                amount = float(amount)

                if amount <= 0:

                    errors["amount"] = (
                        "Amount must be greater than zero."
                    )

            except (ValueError, TypeError):

                errors["amount"] = (
                    "Amount must be numeric."
                )

        # ----------------------------
        # Transaction Type
        # ----------------------------

        transaction_type = str(
            data.get("type", "")
        ).strip()

        if transaction_type not in TRANSACTION_TYPES:

            errors["type"] = (
                f"Type must be one of "
                f"{TRANSACTION_TYPES}"
            )

        # ----------------------------
        # Category
        # ----------------------------

        category = str(
            data.get("category", "")
        ).strip().title()

        if transaction_type == "Income":

            if category not in INCOME_CATEGORIES:

                errors["category"] = (
                    "Invalid income category."
                )

        elif transaction_type == "Expense":

            if category not in EXPENSE_CATEGORIES:

                errors["category"] = (
                    "Invalid expense category."
                )

        # ----------------------------
        # Payment Method
        # ----------------------------

        payment_method = str(
            data.get(
                "payment_method",
                ""
            )
        ).strip()

        if payment_method not in PAYMENT_METHODS:

            errors["payment_method"] = (

                "Invalid payment method."

            )

        # ----------------------------
        # Transaction Date
        # ----------------------------

        transaction_date = str(

            data.get(
                "transaction_date",
                ""
            )

        ).strip()

        if not transaction_date:

            errors["transaction_date"] = (

                "Transaction date is required."

            )

        # ----------------------------
        # Description
        # ----------------------------

        description = str(

            data.get(
                "description",
                ""
            )

        )

        if len(description) > 500:

            errors["description"] = (

                "Description cannot exceed 500 characters."

            )

        return errors

    @staticmethod
    def is_valid(data):

        errors = TransactionValidator.validate(
            data
        )

        return len(errors) == 0

    @staticmethod
    def normalize(data):

        """
        Normalize incoming data before saving.
        """

        if "category" in data:

            data["category"] = (

                str(data["category"])

                .strip()

                .title()

            )

        if "payment_method" in data:

            data["payment_method"] = (

                str(data["payment_method"])

                .strip()

            )

        if "title" in data:

            data["title"] = (

                str(data["title"])

                .strip()

            )

        return data