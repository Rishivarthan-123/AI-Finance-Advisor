class TransactionValidator:

    @staticmethod
    def validate(transaction):

        print("Validating:", transaction)

        if transaction["date"] is None:
            return False

        if transaction["description"] == "":
            return False

        if (
            transaction["debit"] == 0
            and transaction["credit"] == 0
        ):
            return False

        return True