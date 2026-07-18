import os
import sys

# Add backend folder to Python path
sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from services.category_service import CategoryService


while True:

    text = input("\nDescription : ")

    if text.lower() == "exit":
        break

    category = CategoryService.predict(text)

    print("Predicted Category :", category)