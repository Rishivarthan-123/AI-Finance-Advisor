import re


class AuthValidator:

    @staticmethod
    def validate_register(data):

        errors = {}

        # ----------------------------
        # Full Name
        # ----------------------------

        fullname = str(
            data.get("fullname", "")
        ).strip()

        if not fullname:

            errors["fullname"] = (
                "Full name is required."
            )

        elif len(fullname) < 3:

            errors["fullname"] = (
                "Full name must contain at least 3 characters."
            )

        elif len(fullname) > 100:

            errors["fullname"] = (
                "Full name cannot exceed 100 characters."
            )

        # ----------------------------
        # Email
        # ----------------------------

        email = str(
            data.get("email", "")
        ).strip().lower()

        if not email:

            errors["email"] = (
                "Email is required."
            )

        elif not re.match(
            r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$",
            email
        ):

            errors["email"] = (
                "Invalid email address."
            )

        # ----------------------------
        # Phone
        # ----------------------------

        phone = str(
            data.get("phone", "")
        ).strip()

        if not phone:

            errors["phone"] = (
                "Phone number is required."
            )

        elif not phone.isdigit():

            errors["phone"] = (
                "Phone number must contain only digits."
            )

        elif len(phone) != 10:

            errors["phone"] = (
                "Phone number must contain exactly 10 digits."
            )

        # ----------------------------
        # Password
        # ----------------------------

        password = str(
            data.get("password", "")
        )

        if not password:

            errors["password"] = (
                "Password is required."
            )

        elif len(password) < 8:

            errors["password"] = (
                "Password must be at least 8 characters."
            )

        return errors

    @staticmethod
    def validate_login(data):

        errors = {}

        email = str(
            data.get("email", "")
        ).strip().lower()

        password = str(
            data.get("password", "")
        )

        if not email:

            errors["email"] = (
                "Email is required."
            )

        if not password:

            errors["password"] = (
                "Password is required."
            )

        return errors

    @staticmethod
    def normalize(data):

        if "fullname" in data:

            data["fullname"] = (

                str(data["fullname"])

                .strip()

                .title()

            )

        if "email" in data:

            data["email"] = (

                str(data["email"])

                .strip()

                .lower()

            )

        if "phone" in data:

            data["phone"] = (

                str(data["phone"])

                .strip()

            )

        return data