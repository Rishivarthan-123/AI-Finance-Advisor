from app import app

from models.user import User
from models.financial_prediction import FinancialPrediction
from models.investment_recommendation import InvestmentRecommendation

with app.app_context():

    print("\n===== USERS =====")

    for user in User.query.all():
        print(user.to_dict())

    print("\n===== FINANCIAL PREDICTIONS =====")

    for prediction in FinancialPrediction.query.all():
        print(prediction.to_dict())

    print("\n===== INVESTMENT RECOMMENDATIONS =====")

    for recommendation in InvestmentRecommendation.query.all():
        print(recommendation.to_dict())