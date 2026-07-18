import os
from google import genai
from dotenv import load_dotenv

load_dotenv()


class GeminiClient:

    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

    def generate(self, prompt):

        try:

            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            return response.text or ""

        except Exception as e:

            print("=" * 50)
            print("GEMINI ERROR")
            print(e)
            print("=" * 50)

            raise