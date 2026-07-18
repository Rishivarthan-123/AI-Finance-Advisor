from datetime import datetime, date


class TransactionNormalizer:

    @staticmethod
    def to_float(value):

        if value is None:
            return 0.0

        value = str(value).strip()

        if value == "":
            return 0.0

        value = value.replace(",", "")

        try:
            return float(value)
        except ValueError:
            return 0.0

    @staticmethod
    def parse_date(date_value):

        if date_value is None:
            return None

        if isinstance(date_value, datetime):
            return date_value.date()

        if isinstance(date_value, date):
            return date_value

        date_text = str(date_value).strip()

        if " " in date_text:
            date_text = date_text.split(" ")[0]

        formats = [
            "%d/%m/%Y",
            "%d-%m-%Y",
            "%Y-%m-%d",
            "%d %b %Y",
            "%d-%b-%Y",
            "%d/%m/%y",
        ]

        for fmt in formats:
            try:
                return datetime.strptime(
                    date_text,
                    fmt
                ).date()
            except ValueError:
                pass

        return None

    @classmethod
    def normalize(cls, row, header_map):

        # --------------------------------------
        # Generic CSV Support
        # Date | Description | Type | Amount | Balance
        # --------------------------------------

        if "type" in header_map and "amount" in header_map:

            tx_type = str(
                row[header_map["type"]]
            ).strip().lower()

            amount = cls.to_float(
                row[header_map["amount"]]
            )

            debit = 0.0
            credit = 0.0

            if tx_type in [
                "debit",
                "dr",
                "expense",
                "withdrawal",
            ]:
                debit = amount
            else:
                credit = amount

        else:

            debit_idx = header_map.get("debit")
            credit_idx = header_map.get("credit")

            debit = cls.to_float(
                row[debit_idx] if isinstance(debit_idx, int) else None
            )

            credit = cls.to_float(
                row[credit_idx] if isinstance(credit_idx, int) else None
            )

        return {

            "date": cls.parse_date(
                row[
                    header_map["date"]
                ]
            ),

            "description": str(
                row[
                    header_map["description"]
                ]
            ).strip(),

            "debit": debit,

            "credit": credit,

            "balance": cls.to_float(
                row[header_map["balance"]]
                if isinstance(header_map.get("balance"), int)
                else None
            )

        }