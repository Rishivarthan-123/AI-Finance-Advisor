from ai.chatbot import FinanceChatbot
from services.finance_context_service import FinanceContextService


class ChatbotService:

    chatbot = FinanceChatbot()

    @staticmethod
    def ask(user_id, message):

        try:

            context = FinanceContextService.get_context(user_id)

            profile = context["profile"]
            financial = context["financial"]
            prediction = context["prediction"]

            prompt = f"""
User Financial Details

Name: {profile.get('name', 'N/A')}

Occupation: {profile.get('occupation', 'N/A')}

Monthly Income: ₹{profile.get('monthly_income', 0)}

Total Income: ₹{financial.get('total_income', 0)}

Total Expense: ₹{financial.get('total_expense', 0)}

Savings: ₹{financial.get('current_savings', 0)}

Risk Level: {profile.get('risk_level', 'Unknown')}

Investment Experience:
{profile.get('investment_experience', 'Unknown')}

Financial Health:
{prediction.get('financial_health', 'Unknown')}

Financial Score:
{prediction.get('financial_score', 0)}

Budgets:
{context.get('budgets', [])}

Recent Transactions:
{context.get('transactions', [])}

Category Expenses:
{context.get('category_expenses', {})}

Overspending:
{context.get('overspending', [])}

Question:

{message}

You are an expert AI Financial Advisor.
Use ONLY the user's financial data above when answering.
Provide clear, practical, and personalized financial advice.
"""

            reply = ChatbotService.chatbot.ask(prompt)

            return {
                "success": True,
                "reply": reply
            }

        except Exception as e:

            print("CHATBOT ERROR:", e)

            return {
                "success": False,
                "reply": str(e)
            }