import pdfplumber
import pandas as pd


class TextExtractor:

    @staticmethod
    def extract(filepath):

        if filepath.endswith(".pdf"):

            text = ""

            with pdfplumber.open(filepath) as pdf:

                for page in pdf.pages:

                    extracted = page.extract_text()

                    if extracted:

                        text += extracted + "\n"

            return text

        elif filepath.endswith(".csv"):

            df = pd.read_csv(filepath)

            return df.to_string()

        elif filepath.endswith(".xlsx"):

            df = pd.read_excel(filepath)

            return df.to_string()

        else:

            raise Exception("Unsupported file")