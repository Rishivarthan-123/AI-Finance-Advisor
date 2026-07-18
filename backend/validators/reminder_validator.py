from datetime import datetime


class ReminderValidator:

    @staticmethod
    def validate(data):

        errors = {}

        # ----------------------------
        # Bill Name
        # ----------------------------

        bill_name = str(
            data.get("bill_name", "")
        ).strip()

        if not bill_name:

            errors["bill_name"] = (
                "Bill name is required."
            )

        elif len(bill_name) > 100:

            errors["bill_name"] = (
                "Bill name cannot exceed 100 characters."
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
        # Due Date
        # ----------------------------

        due_date = str(
            data.get("due_date", "")
        ).strip()

        if not due_date:

            errors["due_date"] = (
                "Due date is required."
            )

        else:

            try:

                datetime.strptime(
                    due_date,
                    "%Y-%m-%d"
                )

            except ValueError:

                errors["due_date"] = (
                    "Due date must be in YYYY-MM-DD format."
                )

        # ----------------------------
        # Reminder Days
        # ----------------------------

        reminder_days = data.get(
            "reminder_days",
            3
        )

        try:

            reminder_days = int(
                reminder_days
            )

            if reminder_days < 0:

                errors["reminder_days"] = (
                    "Reminder days cannot be negative."
                )

            elif reminder_days > 30:

                errors["reminder_days"] = (
                    "Reminder days cannot exceed 30."
                )

        except (ValueError, TypeError):

            errors["reminder_days"] = (
                "Reminder days must be an integer."
            )

        return errors

    @staticmethod
    def is_valid(data):

        return len(
            ReminderValidator.validate(data)
        ) == 0

    @staticmethod
    def normalize(data):

        if "bill_name" in data:

            data["bill_name"] = (

                str(
                    data["bill_name"]
                )

                .strip()

                .title()

            )

        return data