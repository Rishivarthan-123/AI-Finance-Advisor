from statement_engine.extractor import StatementExtractor
from statement_engine.header_detector import HeaderDetector
from statement_engine.normalizer import TransactionNormalizer
from statement_engine.validator import TransactionValidator


class StatementProcessor:

    @staticmethod
    def process(filepath):

        tables = StatementExtractor.extract(filepath)

        print("\n=========== TABLES ===========")
        print(tables)
        print("==============================\n")

        transactions = []

        for table in tables:

            header_row, mapping = HeaderDetector.detect(table)

            print("Header Row :", header_row)
            print("Mapping :", mapping)

            if header_row is None:
                continue

            rows = table[header_row + 1:]

            for row in rows:

                try:

                    transaction = TransactionNormalizer.normalize(
                        row,
                        mapping
                    )

                    print(transaction)

                    if TransactionValidator.validate(
                        transaction
                    ):

                        transactions.append(transaction)

                except Exception as e:

                    print("Row Error:", e)

        print("\nTransactions Found:", len(transactions))

        return transactions