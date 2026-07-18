from openpyxl import Workbook
import os


class ExcelExporter:

    @staticmethod
    def export(customer, transactions, filename):

        os.makedirs("synthetic_data/output", exist_ok=True)

        wb = Workbook()

        ws = wb.active
        if ws is None:
            ws = wb.create_sheet("Bank Statement")

        ws.title = "Bank Statement"

        ws.append(["Customer", customer["name"]])
        ws.append(["Occupation", customer["occupation"]])
        ws.append(["Monthly Income", customer["monthly_income"]])
        ws.append([])

        ws.append([
            "Date",
            "Description",
            "Category",
            "Debit",
            "Credit",
            "Balance"
        ])

        for t in transactions:

            ws.append([
                str(t["date"]),
                t["description"],
                t["category"],
                t["debit"],
                t["credit"],
                t["balance"]
            ])

        filepath = os.path.join(
            "synthetic_data/output",
            filename
        )

        wb.save(filepath)

        return filepath