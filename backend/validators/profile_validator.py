from utils.constants import (
    RISK_LEVELS,
    INVESTMENT_EXPERIENCE
)


class ProfileValidator:

    @staticmethod
    def validate(data):

        errors = {}

        # ----------------------------
        # Age
        # ----------------------------

        age = data.get("age")

        if age is not None:

            try:

                age = int(age)

                if age < 18 or age > 100:

                    errors["age"] = (
                        "Age must be between 18 and 100."
                    )

            except (ValueError, TypeError):

                errors["age"] = (
                    "Age must be numeric."
                )

        # ----------------------------
        # Monthly Income
        # ----------------------------

        income = data.get(
            "monthly_income"
        )

        if income is not None:

            try:

                income = float(income)

                if income < 0:

                    errors["monthly_income"] = (
                        "Monthly income cannot be negative."
                    )

            except (ValueError, TypeError):

                errors["monthly_income"] = (
                    "Monthly income must be numeric."
                )

        # ----------------------------
        # Savings Goal
        # ----------------------------

        goal = data.get(
            "savings_goal"
        )

        if goal is not None:

            try:

                goal = float(goal)

                if goal < 0:

                    errors["savings_goal"] = (
                        "Savings goal cannot be negative."
                    )

            except (ValueError, TypeError):

                errors["savings_goal"] = (
                    "Savings goal must be numeric."
                )

        # ----------------------------
        # Risk Level
        # ----------------------------

        risk = str(
            data.get("risk_level", "")
        ).title()

        if risk and risk not in RISK_LEVELS:

            errors["risk_level"] = (
                f"Risk level must be one of {RISK_LEVELS}"
            )

        # ----------------------------
        # Investment Experience
        # ----------------------------

        experience = str(
            data.get(
                "investment_experience",
                ""
            )
        ).title()

        if (
            experience and
            experience not in INVESTMENT_EXPERIENCE
        ):

            errors["investment_experience"] = (
                f"Investment experience must be one of {INVESTMENT_EXPERIENCE}"
            )

        return errors

    @staticmethod
    def normalize(data):

        if "occupation" in data:

            data["occupation"] = (

                str(data["occupation"])

                .strip()

                .title()

            )

        if "risk_level" in data:

            data["risk_level"] = (

                str(data["risk_level"])

                .strip()

                .title()

            )

        if "investment_experience" in data:

            data["investment_experience"] = (

                str(data["investment_experience"])

                .strip()

                .title()

            )

        return data