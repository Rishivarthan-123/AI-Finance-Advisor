import pdfplumber
import pandas as pd


class StatementExtractor:

    @staticmethod
    def extract(filepath):

        extension = filepath.lower().split(".")[-1]

        if extension == "pdf":
            return StatementExtractor.extract_pdf(filepath)

        elif extension == "csv":
            return StatementExtractor.extract_csv(filepath)

        elif extension in ["xlsx", "xls"]:
            return StatementExtractor.extract_excel(filepath)

        else:
            raise Exception("Unsupported file type")

    @staticmethod
    def extract_pdf(filepath):

        tables = []

        with pdfplumber.open(filepath) as pdf:

            for page in pdf.pages:

                extracted_tables = page.extract_tables()

                if extracted_tables:

                    tables.extend(extracted_tables)

        return tables

    @staticmethod
    def extract_csv(filepath):

        df = pd.read_csv(filepath)

        table = []

        # Header
        table.append(
            list(df.columns)
        )

        # Data
        table.extend(
            df.values.tolist()
        )

        return [table]

    @staticmethod
    def extract_excel(filepath):

        df = pd.read_excel(filepath)

        table = []

        table.append(
            list(df.columns)
        )

        table.extend(
            df.values.tolist()
        )

        return [table]