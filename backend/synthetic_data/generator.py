from synthetic_data.customer_generator import CustomerGenerator
from synthetic_data.transaction_generator import TransactionGenerator
from synthetic_data.csv_exporter import CSVExporter
from synthetic_data.excel_exporter import ExcelExporter
from synthetic_data.pdf_exporter import PDFExporter

class SyntheticDataGenerator:

    @staticmethod
    def generate():

        customer = CustomerGenerator.generate()

        transactions = TransactionGenerator.generate(customer)

        CSVExporter.export(
            customer,
            transactions,
            "statement.csv"
        )

        ExcelExporter.export(
            customer,
            transactions,
            "statement.xlsx"
        )

        for bank in ["HDFC", "SBI", "ICICI", "AXIS"]:
            PDFExporter.export(
                customer,
                transactions,
                f"{bank.lower()}_statement.pdf",
                bank
            )

        return customer, transactions