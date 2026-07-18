import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv("../datasets/financial_health_dataset.csv")

print("Dataset Shape:", df.shape)

# ==========================
# Features & Target
# ==========================

X = df.drop("financial_health", axis=1)
y = df["financial_health"]

# ==========================
# Categorical Columns
# ==========================

categorical_columns = [
    "occupation",
    "risk_level"
]

numeric_columns = [
    col for col in X.columns
    if col not in categorical_columns
]

# ==========================
# Preprocessing
# ==========================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_columns
        ),
        (
            "num",
            "passthrough",
            numeric_columns
        )
    ]
)

# ==========================
# Random Forest Model
# ==========================

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ))
])

# ==========================
# Train/Test Split
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ==========================
# Train Model
# ==========================

model.fit(X_train, y_train)

# ==========================
# Predictions
# ==========================

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("\nAccuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report\n")
print(classification_report(
    y_test,
    predictions
))

print("\nConfusion Matrix\n")
print(confusion_matrix(
    y_test,
    predictions
))

# ==========================
# Save Model
# ==========================

joblib.dump(
    model,
    "../saved_models/financial_health_model.pkl"
)

print("\nModel Saved Successfully!")