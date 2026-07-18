import os
import joblib
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

BASE_DIR = os.path.dirname(__file__)

DATASET = os.path.join(
    BASE_DIR,
    "..",
    "dataset",
    "transaction_category_dataset.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)

print("=" * 50)
print("Loading Dataset...")
print("=" * 50)

df = pd.read_csv(DATASET)

print(df.head())

print("\nDataset Shape :", df.shape)

print("\nCategory Distribution:\n")
print(df["category"].value_counts())

# --------------------------
# Features
# --------------------------

X = df["description"].astype(str)

y = df["category"]

# --------------------------
# TF-IDF
# --------------------------

vectorizer = TfidfVectorizer(

    lowercase=True,

    stop_words="english",

    ngram_range=(1, 2)

)

X_vector = vectorizer.fit_transform(X)

# --------------------------
# Train Test Split
# --------------------------

X_train, X_test, y_train, y_test = train_test_split(

    X_vector,

    y,

    test_size=0.2,

    random_state=42,

    stratify=y

)

print("\nTraining Samples :", X_train.shape[0])

print("Testing Samples :", X_test.shape[0])

# --------------------------
# Train Model
# --------------------------

print("\nTraining Model...")

model = LogisticRegression(

    max_iter=2000,

    random_state=42

)

model.fit(

    X_train,

    y_train

)

# --------------------------
# Prediction
# --------------------------

prediction = model.predict(X_test)

accuracy = accuracy_score(

    y_test,

    prediction

)

print("\n" + "=" * 50)

print("Accuracy :", round(accuracy * 100, 2), "%")

print("=" * 50)

print("\nClassification Report\n")

print(classification_report(

    y_test,

    prediction

))

print("\nConfusion Matrix\n")

print(confusion_matrix(

    y_test,

    prediction

))

# --------------------------
# Save Model
# --------------------------

joblib.dump(

    model,

    os.path.join(

        MODEL_DIR,

        "category_model.pkl"

    )

)

joblib.dump(

    vectorizer,

    os.path.join(

        MODEL_DIR,

        "vectorizer.pkl"

    )

)

print("\nModel Saved Successfully")

print("Location :", MODEL_DIR)