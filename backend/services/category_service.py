import os
import joblib


class CategoryService:

    BASE_DIR = os.path.dirname(os.path.dirname(__file__))

    MODEL_PATH = os.path.join(
        BASE_DIR,
        "ml",
        "models",
        "category_model.pkl"
    )

    VECTORIZER_PATH = os.path.join(
        BASE_DIR,
        "ml",
        "models",
        "vectorizer.pkl"
    )

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)

    @classmethod
    def predict(cls, description):

        if description is None:
            return "Others"

        description = str(description).strip()

        if description == "":
            return "Others"

        vector = cls.vectorizer.transform([description])

        prediction = cls.model.predict(vector)

        return prediction[0]