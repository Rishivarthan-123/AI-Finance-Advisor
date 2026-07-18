import random
import os
import pandas as pd

random.seed(42)

categories = {
    "Food": [
        "Swiggy", "Zomato", "A2B", "KFC", "Dominos",
        "Pizza Hut", "Burger King", "McDonalds",
        "Cafe Coffee Day", "Starbucks"
    ],

    "Fuel": [
        "HPCL", "Indian Oil", "Shell",
        "BPCL", "Bharat Petroleum", "IOCL"
    ],

    "Shopping": [
        "Amazon", "Flipkart", "Myntra",
        "Ajio", "Meesho", "Lifestyle",
        "Reliance Trends", "Westside"
    ],

    "Entertainment": [
        "Netflix", "Spotify",
        "Sony LIV", "Disney+ Hotstar",
        "Prime Video"
    ],

    "Healthcare": [
        "Apollo Pharmacy",
        "Apollo Hospitals",
        "Practo",
        "MedPlus",
        "SRM Hospital"
    ],

    "Investment": [
        "Groww",
        "Zerodha",
        "Angel One",
        "Upstox"
    ],

    "Travel": [
        "Uber",
        "Rapido",
        "IRCTC",
        "RedBus",
        "Ola"
    ],

    "Salary": [
        "Salary Credit",
        "Monthly Salary",
        "Company Salary"
    ],

    "Utilities": [
        "TNEB",
        "BSNL",
        "Jio",
        "Airtel",
        "ACT Fibernet"
    ],

    "EMI": [
        "Home Loan EMI",
        "Car Loan EMI",
        "Personal Loan EMI"
    ],

    "ATM": [
        "ATM Withdrawal",
        "Cash Withdrawal"
    ],

    "Insurance": [
        "LIC Premium",
        "ICICI Prudential",
        "HDFC Life"
    ],

    "Transfer": [
        "NEFT Transfer",
        "IMPS Transfer",
        "RTGS Transfer",
        "Bank Transfer"
    ],

    "Rent": [
        "House Rent",
        "Room Rent",
        "Apartment Rent"
    ]
}

rows = []

for category, merchants in categories.items():

    for _ in range(400):

        merchant = random.choice(merchants)

        rows.append({

            "description": merchant,

            "category": category

        })

df = pd.DataFrame(rows)

df = df.sample(frac=1).reset_index(drop=True)

output = os.path.join(
    os.path.dirname(__file__),
    "transaction_category_dataset.csv"
)

df.to_csv(
    output,
    index=False
)

print("Dataset Created Successfully")

print(df.head())

print("Rows :", len(df))