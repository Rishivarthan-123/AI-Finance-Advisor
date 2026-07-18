import random
import pandas as pd

random.seed(42)

occupations = [
    "Student",
    "Software Engineer",
    "Teacher",
    "Doctor",
    "Business",
    "Government Employee",
    "Designer",
    "Freelancer",
    "Lawyer",
    "Accountant"
]

risk_levels = [
    "Low",
    "Moderate",
    "High"
]

rows = []

for _ in range(15000):

    age = random.randint(21, 60)

    occupation = random.choice(occupations)

    income = random.randint(15000, 200000)

    expense = random.randint(
        int(income * 0.20),
        int(income * 0.95)
    )

    savings = income - expense

    debt = random.randint(0, 300000)

    emi = random.randint(0, 25000)

    investment = random.randint(
        0,
        int(income * 0.40)
    )

    transaction_count = random.randint(10, 150)

    budget_utilization = round(
        (expense / income) * 100,
        2
    )

    savings_rate = round(
        (savings / income) * 100,
        2
    )

    risk_level = random.choice(risk_levels)

    # --------------------------
    # Financial Health Logic
    # --------------------------

    score = 0

    if savings_rate >= 40:
        score += 3
    elif savings_rate >= 25:
        score += 2
    elif savings_rate >= 10:
        score += 1

    if budget_utilization < 60:
        score += 3
    elif budget_utilization < 80:
        score += 2
    else:
        score += 1

    if debt < income:
        score += 2

    if investment > income * 0.15:
        score += 2

    if emi < income * 0.20:
        score += 1

    if score >= 10:
        health = "Excellent"

    elif score >= 8:
        health = "Good"

    elif score >= 5:
        health = "Average"

    else:
        health = "Poor"

    rows.append({

        "age": age,

        "occupation": occupation,

        "monthly_income": income,

        "monthly_expense": expense,

        "savings": savings,

        "debt": debt,

        "emi": emi,

        "investment_amount": investment,

        "transaction_count": transaction_count,

        "budget_utilization": budget_utilization,

        "savings_rate": savings_rate,

        "risk_level": risk_level,

        "financial_health": health

    })

df = pd.DataFrame(rows)

df.to_csv(

    "financial_health_dataset.csv",

    index=False

)

print(df.head())

print()

print("Dataset Shape :", df.shape)

print()

print(df["financial_health"].value_counts())