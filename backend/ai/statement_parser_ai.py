import re
import json

from ai.gemini_client import GeminiClient


class AIStatementParser:

    def __init__(self):
        self.client = GeminiClient()

    def parse(self, statement_text):

        prompt = f"""
You are an expert bank statement parser.

The statement may come from ANY bank.

Extract ONLY the transactions.

Return ONLY valid JSON — no markdown, no explanation, no code fences.

Each transaction must contain:

date
description
debit
credit
balance

If debit or credit is missing,
return 0.

Statement:

{statement_text}
"""

        response = self.client.generate(prompt)

        # Strip markdown code fences that Gemini sometimes wraps around JSON
        response = response.strip()
        response = re.sub(r"^```(?:json)?\s*", "", response)
        response = re.sub(r"\s*```$", "", response)
        response = response.strip()

        return json.loads(response)