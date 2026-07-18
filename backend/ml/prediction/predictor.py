import os
import joblib
import pandas as pd
import numpy as np
from pathlib import Path


MODEL_PATH = (
    Path(__file__)
    .resolve()
    .parent.parent
    / "saved_models"
    / "financial_health_model.pkl"
)

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


def _build_fallback_model():
    """Build a simple rule-based predictor when model file is not available."""
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.pipeline import Pipeline
    from sklearn.preprocessing import StandardScaler

    # Generate synthetic training data
    np.random.seed(42)
    n = 500
    X = pd.DataFrame({
        "age": np.random.randint(22, 60, n),
        "monthly_income": np.random.uniform(20000, 200000, n),
        "monthly_expense": np.random.uniform(10000, 180000, n),
        "savings": np.random.uniform(0, 500000, n),
        "debt": np.random.uniform(0, 100000, n),
        "emi": np.random.uniform(0, 50000, n),
        "investment_amount": np.random.uniform(0, 100000, n),
        "transaction_count": np.random.randint(5, 100, n),
        "budget_utilization": np.random.uniform(0.1, 1.5, n),
        "savings_rate": np.random.uniform(0, 0.6, n),
    })

    # Rule-based labels
    def label(row):
        sr = row["savings_rate"]
        bu = row["budget_utilization"]
        if sr >= 0.3 and bu < 0.7:
            return "Excellent"
        elif sr >= 0.2 and bu < 0.9:
            return "Good"
        elif sr >= 0.1 and bu < 1.1:
            return "Average"
        else:
            return "Poor"

    y = X.apply(label, axis=1)

    pipe = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", RandomForestClassifier(n_estimators=50, random_state=42))
    ])
    pipe.fit(X, y)

    # Save for future runs
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipe, MODEL_PATH)
    print(f"[Predictor] Fallback model built and saved to {MODEL_PATH}")
    return pipe


# Load or build model
if MODEL_PATH.exists():
    model = joblib.load(MODEL_PATH)
    print(f"[Predictor] Model loaded from {MODEL_PATH}")
else:
    print(f"[Predictor] Model not found at {MODEL_PATH} — building fallback model...")
    model = _build_fallback_model()


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