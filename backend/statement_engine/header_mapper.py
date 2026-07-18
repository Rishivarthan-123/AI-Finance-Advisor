import re


class HeaderMapper:

    HEADER_MAP = {

        "date": [
            "date",
            "txn date",
            "transaction date",
            "value date",
            "posting date",
        ],

        "description": [
            "description",
            "remarks",
            "narration",
            "particulars",
            "details",
            "transaction details",
        ],

        "debit": [
            "debit",
            "withdrawal",
            "withdrawals",
            "dr",
            "dr amount",
            "debit amount",
            "withdraw",
            "withdraw amount",
        ],

        "credit": [
            "credit",
            "deposit",
            "deposits",
            "cr",
            "cr amount",
            "credit amount",
            "deposit amount",
        ],

        "balance": [
            "balance",
            "closing balance",
            "available balance",
            "running balance",
        ],

        # -------- NEW --------
        # Generic CSV support
        "type": [
            "type",
            "transaction type",
            "txn type",
        ],

        "amount": [
            "amount",
            "transaction amount",
            "value",
            "amt",
        ],
    }

    @staticmethod
    def normalize(text):

        if text is None:
            return ""

        text = str(text).lower()
        text = re.sub(r"[^a-z0-9 ]", "", text)

        return text.strip()

    @classmethod
    def map_headers(cls, headers):

        mapped = {}

        for index, column in enumerate(headers):

            column = cls.normalize(column)

            for standard_name, aliases in cls.HEADER_MAP.items():

                if column in aliases:
                    mapped[standard_name] = index
                    break

        # --------------------------------------------------
        # Support generic CSV:
        #
        # Date | Description | Type | Amount | Balance
        #
        # Normalizer can use "type" + "amount" to determine
        # whether the value is Debit or Credit.
        # --------------------------------------------------

        if (
            "amount" in mapped
            and "type" in mapped
            and "date" in mapped
            and "description" in mapped
        ):
            return mapped

        return mapped