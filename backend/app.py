from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from config import Config
from database import db

# ==========================
# Models
# ==========================
from models.admin import Admin
from models.ai_budget_plan import AIBudgetPlan
from models.bank_statement import BankStatement
from models.bill_reminder import BillReminder
from models.financial_prediction import FinancialPrediction
from models.investment_recommendation import InvestmentRecommendation
from models.statement_transaction import StatementTransaction

# Import these if they are not imported elsewhere
from models.user import User
from models.transaction import Transaction
from models.budget import Budget

# ==========================
# Routes
# ==========================
from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.transaction import transaction_bp
from routes.analytics import analytics_bp
from routes.budget import budget_bp
from routes.prediction import prediction_bp
from routes.chatbot import chatbot_bp
from routes.investment import investment_bp
from routes.reminder import reminder_bp
from routes.ai_budget import ai_budget_bp
from routes.bank_statement import statement_bp

# ==========================
# Flask App
# ==========================
app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

# ==========================
# Register Blueprints
# ==========================

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    profile_bp,
    url_prefix="/api/profile"
)

app.register_blueprint(
    transaction_bp,
    url_prefix="/api/transactions"
)

app.register_blueprint(
    budget_bp,
    url_prefix="/api/budgets"
)

app.register_blueprint(
    analytics_bp,
    url_prefix="/api/analytics"
)

app.register_blueprint(
    prediction_bp,
    url_prefix="/api/predict"
)

app.register_blueprint(
    chatbot_bp,
    url_prefix="/api"
)

app.register_blueprint(
    investment_bp,
    url_prefix="/api/investment"
)

app.register_blueprint(
    reminder_bp,
    url_prefix="/api/reminders"
)

app.register_blueprint(
    ai_budget_bp,
    url_prefix="/api/ai-budget"
)

# Statement Module
app.register_blueprint(
    statement_bp,
    url_prefix="/api/statements"
)

# ==========================
# Health Check
# ==========================
@app.route("/health")
def health():
    return {
        "status": "OK"
    }, 200


# ==========================
# Home
# ==========================
@app.route("/")
def home():
    return {
        "project": "AI Personal Finance Advisor",
        "version": "2.0",
        "status": "Running",
        "database": "Connected",
        "authentication": "JWT Enabled"
    }


# ==========================
# Create Tables
# ==========================
with app.app_context():
    db.create_all()


# ==========================
# Run Server
# ==========================
if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )