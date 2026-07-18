import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from synthetic_data.customer_generator import CustomerGenerator
from synthetic_data.transaction_generator import TransactionGenerator

customer = CustomerGenerator.generate()

transactions = TransactionGenerator.generate(customer)

print(customer)

print()

print(f"Generated {len(transactions)} Transactions")

print()

for transaction in transactions[:10]:

    print(transaction)