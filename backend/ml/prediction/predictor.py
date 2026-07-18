import joblib
import pandas as pd
from pathlib import Path


# Load the trained pipeline once
MODEL_PATH = (
    Path(__file__)
    .resolve()
    .parent.parent
    / "saved_models"
    / "financial_health_model.pkl"
)

model = joblib.load(MODEL_PATH)

# Numeric columns the model expects as floats
NUMERIC_COLS = [
    "age",
    "monthly_income",
    "monthly_expense",
    "savings",
    "debt",
    "emi",
    "investment_amount",
    "transaction_count",
    "budget_utilization",
    "savings_rate",
]


class FinancialHealthPredictor:

    @staticmethod
    def predict(data):

        df = pd.DataFrame([data])

        # Coerce numeric columns so strings from JSON don't break the pipeline
        for col in NUMERIC_COLS:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

        prediction = model.predict(df)[0]

        probabilities = model.predict_proba(df)[0]

        confidence = round(
            max(probabilities) * 100,
            2
        )

        return prediction, confidence