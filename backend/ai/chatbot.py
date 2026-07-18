from ai.gemini_client import GeminiClient
from ai.prompts import SYSTEM_PROMPT


class FinanceChatbot:

    def __init__(self):

        self.client = GeminiClient()

    def ask(self, message) -> str:

        prompt = f"""
{SYSTEM_PROMPT}

User Question:

{message}
"""

        return self.client.generate(prompt)