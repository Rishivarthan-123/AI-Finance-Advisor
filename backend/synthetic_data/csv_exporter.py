import csv
import os


class CSVExporter:

    @staticmethod
    def export(customer, transactions, filename):

        os.makedirs("synthetic_data/output", exist_ok=True)

        filepath = os.path.join(
            "synthetic_data/output",
            filename
        )

        with open(
            filepath,
            "w",
            newline="",
            encoding="utf-8"
        ) as file:

            writer = csv.writer(file)

            
            writer.writerow([
                "Date",
                "Description",
                "Category",
                "Debit",
                "Credit",
                "Balance"
            ])

            for t in transactions:

                writer.writerow([
                    t["date"],
                    t["description"],
                    t["category"],
                    t["debit"],
                    t["credit"],
                    t["balance"]
                ])

        return filepath