"""
Application Constants

This file contains all reusable constants used throughout
the AI Personal Finance Advisor project.
"""

# ==========================================================
# Transaction Types
# ==========================================================

TRANSACTION_TYPES = [

    "Income",

    "Expense"

]

# ==========================================================
# Transaction Categories
# ==========================================================

INCOME_CATEGORIES = [

    "Salary",

    "Business",

    "Freelancing",

    "Interest",

    "Rental",

    "Investment",

    "Other"

]

EXPENSE_CATEGORIES = [

    "Food",

    "Travel",

    "Shopping",

    "Bills",

    "Healthcare",

    "Medical",

    "Entertainment",

    "Education",

    "EMI",

    "Insurance",

    "Rent",

    "Utilities",

    "Fuel",

    "Investment",

    "Other"

]

# ==========================================================
# Payment Methods
# ==========================================================

PAYMENT_METHODS = [

    "Cash",

    "UPI",

    "Credit Card",

    "Debit Card",

    "Net Banking",

    "Wallet"

]

# ==========================================================
# Financial Health
# ==========================================================

FINANCIAL_HEALTH = [

    "Excellent",

    "Good",

    "Average",

    "Poor"

]

# ==========================================================
# Risk Levels
# ==========================================================

RISK_LEVELS = [

    "Low",

    "Moderate",

    "High"

]

# ==========================================================
# Investment Experience
# ==========================================================

INVESTMENT_EXPERIENCE = [

    "Beginner",

    "Intermediate",

    "Advanced"

]

# ==========================================================
# Budget Recommendation
# ==========================================================

SAVINGS_PERCENTAGE = {

    "Excellent": 30,

    "Good": 25,

    "Average": 20,

    "Poor": 10

}

# ==========================================================
# Emergency Fund Recommendation
# ==========================================================

EMERGENCY_MONTHS = {

    "Excellent": 12,

    "Good": 9,

    "Average": 6,

    "Poor": 3

}

# ==========================================================
# Reminder Status
# ==========================================================

REMINDER_STATUS = [

    "Pending",

    "Paid",

    "Overdue"

]

# ==========================================================
# Default Values
# ==========================================================

DEFAULT_RISK_LEVEL = "Low"

DEFAULT_INVESTMENT_EXPERIENCE = "Beginner"

DEFAULT_REMINDER_DAYS = 3

# ==========================================================
# API Messages
# ==========================================================

MESSAGES = {

    "REGISTER_SUCCESS":
        "User registered successfully.",

    "LOGIN_SUCCESS":
        "Login successful.",

    "PROFILE_UPDATED":
        "Profile updated successfully.",

    "TRANSACTION_ADDED":
        "Transaction added successfully.",

    "TRANSACTION_UPDATED":
        "Transaction updated successfully.",

    "TRANSACTION_DELETED":
        "Transaction deleted successfully.",

    "BUDGET_ADDED":
        "Budget added successfully.",

    "BUDGET_UPDATED":
        "Budget updated successfully.",

    "BUDGET_DELETED":
        "Budget deleted successfully.",

    "REMINDER_ADDED":
        "Reminder added successfully.",

    "REMINDER_UPDATED":
        "Reminder updated successfully.",

    "REMINDER_DELETED":
        "Reminder deleted successfully.",

    "PREDICTION_GENERATED":
        "Financial prediction generated successfully.",

    "INVESTMENT_GENERATED":
        "Investment recommendation generated successfully.",

    "AI_BUDGET_GENERATED":
        "AI budget generated successfully.",

    "NOT_FOUND":
        "Resource not found.",

    "UNAUTHORIZED":
        "Unauthorized access.",

    "VALIDATION_FAILED":
        "Validation failed.",

    "SERVER_ERROR":
        "Internal server error."

}